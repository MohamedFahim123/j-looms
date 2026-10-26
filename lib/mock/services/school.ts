import { ACTIVITY_CATALOG, ACTION_CATALOG } from "../catalog";
import {
  asNumber,
  fail,
  idList,
  includesText,
  ok,
  sameText,
  text,
} from "../http";
import {
  classDetails,
  classListItem,
  classNameOf,
  paginate,
  parentView,
  studentView,
  teacherView,
} from "../present";
import { MOCK_IMAGE, type MockDb, type MockResult } from "../types";

export function schoolIdFrom(
  db: MockDb,
  authorization: string | null,
): number | MockResult {
  const token = authorization?.replace(/^Bearer\s+/i, "").trim();
  if (!token) {
    return fail(401, "Unauthenticated.");
  }
  const session = db.sessions.find((item) => item.token === token);
  if (!session) {
    return fail(401, "Unauthenticated.");
  }
  return session.schoolId;
}

function isFailure(value: number | MockResult): value is MockResult {
  return typeof value !== "number";
}

function listMeta(searchParams: URLSearchParams, items: unknown[]) {
  const page = paginate(items, searchParams);
  return page;
}

export function listTeachers(
  db: MockDb,
  authorization: string | null,
  searchParams: URLSearchParams,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const name = searchParams.get("name");
  const status = searchParams.get("status");
  const teachers = db.teachers
    .filter((teacher) => teacher.schoolId === schoolId)
    .filter((teacher) =>
      includesText(`${teacher.name} ${teacher.email} ${teacher.phone}`, name),
    )
    .filter((teacher) => !status || sameText(teacher.status, status))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(teacherView);
  const page = listMeta(searchParams, teachers);
  return {
    status: 200,
    body: {
      data: { teachers: page.items },
      meta: { totalPages: page.totalPages, page: page.page, total: page.total },
    },
  };
}

export function showTeacher(
  db: MockDb,
  authorization: string | null,
  id: number,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const teacher = db.teachers.find(
    (item) => item.id === id && item.schoolId === schoolId,
  );
  if (!teacher) return fail(404, "Teacher not found.");
  return { status: 200, body: { data: { teacher: teacherView(teacher) } } };
}

export function storeTeacher(
  db: MockDb,
  authorization: string | null,
  body: Record<string, unknown>,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const name = text(body.name);
  const email = text(body.email).toLowerCase();
  const phone = text(body.phone);
  const password = text(body.password);
  const gender = text(body.gender);
  const image = text(body.image);
  const errors: Record<string, string[]> = {};
  if (!name) errors.name = ["Name is Required"];
  if (!email) errors.email = ["Email is Required"];
  if (!phone) errors.phone = ["Phone Number is Required"];
  if (!password) errors.password = ["Password is Required"];
  if (!gender) errors.gender = ["Gender is required"];
  if (!image) errors.image = ["Profile Picture is Required"];
  if (
    email &&
    db.teachers.some(
      (teacher) =>
        teacher.schoolId === schoolId && sameText(teacher.email, email),
    )
  ) {
    errors.email = ["This email is already used."];
  }
  if (Object.keys(errors).length > 0)
    return fail(422, "Please check the teacher details.", errors);
  const id = db.seq.teacher;
  db.seq.teacher += 1;
  db.teachers.push({
    id,
    schoolId,
    name,
    email,
    phone,
    image: MOCK_IMAGE,
    status: "Active",
    gender,
    locale: "en",
    password,
  });
  return ok("Teacher added successfully.");
}

export function updateTeacherStatus(
  db: MockDb,
  authorization: string | null,
  id: number,
  body: Record<string, unknown>,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const teacher = db.teachers.find(
    (item) => item.id === id && item.schoolId === schoolId,
  );
  if (!teacher) return fail(404, "Teacher not found.");
  const status = text(body.status);
  if (!sameText(status, "Active") && !sameText(status, "Deactive")) {
    return fail(422, "Status is not valid.", {
      status: ["Status is not valid."],
    });
  }
  teacher.status = sameText(status, "Active") ? "Active" : "Deactive";
  return ok("Updated Successfully!");
}

