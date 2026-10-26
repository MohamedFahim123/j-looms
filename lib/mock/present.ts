import { ACTIVITY_CATALOG, ACTION_CATALOG } from "./catalog";
import {
  PAGE_SIZE,
  type MockClassOption,
  type MockDb,
  type MockTeacher,
} from "./types";

export function paginate<T>(items: T[], searchParams: URLSearchParams) {
  const total = items.length;
  const totalPages = total === 0 ? 0 : Math.ceil(total / PAGE_SIZE);
  const requested = Number(searchParams.get("page") || "1");
  const safeRequested =
    Number.isFinite(requested) && requested > 0 ? Math.floor(requested) : 1;
  const page = totalPages === 0 ? 1 : Math.min(safeRequested, totalPages);
  const start = (page - 1) * PAGE_SIZE;
  return {
    items: items.slice(start, start + PAGE_SIZE),
    totalPages,
    page,
    total,
  };
}

export function teacherView(teacher: MockTeacher) {
  return {
    id: teacher.id,
    class_option_teacher_id: teacher.id,
    name: teacher.name,
    email: teacher.email,
    phone: teacher.phone,
    image: teacher.image,
    status: teacher.status,
    gender: teacher.gender,
    locale: teacher.locale,
  };
}

export function classNameOf(db: MockDb, classId: number | null) {
  if (!classId) {
    return "N/A";
  }
  return (
    db.classes.find((schoolClass) => schoolClass.id === classId)?.nameEn ??
    "N/A"
  );
}

export function studentCount(db: MockDb, classId: number) {
  return db.students.filter((student) => student.classId === classId).length;
}

export function parentLinksForStudent(db: MockDb, studentId: number) {
  return db.links
    .filter((link) => link.studentId === studentId)
    .map((link) => {
      const parent = db.parents.find((item) => item.id === link.parentId);
      if (!parent) {
        return null;
      }
      return {
        id: parent.id,
        name: parent.name,
        code: parent.code,
        email: parent.email,
        phone: parent.phone,
        image: parent.image,
        relation: link.relation,
      };
    })
    .filter((parent): parent is NonNullable<typeof parent> => parent !== null);
}

export function studentView(db: MockDb, studentId: number) {
  const student = db.students.find((item) => item.id === studentId);
  if (!student) {
    return null;
  }
  const parents = parentLinksForStudent(db, student.id);
  return {
    id: student.id,
    name: student.name,
    code: student.code,
    email: student.email,
    phone: student.phone,
    image: student.image,
    gender: student.gender,
    birth_date: student.birthDate,
    blood_type: student.bloodType,
    class_id: student.classId ?? "N/A",
    class_name: classNameOf(db, student.classId),
    has_parents: parents.length > 0,
    parents,
  };
}

export function parentView(parent: MockDb["parents"][number]) {
  return {
    id: parent.id,
    name: parent.name,
    code: parent.code,
    email: parent.email,
    phone: parent.phone,
    image: parent.image,
  };
}

export function classListItem(
  db: MockDb,
  schoolClass: MockDb["classes"][number],
) {
  return {
    id: schoolClass.id,
    name: schoolClass.nameEn,
    name_en: schoolClass.nameEn,
    name_ar: schoolClass.nameAr,
    number_of_students: studentCount(db, schoolClass.id),
  };
}

export function optionView(db: MockDb, option: MockClassOption) {
  const catalog =
    option.type === "action"
      ? ACTION_CATALOG.find((item) => item.id === option.catalogId)
      : ACTIVITY_CATALOG.find((item) => item.id === option.catalogId);
  const label = catalog?.name ?? "Option";
  const teachers = option.teacherIds
    .map((id) => db.teachers.find((teacher) => teacher.id === id))
    .filter((teacher): teacher is MockTeacher => Boolean(teacher))
    .map(teacherView);
  return {
    id: option.id,
    type: option.type,
    icon: "",
    name_ar: label,
    name_en: label,
    action: option.type === "action" ? label : "",
    name: label,
    teachers,
  };
}

export function classDetails(
  db: MockDb,
  schoolClass: MockDb["classes"][number],
) {
  const options = db.options.filter(
    (option) => option.classId === schoolClass.id,
  );
  return {
    id: schoolClass.id,
    name: schoolClass.nameEn,
    name_ar: schoolClass.nameAr,
    name_en: schoolClass.nameEn,
    number_of_students: studentCount(db, schoolClass.id),
    actions: options
      .filter((option) => option.type === "action")
      .map((option) => optionView(db, option)),
    activities: options
      .filter((option) => option.type === "activity")
      .map((option) => optionView(db, option)),
  };
}
