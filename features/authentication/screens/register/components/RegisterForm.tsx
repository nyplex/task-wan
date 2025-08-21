import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectAuthStatus } from "@/redux/slices/authSlice/authSelectors";
import { VStack } from "@/gluestack-ui/vstack";
import { Box } from "@/gluestack-ui/box";
import { isValidEmail } from "@/utils/isValidEmail";
import useAuth from "@/features/authentication/hooks/useAuth";
import Button from "@/components/buttons/Button";
import FormInput from "@/components/form/FormInput";

type FormValues = {
  email: string;
  username: string;
};

const RegisterForm = () => {
  const { signup } = useAuth();
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
      username: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await signup(
      data.email.trim().toLowerCase(),
      data.username.trim().toLowerCase(),
    );
  });

  return (
    <VStack className="gap-2 mt-4">
      <FormInput<FormValues>
        control={control}
        name="email"
        placeholder="Email"
        keyboardType="email-address"
        autoCorrect={false}
        autoCapitalize="none"
        icon="mail"
        rules={{
          required: {
            value: true,
            message: "Email is required",
          },
          validate: (value) => isValidEmail(value.trim()) || "Invalid email",
        }}
        isDisabled={isLoading}
      />
      <FormInput<FormValues>
        control={control}
        name="username"
        placeholder="Username"
        keyboardType="default"
        autoCorrect={false}
        autoCapitalize="none"
        icon="user"
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
        isDisabled={isLoading}
      />
      <Box className="mt-8">
        <Button
          title="Register"
          isLoading={isLoading || isSubmitting}
          onPress={onSubmit}
          disabled={isLoading || isSubmitting || !isValid}
        />
      </Box>
    </VStack>
  );
};

export default RegisterForm;
