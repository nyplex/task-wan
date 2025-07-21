import { useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { selectAuthStatus } from "@/redux/slices/authSlice/authSelectors";
import { isValidEmail } from "@/utils/isValidEmail";
import { VStack } from "@/components/gluestack/vstack";
import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import useAuth from "@/hooks/useAuth";

const LoginForm = () => {
  const { login } = useAuth();
  const isLoading = useSelector(selectAuthStatus);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<{
    email: string;
  }>({
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
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: "Email is required",
          },
          validate: (value) => isValidEmail(value.trim()) || "Invalid email",
        }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <Input
            keyboardType="email-address"
            leftIcon="mail"
            value={value}
            autoCorrect={false}
            onChangeText={(text) => onChange(text.toLowerCase())}
            onBlur={onBlur}
            isInvalid={!!error}
            isDisabled={isLoading}
            placeholder="Email"
            invalidText={error?.message || " "}
          />
        )}
        name="email"
      />
      <Button
        title="Register"
        isLoading={isLoading || isSubmitting}
        onPress={onSubmit}
        disabled={isLoading || isSubmitting || !isValid}
      />
    </VStack>
  );
};

export default LoginForm;
