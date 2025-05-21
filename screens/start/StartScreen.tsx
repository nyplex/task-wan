import ThemedButton from "@/components/ThemedButton";
import ThemedText from "@/components/ThemedText";
import { Box } from "@/components/ui/box";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Slider } from "./components/Slider";
import SliderIndicator from "./components/SliderIndicator";

const StartScreen = () => {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  return (
    <Box className="flex-1 py-safe-offset-4 bg-backrgound">
      <Box className="mb-4 px-4">
        <SliderIndicator length={3} currentIndex={index} />
      </Box>
      <Slider onIndexChange={(i) => setIndex(i)}>
        <Box className="flex-1 px-4">
          <Box>
            <Image
              source={require("@/assets/images/start-1.png")}
              contentFit="contain"
              style={{ width: "100%", height: 400 }}
            />
          </Box>
          <Box className="flex-1 w-full h-full px-4">
            <ThemedText size="body" weight="semi-bold" className="text-center">
              Easy Time Management
            </ThemedText>
            <ThemedText size="bodyS" className="text-center mt-2">
              With management based on priority and daily tasks, it will give
              you convenience in managing and determining the tasks that must be
              done first
            </ThemedText>
          </Box>
        </Box>
        <Box className="flex-1 px-4">
          <Box>
            <Image
              source={require("@/assets/images/start-2.png")}
              contentFit="contain"
              style={{ width: "100%", height: 400 }}
            />
          </Box>
          <Box className="flex-1 w-full h-full px-4">
            <ThemedText size="body" weight="semi-bold" className="text-center">
              Increase Work Effectiveness
            </ThemedText>
            <ThemedText size="bodyS" className="text-center mt-2">
              Time management and the determination of more important tasks will
              give your job statistics better and always improve
            </ThemedText>
          </Box>
        </Box>
        <Box className="flex-1 px-4">
          <Box>
            <Image
              source={require("@/assets/images/start-3.png")}
              contentFit="contain"
              style={{ width: "100%", height: 400 }}
            />
          </Box>
          <Box className="flex-1 w-full h-full px-4">
            <ThemedText size="body" weight="semi-bold" className="text-center">
              Reminder Notification
            </ThemedText>
            <ThemedText size="bodyS" className="text-center mt-2">
              The advantage of this application is that it also provides
              reminders for you so you don't forget to keep doing your
              assignments well and according to the time you have set
            </ThemedText>
          </Box>
        </Box>
      </Slider>

      <Box className="px-4">
        <ThemedButton
          title="Get Started"
          onPress={() => router.navigate("/(app)/Login")}
        />
      </Box>
    </Box>
  );
};

export default StartScreen;
