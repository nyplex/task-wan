import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "@/redux/slices/apiSlice/endpoints/profile/getProfile";
import {
  UpdateProfilePayload,
  useUpdateProfileMutation,
} from "@/redux/slices/apiSlice/endpoints/profile/updateProfile";
import { addError } from "@/redux/slices/errorsSlice/errorsSlice";
import { selectSession } from "@/features/authentication/authSlice/authSelectors";
import { EditProfileFormValues } from "../screens/editProfile/components/EditProfileForm";
import { GlobalError } from "@/types/errors";
import { useAppDispatch } from "@/hooks/redux";
import useToast from "@/hooks/useToast";

const useEditProfile = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const session = useSelector(selectSession);
  const { handleToast } = useToast();
  const skip = !session?.user?.id;
  const {
    data: profileData,
    isFetching: isProfileFetching,
    isError: profileError,
  } = useGetProfileQuery(undefined, { skip });

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const form = useForm<EditProfileFormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      dob: profileData?.dob || "",
      email: profileData?.email || "",
      name: profileData?.name || "",
      profession: profileData?.profession || "",
    },
  });

  // Reset form when profile loads (handles async arrival)
  useEffect(() => {
    if (profileData) {
      form.reset({
        name: profileData.name ?? "",
        profession: profileData.profession ?? "",
        dob: profileData.dob ?? "",
        email: profileData.email ?? "",
      });
    }
  }, [profileData, form]);

  const onSubmit = form.handleSubmit(async (values) => {
    if (!session?.user?.id) return;

    const payload: UpdateProfilePayload = {
      id: session.user.id,
      name: values.name.trim(),
      profession: values.profession.trim(),
      dob: values.dob.trim(),
    };

    try {
      // use unwrap to throw on error
      await updateProfile(payload).unwrap();
      handleToast("Success", "Your profile has been updated.");
      router.back();
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          addError({
            message: "An unknown error occurred during login.",
            source: "useAuth/login",
            type: "auth",
          }),
        );
      } else {
        const typedError = error as GlobalError;
        dispatch(
          addError({
            message: typedError.message,
            source: typedError.source,
            type: typedError.type,
          }),
        );
      }
    }
  });

  return {
    form,
    onSubmit,
    isProfileFetching,
    profileError,
    isUpdating,
  };
};
export default useEditProfile;