export function deleteTeacher(
  db: MockDb,
  authorization: string | null,
  id: number,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const exists = db.teachers.some(
    (teacher) => teacher.id === id && teacher.schoolId === schoolId,
  );
  if (!exists) return fail(404, "Teacher not found.");
  db.teachers = db.teachers.filter((teacher) => teacher.id !== id);
  db.options.forEach((option) => {
    option.teacherIds = option.teacherIds.filter(
      (teacherId) => teacherId !== id,
    );
  });
  return ok("Teacher removed successfully.");
}

export function allowedTeachers(
  db: MockDb,
  authorization: string | null,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const teachers = db.teachers
    .filter(
      (teacher) => teacher.schoolId === schoolId && teacher.status === "Active",
    )
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(teacherView);
  return { status: 200, body: { data: { teachers } } };
}

export function listStudents(
  db: MockDb,
  authorization: string | null,
  searchParams: URLSearchParams,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const name = searchParams.get("name");
  const students = db.students
    .filter((student) => student.schoolId === schoolId)
    .filter((student) => includesText(`${student.name} ${student.code}`, name))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((student) => studentView(db, student.id))
    .filter(
      (student): student is NonNullable<typeof student> => student !== null,
    );
  const page = listMeta(searchParams, students);
  return {
    status: 200,
    body: {
      data: { students: page.items },
      meta: { totalPages: page.totalPages, page: page.page, total: page.total },
    },
  };
}

export function showStudent(
  db: MockDb,
  authorization: string | null,
  id: number,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const student = db.students.find(
    (item) => item.id === id && item.schoolId === schoolId,
  );
  if (!student) return fail(404, "Student not found.");
  return {
    status: 200,
    body: { data: { student: studentView(db, student.id) } },
  };
}

export function storeStudent(
  db: MockDb,
  authorization: string | null,
  body: Record<string, unknown>,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const name = text(body.name);
  const code = text(body.code);
  const gender = text(body.gender);
  const birthDate = text(body.birth_date);
  const bloodType = text(body.blood_type);
  const password = text(body.password);
  const image = text(body.image);
  const classId = asNumber(body.grade_id);
  const errors: Record<string, string[]> = {};
  if (!name) errors.name = ["Name is Required"];
  if (!code) errors.code = ["Code is Required"];
  if (!gender) errors.gender = ["Gender is required"];
  if (!birthDate) errors.birth_date = ["Birth Date is Required"];
  if (!bloodType) errors.blood_type = ["Blood Type is Required"];
  if (!password) errors.password = ["Password is Required"];
  if (!image) errors.image = ["Profile Picture is Required"];
  const schoolClass = db.classes.find(
    (item) => item.id === classId && item.schoolId === schoolId,
  );
  if (!schoolClass) errors.grade_id = ["class is required"];
  if (
    code &&
    db.students.some(
      (student) =>
        student.schoolId === schoolId && sameText(student.code, code),
    )
  ) {
    errors.code = ["This student code is already used."];
  }
  if (Object.keys(errors).length > 0)
    return fail(422, "Please check the student details.", errors);
  const id = db.seq.student;
  db.seq.student += 1;
  db.students.push({
    id,
    schoolId,
    name,
    code,
    email: `${code.toLowerCase()}@joinlooms.com`,
    phone: "",
    image: MOCK_IMAGE,
    gender,
    birthDate,
    bloodType,
    classId: schoolClass?.id ?? null,
    password,
  });
  return ok("Student added successfully.");
}

export function deleteStudent(
  db: MockDb,
  authorization: string | null,
  id: number,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const exists = db.students.some(
    (student) => student.id === id && student.schoolId === schoolId,
  );
  if (!exists) return fail(404, "Student not found.");
  db.students = db.students.filter((student) => student.id !== id);
  db.links = db.links.filter((link) => link.studentId !== id);
  return ok("Student removed successfully.");
}

