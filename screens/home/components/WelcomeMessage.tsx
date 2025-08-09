import Text from "@/components/Text";
import { VStack } from "@/components/gluestack/vstack";

const morningGreeting = [
  "Good morning, ready to tackle the day?",
  "Rise and shine! Let's make today great.",
  "Good morning! Time to seize the day.",
  "Morning! Let's make today productive.",
  "Good morning! What are your plans for today?",
];

const afternoonGreeting = [
  "Good afternoon! How's your day going?",
  "Hope your afternoon is going well!",
  "Good afternoon! Let's keep the momentum going.",
  "Afternoon! What have you accomplished today?",
  "Good afternoon! Ready for the rest of the day?",
];

const eveningGreeting = [
  "Good evening! How was your day?",
  "Hope you had a great day! Good evening!",
  "Good evening! Time to relax and unwind.",
  "Evening! What did you achieve today?",
  "Good evening! Let's reflect on the day.",
];

const nightGreeting = [
  "Late night? Planning tomorrow's tasks?",
  "Night owl? Let's prepare for tomorrow.",
  "Good night! Ready for a fresh start tomorrow?",
  "Nighttime reflection: What went well today?",
  "Good night! Rest well for a productive tomorrow.",
];

const WelcomeMessage = () => {
  const getCustomGreeting = () => {
    // get the current hour
    const currentHour = new Date().getHours();
    // determine the greeting based on the hour
    if (currentHour < 12) {
      return morningGreeting[
        Math.floor(Math.random() * morningGreeting.length)
      ];
    } else if (currentHour < 18) {
      return afternoonGreeting[
        Math.floor(Math.random() * afternoonGreeting.length)
      ];
    } else if (currentHour < 22) {
      return eveningGreeting[
        Math.floor(Math.random() * eveningGreeting.length)
      ];
    } else {
      return nightGreeting[Math.floor(Math.random() * nightGreeting.length)];
    }
  };

  return (
    <VStack className="mt-8 gap-1">
      <Text size="heading" weight="bold">
        Welcome Jon Smith
      </Text>
      <Text size="bodyS" weight="medium">
        {getCustomGreeting()}
      </Text>
    </VStack>
  );
};

export default WelcomeMessage;
