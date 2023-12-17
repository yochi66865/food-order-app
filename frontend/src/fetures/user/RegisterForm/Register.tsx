import { useContext } from "react";
import { useInput } from "../../../hooks/useInput";
import { Input } from "../../../shared/Input/Input";
import { UserContext } from "../../../store/user/userContext";
import { AccountForm } from "../AccountForm/AccountForm";
import classes from "./Register.module.css";

const isVaildFname = (value: string) => {
  return value.trim() !== "";
};

const isVaildLname = (value: string) => {
  return value.trim() !== "";
};

const isVaildEmail = (value: string) => {
  return value.includes("@");
};

const isVaildPassword = (value: string) => {
  return value.length >= 6 && /[A-Z]/.test(value);
};

const isVaildTel = (value: string) => {
  return value.length === 10 && /^[0-9]+$/.test(value);
};

export const Register = ({ onClosePopup }: { onClosePopup: () => void }) => {
  const userctx = useContext(UserContext);

  const {
    hasErrorInput: hasErrorFnameInput,
    onChangeHandler: onChangeFnameHandler,
    onBlurHandler: onBlurFnameHandler,
    valueInput: valueFnameInput,
    isValidInput: isVaildFnameInput,
  } = useInput(isVaildFname);

  const {
    hasErrorInput: hasErrorLnameInput,
    onChangeHandler: onChangeLnameHandler,
    onBlurHandler: onBlurLnameHandler,
    valueInput: valueLnameInput,
    isValidInput: isVaildLnameInput,
  } = useInput(isVaildLname);

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

  const {
    hasErrorInput: hasErrorTelInput,
    onChangeHandler: onChangeTelHandler,
    onBlurHandler: onBlurTelHandler,
    isValidInput: isValidTelInput,
    valueInput: valueTelInput,
  } = useInput(isVaildTel);

  const {
    hasErrorInput: hasErrorCountryInput,
    onChangeHandler: onChangeCountryHandler,
    onBlurHandler: onBlurCountryHandler,
    valueInput: valueCountryInput,
  } = useInput(() => true);

  const {
    hasErrorInput: hasErrorCityInput,
    onChangeHandler: onChangeCityHandler,
    onBlurHandler: onBlurCityHandler,
    valueInput: valueCityInput,
  } = useInput(() => true);

  const {
    hasErrorInput: hasErrorStreetInput,
    onChangeHandler: onChangeStreetHandler,
    onBlurHandler: onBlurStreetHandler,
    valueInput: valueStreetInput,
  } = useInput(() => true);

  const {
    hasErrorInput: hasErrorNumHouseInput,
    onChangeHandler: onChangeNumHouseHandler,
    onBlurHandler: onBlurNumHouseHandler,
    valueInput: valueNumHouseInput,
  } = useInput(() => true);

  const {
    hasErrorInput: hasErrorRemarksInput,
    onChangeHandler: onChangeRemarksHandler,
    onBlurHandler: onBlurRemarksHandler,
    valueInput: valueRemarksInput,
  } = useInput(() => true);

  const isValidForm =
    isVaildFnameInput &&
    isVaildLnameInput &&
    isValidEmailInput &&
    isValidPasswordInput &&
    isValidTelInput;

  const onSave = () => {
    userctx.signUp({
      fname: valueFnameInput,
      lname: valueLnameInput,
      tel: valueTelInput,
      email: valueEmailInput,
      password: valuePasswordInput,
      address: {
        country: valueCountryInput,
        city: valueCityInput,
        street: valueStreetInput,
        numHouse: +valueNumHouseInput,
        remarks: valueRemarksInput,
      },
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
      <fieldset>
        <legend>personal details:</legend>
        <Input
          className={classes.input}
          inputData={{
            id: "fname",
            type: "text",
            label: "first name",
            value: valueFnameInput,
            onChange: onChangeFnameHandler,
            onBlur: onBlurFnameHandler,
            isRequierd: true,
            error: {
              isShowErrorMsg: hasErrorFnameInput,
              errorMsg: "first name is requierd",
            },
          }}
        ></Input>
        <Input
          className={classes.input}
          inputData={{
            id: "lname",
            type: "text",
            label: "last name",
            value: valueLnameInput,
            onChange: onChangeLnameHandler,
            onBlur: onBlurLnameHandler,
            isRequierd: true,
            error: {
              isShowErrorMsg: hasErrorLnameInput,
              errorMsg: "last name is requierd",
            },
          }}
        ></Input>
        <Input
          className={classes.input}
          inputData={{
            id: "tel",
            type: "tel",
            label: "tel",
            value: valueTelInput,
            onChange: onChangeTelHandler,
            onBlur: onBlurTelHandler,
            isRequierd: true,
            error: {
              isShowErrorMsg: hasErrorTelInput,
              errorMsg:
                "tel mast be contain 10 digits and contain only numbers",
            },
          }}
        ></Input>
        <Input
          className={classes.input}
          inputData={{
            id: "email",
            type: "email",
            label: "email",
            value: valueEmailInput,
            onChange: onChangeEmailHandler,
            onBlur: onBlurEmailHandler,
            isRequierd: true,
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
            isRequierd: true,
            error: {
              isShowErrorMsg: hasErrorPasswordInput,
              errorMsg:
                "password must be at least 6 charcters, and include uppercase",
            },
          }}
        ></Input>
      </fieldset>
      <fieldset>
        <legend>Address:</legend>
        <Input
          className={classes.input}
          inputData={{
            id: "country",
            type: "text",
            label: "country",
            value: valueCountryInput,
            onChange: onChangeCountryHandler,
            onBlur: onBlurCountryHandler,
            error: {
              isShowErrorMsg: hasErrorCountryInput,
              errorMsg: "",
            },
          }}
        ></Input>
        <Input
          className={classes.input}
          inputData={{
            id: "city",
            type: "text",
            label: "city",
            value: valueCityInput,
            onChange: onChangeCityHandler,
            onBlur: onBlurCityHandler,
            error: {
              isShowErrorMsg: hasErrorCityInput,
              errorMsg: "",
            },
          }}
        ></Input>
        <Input
          className={classes.input}
          inputData={{
            id: "street",
            type: "text",
            label: "street",
            value: valueStreetInput,
            onChange: onChangeStreetHandler,
            onBlur: onBlurStreetHandler,
            error: {
              isShowErrorMsg: hasErrorStreetInput,
              errorMsg: "",
            },
          }}
        ></Input>
        <Input
          className={classes.input}
          inputData={{
            id: "numHouse",
            type: "number",
            label: "num house",
            value: valueNumHouseInput,
            onChange: onChangeNumHouseHandler,
            onBlur: onBlurNumHouseHandler,
            error: {
              isShowErrorMsg: hasErrorNumHouseInput,
              errorMsg: "",
            },
          }}
        ></Input>
        <Input
          className={classes.input}
          inputData={{
            id: "remarks",
            type: "text",
            label: "remarks",
            value: valueRemarksInput,
            onChange: onChangeRemarksHandler,
            onBlur: onBlurRemarksHandler,
            error: {
              isShowErrorMsg: hasErrorRemarksInput,
              errorMsg: "",
            },
          }}
        ></Input>
      </fieldset>
    </AccountForm>
  );
};
