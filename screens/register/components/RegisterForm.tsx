import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectAuthStatus } from "@/redux/slices/authSlice/authSelectors";
import { VStack } from "@/components/gluestack/vstack";
import { Box } from "@/components/gluestack/box";
import { isValidEmail } from "@/utils/isValidEmail";
import useAuth from "@/hooks/useAuth";
import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";

const RegisterForm = () => {
  const { signup } = useAuth();
  const isLoading = useSelector(selectAuthStatus);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{
    email: string;
    username: string;
  }>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      username: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await signup(data.email, data.username);
  });

  return (
    <VStack className="gap-2 mt-4">
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
            onChangeText={(text) => onChange(text)}
            onBlur={onBlur}
            isInvalid={!!error}
            isDisabled={isLoading}
            placeholder="Email"
            invalidText={error?.message || " "}
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: "Email is required",
          },
          maxLength: {
            value: 25,
            message: "Username must be 25 characters or less",
          },
          minLength: {
            value: 2,
            message: "Username must be at least 2 characters",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            keyboardType="default"
            leftIcon="user"
            value={value}
            autoCorrect={false}
            onChangeText={(text) => onChange(text.trim().replace(/\s+/g, "").toLowerCase())}
            onBlur={onBlur}
            isInvalid={!!errors.username}
            isDisabled={isLoading}
            placeholder="Username"
            invalidText={errors.username?.message || " "}
          />
        )}
        name="username"
      />
      <Box className="mt-8">
        <Button
          title="Register"
          isLoading={isLoading || isSubmitting}
          onPress={onSubmit}
          disabled={isLoading || isSubmitting}
        />
      </Box>
    </VStack>
  );
};

export default RegisterForm;