export function assignStudentToClass(
  db: MockDb,
  authorization: string | null,
  body: Record<string, unknown>,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const student = db.students.find(
    (item) =>
      item.id === asNumber(body.student_id) && item.schoolId === schoolId,
  );
  const schoolClass = db.classes.find(
    (item) => item.id === asNumber(body.class_id) && item.schoolId === schoolId,
  );
  if (!student || !schoolClass) {
    return fail(422, "Student or class was not found.", {
      class_id: ["Student or class was not found."],
    });
  }
  student.classId = schoolClass.id;
  return ok(`${student.name} assigned to ${classNameOf(db, schoolClass.id)}.`);
}

export function listClasses(
  db: MockDb,
  authorization: string | null,
  searchParams: URLSearchParams,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const name = searchParams.get("name");
  const classes = db.classes
    .filter((schoolClass) => schoolClass.schoolId === schoolId)
    .filter((schoolClass) => includesText(schoolClass.nameEn, name))
    .sort((a, b) => a.nameEn.localeCompare(b.nameEn))
    .map((schoolClass) => classListItem(db, schoolClass));
  const page = listMeta(searchParams, classes);
  return {
    status: 200,
    body: {
      data: { classes: page.items },
      meta: { totalPages: page.totalPages, page: page.page, total: page.total },
    },
  };
}

export function allClasses(
  db: MockDb,
  authorization: string | null,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const classes = db.classes
    .filter((schoolClass) => schoolClass.schoolId === schoolId)
    .sort((a, b) => a.nameEn.localeCompare(b.nameEn))
    .map((schoolClass) => ({ id: schoolClass.id, name: schoolClass.nameEn }));
  return { status: 200, body: { data: { classes } } };
}

export function showClass(
  db: MockDb,
  authorization: string | null,
  id: number,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const schoolClass = db.classes.find(
    (item) => item.id === id && item.schoolId === schoolId,
  );
  if (!schoolClass) return fail(404, "Class not found.");
  return { status: 200, body: { data: classDetails(db, schoolClass) } };
}

export function storeClass(
  db: MockDb,
  authorization: string | null,
  body: Record<string, unknown>,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const nameEn = text(body.name_en);
  if (!nameEn)
    return fail(422, "Class Name is Required", {
      name_en: ["Class Name is Required"],
    });
  const actionIds = idList(body.actions);
  const activityIds = idList(body.activities);
  if (
    actionIds.some((id) => !ACTION_CATALOG.some((action) => action.id === id))
  ) {
    return fail(422, "One of the actions is not available.", {
      actions: ["One of the actions is not available."],
    });
  }
  if (
    activityIds.some(
      (id) => !ACTIVITY_CATALOG.some((activity) => activity.id === id),
    )
  ) {
    return fail(422, "One of the activities is not available.", {
      activities: ["One of the activities is not available."],
    });
  }
  const id = db.seq.class;
  db.seq.class += 1;
  db.classes.push({ id, schoolId, nameEn, nameAr: nameEn });
  [
    ...actionIds.map((catalogId) => ({ type: "action" as const, catalogId })),
    ...activityIds.map((catalogId) => ({
      type: "activity" as const,
      catalogId,
    })),
  ].forEach((option) => {
    db.options.push({
      id: db.seq.option,
      schoolId,
      classId: id,
      type: option.type,
      catalogId: option.catalogId,
      teacherIds: [],
    });
    db.seq.option += 1;
  });
  return ok("Class added successfully.");
}

export function deleteClass(
  db: MockDb,
  authorization: string | null,
  id: number,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const exists = db.classes.some(
    (schoolClass) => schoolClass.id === id && schoolClass.schoolId === schoolId,
  );
  if (!exists) return fail(404, "Class not found.");
  db.classes = db.classes.filter((schoolClass) => schoolClass.id !== id);
  db.options = db.options.filter((option) => option.classId !== id);
  db.students.forEach((student) => {
    if (student.classId === id) student.classId = null;
  });
  return ok("Class removed successfully.");
}

export function catalogActions(): MockResult {
  return { status: 200, body: { data: { actions: ACTION_CATALOG } } };
}

