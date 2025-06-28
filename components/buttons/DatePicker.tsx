import { useState } from "react";
import { Pressable } from "../gluestack/pressable";
import { HStack } from "../gluestack/hstack";
import CalendarModal from "../UI/CalendarModal";
import Icon from "../UI/Icon";
import Text from "../Text";

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
      <Pressable
        disabled={disabled}
        onPress={() => setShowCalendar(true)}>
        <HStack className="items-center gap-2">
          <Icon
            icon="calendar"
            size="large"
          />
          <Text
            size="bodyL"
            weight="bold">
            {formattedDate}
          </Text>
        </HStack>
      </Pressable>

      <CalendarModal
        isOpen={showCalendar}
        initialDate={currentDate}
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
