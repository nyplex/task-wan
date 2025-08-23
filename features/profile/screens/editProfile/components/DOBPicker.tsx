import { memo } from "react";
import { Modal } from "react-native";
import { UseFormSetValue } from "react-hook-form";
import { EditProfileFormValues } from "./EditProfileForm";
import { Pressable } from "@/gluestack-ui/pressable";
import { Box } from "@/gluestack-ui/box";
import Button from "@/components/buttons/Button";
import DateTimePicker from "@react-native-community/datetimepicker";

type Props = {
  setShowCalendar: (show: boolean) => void;
  getValues: (field: string) => string;
  setValue: UseFormSetValue<EditProfileFormValues>;
};

const DOBPicker = ({ setShowCalendar, getValues, setValue }: Props) => {
  return (
    <Modal animationType="none" transparent>
      <Pressable
        className="justify-center items-center flex-1 bg-[rgba(0,0,0,0.5)]"
        onPress={() => setShowCalendar(false)}
      >
        <Box className="bg-white rounded-[10px] justify-center items-center p-4">
          <DateTimePicker
            minimumDate={new Date(1900, 0, 1)}
            maximumDate={new Date()}
            value={getValues("dob") ? new Date(getValues("dob")) : new Date()}
            mode="date"
            display="spinner"
            onChange={(_, date) => {
              if (date) {
                const formattedDate = date.toLocaleDateString("en-CA", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                });
                setValue("dob", formattedDate);
              }
            }}
            negativeButton={{
              label: "Cancel",
              textColor: "black",
            }}
            positiveButton={{
              label: "Ok",
              textColor: "black",
            }}
          />
          <Box className="mt-2 mb-6 w-full max-w-[300px]">
            <Button
              title="Ok"
              size="large"
              onPress={() => setShowCalendar(false)}
            />
          </Box>
        </Box>
      </Pressable>
    </Modal>
  );
};
export default memo(DOBPicker);
