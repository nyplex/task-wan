import { useEffect } from "react";
import { useAppDispatch } from "./redux";
import { initializeApp } from "@/redux/slices/appSlice/appThunks";
import { addError } from "@/redux/slices/errorsSlice/errorsSlice";

const useInitializeApp = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initialize = async () => {
      try {
        await dispatch(initializeApp()).unwrap();
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
