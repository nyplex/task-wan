import { Image } from "expo-image";
import { Box } from "@/components/gluestack/box";
import Text from "@/components/Text";

const BodyContent = () => {
  return (
    <Box>
      <Text
        className="text-center mt-12"
        size="body"
        weight="semi-bold">
        Verify Account
      </Text>
      <Image
        source={require("@/assets/images/verifyEmail.png")}
        style={{
          width: 200,
          height: 200,
          alignSelf: "center",
        }}
        contentFit="contain"
      />
      <Text
        className="text-center mt-8 mb-4"
        size="bodyS"
        weight="regular">
        Please enter the verification number we send to your email
      </Text>
    </Box>
  );
};

export default BodyContent;
