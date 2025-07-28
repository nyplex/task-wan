import { useEffect } from "react";
import { useAppDispatch } from "./redux";
import { initializeAppThunk } from "@/redux/slices/appSlice/thunks/initializeAppThunk";
import { addError } from "@/redux/slices/errorsSlice/errorsSlice";

const useInitializeApp = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initialize = async () => {
      try {
        await dispatch(initializeAppThunk()).unwrap();
      } catch (error) {
        dispatch(
          addError({
            message: "Failed to initialize app",
            source: "useInitializeApp",
            type: "unknown",
          })
        );
      }
    };
    initialize();
  }, []);
};

export default useInitializeApp;
