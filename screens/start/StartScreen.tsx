import ThemedButton from "@/components/ThemedButton";
import { Box } from "@/components/ui/box";
import { useRouter } from "expo-router";
import { Slider } from "./components/Slider";

const StartScreen = () => {
  const router = useRouter();

  return (
    <Box className="flex-1 bg-red-300 py-safe-offset-4">
      <Slider>
        <Box style={{ backgroundColor: "red", height: 300 }} />
        <Box style={{ backgroundColor: "blue", height: 400 }} />
        <Box style={{ backgroundColor: "green", height: 200 }} />
      </Slider>

      <ThemedButton title="Get Started" />
    </Box>
  );
};

export default StartScreen;