export function catalogActivities(): MockResult {
  return { status: 200, body: { data: { activities: ACTIVITY_CATALOG } } };
}

export function addClassOption(
  db: MockDb,
  authorization: string | null,
  body: Record<string, unknown>,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const classId = asNumber(body.class_id);
  const catalogId = asNumber(body.option_id);
  const type = text(body.type);
  const schoolClass = db.classes.find(
    (item) => item.id === classId && item.schoolId === schoolId,
  );
  const catalog =
    type === "action"
      ? ACTION_CATALOG.find((item) => item.id === catalogId)
      : type === "activity"
        ? ACTIVITY_CATALOG.find((item) => item.id === catalogId)
        : undefined;
  if (!schoolClass || !catalog || (type !== "action" && type !== "activity")) {
    return fail(422, "Class option is not valid.");
  }
  const duplicate = db.options.some(
    (option) =>
      option.classId === schoolClass.id &&
      option.type === type &&
      option.catalogId === catalog.id,
  );
  if (duplicate) return fail(422, "This option is already on the class.");
  db.options.push({
    id: db.seq.option,
    schoolId,
    classId: schoolClass.id,
    type,
    catalogId: catalog.id,
    teacherIds: [],
  });
  db.seq.option += 1;
  return ok("Option added successfully.");
}

export function updateClassOption(
  db: MockDb,
  authorization: string | null,
  body: Record<string, unknown>,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const option = db.options.find(
    (item) =>
      item.id === asNumber(body.class_option_id) && item.schoolId === schoolId,
  );
  const catalogId = asNumber(body.option_id);
  const type = text(body.type);
  if (!option || (type !== "action" && type !== "activity"))
    return fail(422, "Class option was not found.");
  const catalog =
    type === "action"
      ? ACTION_CATALOG.find((item) => item.id === catalogId)
      : ACTIVITY_CATALOG.find((item) => item.id === catalogId);
  if (!catalog) return fail(422, "Selected option was not found.");
  option.type = type;
  option.catalogId = catalog.id;
  return ok("Option updated successfully.");
}

export function deleteClassOption(
  db: MockDb,
  authorization: string | null,
  id: number,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const exists = db.options.some(
    (option) => option.id === id && option.schoolId === schoolId,
  );
  if (!exists) return fail(404, "Option not found.");
  db.options = db.options.filter((option) => option.id !== id);
  return ok("Option removed successfully.");
}

export function assignTeachers(
  db: MockDb,
  authorization: string | null,
  body: Record<string, unknown>,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const option = db.options.find(
    (item) =>
      item.id === asNumber(body.class_option) &&
      item.schoolId === schoolId &&
      item.classId === asNumber(body.class_id),
  );
  if (!option) return fail(422, "Class option was not found.");
  const teacherIds = idList(body.teachers);
  const known = teacherIds.every((id) =>
    db.teachers.some(
      (teacher) =>
        teacher.id === id &&
        teacher.schoolId === schoolId &&
        teacher.status === "Active",
    ),
  );
  if (!known) return fail(422, "One of the teachers cannot be assigned.");
  option.teacherIds = teacherIds;
  return ok("Teachers updated successfully.");
}

export function listParents(
  db: MockDb,
  authorization: string | null,
  searchParams: URLSearchParams,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const query = searchParams.get("q") || searchParams.get("name");
  const parents = db.parents
    .filter((parent) => parent.schoolId === schoolId)
    .filter((parent) =>
      includesText(
        `${parent.name} ${parent.code} ${parent.email} ${parent.phone}`,
        query,
      ),
    )
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(parentView);
  const page = listMeta(searchParams, parents);
  return {
    status: 200,
    body: {
      data: { parents: page.items },
      meta: { totalPages: page.totalPages, page: page.page, total: page.total },
    },
  };
}

export function showParent(
  db: MockDb,
  authorization: string | null,
  id: number,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const parent = db.parents.find(
    (item) => item.id === id && item.schoolId === schoolId,
  );
  if (!parent) return fail(404, "Parent not found.");
  return { status: 200, body: { data: { parent: parentView(parent) } } };
}

