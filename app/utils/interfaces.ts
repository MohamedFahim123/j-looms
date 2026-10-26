import { ReactNode } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormAuthInputs } from "../auth/utils/interfaces";
import { Table } from "../dashboard/utils/interfaces";

export interface CustomeInputProps {
<<<<<<< HEAD
    name: keyof FormAuthInputs;
    placeHolder: string;
    register: UseFormRegister<FormAuthInputs>;
    type: string;
    lable: string;
    id: string;
    validation?: object;
    error?: FieldErrors<FormAuthInputs>;
    fileUploaded?: boolean;
};
=======
  name: keyof FormAuthInputs;
  placeHolder: string;
  register: UseFormRegister<FieldValues>;
  type: string;
  lable: string;
  id: string;
  validation?: object;
  error?: FieldErrors<FormAuthInputs>;
  fileUploaded?: boolean;
}
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)

export interface LayoutInterface {
  children: ReactNode;
}

export interface TableRowProps {
  cell: Table;
  currStudentId?: string;
}
