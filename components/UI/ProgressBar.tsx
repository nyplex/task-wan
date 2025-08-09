import { Box } from "../gluestack/box";
import Text from "../Text";

type Props = {
  progress: number;
};

const ProgressBar = ({ progress }: Props) => {
  return (
    <Box className="w-full h-[20px] bg-[#A9A2A2] rounded-full overflow-hidden">
      <Box
        testID="progress-bar-fill"
        className="h-full bg-primary-50 rounded-full"
        style={{
          width: `${progress}%`,
        }}
      />
      <Box className="absolute inset-0 rounded-full items-center justify-center">
        <Text
          size="caption"
          weight="semi-bold"
          className="text-center text-white"
        >
          {progress}%
        </Text>
      </Box>
    </Box>
  );
};

export default ProgressBar;
