export const siteNav = [
  { href: "/blogs", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/our-vision", label: "Vision" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
] as const;

export const marqueeWords = [
  "Teachers",
  "Classes",
  "Families",
  "Notices",
  "Requests",
  "One office login",
];

export const deskSteps = [
  {
    index: "001",
    title: "Register",
    text: "Who is in, and which room is already moving.",
  },
  {
    index: "002",
    title: "Classes",
    text: "Teachers, rooms, and the families tied to each child.",
  },
  {
    index: "003",
    title: "Notes",
    text: "Requests, notices, and the day's events.",
  },
  {
    index: "004",
    title: "Office",
    text: "One login for the person who opens the school.",
  },
];

export const beliefs = [
  {
    title: "One record",
    text: "Teachers, classes, children, and families stay on the same desk.",
  },
  {
    title: "The office decides",
    text: "The person who runs the day is the one who signs in.",
  },
  {
    title: "The day stays together",
    text: "Notices, requests, and events sit with the school, not in a spare notebook.",
  },
];

export function navIsCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/" || pathname === "/home";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export const sampleDay = [
  { room: "KG - Sunflowers", note: "Register open", now: true },
  { room: "Grade 1 - A", note: "In class" },
  { room: "Grade 2 - B", note: "Break" },
  { room: "Grade 5 - A", note: "Last period" },
];

export const deskParts = [
  {
    title: "The morning register",
    text: "Who is in, who is late, and which room is already moving.",
    image: "/site/lesson.jpg",
    alt: "Students seated in a classroom during a lesson",
  },
  {
    title: "The class list",
    text: "Teachers, rooms, and the families tied to each child.",
    image: "/site/teacher.jpg",
    alt: "A teacher working with young students at a table",
  },
  {
    title: "The note home",
    text: "A request, a notice, or the day's event, kept with the school.",
    image: "/site/notebooks.jpg",
    alt: "A stack of books on a table",
  },
];

export const included = [
  "Teachers, students, parents, and classes",
  "Subjects and the week's events",
  "Notices and family requests",
  "School profile and office settings",
  "One login for the school office",
];

export interface JournalPost {
  slug: string;
  title: string;
  date: string;
  standfirst: string;
  image: string;
  alt: string;
  paragraphs: string[];
}

export const posts: JournalPost[] = [
  {
    slug: "morning-register",
    title: "What belongs on the morning register",
    date: "12 March 2026",
    standfirst:
      "A register is not a spreadsheet of names. It is the first true thing the office knows about the day.",
    image: "/site/writing.jpg",
    alt: "A child writing on paper at a desk",
    paragraphs: [
      "The office used to learn the day in pieces. A teacher called about an absence. A parent waited at the gate. The class list lived in another book.",
      "On Join Looms the register sits with the room. KG - Sunflowers, Grade 1 - A, Grade 5 - A: each class is a line the office can open, not a file someone has to hunt.",
      "What belongs there is small. Who is expected. Who is already in. Which note came with them. The rest of the day hangs off that line.",
    ],
  },
  {
    slug: "one-office-login",
    title: "One login for the school office",
    date: "2 April 2026",
    standfirst:
      "The desk is for the person who runs the school day, not a different password for every list.",
    image: "/site/classroom.jpg",
    alt: "An empty classroom with desks facing the board",
    paragraphs: [
      "Teachers, families, classes, and notices are the same school. Splitting them across tools makes the morning slower.",
      "Join Looms keeps one office login. The person at the desk signs in and finds the lists already related: a child, their class, their parent, the request that came in yesterday.",
      "That is the whole promise. Not a second system. The same desk, opened again tomorrow.",
    ],
  },
  {
    slug: "notes-home",
    title: "Notes that stay with the school",
    date: "18 May 2026",
    standfirst:
      "A family request and a school notice should land in the same place the class list already lives.",
    image: "/site/yard.jpg",
    alt: "Students walking together outside a school",
    paragraphs: [
      "Some notes are urgent: an early pickup, a change of the person who collects a child. Some are ordinary: a school event, a reminder.",
      "Both kinds belong beside the people they concern. A request that lives in a chat thread is gone by Friday. A notice pinned only on a board never meets the register.",
      "Join Looms keeps requests, notices, and events with the school record, so the office is not rebuilding the day from memory.",
    ],
  },
];

export function postBySlug(slug: string) {
  return posts.find((post) => post.slug === slug) ?? null;
}
