import { memo } from "react";
import { Control, Controller } from "react-hook-form";
import { isValidEmail } from "@/utils/isValidEmail";
import { VStack } from "@/gluestack-ui/vstack";
import { EditProfileFormValues } from "./EditProfileForm";
import InputCalendar from "./InputCalendar";
import FormInput from "@/components/form/FormInput";

type Props = {
  control: Control<EditProfileFormValues, any, EditProfileFormValues>;
  setShowCalendar: (show: boolean) => void;
};

const EditProfileFields = ({ control, setShowCalendar }: Props) => {
  return (
    <VStack className="gap-6">
      <FormInput<EditProfileFormValues>
        control={control}
        name="name"
        placeholder="Name"
        icon="user"
        rules={{
          required: { value: true, message: "Name is required" },
          maxLength: {
            value: 25,
            message: "Username must be 25 characters or less",
          },
          minLength: {
            value: 2,
            message: "Username must be at least 2 characters",
          },
        }}
      />
      <FormInput<EditProfileFormValues>
        control={control}
        name="profession"
        placeholder="Profession"
        icon="briefcase"
      />
      <Controller
        control={control}
        name="dob"
        render={({ field: { value } }) => (
          <InputCalendar
            isInvalid={false}
            isDisabled={false}
            value={value}
            placeholder="Date of Birth"
            invalidText=" "
            onPress={() => setShowCalendar(true)}
          />
        )}
      />
      <FormInput<EditProfileFormValues>
        control={control}
        name="email"
        placeholder="Email"
        icon="mail"
        keyboardType="email-address"
        rules={{
          required: { value: true, message: "Email is required" },
          validate: (val) =>
            isValidEmail(val.trim()) || "Invalid email address",
        }}
        isDisabled
      />
    </VStack>
  );
};
export default memo(EditProfileFields);
