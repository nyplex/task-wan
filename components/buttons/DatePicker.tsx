import { useState } from "react";
import { Pressable } from "@/gluestack-ui/pressable";
import { HStack } from "@/gluestack-ui/hstack";
import CalendarModal from "@/components/UI/CalendarModal";
import Icon from "@/components/UI/Icon";
import Text from "@/components/UI/Text";

type Props = {
  currentDate: number;
  disabled?: boolean;
  onDateChange: (date: number) => void;
};

const DatePicker = ({ currentDate, disabled, onDateChange }: Props) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const formattedDate = new Date(currentDate)
    .toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric",
    })
    .replace(" ", ", ");

  return (
    <>
      <Pressable disabled={disabled} onPress={() => setShowCalendar(true)}>
        <HStack className="items-center gap-2">
          <Icon icon="calendar" size="large" />
          <Text size="bodyL" weight="bold">
            {formattedDate}
          </Text>
        </HStack>
      </Pressable>

      <CalendarModal
        isOpen={showCalendar}
        onSelect={(date) => {
          onDateChange(date);
          setShowCalendar(false);
        }}
        onClose={() => setShowCalendar(false)}
      />
    </>
  );
};

export default DatePicker;
