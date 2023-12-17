import { Dispatch, SyntheticEvent, useReducer } from "react";

type InputActions =
  | { type: "INPUT_CHANGE"; value: string | number }
  | { type: "BLUR" };
type InputState = { value: string | number; isTouched: boolean };

const InputReducer = (state: InputState, action: InputActions) => {
  switch (action.type) {
    case "INPUT_CHANGE": {
      return { value: action.value, isTouched: state.isTouched };
    }
    case "BLUR": {
      return { value: state.value, isTouched: true };
    }
  }
};

export const useInput = (
  validateMethod: (value: string | number) => boolean
) => {
  const [state, dispatchAction]: [InputState, Dispatch<InputActions>] =
    useReducer(InputReducer, { value: "", isTouched: false });

  const isValidInput = validateMethod(state.value);
  const hasErrorInput = !isValidInput && state.isTouched;

  const onChangeHandler = (event: SyntheticEvent<HTMLInputElement>) => {
    dispatchAction({
      type: "INPUT_CHANGE",
      value: (event.target as HTMLInputElement).value,
    });
  };

  const onBlurHandler = (event: SyntheticEvent<HTMLInputElement>) => {
    dispatchAction({ type: "BLUR" });
  };

  return {
    hasErrorInput,
    onChangeHandler,
    onBlurHandler,
    isValidInput,
    valueInput: state.value,
  };
};
