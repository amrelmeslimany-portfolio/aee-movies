import { useContext, useEffect, useState } from "react";
import { Form, Input, Upload, message } from "antd";
import FormItem, { FormSubmit } from "../UI/FormItem";
import { AddAPhoto } from "@material-ui/icons";
import { editProfileAPI } from "../../context/auth/auth-cruds";
import { AuthContext } from "../../context/auth/auth-context";
import "./EditProfile.less";

const initialStatus = {
  isLoading: false,
  error: null,
  success: false,
};

function EditProfile({ user }) {
  const { dispatch } = useContext(AuthContext);
  const [status, setStatus] = useState(initialStatus);
  const [profileImgList, setProfileImgList] = useState([]);
  const [form] = Form.useForm();

  const beforeUploadHandler = (file) => {
    setProfileImgList([file]);
    return false;
  };

  const submitHandler = (inputs) => {
    const formdata = new FormData();

    if (inputs["name"].trim().length === 0)
      return message.error("يجب ادخال الاسم ");

    for (const key in inputs) {
      if (Boolean(inputs[key])) {
        formdata.append(key, inputs[key]);
      }
    }

    profileImgList.length && formdata.append("profileimg", profileImgList[0]);

    editProfileAPI(formdata, setStatus, dispatch);
  };

  useEffect(() => {
    if (status.success) {
      form.resetFields();

      message.success({
        content: "تم تحديث البيانات بنجاح",
        key: "sc",
      });
    }

    return () => {
      message.destroy("sc");
    };
  }, [status.success, form]);

  useEffect(() => {
    status.error &&
      message.error({
        content: status.error,
        key: "er",
      });

    return () => {
      message.destroy("er");
    };
  }, [status.error]);

  return (
    <div className="profile-edit">
      <Form
        form={form}
        initialValues={{
          name: user.name,
          bio: user.bio,
          password: null,
        }}
        onFinish={submitHandler}
        labelCol={{
          span: 6,
          style: {
            textAlign: "start",
          },
        }}
        wrapperCol={{
          span: 18,
        }}
        layout="horizontal"
      >
        <Form.Item label="تغيير صورة البروفايل" valuePropName="fileList">
          <Upload
            className="upload-profileimg"
            showUploadList={{ showPreviewIcon: false }}
            beforeUpload={beforeUploadHandler}
            maxCount={1}
            listType="picture-card"
            onRemove={() => setProfileImgList([])}
          >
            {profileImgList.length === 0 ? (
              <div className="btn-wrap">
                <AddAPhoto />
                اختر صورة
              </div>
            ) : null}
          </Upload>
        </Form.Item>
        <FormItem
          name="name"
          placeholder="ادخل اسمك بالكامل"
          label=" تغيير اسمك بالكامل"
          input={<Input />}
        />
        <FormItem
          label="البريد الالكتروني"
          input={
            <Input
              className="readonly"
              value={user.email}
              readOnly
              onFocus={() => message.warning("لايمكنك تغيير الايميل")}
            />
          }
        />
        <FormItem
          name="bio"
          placeholder="ادخل البايو "
          label=" تغيير  البايو"
          input={<Input />}
        />

        <FormItem
          name="password"
          placeholder="تغيير كلمة المرور"
          label=" تغيير كلمة مرورك"
          input={<Input.Password />}
        />

        <FormSubmit
          text="تحديث"
          label="اضغط للتحديث"
          isLoading={status.isLoading}
        />
      </Form>
    </div>
  );
}

export default EditProfile;
