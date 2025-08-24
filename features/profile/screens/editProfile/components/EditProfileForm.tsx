import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Box } from "@/gluestack-ui/box";
import Button from "@/components/buttons/Button";
import DOBPicker from "./DOBPicker";
import EditProfileFields from "./EditProfileFields";
import EditProfileAvatar from "./EditProfileAvatar";
import useEditProfile from "@/features/profile/hooks/useEditProfile";

export type EditProfileFormValues = {
  name: string;
  profession: string;
  dob: string;
  email: string;
};

const EditProfileForm = () => {
  const { form, onSubmit, isUpdating } = useEditProfile();
  const [showCalendar, setShowCalendar] = useState(false);

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
          <EditProfileAvatar />
          <EditProfileFields
            control={form.control}
            setShowCalendar={setShowCalendar}
          />
          {showCalendar && (
            <DOBPicker
              setShowCalendar={setShowCalendar}
              getValues={form.getValues}
              setValue={form.setValue}
            />
          )}
          <Box className="mt-12">
            <Button
              title="Save Changes"
              onPress={onSubmit}
              isLoading={form.formState.isSubmitting || isUpdating}
              disabled={
                form.formState.isSubmitting ||
                !form.formState.isValid ||
                !form.formState.isDirty
              }
            />
          </Box>
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default EditProfileForm;
