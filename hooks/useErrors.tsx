import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./redux";
import { clearErrors, selectErrors } from "@/redux/slices/errorsSlice/errorsSlice";
import useToast from "./useToast";

const useErrors = () => {
  const errors = useSelector(selectErrors);

  const disptach = useAppDispatch();
  const { handleToast } = useToast();

  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach((error) => {
        handleToast("Oops! An error occurred", "" + error.message, () => {
          disptach(clearErrors());
        });
      });
    }
  }, [errors]);
};

export default useErrors;
