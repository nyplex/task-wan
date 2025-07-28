import { useState } from "react";
import { useRouter } from "expo-router";
import { Box } from "@/components/gluestack/box";
import Slider from "./components/Slider";
import SliderIndicator from "./components/SliderIndicator";
import SliderChild from "./components/SliderChild";
import Button from "@/components/buttons/Button";

const StartScreen = () => {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  return (
    <Box className="flex-1 py-safe-offset-4 bg-backrgound">
      <Box className="mb-4 px-4">
        <SliderIndicator
          length={3}
          currentIndex={index}
        />
      </Box>
      <Slider onIndexChange={(i) => setIndex(i)}>
        <SliderChild
          imageSource={require("@/assets/images/start-1.png")}
          title="Easy Time Management"
          description="With management based on priority and daily tasks, it will give you convenience in
          managing and determining the tasks that must be done first"
        />
        <SliderChild
          imageSource={require("@/assets/images/start-3.png")}
          title="Increase Work Effectiveness"
          description="Time management and the determination of more important tasks will give your job
          statistics better and always improve"
        />
        <SliderChild
          imageSource={require("@/assets/images/start-2.png")}
          title="Reminder Notification"
          description="The advantage of this application is that it also provides reminders for you so you
          don't forget to keep doing your assignments well and according to the time you have
          set"
        />
      </Slider>
      <Box className="px-4">
        <Button
          title="Get Started"
          onPress={() => router.navigate("/(app)/Login")}
        />
      </Box>
    </Box>
  );
};

export default StartScreen;
