import React, { useEffect } from "react";
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from "react-native-reanimated";
import { Pressable } from "../gluestack/pressable";
import { Box } from "../gluestack/box";

const SWITCH_WIDTH = 44;
const SWITCH_HEIGHT = 20;
const THUMB_SIZE = 25;

type SwitchProps = {
  value: boolean;
  disabled?: boolean;
  onValueChange: (value: boolean) => void;
};

const Switch = ({ value, onValueChange, disabled = false }: SwitchProps) => {
  const translateX = useSharedValue(value ? SWITCH_WIDTH - THUMB_SIZE : 0);

  useEffect(() => {
    translateX.value = withSpring(value ? SWITCH_WIDTH - THUMB_SIZE : 0, {
      damping: 14,
      stiffness: 180,
    });
  }, [value]);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Determine colors based on disabled and value states
  const trackColor = disabled
    ? "#DEE2E6" // Light gray when disabled
    : value
      ? "#57a0f2" // Dark gray when ON
      : "#d6d4d4"; // Light gray when OFF

  const thumbColor = disabled
    ? "#ADB5BD" // Lighter gray for the thumb when disabled
    : "#006EE9"; // White when active

  return (
    <Pressable
      testID="switch-pressable"
      onPress={() => !disabled && onValueChange(!value)}
      className="h-[25px] self-center items-center justify-center ml-[2px]">
      <Box
        style={{
          width: SWITCH_WIDTH,
          height: SWITCH_HEIGHT,
          borderRadius: SWITCH_HEIGHT / 2,
          backgroundColor: trackColor,
          position: "relative",
        }}
        testID="switch-track"
      />
      <Animated.View
        testID="switch-thumb"
        style={[
          {
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            borderRadius: THUMB_SIZE / 2,
            backgroundColor: thumbColor,
            position: "absolute",
            top: -(THUMB_SIZE - 25) / 2,
            left: 0,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
          },
          thumbStyle,
        ]}
      />
    </Pressable>
  );
};

export default Switch;
