import { Image } from "expo-image";
import { Box } from "@/components/gluestack/box";
import Text from "@/components/Text";

type Props = {
  title: string;
  imageSource: string;
  description: string;
};

const SliderChild = ({ title, imageSource, description }: Props) => {
  return (
    <Box className="px-4">
      <Box>
        <Image
          source={imageSource}
          contentFit="contain"
          style={{ width: "100%", height: 400 }}
        />
      </Box>
      <Box className="w-full h-full px-4">
        <Text size="body" weight="semi-bold" className="text-center">
          {title}
        </Text>
        <Text size="bodyS" className="text-center mt-2">
          {description}
        </Text>
      </Box>
    </Box>
  );
};

export default SliderChild;
