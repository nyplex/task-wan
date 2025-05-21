import React, { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type SliderProps = {
  children: React.ReactNode[];
  onIndexChange?: (index: number) => void;
};

const SWIPE_THRESHOLD = 50;

export const Slider: React.FC<SliderProps> = ({ children, onIndexChange }) => {
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const currentIndex = useSharedValue(0);

  const onGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: (_, ctx: any) => {
        ctx.startX = translateX.value;
      },
      onActive: (event, ctx: any) => {
        translateX.value = ctx.startX + event.translationX;
      },
      onEnd: (event) => {
        if (
          event.translationX < -SWIPE_THRESHOLD &&
          currentIndex.value < children.length - 1
        ) {
          currentIndex.value += 1;
        } else if (
          event.translationX > SWIPE_THRESHOLD &&
          currentIndex.value > 0
        ) {
          currentIndex.value -= 1;
        }
        if (onIndexChange) {
          runOnJS(onIndexChange)(currentIndex.value);
        }

        translateX.value = withSpring(-currentIndex.value * width, {
          damping: 15,
          stiffness: 150,
        });
      },
    });

  // reset on width change (e.g. rotation)
  useEffect(() => {
    translateX.value = -currentIndex.value * width;
  }, [width]);

  const slidingStyle = useAnimatedStyle(() => ({
    flexDirection: "row",
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={{ flex: 1, width, overflow: "hidden" }}>
        <Animated.View style={slidingStyle}>
          {children.map((child, i) => (
            <Animated.View key={i} style={{ width }}>
              {child}
            </Animated.View>
          ))}
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};
