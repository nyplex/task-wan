import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { selectAuthStatus } from "@/features/authentication/authSlice/authSelectors";
import { isValidEmail } from "@/utils/isValidEmail";
import { VStack } from "@/gluestack-ui/vstack";
import Button from "@/components/buttons/Button";
import useAuth from "@/features/authentication/hooks/useAuth";
import FormInput from "@/components/form/FormInput";

type FormValues = {
  email: string;
};

const LoginForm = () => {
  const { login } = useAuth();
  const isLoading = useSelector(selectAuthStatus);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await login(data.email.trim().toLowerCase());
  });

  return (
    <VStack className="mt-8 gap-4">
      <FormInput<FormValues>
        keyboardType="email-address"
        control={control}
        autoCorrect={false}
        name="email"
        placeholder="Email"
        isDisabled={isLoading}
        autoCapitalize="none"
        secureTextEntry={false}
        icon="mail"
        rules={{
          required: { value: true, message: "Email is required" },
          validate: (value) => isValidEmail(value.trim()) || "Invalid email",
        }}
      />
      <Button
        title="Login"
        isLoading={isLoading || isSubmitting}
        onPress={onSubmit}
        disabled={isLoading || isSubmitting || !isValid}
      />
    </VStack>
  );
};

export default LoginForm;
