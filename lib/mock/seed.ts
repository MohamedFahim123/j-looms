import { ACTIVITY_CATALOG, ACTION_CATALOG } from "./catalog";
import {
  DEMO_EMAIL,
  DEMO_PASSWORD,
  MOCK_DB_VERSION,
  MOCK_IMAGE,
  type MockDb,
} from "./types";
import {
  SCHOOL_PROFILE,
  buildEvents,
  buildNotices,
  buildRequests,
  buildSubjects,
} from "./workspace-data";

const TEACHER_NAMES = [
  "Sara Adel",
  "Omar Hassan",
  "Lina Farouk",
  "Youssef Nabil",
  "Mona Samir",
  "Karim Fathy",
  "Nadine Adel",
  "Hany Tarek",
  "Dina Magdy",
  "Tarek Soliman",
  "Rana Mostafa",
  "Bassem Ali",
];

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

const STUDENT_NAMES = [
  "Adam Hassan",
  "Layla Adel",
  "Noah Nabil",
  "Maya Farouk",
  "Ali Samir",
  "Sara Fathy",
  "Omar Magdy",
  "Lina Soliman",
  "Yara Mostafa",
  "Hassan Ali",
  "Nour Adel",
  "Farah Hassan",
  "Malak Nabil",
  "Yousef Farouk",
  "Jana Samir",
  "Kareem Fathy",
  "Salma Magdy",
  "Ziad Soliman",
];

const PARENT_NAMES = [
  "Heba Hassan",
  "Amr Adel",
  "Noha Nabil",
  "Waleed Farouk",
  "Rania Samir",
  "Sherif Fathy",
  "Ghada Magdy",
  "Mahmoud Soliman",
  "Inas Mostafa",
  "Khaled Ali",
];

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const RELATIONS = ["Father", "Mother", "Guardian"];

export function createSeed(): MockDb {
  const schoolId = 1;
  const teachers = TEACHER_NAMES.map((name, index) => {
    const id = index + 1;
    const slug = name.toLowerCase().replace(/\s+/g, ".");
    return {
      id,
      schoolId,
      name,
      email: `${slug}@joinlooms.com`,
      phone: `+2010${String(1000000 + id).slice(0, 8)}`,
      image: MOCK_IMAGE,
      status: id % 5 === 0 ? ("Deactive" as const) : ("Active" as const),
      gender: id % 2 === 0 ? "male" : "female",
      locale: "en",
      password: "teacher123",
    };
  });

  const classes = CLASS_NAMES.map((nameEn, index) => ({
    id: index + 1,
    schoolId,
    nameEn,
    nameAr: nameEn,
  }));

  const parents = PARENT_NAMES.map((name, index) => {
    const id = index + 1;
    const slug = name.toLowerCase().replace(/\s+/g, ".");
    return {
      id,
      schoolId,
      name,
      code: `PAR-${2000 + id}`,
      email: `${slug}@parents.joinlooms.com`,
      phone: `+2011${String(2000000 + id).slice(0, 8)}`,
      image: MOCK_IMAGE,
    };
  });

  const students = STUDENT_NAMES.map((name, index) => {
    const id = index + 1;
    const unassigned = id > 14;
    return {
      id,
      schoolId,
      name,
      code: `STU-${1000 + id}`,
      email: `student${id}@joinlooms.com`,
      phone: `+2012${String(3000000 + id).slice(0, 8)}`,
      image: MOCK_IMAGE,
      gender: id % 2 === 0 ? "male" : "female",
      birthDate: `201${4 + (id % 5)}-${String((id % 12) + 1).padStart(2, "0")}-15`,
      bloodType: BLOOD_TYPES[index % BLOOD_TYPES.length],
      classId: unassigned ? null : (index % classes.length) + 1,
      password: "student123",
    };
  });

  const links = students.flatMap((student) => {
    if (student.id % 5 === 0) {
      return [];
    }
    const parent = parents[(student.id - 1) % parents.length];
    const rows = [
      {
        schoolId,
        studentId: student.id,
        parentId: parent.id,
        relation: RELATIONS[student.id % RELATIONS.length],
      },
    ];
    if (student.id % 4 === 0) {
      const second = parents[student.id % parents.length];
      if (second.id !== parent.id) {
        rows.push({
          schoolId,
          studentId: student.id,
          parentId: second.id,
          relation: "Guardian",
        });
      }
    }
    return rows;
  });

  const activeTeacherIds = teachers
    .filter((teacher) => teacher.status === "Active")
    .map((teacher) => teacher.id);
  let optionId = 1;
  const options = classes.flatMap((schoolClass, index) => {
    const pairs: Array<{ type: "action" | "activity"; catalogId: number }> = [
      {
        type: "action",
        catalogId: ACTION_CATALOG[index % ACTION_CATALOG.length].id,
      },
      {
        type: "action",
        catalogId: ACTION_CATALOG[(index + 2) % ACTION_CATALOG.length].id,
      },
      {
        type: "activity",
        catalogId: ACTIVITY_CATALOG[index % ACTIVITY_CATALOG.length].id,
      },
      {
        type: "activity",
        catalogId: ACTIVITY_CATALOG[(index + 3) % ACTIVITY_CATALOG.length].id,
      },
    ];
    return pairs.map((pair, pairIndex) => {
      const teacherIds = [
        activeTeacherIds[(index + pairIndex) % activeTeacherIds.length],
        activeTeacherIds[(index + pairIndex + 3) % activeTeacherIds.length],
      ].filter((id, idIndex, list) => list.indexOf(id) === idIndex);
      const option = {
        id: optionId,
        schoolId,
        classId: schoolClass.id,
        type: pair.type,
        catalogId: pair.catalogId,
        teacherIds,
      };
      optionId += 1;
      return option;
    });
  });

  return {
    version: MOCK_DB_VERSION,
    schools: [
      {
        id: schoolId,
        adminName: "Moe",
        name: "Sample Inter. school",
        email: DEMO_EMAIL,
        password: DEMO_PASSWORD,
        verified: true,
        phone: SCHOOL_PROFILE.phone,
        address: SCHOOL_PROFILE.address,
        timezone: SCHOOL_PROFILE.timezone,
        language: SCHOOL_PROFILE.language,
        attendanceMode: SCHOOL_PROFILE.attendanceMode,
      },
    ],
    teachers,
    students,
    parents,
    classes,
    options,
    links,
    sessions: [],
    otps: [],
    subjects: buildSubjects(schoolId),
    events: buildEvents(schoolId),
    notices: buildNotices(schoolId),
    requests: buildRequests(schoolId),
    seq: {
      school: 2,
      teacher: teachers.length + 1,
      student: students.length + 1,
      parent: parents.length + 1,
      class: classes.length + 1,
      option: optionId,
      subject: 9,
      event: 8,
      notice: 9,
      request: 9,
    },
  };
}
