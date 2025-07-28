import React from "react";
import Text from "../Text";
import { Box } from "../gluestack/box";
import { VStack } from "../gluestack/vstack";

// Simple info bottom sheet for demonstration
export type InfoBottomSheetProps = {
  message: string;
  onPressOk: () => void;
};

const InfoBottomSheet = ({ message, onPressOk }: InfoBottomSheetProps) => {
  return (
    <Box className="px-4 my-4 w-full justify-center items-center">
      <Text className="text-center">{message}</Text>
      <VStack className="justify-center items-center mt-8 gap-8 w-full max-w-[400px]">
        <Text onPress={onPressOk}>OK</Text>
      </VStack>
    </Box>
  );
};

export default InfoBottomSheet;
