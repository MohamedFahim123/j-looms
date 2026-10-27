import { normalizeApiPath } from "./url";
import { readDb, updateDb } from "./store";
import { fail } from "./http";
import {
  curriculumCategories,
  curriculumMilestones,
  curriculumSubCategories,
  curriculumTypes,
  listCurriculums,
  listEmployees,
  listPermissions,
  listRoles,
  showCountry,
  showCurriculum,
  showEmployee,
  showRole,
  storeCurriculum,
  storeEmployee,
  storeRole,
} from "./services/desk";
import type { MockRequest, MockResult } from "./types";
import {
  forgetPassword,
  login,
  logout,
  previousStep,
  registerStepOne,
  registerStepThree,
  registerStepTwo,
  resetPassword,
} from "./services/auth";
import {
  addClassOption,
  allClasses,
  allowedTeachers,
  assignParent,
  assignStudentToClass,
  assignTeachers,
  catalogActivities,
  catalogActions,
  deleteClass,
  deleteClassOption,
  deleteParent,
  deleteStudent,
  deleteTeacher,
  filterParentByCode,
  listClasses,
  listParents,
  listStudents,
  listTeachers,
  removeParent,
  showClass,
  showParent,
  showStudent,
  showTeacher,
  storeClass,
  storeParent,
  storeStudent,
  storeTeacher,
  updateClassOption,
  updateTeacherStatus,
} from "./services/school";
import {
  deleteEvent,
  deleteSubject,
  listEvents,
  listNotices,
  listRequests,
  listSubjects,
  readNotice,
  showProfile,
  showSettings,
  storeEvent,
  storeSubject,
  updateProfile,
  updateRequest,
  updateSettings,
} from "./services/workspace";

function idFrom(match: RegExpMatchArray | null): number | null {
  if (!match) return null;
  const id = Number(match[1]);
  return Number.isFinite(id) ? id : null;
}

