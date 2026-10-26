import { fail, includesText, ok, sameText, text } from "../http";
import { paginate } from "../present";
import type { MockDb, MockResult, MockSchool } from "../types";
import { schoolIdFrom } from "./school";

const TIMEZONES = [
  "Africa/Cairo",
  "Asia/Dubai",
  "Europe/London",
  "America/New_York",
];
const LANGUAGES = ["English", "Arabic"];
const ATTENDANCE = ["Daily", "By session"];
const EVENT_STATUS = ["Upcoming", "Done"];
const REQUEST_STATUS = ["Pending", "Approved", "Rejected"];

function schoolOf(
  db: MockDb,
  authorization: string | null,
): MockSchool | MockResult {
  const schoolId = schoolIdFrom(db, authorization);
  if (typeof schoolId !== "number") return schoolId;
  const school = db.schools.find((item) => item.id === schoolId);
  if (!school) return fail(404, "School not found.");
  return school;
}

function profileView(school: MockSchool) {
  return {
    id: school.id,
    admin_name: school.adminName,
    school_name: school.name,
    email: school.email,
    phone: school.phone,
    address: school.address,
    verified: school.verified,
    timezone: school.timezone,
    language: school.language,
    attendance_mode: school.attendanceMode,
  };
}

export function showProfile(
  db: MockDb,
  authorization: string | null,
): MockResult {
  const school = schoolOf(db, authorization);
  if (!("email" in school)) return school;
  return ok("Profile loaded", { data: { profile: profileView(school) } });
}

export function updateProfile(
  db: MockDb,
  authorization: string | null,
  body: Record<string, unknown>,
): MockResult {
  const school = schoolOf(db, authorization);
  if (!("email" in school)) return school;
  const adminName = text(body.admin_name);
  const name = text(body.name);
  const email = text(body.email);
  const phone = text(body.phone);
  const address = text(body.address);
  const errors: Record<string, string[]> = {};
  if (!adminName) errors.admin_name = ["Admin name is required."];
  if (!name) errors.name = ["School name is required."];
  if (!email || !email.includes("@")) errors.email = ["Enter a valid email."];
  if (!phone) errors.phone = ["Phone is required."];
  if (!address) errors.address = ["Address is required."];
  if (Object.keys(errors).length)
    return fail(422, "Check the highlighted fields.", errors);
  const taken = db.schools.some(
    (item) =>
      item.id !== school.id && item.email.toLowerCase() === email.toLowerCase(),
  );
  if (taken)
    return fail(422, "Email is already in use.", {
      email: ["Email is already in use."],
    });
  school.adminName = adminName;
  school.name = name;
  school.email = email;
  school.phone = phone;
  school.address = address;
  return ok("Profile updated", { data: { profile: profileView(school) } });
}

export function showSettings(
  db: MockDb,
  authorization: string | null,
): MockResult {
  return showProfile(db, authorization);
}

export function updateSettings(
  db: MockDb,
  authorization: string | null,
  body: Record<string, unknown>,
): MockResult {
  const school = schoolOf(db, authorization);
  if (!("email" in school)) return school;
  const timezone = text(body.timezone);
  const language = text(body.language);
  const attendanceMode = text(body.attendance_mode);
  const errors: Record<string, string[]> = {};
  if (!TIMEZONES.includes(timezone)) errors.timezone = ["Choose a timezone."];
  if (!LANGUAGES.includes(language)) errors.language = ["Choose a language."];
  if (!ATTENDANCE.includes(attendanceMode))
    errors.attendance_mode = ["Choose an attendance mode."];
  if (Object.keys(errors).length)
    return fail(422, "Check the highlighted fields.", errors);
  school.timezone = timezone;
  school.language = language;
  school.attendanceMode = attendanceMode;
  return ok("Settings updated", { data: { profile: profileView(school) } });
}

export function listSubjects(
  db: MockDb,
  authorization: string | null,
  searchParams: URLSearchParams,
): MockResult {
  const school = schoolOf(db, authorization);
  if (!("email" in school)) return school;
  const name = searchParams.get("name");
  const rows = db.subjects.filter(
    (item) =>
      item.schoolId === school.id &&
      (includesText(item.name, name) || includesText(item.code, name)),
  );
  const page = paginate(rows, searchParams);
  return ok("Subjects loaded", {
    data: {
      subjects: page.items.map((item) => ({
        id: item.id,
        name: item.name,
        code: item.code,
        class_name: item.className,
      })),
    },
    meta: { totalPages: page.totalPages, page: page.page, total: page.total },
  });
}

export function storeSubject(
  db: MockDb,
  authorization: string | null,
  body: Record<string, unknown>,
): MockResult {
  const school = schoolOf(db, authorization);
  if (!("email" in school)) return school;
  const name = text(body.name);
  const code = text(body.code);
  const errors: Record<string, string[]> = {};
  if (!name) errors.name = ["Name is required."];
  if (!code) errors.code = ["Code is required."];
  if (Object.keys(errors).length)
    return fail(422, "Check the highlighted fields.", errors);
  const duplicate = db.subjects.some(
    (item) =>
      item.schoolId === school.id &&
      item.code.toLowerCase() === code.toLowerCase(),
  );
  if (duplicate)
    return fail(422, "That code is already used.", {
      code: ["That code is already used."],
    });
  const subject = {
    id: db.seq.subject,
    schoolId: school.id,
    name,
    code,
    className: text(body.class_name) || "Unassigned",
  };
  db.seq.subject += 1;
  db.subjects.push(subject);
  return ok("Subject added", { data: { subject } });
}

