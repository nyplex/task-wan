import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectAuthStatus } from "@/redux/slices/authSlice/authSelectors";
import Animated, {
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import { Box } from "@/components/gluestack/box";
import AppTitle from "@/components/UI/AppTitle";
import BackButtonIcon from "@/components/buttons/BackButtonIcon";

const Header = () => {
  const router = useRouter();
  const isLoading = useSelector(selectAuthStatus);

  const { progress } = useReanimatedKeyboardAnimation();

  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [1, 0.01]);
    const height = interpolate(progress.value, [0, 1], [70, 5]);
    const opacity = interpolate(progress.value, [0, 1], [1, 0.5]);
    const marginBottom = interpolate(progress.value, [0, 1], [40, 0]);

    return {
      height,
      opacity,
      marginBottom,
      transform: [{ scale }],
    };
  });

  return (
    <Box>
      <BackButtonIcon onPress={() => router.back()} disabled={isLoading} />
      <Animated.View style={animatedStyles} className="overflow-hidden">
        <AppTitle />
      </Animated.View>
    </Box>
  );
};

export default Header;
