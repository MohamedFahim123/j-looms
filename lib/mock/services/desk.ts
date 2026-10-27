import { fail, includesText, ok, sameText, text } from "../http";
import { MOCK_IMAGE, type MockResult } from "../types";

interface EmployeeRecord {
  id: number;
  name: string;
  email: string;
  phone: string;
  image: string;
  status: string;
  gender: string;
  role: string;
}

interface CurriculumRecord {
  id: number;
  name: string;
  class_name: string;
  activity: string;
  date_from: string;
  date_to: string;
}

const employees: EmployeeRecord[] = [
  {
    id: 1,
    name: "Nour Adel",
    email: "nour.adel@joinlooms.com",
    phone: "+20111000001",
    image: MOCK_IMAGE,
    status: "Active",
    gender: "female",
    role: "Registrar",
  },
  {
    id: 2,
    name: "Hassan Ali",
    email: "hassan.ali@joinlooms.com",
    phone: "+20111000002",
    image: MOCK_IMAGE,
    status: "Active",
    gender: "male",
    role: "Accountant",
  },
  {
    id: 3,
    name: "Mai Samir",
    email: "mai.samir@joinlooms.com",
    phone: "+20111000003",
    image: MOCK_IMAGE,
    status: "Deactive",
    gender: "female",
    role: "Supervisor",
  },
];

const roles = [
  { id: 1, name: "Registrar" },
  { id: 2, name: "Accountant" },
  { id: 3, name: "Supervisor" },
];

const permissions = [
  "View Teachers",
  "Create Teachers",
  "Delete Teachers",
  "View Students",
  "Create Students",
  "View Parents",
  "Assign Parents",
  "Un Assign Parents",
  "View Classes",
  "View Employees",
  "Delete Employees",
  "Delete Roles",
  "Delete Curriculums",
].map((name, index) => ({
  id: index + 1,
  name,
  enable: index % 4 !== 0,
}));

const curriculums: CurriculumRecord[] = [
  {
    id: 1,
    name: "Phonics Term 1",
    class_name: "KG 1",
    activity: "Reading Log",
    date_from: "2026-09-01",
    date_to: "2026-12-20",
  },
  {
    id: 2,
    name: "Numbers and Counting",
    class_name: "KG 2",
    activity: "Quiz",
    date_from: "2026-09-01",
    date_to: "2026-12-20",
  },
  {
    id: 3,
    name: "Art Studio",
    class_name: "Grade 1",
    activity: "Art",
    date_from: "2026-10-01",
    date_to: "2027-01-15",
  },
];

function listMeta(total: number) {
  return {
    totalPages: total === 0 ? 0 : 1,
    page: 1,
    per_page: 15,
    current_page: 1,
    last_page: 1,
    total,
  };
}

export function listRoles(): MockResult {
  return {
    status: 200,
    body: {
      data: { roles },
      meta: listMeta(roles.length),
    },
  };
}

export function showRole(id: number): MockResult {
  const role = roles.find((item) => item.id === id);
  if (!role) return fail(404, "Role not found.");
  return {
    status: 200,
    body: {
      data: {
        role,
        permissions,
      },
    },
  };
}

export function listPermissions(): MockResult {
  return {
    status: 200,
    body: {
      data: {
        permissions,
        meta: {
          current_page: 1,
          last_page: 1,
        },
      },
    },
  };
}

export function listEmployees(searchParams: URLSearchParams): MockResult {
  const name = searchParams.get("name");
  const status = searchParams.get("status");
  const items = employees.filter(
    (employee) =>
      includesText(`${employee.name} ${employee.email} ${employee.phone}`, name) &&
      (!status || sameText(employee.status, status)),
  );
  return {
    status: 200,
    body: {
      data: { employees: items },
      meta: listMeta(items.length),
    },
  };
}

export function showEmployee(id: number): MockResult {
  const employee = employees.find((item) => item.id === id);
  if (!employee) return fail(404, "Employee not found.");
  return { status: 200, body: { data: employee } };
}

export function listCurriculums(
  searchParams: URLSearchParams,
  body: Record<string, unknown>,
): MockResult {
  const name = text(body.name) || searchParams.get("name") || "";
  const className = text(body.class) || searchParams.get("class") || "";
  const activity = text(body.activity) || searchParams.get("activity") || "";
  const items = curriculums.filter(
    (item) =>
      includesText(item.name, name) &&
      includesText(item.class_name, className) &&
      includesText(item.activity, activity),
  );
  return {
    status: 200,
    body: {
      data: { curriculums: items },
      meta: listMeta(items.length),
    },
  };
}

