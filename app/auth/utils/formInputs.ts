import {
  CustomConfirmPasswordInput,
  CustomEmailInput,
  CustomFileCommercialInput,
  CustomFileOfficialInput,
  CustomNameAdminInput,
  CustomNameSchoolInput,
  CustomOtpInput,
  CustomPasswordInput,
  CustomSchoolEmailInput,
} from "@/app/auth/utils/customInputsValues";
import { authEndPoints } from "@/app/auth/utils/authEndPoints";
import type { Input } from "@/app/auth/utils/interfaces";

export type AuthType = keyof typeof authEndPoints;

export function inputsFor(type: AuthType): Input[] {
  switch (type) {
    case "login":
      return [CustomEmailInput, CustomPasswordInput];
    case "register1":
      return [CustomNameAdminInput, CustomNameSchoolInput, CustomSchoolEmailInput];
    case "register2":
      return [CustomPasswordInput, CustomConfirmPasswordInput];
    case "register3":
      return [CustomFileOfficialInput, CustomFileCommercialInput];
    case "forgetPassword":
      return [CustomEmailInput];
    case "resetPassword":
      return [
        CustomEmailInput,
        CustomOtpInput,
        { ...CustomPasswordInput, name: "new_password" },
        {
          ...CustomConfirmPasswordInput,
          name: "new_password_confirmation",
        },
      ];
    default:
      return [];
  }
}
