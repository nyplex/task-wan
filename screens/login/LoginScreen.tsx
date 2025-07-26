import Animated, { useAnimatedStyle, interpolate } from "react-native-reanimated";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import { Box } from "@/components/gluestack/box";
import Text from "@/components/Text";
import AppTitle from "@/components/UI/AppTitle";
import LoginThirdParty from "./components/LoginThirdParty";
import LoginDivider from "./components/LoginDivider";
import LoginFooter from "./components/LoginFooter";
import LoginForm from "./components/LoginForm";

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
    <Box className="flex-1 bg-backrgound pt-safe-offset-4 px-4">
      <Animated.View
        style={animatedStyles}
        className="overflow-hidden">
        <AppTitle />
      </Animated.View>

      <Box className="mt-12">
        <Text
          weight="semi-bold"
          className="text-center">
          Login to your account
        </Text>
      </Box>
      <LoginForm />
      <LoginDivider />
      <LoginThirdParty />
      <LoginFooter />
    </Box>
  );
};

export default LoginScreen;