export async function dispatch(request: MockRequest): Promise<MockResult> {
  const method = request.method.toUpperCase();
  const pathname = normalizeApiPath(request.pathname);
  const { body, authorization, searchParams } = request;

  if (method === "GET" && pathname === "/sanctum/csrf-cookie") {
    return { status: 204, body: null };
  }
  if (method === "POST" && pathname === "/school/login")
    return updateDb((db) => login(db, body));
  if (method === "POST" && pathname === "/school/logout")
    return updateDb((db) => logout(db, authorization));
  if (method === "POST" && pathname === "/school/register-step-one")
    return updateDb((db) => registerStepOne(db, body));
  if (method === "POST" && pathname === "/school/register-step-two")
    return updateDb((db) => registerStepTwo(db, body));
  if (method === "POST" && pathname === "/school/register-step-three")
    return updateDb((db) => registerStepThree(db, body));
  if (method === "POST" && pathname === "/school/forget-password")
    return updateDb((db) => forgetPassword(db, body));
  if (method === "POST" && pathname === "/school/reset-password")
    return updateDb((db) => resetPassword(db, body));
  if (method === "POST" && pathname === "/school/pervious-step")
    return previousStep();

  if (method === "GET" && pathname === "/all-countries") {
    return {
      status: 200,
      body: {
        data: {
          countries: [
            { id: 1, name: "Egypt" },
            { id: 2, name: "Saudi Arabia" },
            { id: 3, name: "United Arab Emirates" },
          ],
        },
      },
    };
  }
  if (
    method === "GET" &&
    (pathname === "/school/roles" || pathname === "/school/roles-search")
  ) {
    return listRoles();
  }
  if (method === "GET" && pathname === "/school/permissions") {
    return listPermissions();
  }
  if (
    method === "GET" &&
    (pathname === "/school/all-employees" ||
      pathname === "/school/filter-employees")
  ) {
    return listEmployees(searchParams);
  }
  if (method === "GET" && pathname === "/school/all-curriculums") {
    return listCurriculums(searchParams, body);
  }
  if (method === "POST" && pathname === "/school/filter-curriculums") {
    return listCurriculums(searchParams, body);
  }
  if (method === "GET" && pathname === "/school/curriculum-types") {
    return curriculumTypes();
  }
  if (method === "POST" && pathname === "/school/add-employee") {
    return storeEmployee(body);
  }
  if (method === "POST" && pathname === "/school/roles-create") {
    return storeRole(body);
  }
  if (method === "POST" && pathname === "/school/add-curriculum") {
    return storeCurriculum(body);
  }
  if (method === "POST" && pathname === "/school/add-class-action") {
    return updateDb((db) =>
      addClassOption(db, authorization, {
        class_id: body.class_id,
        option_id: body.action_id,
        type: "action",
      }),
    );
  }
  if (method === "POST" && pathname === "/school/add-class-activity") {
    return updateDb((db) =>
      addClassOption(db, authorization, {
        class_id: body.class_id,
        option_id: body.activity_id,
        type: "activity",
      }),
    );
  }
  if (method === "POST" && pathname === "/school/update-class-action") {
    return updateDb((db) =>
      updateClassOption(db, authorization, {
        class_option_id: body.class_action_id,
        option_id: body.action_id,
        type: "action",
      }),
    );
  }
  if (method === "POST" && pathname === "/school/update-class-activity") {
    return updateDb((db) =>
      updateClassOption(db, authorization, {
        class_option_id: body.class_activity_id,
        option_id: body.activity_id,
        type: "activity",
      }),
    );
  }
  if (method === "GET" && pathname === "/school/actions")
    return catalogActions();
  if (method === "GET" && pathname === "/school/activities")
    return catalogActivities();

  if (
    method === "GET" &&
    (pathname === "/school/all-teachers" ||
      pathname === "/school/filter-teachers")
  ) {
    return readDb((db) => listTeachers(db, authorization, searchParams));
  }
  if (method === "POST" && pathname === "/school/store-teacher")
    return updateDb((db) => storeTeacher(db, authorization, body));
  if (method === "GET" && pathname === "/school/allowed-teachers")
    return readDb((db) => allowedTeachers(db, authorization));

  if (
    method === "GET" &&
    (pathname === "/school/all-students" ||
      pathname === "/school/filter-students")
  ) {
    return readDb((db) => listStudents(db, authorization, searchParams));
  }
  if (method === "POST" && pathname === "/school/store-student")
    return updateDb((db) => storeStudent(db, authorization, body));
  if (method === "POST" && pathname === "/school/assign-student-to-class")
    return updateDb((db) => assignStudentToClass(db, authorization, body));

  if (
    method === "GET" &&
    (pathname === "/school/all-classes" ||
      pathname === "/school/filter-classes")
  ) {
    return readDb((db) => listClasses(db, authorization, searchParams));
  }
  if (method === "GET" && pathname === "/school/get-all-classes")
    return readDb((db) => allClasses(db, authorization));
  if (method === "POST" && pathname === "/school/store-class")
    return updateDb((db) => storeClass(db, authorization, body));
  if (method === "POST" && pathname === "/school/add-class-option")
    return updateDb((db) => addClassOption(db, authorization, body));
  if (method === "POST" && pathname === "/school/update-class-option")
    return updateDb((db) => updateClassOption(db, authorization, body));
  if (method === "POST" && pathname === "/school/assign-teachers")
    return updateDb((db) => assignTeachers(db, authorization, body));

  if (
    method === "GET" &&
    (pathname === "/school/parents" || pathname === "/school/search-parents")
  ) {
    return readDb((db) => listParents(db, authorization, searchParams));
  }
  if (method === "GET" && pathname === "/school/filter-parents")
    return readDb((db) => filterParentByCode(db, authorization, searchParams));
  if (method === "POST" && pathname === "/school/store-parent")
    return updateDb((db) => storeParent(db, authorization, body));
  if (method === "POST" && pathname === "/school/assign-parent-to-student")
    return updateDb((db) => assignParent(db, authorization, body));
  if (method === "POST" && pathname === "/school/remove-parent-from-student")
    return updateDb((db) => removeParent(db, authorization, body));

  const teacherId = idFrom(
    pathname.match(
      /^\/school\/(?:show-teacher|update-teacher-status|delete-teacher)\/(\d+)$/,
    ),
  );
  if (
    teacherId !== null &&
    pathname.startsWith("/school/show-teacher/") &&
    method === "GET"
  ) {
    return readDb((db) => showTeacher(db, authorization, teacherId));
  }
  if (
    teacherId !== null &&
    pathname.startsWith("/school/update-teacher-status/") &&
    method === "POST"
  ) {
    return updateDb((db) =>
      updateTeacherStatus(db, authorization, teacherId, body),
    );
  }
  if (
    teacherId !== null &&
    pathname.startsWith("/school/delete-teacher/") &&
    method === "DELETE"
  ) {
    return updateDb((db) => deleteTeacher(db, authorization, teacherId));
  }

  const studentId = idFrom(
    pathname.match(/^\/school\/(?:show-student|delete-student)\/(\d+)$/),
  );
  if (
    studentId !== null &&
    pathname.startsWith("/school/show-student/") &&
    method === "GET"
  ) {
    return readDb((db) => showStudent(db, authorization, studentId));
  }
  if (
    studentId !== null &&
    pathname.startsWith("/school/delete-student/") &&
    method === "DELETE"
  ) {
    return updateDb((db) => deleteStudent(db, authorization, studentId));
  }

  const classId = idFrom(
    pathname.match(/^\/school\/(?:show-class|delete-class)\/(\d+)$/),
  );
  if (
    classId !== null &&
    pathname.startsWith("/school/show-class/") &&
    method === "GET"
  ) {
    return readDb((db) => showClass(db, authorization, classId));
  }
  if (
    classId !== null &&
    pathname.startsWith("/school/delete-class/") &&
    method === "DELETE"
  ) {
    return updateDb((db) => deleteClass(db, authorization, classId));
  }

  const optionId = idFrom(
    pathname.match(
      /^\/school\/delete-class-(?:option|action|activity)\/(\d+)$/,
    ),
  );
  if (optionId !== null && method === "DELETE") {
    return updateDb((db) => deleteClassOption(db, authorization, optionId));
  }

  const parentId = idFrom(
    pathname.match(/^\/school\/(?:show-parent|delete-parent)\/(\d+)$/),
  );
  if (
    parentId !== null &&
    pathname.startsWith("/school/show-parent/") &&
    method === "GET"
  ) {
    return readDb((db) => showParent(db, authorization, parentId));
  }
  if (
    parentId !== null &&
    pathname.startsWith("/school/delete-parent/") &&
    method === "DELETE"
  ) {
    return updateDb((db) => deleteParent(db, authorization, parentId));
  }

  if (method === "GET" && pathname === "/school/profile")
    return readDb((db) => showProfile(db, authorization));
  if (method === "POST" && pathname === "/school/update-profile")
    return updateDb((db) => updateProfile(db, authorization, body));
  if (method === "GET" && pathname === "/school/settings")
    return readDb((db) => showSettings(db, authorization));
  if (method === "POST" && pathname === "/school/update-settings")
    return updateDb((db) => updateSettings(db, authorization, body));
  if (method === "GET" && pathname === "/school/subjects")
    return readDb((db) => listSubjects(db, authorization, searchParams));
  if (method === "POST" && pathname === "/school/store-subject")
    return updateDb((db) => storeSubject(db, authorization, body));
  if (method === "GET" && pathname === "/school/events")
    return readDb((db) => listEvents(db, authorization, searchParams));
  if (method === "POST" && pathname === "/school/store-event")
    return updateDb((db) => storeEvent(db, authorization, body));
  if (method === "GET" && pathname === "/school/notifications")
    return readDb((db) => listNotices(db, authorization, searchParams));
  if (method === "GET" && pathname === "/school/requests")
    return readDb((db) => listRequests(db, authorization, searchParams));

  const subjectId = idFrom(pathname.match(/^\/school\/delete-subject\/(\d+)$/));
  if (subjectId !== null && method === "DELETE")
    return updateDb((db) => deleteSubject(db, authorization, subjectId));

  const eventId = idFrom(pathname.match(/^\/school\/delete-event\/(\d+)$/));
  if (eventId !== null && method === "DELETE")
    return updateDb((db) => deleteEvent(db, authorization, eventId));

  const noticeId = idFrom(
    pathname.match(/^\/school\/read-notification\/(\d+)$/),
  );
  if (noticeId !== null && method === "POST")
    return updateDb((db) => readNotice(db, authorization, noticeId));

  const requestId = idFrom(pathname.match(/^\/school\/update-request\/(\d+)$/));
  if (requestId !== null && method === "POST")
    return updateDb((db) => updateRequest(db, authorization, requestId, body));

  const roleId = idFrom(pathname.match(/^\/school\/roles-show\/(\d+)$/));
  if (roleId !== null && method === "GET") return showRole(roleId);

  const employeeId = idFrom(pathname.match(/^\/school\/show-employee\/(\d+)$/));
  if (employeeId !== null && method === "GET") return showEmployee(employeeId);

  const curriculumId = idFrom(
    pathname.match(/^\/school\/show-curriculum\/(\d+)$/),
  );
  if (curriculumId !== null && method === "GET")
    return showCurriculum(curriculumId);

  const countryId = idFrom(pathname.match(/^\/show-country\/(\d+)$/));
  if (countryId !== null && method === "GET") return showCountry(countryId);

  const typeId = idFrom(
    pathname.match(/^\/school\/curriculum-categories\/(\d+)$/),
  );
  if (typeId !== null && method === "GET") return curriculumCategories(typeId);

  const categoryId = idFrom(
    pathname.match(/^\/school\/curriculum-sub-categories\/(\d+)$/),
  );
  if (categoryId !== null && method === "GET")
    return curriculumSubCategories(categoryId);

  const milestoneId = idFrom(
    pathname.match(/^\/school\/curriculum-milestones\/(\d+)$/),
  );
  if (milestoneId !== null && method === "GET")
    return curriculumMilestones(milestoneId);

  return fail(404, "Endpoint not defined");
}
