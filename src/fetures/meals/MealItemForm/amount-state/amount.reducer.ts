import { AmountActions } from "./amount.actions";

export type AmountState = { amount: number; isValid: boolean };

export const amountReducer: (
  state: AmountState,
  action: AmountActions
) => AmountState = (_, action: AmountActions) => {
  switch (action.type) {
    case "UPDATE_AMOUNT": {
      const isValid = action.amount > 0 && action.amount < 6;
      return {
        amount: action.amount,
        isValid,
      };
    }
  }
};
