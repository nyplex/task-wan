import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useUpdateProfileMutation } from "@/redux/slices/apiSlice/endpoints/profile/updateProfile";
import { selectSession } from "@/redux/slices/authSlice/authSelectors";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Box } from "@/gluestack-ui/box";
import Button from "@/components/buttons/Button";
import Avatar from "@/components/UI/Avatar";
import ProfileFormInputs from "./ProfileFormInputs";
import DOBCalendar from "./DOBCalendar";

export type FormValues = {
  name: string;
  profession: string;
  dob: string;
  email: string;
};

const defaultValues: FormValues = {
  name: "John Doe",
  profession: "Software Engineer",
  dob: "",
  email: "john.doe@example.com",
};

const EditProfileForm = () => {
  const session = useSelector(selectSession);
  const [updateProfile] = useUpdateProfileMutation();
  const [showCalendar, setShowCalendar] = useState(false);
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues,
  });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      console.log("Submitting profile data:", formData);
      const { data, error } = await updateProfile({
        id: session?.user.id!,
        name: "Alexandre",
        email: "test@gmail.com",
        location: "London, UK",
        profession: "Software Engineer",
        avatar: "https://example.com/avatar.jpg",
        dob: "07-07-1990",
      });
      console.log("Profile updated:", data);
      if (error) {
        console.error("Error updating profile:", error);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  });

  return (
    <Box className="flex-1">
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        bottomOffset={80}
        className="flex-1 mb-6 rounded-t-[50px]"
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Box className="px-4 pt-4">
          <Box className="items-center w-full mb-8">
            <Avatar editable fallbackName="N" />
          </Box>

          <ProfileFormInputs
            control={control}
            setShowCalendar={setShowCalendar}
          />

          {showCalendar && (
            <DOBCalendar
              setShowCalendar={setShowCalendar}
              getValues={getValues}
              setValue={setValue}
            />
          )}
          <Box className="mt-12">
            <Button
              title="Save Changes"
              onPress={onSubmit}
              isLoading={isSubmitting}
            />
          </Box>
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default EditProfileForm;
