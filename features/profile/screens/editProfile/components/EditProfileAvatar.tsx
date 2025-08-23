import { memo } from "react";
import { Box } from "@/gluestack-ui/box";
import Avatar from "@/components/UI/Avatar";

const EditProfileAvatar = () => {
  return (
    <Box className="items-center w-full mb-8">
      <Avatar editable fallbackName="N" />
    </Box>
  );
};
export default memo(EditProfileAvatar);
