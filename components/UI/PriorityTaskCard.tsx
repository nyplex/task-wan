import { useMemo } from "react";
import { Svg, Circle, Polygon } from "react-native-svg";
import { Pressable } from "@/gluestack-ui/pressable";
import { Box } from "@/gluestack-ui/box";
import ThemedText from "./Text";

export const LightCircles = () => (
  <Svg
    width="100%"
    height="100%"
    viewBox="0 0 129 188"
    style={{ position: "absolute" }}
  >
    <Circle cx="40" cy="40" r="60" fill="white" opacity="0.06" />
    <Circle cx="100" cy="140" r="30" fill="white" opacity="0.08" />
    <Circle cx="0" cy="150" r="40" fill="white" opacity="0.06" />
  </Svg>
);

export const LightTriangles = () => (
  <Svg
    width="100%"
    height="100%"
    viewBox="0 0 129 188"
    style={{ position: "absolute" }}
  >
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
    style={{ position: "absolute" }}
  >
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
      )),
    )}
  </Svg>
);

type Props = {
  title: string;
  timeLeft: string;
  progress: number;
  bgColor: number;
  disabled?: boolean;
  onPress?: () => void;
};

const PriorityTaskCard = ({
  title,
  timeLeft,
  progress,
  bgColor,
  disabled,
  onPress,
}: Props) => {
  const bgColors: Record<string, string> = {
    1: "#60A5FA", // Sky Blue
    2: "#34D399", // Green
    3: "#FBBF24", // Yellow
    4: "#F472B6", // Rose Pink
    5: "#6366F1", // Purple
    6: "#64748B", // Grey
    7: "#FB923C", // Orange
    8: "#84CC16", // Lime Green
    9: "#2DD4BF", // Cyan
    10: "#8B5CF6", // Violet
  };

  const backgroundColor = bgColors[bgColor] || "#FBBF24"; // Default to Yellow if not found

  const Overlay = useMemo(() => {
    const backgroundOverlays = [LightDots, LightCircles, LightTriangles];
    const index = Math.floor(Math.random() * backgroundOverlays.length);
    return backgroundOverlays[index];
  }, []);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className="h-[200px] w-[150px] rounded-[20px]"
      style={{ backgroundColor }}
    >
      <Overlay />
      <Box className="p-2 flex-1">
        <Box className="self-end px-2 py-1 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-sm">
          <ThemedText size="bodyXS" className="self-start text-white">
            {timeLeft}
          </ThemedText>
        </Box>
        <Box className="flex-1 my-1 justify-center">
          <ThemedText
            size="bodyL"
            weight="semi-bold"
            className="text-white line-clamp-4"
          >
            {title}
          </ThemedText>
        </Box>
        <Box className="px-1">
          <ThemedText size="caption" className="text-white">
            Progress
          </ThemedText>
          <Box className="relative w-full h-2 mt-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 overflow-hidden">
            <Box
              className="h-full rounded-full bg-slate-300"
              style={{ width: `${progress}%` }}
            />
          </Box>
          <ThemedText size="caption" className="text-white text-right">
            {progress}%
          </ThemedText>
        </Box>
      </Box>
    </Pressable>
  );
};

export default PriorityTaskCard;
