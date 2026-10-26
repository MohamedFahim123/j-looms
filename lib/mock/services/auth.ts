import { randomBytes } from "crypto";
import { fail, ok, sameText, text } from "../http";
import type { MockDb, MockResult } from "../types";
import { DEMO_OTP } from "../types";
import { SCHOOL_PROFILE } from "../workspace-data";

function token() {
  return `mock_${randomBytes(16).toString("hex")}`;
}

export function login(db: MockDb, body: Record<string, unknown>): MockResult {
  const email = text(body.email).toLowerCase();
  const password = text(body.password);
  if (!email || !password) {
    return fail(422, "Email and password are required.", {
      email: ["Email and password are required."],
    });
  }
  const school = db.schools.find((item) => sameText(item.email, email));
  if (!school || school.password !== password) {
    return fail(422, "These credentials do not match our records.", {
      email: ["These credentials do not match our records."],
    });
  }
  if (!school.verified) {
    return fail(422, "Please complete registration.", {
      email: ["Please complete registration."],
    });
  }
  const sessionToken = token();
  db.sessions.push({ token: sessionToken, schoolId: school.id });
  return ok("Login Successfully!", {
    data: {
      token: sessionToken,
      school: {
        id: String(school.id),
        name: school.name,
      },
    },
  });
}

export function logout(db: MockDb, authorization: string | null): MockResult {
  const sessionToken = authorization?.replace(/^Bearer\s+/i, "").trim();
  if (sessionToken) {
    db.sessions = db.sessions.filter(
      (session) => session.token !== sessionToken,
    );
  }
  return {
    status: 200,
    body: {
      status: 200,
      message: "Logout Successfully!",
      data: { message: "Logout Successfully!" },
    },
  };
}

export function registerStepOne(
  db: MockDb,
  body: Record<string, unknown>,
): MockResult {
  const adminName = text(body.admin_name);
  const name = text(body.name);
  const email = text(body.email).toLowerCase();
  const errors: Record<string, string[]> = {};
  if (!adminName) errors.admin_name = ["Admin Name is Required"];
  if (!name) errors.name = ["School Name is Required"];
  if (!email) errors.email = ["School Email is Required"];
  if (email && db.schools.some((school) => sameText(school.email, email))) {
    errors.email = ["This email is already registered."];
  }
  if (Object.keys(errors).length > 0) {
    return fail(422, "Please check the registration details.", errors);
  }
  const id = db.seq.school;
  db.seq.school += 1;
  db.schools.push({
    id,
    adminName,
    name,
    email,
    password: "",
    verified: false,
    phone: SCHOOL_PROFILE.phone,
    address: "",
    timezone: SCHOOL_PROFILE.timezone,
    language: SCHOOL_PROFILE.language,
    attendanceMode: SCHOOL_PROFILE.attendanceMode,
  });
  return ok("Step one completed.", {
    data: { school: { id: String(id) } },
  });
}

export function registerStepTwo(
  db: MockDb,
  body: Record<string, unknown>,
): MockResult {
  const schoolId = Number(text(body.school_id));
  const password = text(body.password);
  const confirmation = text(body.password_confirmation);
  const school = db.schools.find((item) => item.id === schoolId);
  if (!school) {
    return fail(422, "School registration was not found.", {
      school_id: ["School registration was not found."],
    });
  }
  if (!password) {
    return fail(422, "Password is Required", {
      password: ["Password is Required"],
    });
  }
  if (password !== confirmation) {
    return fail(422, "Passwords do not match", {
      password_confirmation: ["Passwords do not match"],
    });
  }
  school.password = password;
  return ok("Step two completed.", {
    data: { school: { id: String(school.id) } },
  });
}

export function registerStepThree(
  db: MockDb,
  body: Record<string, unknown>,
): MockResult {
  const schoolId = Number(text(body.school_id));
  const school = db.schools.find((item) => item.id === schoolId);
  if (!school || !school.password) {
    return fail(422, "Finish the earlier registration steps first.", {
      school_id: ["Finish the earlier registration steps first."],
    });
  }
  school.verified = true;
  return ok("Registration completed. You can log in.", {
    data: { school: { id: String(school.id) } },
  });
}

export function forgetPassword(
  db: MockDb,
  body: Record<string, unknown>,
): MockResult {
  const email = text(body.email).toLowerCase();
  const school = db.schools.find((item) => sameText(item.email, email));
  if (!school) {
    return fail(422, "We could not find a school with that email.", {
      email: ["We could not find a school with that email."],
    });
  }
  db.otps = db.otps.filter((otp) => !sameText(otp.email, email));
  db.otps.push({ email, code: DEMO_OTP });
  return ok("Reset code sent. Use OTP 123456.");
}

export function resetPassword(
  db: MockDb,
  body: Record<string, unknown>,
): MockResult {
  const email = text(body.email).toLowerCase();
  const otp = text(body.otp);
  const password = text(body.new_password);
  const confirmation = text(body.new_password_confirmation);
  const school = db.schools.find((item) => sameText(item.email, email));
  const saved = db.otps.find((item) => sameText(item.email, email));
  if (!school || !saved || saved.code !== otp) {
    return fail(422, "The reset code is not valid.", {
      otp: ["The reset code is not valid."],
    });
  }
  if (!password || password !== confirmation) {
    return fail(422, "Passwords do not match", {
      new_password_confirmation: ["Passwords do not match"],
    });
  }
  school.password = password;
  db.otps = db.otps.filter((item) => !sameText(item.email, email));
  return ok("Password updated. You can log in.");
}

export function previousStep(): MockResult {
  return ok("Returned to the previous step.");
}
