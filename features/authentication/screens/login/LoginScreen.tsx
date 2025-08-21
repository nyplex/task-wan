import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import { Box } from "@/gluestack-ui/box";
import { HStack } from "@/gluestack-ui/hstack";
import AppTitle from "@/components/UI/AppTitle";
import Text from "@/components/UI/Text";
import Divider from "@/components/layout/Divider";
import LoginFooter from "./components/LoginFooter";
import LoginForm from "./components/LoginForm";
import LoginThirdParty from "./components/LoginThirdParty";

const LoginScreen = () => {
  const { progress } = useReanimatedKeyboardAnimation();

  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [1, 0.01]);
    const height = interpolate(progress.value, [0, 1], [70, 5]);
    const opacity = interpolate(progress.value, [0, 1], [1, 1]);
    const marginBottom = interpolate(progress.value, [0, 1], [40, 0]);

    return {
      height,
      opacity,
      marginBottom,
      transform: [{ scale }],
    };
  });

  return (
    <Box
      className="flex-1 bg-background pt-safe-offset-4 px-4"
      testID="login-screen-root"
    >
      <Animated.View style={animatedStyles} className="overflow-hidden">
        <AppTitle />
      </Animated.View>

      <Box className="mt-12">
        <Text weight="semi-bold" className="text-center">
          Login to your account
        </Text>
      </Box>
      <LoginForm />
      <HStack className="items-center mt-8 px-8" testID="login-divider">
        <Divider title="Or login with" />
      </HStack>
      <LoginThirdParty />
      <LoginFooter />
    </Box>
  );
};

export default LoginScreen;
