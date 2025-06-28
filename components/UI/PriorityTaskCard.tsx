import { useMemo } from "react";
import { Box } from "../gluestack/box";
import { Pressable } from "../gluestack/pressable";
import { Svg, Circle, Polygon } from "react-native-svg";
import ThemedText from "../Text";

export const LightCircles = () => (
  <Svg
    width="100%"
    height="100%"
    viewBox="0 0 129 188"
    style={{ position: "absolute" }}>
    <Circle
      cx="40"
      cy="40"
      r="60"
      fill="white"
      opacity="0.06"
    />
    <Circle
      cx="100"
      cy="140"
      r="30"
      fill="white"
      opacity="0.08"
    />
    <Circle
      cx="0"
      cy="150"
      r="40"
      fill="white"
      opacity="0.06"
    />
  </Svg>
);

export const LightTriangles = () => (
  <Svg
    width="100%"
    height="100%"
    viewBox="0 0 129 188"
    style={{ position: "absolute" }}>
    {[
      [10, 40],
      [100, -20],
      [80, 100],
    ].map(([x, y], i) => (
      <Polygon
        key={i}
        points={`${x},${y} ${x + 40},${y + 80} ${x - 40},${y + 80}`}
        fill="white"
        opacity="0.1"
      />
    ))}
  </Svg>
);

export const LightDots = () => (
  <Svg
    width="100%"
    height="100%"
    viewBox="0 0 129 188"
    style={{ position: "absolute" }}>
    {Array.from({ length: 10 }).map((_, i) =>
      Array.from({ length: 20 }).map((_, j) => (
        <Circle
          key={`${i}-${j}`}
          cx={i * 20 + 5}
          cy={j * 30 + 5}
          r={3}
          fill="white"
          opacity="0.1"
        />
      ))
    )}
  </Svg>
);

type Props = {
  title: string;
  timeLeft: string;
  progress: number;
  bgColor:
    | "Sky Blue"
    | "Green"
    | "Yellow"
    | "Rose Pink"
    | "Purple"
    | "Grey"
    | "Orange"
    | "Lime Green"
    | "Cyan"
    | "Violet";
  disabled?: boolean;
  onPress?: () => void;
};

const PriorityTaskCard = ({ title, timeLeft, progress, bgColor, disabled, onPress }: Props) => {
  const bgColors: Record<string, string> = {
    "Sky Blue": "#60A5FA",
    Green: "#34D399",
    Yellow: "#FBBF24",
    "Rose Pink": "#F472B6",
    Purple: "#6366F1",
    Grey: "#64748B",
    Orange: "#FB923C",
    "Lime Green": "#84CC16",
    Cyan: "#2DD4BF",
    Violet: "#8B5CF6",
  };

  const backgroundOverlays = [LightDots, LightCircles, LightTriangles];

  const backgroundColor = bgColors[bgColor] || "#FBBF24"; // Default to Yellow if not found

  const Overlay = useMemo(() => {
    const index = Math.floor(Math.random() * backgroundOverlays.length);
    return backgroundOverlays[index];
  }, []);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className="h-[188px] w-[129px] rounded-[20px]"
      style={{ backgroundColor }}>
      <Overlay />
      <Box className="p-2 flex-1">
        <Box className="bg-white self-end px-2 py-1 rounded-full">
          <ThemedText
            size="bodyXS"
            className="self-start">
            {timeLeft}
          </ThemedText>
        </Box>
        <Box className="flex-1 my-1 justify-center">
          <ThemedText
            size="bodyL"
            weight="semi-bold"
            className="text-white line-clamp-4">
            {title}
          </ThemedText>
        </Box>
        <Box className="px-1">
          <ThemedText
            size="caption"
            className="text-white">
            Progress
          </ThemedText>
          <Box className="bg-white h-1 w-full rounded-full mt-1">
            <Box
              className="bg-primary-500 h-full rounded-full"
              style={{ width: `${progress}%` }} // Example progress, can be dynamic
            />
          </Box>
          <ThemedText
            size="caption"
            className="text-white text-right">
            {progress}%
          </ThemedText>
        </Box>
      </Box>
    </Pressable>
  );
};

export default PriorityTaskCard;
