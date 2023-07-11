import { Input } from "antd";
import { Email, Lock } from "@material-ui/icons";
import FormItem from "../../UI/FormItem";
import StepsModalForm from "./StepsModalForm";

function Login() {
  return (
    <StepsModalForm
      isLoginForm={true}
      successMessage={"تم تسجيل الدخول بنجاح"}
      text={"تسجيل الدخول"}
    >
      <FormItem
        name={"email"}
        required
        placeholder={"البريد الإلكتروني"}
        input={<Input prefix={<Email />} />}
      />
      <FormItem
        name={"password"}
        required
        placeholder={"كلمة السر"}
        input={<Input.Password prefix={<Lock />} />}
      />
    </StepsModalForm>
  );
}

export default Login;
