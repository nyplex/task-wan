import errorsReducer, { addError, clearErrors, ErrorsStateType } from "../errorsSlice";
import { GlobalError } from "@/types/errors";

describe("errorsSlice reducer", () => {
  const initialState: ErrorsStateType = {
    errors: [],
  };

  it("should return the initial state", () => {
    expect(errorsReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("should handle addError", () => {
    const error: GlobalError = { message: "Network error", type: "network", source: "api" };
    const nextState = errorsReducer(initialState, addError(error));
    expect(nextState.errors).toEqual([error]);
  });

  it("should handle addError multiple times", () => {
    const error1: GlobalError = { message: "Network error", type: "network" };
    const error2: GlobalError = { message: "Auth error", type: "auth" };
    let state = errorsReducer(initialState, addError(error1));
    state = errorsReducer(state, addError(error2));
    expect(state.errors).toEqual([error1, error2]);
  });

  it("should handle clearErrors", () => {
    const error: GlobalError = { message: "Form error", type: "form" };
    const prevState: ErrorsStateType = {
      errors: [error],
    };
    const nextState = errorsReducer(prevState, clearErrors());
    expect(nextState.errors).toEqual([]);
  });
});
