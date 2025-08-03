import { useState } from "react";
import { Calendar } from "react-native-calendars";
import Feather from "@expo/vector-icons/Feather";
import Text from "../Text";
import dayjs from "dayjs";
import { Box } from "../gluestack/box";
import { Modal, ModalBackdrop, ModalContent } from "../gluestack/modal";

type Props = {
  isOpen: boolean;
  // initialDate?: number;
  onSelect?: (date: number) => void;
  onClose: () => void;
};

const CalendarModal = ({ isOpen, onSelect, onClose }: Props) => {
  const [selected, setSelected] = useState("");
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="justify-center items-center"
    >
      <ModalBackdrop className="bg-black" />
      <ModalContent className="justify-center w-full border-0">
        <Box>
          <Calendar
            onDayPress={(day) => {
              setSelected(day.dateString);
              if (onSelect) {
                onSelect(day.timestamp);
              }
            }}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: "orange",
                dots: [{ key: "1", color: "red", selectedDotColor: "blue" }],
                marked: true,
              },
            }}
            renderArrow={(direction) => {
              if (direction === "left") {
                return (
                  <Feather name="chevron-left" size={24} color="#006EE9" />
                );
              } else {
                return (
                  <Feather name="chevron-right" size={24} color="#006EE9" />
                );
              }
            }}
            renderHeader={(date) => {
              const month = dayjs(date).format("MMMM");
              const year = dayjs(date).format("YYYY");
              return (
                <Text
                  className="text-primary-50"
                  weight="semi-bold"
                >{`${month} ${year}`}</Text>
              );
            }}
            theme={{}}
            style={{
              borderRadius: 20,
              paddingBottom: 10,
            }}
          />
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default CalendarModal;
