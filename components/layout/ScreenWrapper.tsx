import { Box } from "../../gluestack-ui/box";

type Props = {
  header: React.ReactNode;
  children: React.ReactNode;
};

const ScreenWrapper = ({ header, children }: Props) => {
  return (
    <Box className="flex-1 bg-primary-50 pt-safe-offset-0">
      <Box className="h-[100px]">{header}</Box>
      <Box className="bg-white flex-1 rounded-t-[40px] overflow-hidden">
        {children}
      </Box>
    </Box>
  );
};

export default ScreenWrapper;
