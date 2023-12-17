import { useContext } from "react";
import { UserContext } from "../../../store/user/userContext";
import classes from "./Login.module.css";
import { AccountForm } from "../AccountForm/AccountForm";
import { Input } from "../../../shared/Input/Input";
import { useInput } from "../../../hooks/useInput";

const isVaildEmail = (value: string | number) => {
  return (value as string).includes("@");
};

const isVaildPassword = (value: string | number) => {
  return (value as string).length >= 6 && /[A-Z]/.test(value as string);
};

export const Login = ({ onClosePopup }: { onClosePopup: () => void }) => {
  const userctx = useContext(UserContext);
  const user = userctx.getCurrentUser();
  const {
    hasErrorInput: hasErrorEmailInput,
    onChangeHandler: onChangeEmailHandler,
    onBlurHandler: onBlurEmailHandler,
    isValidInput: isValidEmailInput,
    valueInput: valueEmailInput,
  } = useInput(isVaildEmail);

  const {
    hasErrorInput: hasErrorPasswordInput,
    onChangeHandler: onChangePasswordHandler,
    onBlurHandler: onBlurPasswordHandler,
    isValidInput: isValidPasswordInput,
    valueInput: valuePasswordInput,
  } = useInput(isVaildPassword);

  const isValidForm = isValidEmailInput && isValidPasswordInput;

  const onSave = () => {
    userctx.signIn({
      email: valueEmailInput as string,
      password: valuePasswordInput as string,
    });
    onCloseLoginPopup();
  };

  const onCloseLoginPopup = () => {
    onClosePopup();
  };

  return (
    <AccountForm
      onClose={onCloseLoginPopup}
      onSave={onSave}
      isValidForm={isValidForm}
    >
      <Input
        className={classes.input}
        inputData={{
          id: "email",
          type: "email",
          label: "email",
          value: valueEmailInput,
          onChange: onChangeEmailHandler,
          onBlur: onBlurEmailHandler,
          error: {
            isShowErrorMsg: hasErrorEmailInput,
            errorMsg: "email mast be a valid email",
          },
        }}
      ></Input>
      <Input
        className={classes.input}
        inputData={{
          id: "password",
          type: "password",
          label: "password",
          value: valuePasswordInput,
          onChange: onChangePasswordHandler,
          onBlur: onBlurPasswordHandler,
          error: {
            isShowErrorMsg: hasErrorPasswordInput,
            errorMsg:
              "password must be at least 6 charcters, and include uppercase",
          },
        }}
      ></Input>
    </AccountForm>
  );
};
