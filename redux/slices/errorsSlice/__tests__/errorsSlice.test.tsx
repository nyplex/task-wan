import errorsReducer, {
  pushError,
  clearErrors,
  popError,
} from "../errorsSlice";

describe("errorsSlice reducer", () => {
  const initialState = { queue: [], current: undefined };

  it("should return the initial state", () => {
    expect(errorsReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("should handle pushError", () => {
    const error: {
      id: string;
      message: string;
      severity: "info" | "error" | "critical";
      code: string;
    } = {
      id: "1",
      message: "Network error",
      severity: "error",
      code: "500",
    };
    const nextState = errorsReducer(initialState, pushError(error));
    expect(nextState.queue).toEqual([error]);
    expect(nextState.current).toEqual(error);
  });

  it("should handle pushError multiple times and popError", () => {
    const error1: {
      id: string;
      message: string;
      severity: "info" | "error" | "critical";
    } = { id: "1", message: "Network error", severity: "error" };
    const error2: {
      id: string;
      message: string;
      severity: "info" | "error" | "critical";
    } = { id: "2", message: "Auth error", severity: "critical" };
    let state = errorsReducer(initialState, pushError(error1));
    state = errorsReducer(state, pushError(error2));
    expect(state.queue).toEqual([error1, error2]);
    expect(state.current).toEqual(error2);
    state = errorsReducer(state, popError());
    expect(state.queue).toEqual([error2]);
    expect(state.current).toEqual(error2);
  });

  it("should handle clearErrors", () => {
    const error: {
      id: string;
      message: string;
      severity: "info" | "error" | "critical";
    } = { id: "1", message: "Form error", severity: "info" };
    const prevState = { queue: [error], current: error };
    const nextState = errorsReducer(prevState, clearErrors());
    expect(nextState.queue).toEqual([]);
    expect(nextState.current).toBeUndefined();
  });
});
