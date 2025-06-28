import useToast from "./useToast";
import { useSelector } from "react-redux";
import { clearError, selectError } from "@/redux/slices/errorsSlice/errorsSlice";
import { useAppDispatch } from "./redux";
import { useEffect } from "react";

const useErrors = () => {
  const error = useSelector(selectError);
  console.log("Error from useErrors:", error);

  const disptach = useAppDispatch();
  const { handleToast } = useToast();

  useEffect(() => {
    if (error.message) {
      handleToast(error.statusCode || "unknown", error.message.data.message, () => {
        disptach(clearError());
      });
    }
  }, [error, handleToast, disptach]);
};

export default useErrors;
