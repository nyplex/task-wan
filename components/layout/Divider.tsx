import { StyleProp } from "react-native";
import { Box } from "../gluestack/box";
import { HStack } from "../gluestack/hstack";
import { Divider as GSDivider } from "../gluestack/divider";
import Text from "../Text";
import { clsx } from "clsx";

type Props = {
  width?: StyleProp<any>;
  title?: string;
};

const Divider = ({ width = "100%", title }: Props) => {
  const CN1 = clsx("based-styles", {
    "h-[1px] flex-1": true,
    "bg-typography-secondary": true,
  });
  const CN2 = clsx("based-styles", {
    "h-[1px] w-full": true,
    "bg-typography-secondary": true,
  });

  return (
    <Box
      testID="divider-container"
      style={{
        width: width ? width : "100%",
      }}
    >
      {title ? (
        <HStack className="items-center w-full gap-[5px]">
          <GSDivider testID="divider-with-title" className={CN1} />
          <Text size="bodyXS" className="text-typography-secondary -mt-[2px]">
            {title}
          </Text>
          <GSDivider testID="divider-with-title" className={CN1} />
        </HStack>
      ) : (
        <GSDivider testID="simple-divider" className={CN2} />
      )}
    </Box>
  );
};

export default Divider;
