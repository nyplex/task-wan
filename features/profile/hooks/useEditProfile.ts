import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "@/redux/slices/apiSlice/endpoints/profile/getProfile";
import {
  UpdateProfilePayload,
  useUpdateProfileMutation,
} from "@/redux/slices/apiSlice/endpoints/profile/updateProfile";
import { selectSession } from "@/features/authentication/authSlice/authSelectors";
import { EditProfileFormValues } from "../screens/editProfile/components/EditProfileForm";

const useEditProfile = () => {
  const router = useRouter();
  const session = useSelector(selectSession);
  const skip = !session?.user?.id;
  const {
    data: profileData,
    isFetching: isProfileFetching,
    isError: profileError,
  } = useGetProfileQuery({ userID: session?.user?.id! }, { skip });

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
      // success UX
      // e.g. show toast/snackbar (implement your toast util) then navigate back
      // toast.success("Profile updated");
      router.back();
    } catch (err) {
      console.error("Update failed", err);
      // toast.error("Failed to update profile");
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