export function filterParentByCode(
  db: MockDb,
  authorization: string | null,
  searchParams: URLSearchParams,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const code = searchParams.get("code") || "";
  if (!code)
    return fail(422, "Parent Code is required", {
      parent_id: ["Parent Code is required"],
    });
  const parent = db.parents.find(
    (item) => item.schoolId === schoolId && sameText(item.code, code),
  );
  if (!parent) return fail(404, "Parent not found.");
  return {
    status: 200,
    body: {
      status: 200,
      message: "Parent Loaded Successfully!",
      data: {
        message: "Parent Loaded Successfully!",
        parent: parentView(parent),
      },
    },
  };
}

export function storeParent(
  db: MockDb,
  authorization: string | null,
  body: Record<string, unknown>,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const name = text(body.name);
  const code = text(body.code);
  const email = text(body.email).toLowerCase();
  const phone = text(body.phone);
  const image = text(body.image);
  const errors: Record<string, string[]> = {};
  if (!name) errors.name = ["Name is Required"];
  if (!code) errors.code = ["Parent Code is Required"];
  if (!email) errors.email = ["Email is Required"];
  if (!phone) errors.phone = ["Phone Number is Required"];
  if (!image) errors.image = ["Profile Picture is Required"];
  if (
    code &&
    db.parents.some(
      (parent) => parent.schoolId === schoolId && sameText(parent.code, code),
    )
  ) {
    errors.code = ["This parent code is already used."];
  }
  if (
    email &&
    db.parents.some(
      (parent) => parent.schoolId === schoolId && sameText(parent.email, email),
    )
  ) {
    errors.email = ["This email is already used."];
  }
  if (Object.keys(errors).length > 0)
    return fail(422, "Please check the parent details.", errors);
  const id = db.seq.parent;
  db.seq.parent += 1;
  db.parents.push({
    id,
    schoolId,
    name,
    code,
    email,
    phone,
    image: MOCK_IMAGE,
  });
  return ok("Parent added successfully.");
}

export function deleteParent(
  db: MockDb,
  authorization: string | null,
  id: number,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const exists = db.parents.some(
    (parent) => parent.id === id && parent.schoolId === schoolId,
  );
  if (!exists) return fail(404, "Parent not found.");
  db.parents = db.parents.filter((parent) => parent.id !== id);
  db.links = db.links.filter((link) => link.parentId !== id);
  return ok("Parent removed successfully.");
}

export function assignParent(
  db: MockDb,
  authorization: string | null,
  body: Record<string, unknown>,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const student = db.students.find(
    (item) =>
      item.id === asNumber(body.student_id) && item.schoolId === schoolId,
  );
  const parent = db.parents.find(
    (item) =>
      item.id === asNumber(body.parent_id) && item.schoolId === schoolId,
  );
  const relation = text(body.type);
  if (!student || !parent) return fail(422, "Student or parent was not found.");
  if (!relation)
    return fail(422, "Relation is required", {
      type: ["Relation is required"],
    });
  const already = db.links.some(
    (link) => link.studentId === student.id && link.parentId === parent.id,
  );
  if (already)
    return fail(422, "This parent is already assigned to the student.");
  db.links.push({
    schoolId,
    studentId: student.id,
    parentId: parent.id,
    relation,
  });
  return ok("Parent assigned successfully.");
}

export function removeParent(
  db: MockDb,
  authorization: string | null,
  body: Record<string, unknown>,
): MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (isFailure(schoolId)) return schoolId;
  const studentId = asNumber(body.student_id);
  const parentId = asNumber(body.parent_id);
  const exists = db.links.some(
    (link) =>
      link.schoolId === schoolId &&
      link.studentId === studentId &&
      link.parentId === parentId,
  );
  if (!exists) return fail(404, "Parent assignment was not found.");
  db.links = db.links.filter(
    (link) => !(link.studentId === studentId && link.parentId === parentId),
  );
  return ok("Parent removed successfully.");
}
