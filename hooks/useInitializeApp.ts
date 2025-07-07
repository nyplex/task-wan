import { useAppDispatch } from "./redux";
import { useEffect } from "react";
import { initializeApp } from "@/redux/slices/appSlice/appThunks";
import { addError } from "@/redux/slices/errorsSlice/errorsSlice";

const useInitializeApp = () => {
  const disptach = useAppDispatch();

  useEffect(() => {
    const initialize = async () => {
      try {
        await disptach(initializeApp()).unwrap();
      } catch (error) {
        disptach(
          addError({
            message: "Failed to initialize app",
            source: "useInitializeApp",
            statusCode: "500",
            type: "unknown",
          })
        );
      }
    };
    initialize();
  }, []);
};

export default useInitializeApp;
