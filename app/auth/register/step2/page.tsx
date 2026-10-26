import { RegisterStepGate } from "@/app/auth/RegisterStepGate";
import AuthForm from "@/app/components/AuthForm/AuthForm";

export default function Step2Page() {
  return (
    <RegisterStepGate step="2" redirectTo="/auth/register/step1">
      <AuthForm type="register2" />
    </RegisterStepGate>
  );
}
