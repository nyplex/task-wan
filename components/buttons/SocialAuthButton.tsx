import { Image } from "expo-image";
import { Pressable } from "../gluestack/pressable";
import { Box } from "../gluestack/box";
import { ButtonSpinner } from "../gluestack/button";

type Props = {
  provider: "google" | "apple";
  disabled?: boolean;
  isLoading?: boolean;
  onPress?: () => void;
};

const SocialAuthButton = ({ provider, disabled, isLoading, onPress }: Props) => {
  return (
    <Pressable
      className="w-[50px] h-[50px] items-center justify-center rounded-[15px]"
      style={{
        backgroundColor: "#EEE",
      }}
      onPress={onPress}
      disabled={disabled || isLoading}>
      {isLoading && (
        <Box>
          <ButtonSpinner />
        </Box>
      )}
      {!isLoading && (
        <>
          {provider === "google" ? (
            <Box className="w-[25px] h-[25px]">
              <Image
                source={require("@assets/images/google-logo-light.png")}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                alt="googleIcon"
              />
            </Box>
          ) : (
            <Box className="w-[25px] h-[31px]">
              <Image
                source={require("@assets/images/apple-logo-light.png")}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                alt="appleIcon"
              />
            </Box>
          )}
        </>
      )}
    </Pressable>
  );
};

export default SocialAuthButton;
