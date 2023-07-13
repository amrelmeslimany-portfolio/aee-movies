import { Input } from "antd";
import FormItem from "../../UI/FormItem";
import { Email, Lock, Person } from "@material-ui/icons";
import StepsModalForm from "./StepsModalForm";

function CreateUser() {
  return (
    <StepsModalForm successMessage={"تم انشاء الحساب بنجاح"} text={"انشئ حساب"}>
      <FormItem
        name={"name"}
        required
        placeholder={"الاسم بالكامل"}
        input={<Input prefix={<Person />} />}
      />
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
      <FormItem
        name={"confirmPassword"}
        required
        placeholder={"أكد كلمة السر"}
        input={<Input.Password prefix={<Lock />} />}
      />
    </StepsModalForm>
  );
}

export default CreateUser;
