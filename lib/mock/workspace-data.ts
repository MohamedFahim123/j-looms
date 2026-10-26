import type {
  MockDb,
  MockEvent,
  MockNotice,
  MockRequestItem,
  MockSubject,
} from "./types";

const CLASS_NAMES = [
  "KG - Sunflowers",
  "Grade 1 - A",
  "Grade 1 - B",
  "Grade 2 - A",
  "Grade 2 - B",
  "Grade 3 - A",
  "Grade 4 - A",
  "Grade 5 - A",
];

const SUBJECTS: Array<[string, string]> = [
  ["Arabic", "ARB-01"],
  ["English", "ENG-01"],
  ["Mathematics", "MTH-01"],
  ["Science", "SCI-01"],
  ["Art", "ART-01"],
  ["Music", "MUS-01"],
  ["Physical Education", "PE-01"],
  ["Social Studies", "SOC-01"],
];

const EVENTS: Array<[string, string, string, string]> = [
  ["Sports Day", "2026-11-12", "Main field", "Upcoming"],
  ["Parent Meeting", "2026-11-18", "Hall B", "Upcoming"],
  ["Science Fair", "2026-12-02", "Lab wing", "Upcoming"],
  ["Reading Week", "2026-12-08", "Library", "Upcoming"],
  ["Art Show", "2026-10-20", "Gallery", "Done"],
  ["Field Trip", "2026-10-14", "City museum", "Done"],
  ["Winter Concert", "2026-12-16", "Auditorium", "Upcoming"],
];

const NOTICES: Array<[string, string, boolean]> = [
  ["Attendance reminder", "Mark today's attendance before noon.", false],
  ["Bus delay", "The north route is running 15 minutes late.", false],
  ["Report cards", "Term reports open for review on Friday.", false],
  ["Staff meeting", "Thursday at 2:00 in the staff room.", true],
  ["Library closure", "The library is closed this afternoon.", true],
  ["Photo day", "Class photos are scheduled for next Monday.", false],
  ["Fee notice", "Term fees are due at the end of the month.", false],
  ["Weather plan", "Outdoor activities move indoors if it rains.", true],
];

const REQUESTS: Array<[string, string, string, string]> = [
  ["Early pickup", "Heba Hassan", "Parent", "Pending"],
  ["Absence excuse", "Adam Hassan", "Parent", "Pending"],
  ["Class change", "Layla Adel", "Parent", "Approved"],
  ["Certificate copy", "Noah Nabil", "Parent", "Pending"],
  ["Bus route change", "Mona Samir", "Teacher", "Rejected"],
  ["Hall booking", "Sara Adel", "Teacher", "Approved"],
  ["Supply request", "Lina Farouk", "Teacher", "Pending"],
  ["Guest visit", "Youssef Nabil", "Teacher", "Pending"],
];

function nextId(items: Array<{ id: number }>): number {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

export function buildSubjects(schoolId: number): MockSubject[] {
  return SUBJECTS.map(([name, code], index) => ({
    id: index + 1,
    schoolId,
    name,
    code,
    className: CLASS_NAMES[index % CLASS_NAMES.length],
  }));
}

export function buildEvents(schoolId: number): MockEvent[] {
  return EVENTS.map(([title, date, place, status], index) => ({
    id: index + 1,
    schoolId,
    title,
    date,
    place,
    status,
  }));
}

export function buildNotices(schoolId: number): MockNotice[] {
  return NOTICES.map(([title, body, read], index) => ({
    id: index + 1,
    schoolId,
    title,
    body,
    read,
    createdAt: `2026-10-${String(18 + index).padStart(2, "0")}`,
  }));
}

export function buildRequests(schoolId: number): MockRequestItem[] {
  return REQUESTS.map(([title, requester, kind, status], index) => ({
    id: index + 1,
    schoolId,
    title,
    requester,
    kind,
    status,
  }));
}

export const SCHOOL_PROFILE = {
  phone: "+20 100 555 0142",
  address: "12 Nile Street, Cairo",
  timezone: "Africa/Cairo",
  language: "English",
  attendanceMode: "Daily",
};

export function ensureWorkspace(db: MockDb): boolean {
  let changed = false;
  const schoolId = db.schools[0]?.id ?? 1;

  for (const school of db.schools) {
    if (!school.phone) {
      school.phone = SCHOOL_PROFILE.phone;
      changed = true;
    }
    if (!school.address) {
      school.address = SCHOOL_PROFILE.address;
      changed = true;
    }
    if (!school.timezone) {
      school.timezone = SCHOOL_PROFILE.timezone;
      changed = true;
    }
    if (!school.language) {
      school.language = SCHOOL_PROFILE.language;
      changed = true;
    }
    if (!school.attendanceMode) {
      school.attendanceMode = SCHOOL_PROFILE.attendanceMode;
      changed = true;
    }
  }

  if (!Array.isArray(db.subjects)) {
    db.subjects = buildSubjects(schoolId);
    changed = true;
  }
  if (!Array.isArray(db.events)) {
    db.events = buildEvents(schoolId);
    changed = true;
  }
  if (!Array.isArray(db.notices)) {
    db.notices = buildNotices(schoolId);
    changed = true;
  }
  if (!Array.isArray(db.requests)) {
    db.requests = buildRequests(schoolId);
    changed = true;
  }
  if (typeof db.seq.subject !== "number") {
    db.seq.subject = nextId(db.subjects);
    changed = true;
  }
  if (typeof db.seq.event !== "number") {
    db.seq.event = nextId(db.events);
    changed = true;
  }
  if (typeof db.seq.notice !== "number") {
    db.seq.notice = nextId(db.notices);
    changed = true;
  }
  if (typeof db.seq.request !== "number") {
    db.seq.request = nextId(db.requests);
    changed = true;
  }

  return changed;
}