export function deleteSubject(
  db: MockDb,
  authorization: string | null,
  id: number,
): MockResult {
  const school = schoolOf(db, authorization);
  if (!("email" in school)) return school;
  const index = db.subjects.findIndex(
    (item) => item.id === id && item.schoolId === school.id,
  );
  if (index < 0) return fail(404, "Subject not found.");
  db.subjects.splice(index, 1);
  return ok("Subject removed");
}

export function listEvents(
  db: MockDb,
  authorization: string | null,
  searchParams: URLSearchParams,
): MockResult {
  const school = schoolOf(db, authorization);
  if (!("email" in school)) return school;
  const name = searchParams.get("name");
  const status = searchParams.get("status");
  const rows = db.events.filter((item) => {
    if (item.schoolId !== school.id) return false;
    if (status && !sameText(item.status, status)) return false;
    return includesText(item.title, name) || includesText(item.place, name);
  });
  const page = paginate(rows, searchParams);
  return ok("Events loaded", {
    data: { events: page.items },
    meta: { totalPages: page.totalPages, page: page.page, total: page.total },
  });
}

export function storeEvent(
  db: MockDb,
  authorization: string | null,
  body: Record<string, unknown>,
): MockResult {
  const school = schoolOf(db, authorization);
  if (!("email" in school)) return school;
  const title = text(body.title);
  const date = text(body.date);
  const place = text(body.place);
  const status = text(body.status) || "Upcoming";
  const errors: Record<string, string[]> = {};
  if (!title) errors.title = ["Title is required."];
  if (!date) errors.date = ["Date is required."];
  if (!place) errors.place = ["Place is required."];
  if (!EVENT_STATUS.includes(status)) errors.status = ["Choose a status."];
  if (Object.keys(errors).length)
    return fail(422, "Check the highlighted fields.", errors);
  const event = {
    id: db.seq.event,
    schoolId: school.id,
    title,
    date,
    place,
    status,
  };
  db.seq.event += 1;
  db.events.push(event);
  return ok("Event added", { data: { event } });
}

export function deleteEvent(
  db: MockDb,
  authorization: string | null,
  id: number,
): MockResult {
  const school = schoolOf(db, authorization);
  if (!("email" in school)) return school;
  const index = db.events.findIndex(
    (item) => item.id === id && item.schoolId === school.id,
  );
  if (index < 0) return fail(404, "Event not found.");
  db.events.splice(index, 1);
  return ok("Event removed");
}

export function listNotices(
  db: MockDb,
  authorization: string | null,
  searchParams: URLSearchParams,
): MockResult {
  const school = schoolOf(db, authorization);
  if (!("email" in school)) return school;
  const name = searchParams.get("name");
  const rows = db.notices.filter(
    (item) =>
      item.schoolId === school.id &&
      (includesText(item.title, name) || includesText(item.body, name)),
  );
  const page = paginate(rows, searchParams);
  return ok("Notifications loaded", {
    data: { notifications: page.items },
    meta: { totalPages: page.totalPages, page: page.page, total: page.total },
  });
}

export function readNotice(
  db: MockDb,
  authorization: string | null,
  id: number,
): MockResult {
  const school = schoolOf(db, authorization);
  if (!("email" in school)) return school;
  const notice = db.notices.find(
    (item) => item.id === id && item.schoolId === school.id,
  );
  if (!notice) return fail(404, "Notification not found.");
  notice.read = true;
  return ok("Notification marked read", { data: { notification: notice } });
}

export function listRequests(
  db: MockDb,
  authorization: string | null,
  searchParams: URLSearchParams,
): MockResult {
  const school = schoolOf(db, authorization);
  if (!("email" in school)) return school;
  const name = searchParams.get("name");
  const status = searchParams.get("status");
  const rows = db.requests.filter((item) => {
    if (item.schoolId !== school.id) return false;
    if (status && !sameText(item.status, status)) return false;
    return includesText(item.title, name) || includesText(item.requester, name);
  });
  const page = paginate(rows, searchParams);
  return ok("Requests loaded", {
    data: { requests: page.items },
    meta: { totalPages: page.totalPages, page: page.page, total: page.total },
  });
}

export function updateRequest(
  db: MockDb,
  authorization: string | null,
  id: number,
  body: Record<string, unknown>,
): MockResult {
  const school = schoolOf(db, authorization);
  if (!("email" in school)) return school;
  const request = db.requests.find(
    (item) => item.id === id && item.schoolId === school.id,
  );
  if (!request) return fail(404, "Request not found.");
  const status = text(body.status);
  if (!REQUEST_STATUS.includes(status))
    return fail(422, "Choose a valid status.");
  request.status = status;
  return ok("Request updated", { data: { request } });
}
