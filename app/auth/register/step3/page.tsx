import { RegisterStepGate } from "@/app/auth/RegisterStepGate";
import AuthForm from "@/app/components/AuthForm/AuthForm";

export default function Step3Page() {
  return (
    <RegisterStepGate step="3" redirectTo="/auth/register/step2">
      <AuthForm type="register3" />
    </RegisterStepGate>
  );
}
