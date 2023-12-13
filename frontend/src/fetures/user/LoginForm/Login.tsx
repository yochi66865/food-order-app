import { useContext } from "react";
import { UserContext } from "../../../store/user/userContext";
import classes from "./Login.module.css";
import { AccountForm } from "../AccountForm/AccountForm";
import { Input } from "../../../shared/Input/Input";

export const Login = () => {
  const userctx = useContext(UserContext);
  const user = userctx.getCurrentUser();

  return (
    <AccountForm onClose={() => {}} onSave={() => {}}>
      <Input
        inputData={{
          id: "email",
          type: "email",
          label: "email",
          value: "",
        }}
      ></Input>
    </AccountForm>
  );
};
