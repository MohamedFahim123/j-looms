import { baseUrl } from "@/app/utils/baseUrl";

interface authEndPointsInterface {
  login: string;
  logout: string;
  register1: string;
  prevStep: string;
  register2: string;
  register3: string;
  resetPassword: string;
  forgetPassword: string;
<<<<<<< HEAD
  employee_logout: string;
  employee_login: string;
  employee_resetPassword: string;
  employee_forgetPassword: string;
=======
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
}

export const authEndPoints: authEndPointsInterface = {
  login: `${baseUrl}/school/login`,
  logout: `${baseUrl}/school/logout`,
<<<<<<< HEAD
  employee_login: `${baseUrl}/school/employee-login`,
  employee_logout: `${baseUrl}/school/employee-logout`,
=======
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
  prevStep: `${baseUrl}/school/pervious-step`,
  register1: `${baseUrl}/school/register-step-one`,
  register2: `${baseUrl}/school/register-step-two`,
  register3: `${baseUrl}/school/register-step-three`,
  resetPassword: `${baseUrl}/school/reset-password`,
<<<<<<< HEAD
  employee_resetPassword: `${baseUrl}/school/employee-reset-password`,
  forgetPassword: `${baseUrl}/school/forget-password`,
  employee_forgetPassword: `${baseUrl}/school/employee-forget-password`,
=======
  forgetPassword: `${baseUrl}/school/forget-password`,
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
};
