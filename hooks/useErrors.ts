import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import useToast from "./useToast";
import { popError } from "@/redux/slices/errorsSlice/errorsSlice";
import { Alert } from "react-native";

const useErrors = () => {
  const { handleToast } = useToast();
  const error = useAppSelector((s) => s.errors.current);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!error) return;

    if (error.severity === "info") {
      handleToast("Info", error.message, () => {
        dispatch(popError());
      });
      return;
    }

    if (error.severity === "error") {
      handleToast("Error", error.message, () => {
        dispatch(popError());
      });
      return;
    }

    // critical -> use modal/alert
    Alert.alert("Error", error.message, [
      {
        text: "Close",
        onPress: () => dispatch(popError()),
      },
    ]);
  }, [error, dispatch, handleToast]);

  return null;
};

export default useErrors;