export function showCurriculum(id: number): MockResult {
  const curriculum = curriculums.find((item) => item.id === id);
  if (!curriculum) return fail(404, "Curriculum not found.");
  return { status: 200, body: { data: { curriculum } } };
}

const CITIES: Record<number, { id: number; name: string }[]> = {
  1: [
    { id: 1, name: "Cairo" },
    { id: 2, name: "Alexandria" },
  ],
  2: [
    { id: 3, name: "Riyadh" },
    { id: 4, name: "Jeddah" },
  ],
  3: [
    { id: 5, name: "Dubai" },
    { id: 6, name: "Abu Dhabi" },
  ],
};

export function showCountry(id: number): MockResult {
  return {
    status: 200,
    body: { data: { cities: CITIES[id] || [] } },
  };
}

interface CurriculumType {
  id: number;
  name: string;
  categories: {
    id: number;
    name: string;
    subCategories: {
      id: number;
      name: string;
      milestones: { id: number; name: string }[];
    }[];
  }[];
}

const CURRICULUM_TREE: CurriculumType[] = [
  {
    id: 1,
    name: "Literacy",
    categories: [
      {
        id: 11,
        name: "Reading",
        subCategories: [
          {
            id: 111,
            name: "Phonics",
            milestones: [
              { id: 1111, name: "Letter sounds" },
              { id: 1112, name: "Blending" },
            ],
          },
          {
            id: 112,
            name: "Comprehension",
            milestones: [{ id: 1121, name: "Main idea" }],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Numeracy",
    categories: [
      {
        id: 21,
        name: "Number sense",
        subCategories: [
          {
            id: 211,
            name: "Counting",
            milestones: [
              { id: 2111, name: "Count to 20" },
              { id: 2112, name: "Number order" },
            ],
          },
        ],
      },
    ],
  },
];

export function curriculumTypes(): MockResult {
  return {
    status: 200,
    body: {
      data: {
        types: CURRICULUM_TREE.map((item) => ({ id: item.id, name: item.name })),
      },
    },
  };
}

export function curriculumCategories(typeId: number): MockResult {
  const type = CURRICULUM_TREE.find((item) => item.id === typeId);
  return {
    status: 200,
    body: {
      data: {
        categories: (type?.categories || []).map((item) => ({
          id: item.id,
          name: item.name,
        })),
      },
    },
  };
}

export function curriculumSubCategories(categoryId: number): MockResult {
  const category = CURRICULUM_TREE.flatMap((item) => item.categories).find(
    (item) => item.id === categoryId,
  );
  return {
    status: 200,
    body: {
      data: {
        sub_categories: (category?.subCategories || []).map((item) => ({
          id: item.id,
          name: item.name,
        })),
      },
    },
  };
}

export function curriculumMilestones(subCategoryId: number): MockResult {
  const subCategory = CURRICULUM_TREE.flatMap((item) => item.categories)
    .flatMap((item) => item.subCategories)
    .find((item) => item.id === subCategoryId);
  return {
    status: 200,
    body: { data: subCategory?.milestones || [] },
  };
}

export function storeEmployee(body: Record<string, unknown>): MockResult {
  const name = text(body.name);
  const email = text(body.email);
  if (!name) return fail(422, "Name is Required", { name: ["Name is Required"] });
  if (!email) return fail(422, "Email is Required", { email: ["Email is Required"] });
  const nextId = employees.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  employees.push({
    id: nextId,
    name,
    email,
    phone: text(body.phone),
    image: MOCK_IMAGE,
    status: "Active",
    gender: "female",
    role: roles.find((role) => role.id === Number(body.role_id))?.name || "Registrar",
  });
  return ok("Employee added successfully.");
}

export function storeRole(body: Record<string, unknown>): MockResult {
  const name = text(body.name);
  if (!name) return fail(422, "Name is Required", { name: ["Name is Required"] });
  const nextId = roles.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  roles.push({ id: nextId, name });
  return ok("Role added successfully.");
}

export function storeCurriculum(body: Record<string, unknown>): MockResult {
  const name = text(body.name_en) || text(body.name);
  if (!name) return fail(422, "Name is Required", { name_en: ["Name is required"] });
  const nextId = curriculums.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  curriculums.push({
    id: nextId,
    name,
    class_name: text(body.class_name) || "Class",
    activity: text(body.activity) || "Activity",
    date_from: text(body.date_from) || "2026-09-01",
    date_to: text(body.date_to) || "2026-12-20",
  });
  return ok("Curriculum added successfully.");
}

