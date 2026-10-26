export const MOCK_DB_VERSION = 2;
export const PAGE_SIZE = 6;
export const DEMO_EMAIL = "admin@joinlooms.com";
export const DEMO_PASSWORD = "password123";
export const DEMO_OTP = "123456";
export const MOCK_IMAGE = "/JLsiteicon.png";

export interface MockResult {
  status: number;
  body: unknown;
}

export interface MockRequest {
  method: string;
  pathname: string;
  searchParams: URLSearchParams;
  body: Record<string, unknown>;
  authorization: string | null;
}

export interface MockSchool {
  id: number;
  adminName: string;
  name: string;
  email: string;
  password: string;
  verified: boolean;
  phone: string;
  address: string;
  timezone: string;
  language: string;
  attendanceMode: string;
}

export interface MockSubject {
  id: number;
  schoolId: number;
  name: string;
  code: string;
  className: string;
}

export interface MockEvent {
  id: number;
  schoolId: number;
  title: string;
  date: string;
  place: string;
  status: string;
}

export interface MockNotice {
  id: number;
  schoolId: number;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface MockRequestItem {
  id: number;
  schoolId: number;
  title: string;
  requester: string;
  kind: string;
  status: string;
}

export interface MockTeacher {
  id: number;
  schoolId: number;
  name: string;
  email: string;
  phone: string;
  image: string;
  status: "Active" | "Deactive";
  gender: string;
  locale: string;
  password: string;
}

export interface MockParent {
  id: number;
  schoolId: number;
  name: string;
  code: string;
  email: string;
  phone: string;
  image: string;
}

export interface MockStudent {
  id: number;
  schoolId: number;
  name: string;
  code: string;
  email: string;
  phone: string;
  image: string;
  gender: string;
  birthDate: string;
  bloodType: string;
  classId: number | null;
  password: string;
}

export interface MockClass {
  id: number;
  schoolId: number;
  nameEn: string;
  nameAr: string;
}

export interface MockClassOption {
  id: number;
  schoolId: number;
  classId: number;
  type: "action" | "activity";
  catalogId: number;
  teacherIds: number[];
}

export interface StudentParentLink {
  schoolId: number;
  studentId: number;
  parentId: number;
  relation: string;
}

export interface MockSession {
  token: string;
  schoolId: number;
}

export interface MockOtp {
  email: string;
  code: string;
}

export interface MockSequences {
  school: number;
  teacher: number;
  student: number;
  parent: number;
  class: number;
  option: number;
  subject: number;
  event: number;
  notice: number;
  request: number;
}

export interface MockDb {
  version: number;
  schools: MockSchool[];
  teachers: MockTeacher[];
  students: MockStudent[];
  parents: MockParent[];
  classes: MockClass[];
  options: MockClassOption[];
  links: StudentParentLink[];
  sessions: MockSession[];
  otps: MockOtp[];
  subjects: MockSubject[];
  events: MockEvent[];
  notices: MockNotice[];
  requests: MockRequestItem[];
  seq: MockSequences;
}
