import Text from "../Text";
import Button from "../buttons/Button";
import { Box } from "../gluestack/box";
import { VStack } from "../gluestack/vstack";

type Props = {
  onPressLogout: () => void;
  onPressCancel: () => void;
};

const LogoutBottomSheet = ({ onPressLogout, onPressCancel }: Props) => {
  return (
    <Box className="px-4 my-4 w-full justify-center items-center">
      <Text className="text-center">Logout of Taskwan?</Text>
      <VStack className="justify-center items-center mt-8 gap-8 w-full max-w-[400px]">
        <Button
          title="Logout"
          variant="secondary"
          onTouchEnd={onPressLogout}
        />
        <Button
          title="Cancel"
          variant="secondary"
          onTouchEnd={onPressCancel}
        />
      </VStack>
    </Box>
  );
};

export default LogoutBottomSheet;
