import Animated, {
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import { Box } from "@/components/gluestack/box";
import Text from "@/components/Text";

const BodyContent = () => {
  const { progress } = useReanimatedKeyboardAnimation();

  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [1, 0.01]);
    const height = interpolate(progress.value, [0, 1], [200, 10]);
    const opacity = interpolate(progress.value, [0, 1], [1, 0.5]);

    return {
      height,
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <Box>
      <Text className="text-center mt-12" size="body" weight="semi-bold">
        Verify Account
      </Text>

      <Animated.View
        style={[
          animatedStyles,
          { height: 200, width: 250, alignSelf: "center", marginTop: 40 },
        ]}
      >
        <Animated.Image
          source={require("@/assets/images/verifyEmail.png")}
          style={[{ width: 250, height: "100%" }, animatedStyles]}
        />
      </Animated.View>

      <Text className="text-center mt-8 mb-4" size="bodyS" weight="regular">
        Please enter the verification number we sent to your email
      </Text>
    </Box>
  );
};

export default BodyContent;
