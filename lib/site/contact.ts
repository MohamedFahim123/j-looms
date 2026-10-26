export interface ContactNote {
  name: string;
  school: string;
  email: string;
  note: string;
}

export const emptyContact: ContactNote = {
  name: "",
  school: "",
  email: "",
  note: "",
};

const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export function contactErrors(values: ContactNote) {
  const errors: Partial<Record<keyof ContactNote, string>> = {};
  if (!values.name.trim()) errors.name = "Add your name.";
  if (!values.school.trim()) errors.school = "Add the school name.";
  if (!emailPattern.test(values.email.trim())) {
    errors.email = "Use a full email, like office@school.com.";
  }
  if (values.note.trim().length < 12) {
    errors.note = "Write a short note so we know what you need.";
  }
  return errors;
}
