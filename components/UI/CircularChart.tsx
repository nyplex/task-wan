import React, { useEffect } from "react";
import Svg, { Circle } from "react-native-svg";
import Animated, { useSharedValue, useAnimatedProps, withTiming } from "react-native-reanimated";
import { Box } from "../gluestack/box";
import Text from "../Text";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  title: string;
  showTitle: boolean;
  progress: number; // 0 to 100
  showValue?: boolean;
};

const SIZE = 100;
const STROKE_WIDTH = 12;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const CircularChart = ({ title, showTitle, progress, showValue = true }: Props) => {
  const animatedProgress = useSharedValue(progress);

  useEffect(() => {
    animatedProgress.value = withTiming(progress, { duration: 800 });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = CIRCUMFERENCE - (CIRCUMFERENCE * animatedProgress.value) / 100;
    return {
      strokeDashoffset,
    };
  });

  return (
    <Box className="items-center">
      <Text
        className="mb-3"
        weight="medium"
        size="body">
        {showTitle ? title : ""}
      </Text>
      <Box className="relative w-[100px] h-[100px]">
        <Svg
          width={SIZE}
          height={SIZE}
          testID="circular-chart-svg">
          <Circle
            stroke="#E8E8E8"
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            strokeWidth={STROKE_WIDTH}
            fill="none"
          />
          <AnimatedCircle
            stroke="#006EE9"
            fill="none"
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={CIRCUMFERENCE}
            animatedProps={animatedProps}
            strokeLinecap="round"
            rotation="-90"
            originX={SIZE / 2}
            originY={SIZE / 2}
          />
        </Svg>
        {showValue && (
          <Box className="absolute inset-0 justify-center items-center">
            <Text
              size="bodyXS"
              weight="medium">
              {Math.round(progress)}%
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CircularChart;
