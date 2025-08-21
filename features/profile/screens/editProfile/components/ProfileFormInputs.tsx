import { Control, Controller } from "react-hook-form";
import { isValidEmail } from "@/utils/isValidEmail";
import { VStack } from "@/gluestack-ui/vstack";
import { FormValues } from "./EditProfileForm";
import FormInput from "@/components/form/FormInput";
import InputCalendar from "@/components/form/InputCalendar";

type Props = {
  control: Control<FormValues, any, FormValues>;
  setShowCalendar: (show: boolean) => void;
};

const ProfileFormInputs = ({ control, setShowCalendar }: Props) => {
  return (
    <VStack className="gap-6">
      <FormInput<FormValues>
        control={control}
        name="name"
        placeholder="Name"
        icon="user"
        rules={{ required: { value: true, message: "Name is required" } }}
      />
      <FormInput<FormValues>
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
      <FormInput<FormValues>
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
      />
    </VStack>
  );
};
export default ProfileFormInputs;
