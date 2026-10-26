import AuthForm from "@/app/components/AuthForm/AuthForm";
import AuthBtnSubmit from "@/app/components/AuthBtnSubmit/AuthBtnSubmit";

export default function Step1Page() {
  return (
    <>
      <AuthForm type="register1" />
      <AuthBtnSubmit
        type="Sign in"
        typeBtn="button"
        isSubmitting={false}
        navigateTo="/auth/login"
      />
    </>
  );
}
