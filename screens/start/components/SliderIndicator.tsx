import { Box } from "@/components/gluestack/box";
import clsx from "clsx";

type Props = {
  length: number;
  currentIndex?: number;
};

const SliderIndicator = ({ length, currentIndex }: Props) => {
  const getIndicatorStyle = (index: number) => {
    return clsx(
      "w-[10px] h-[10px] rounded-full mx-1",
      index === currentIndex ? "bg-primary-100" : "bg-primary-700"
    );
  };

  return (
    <Box className="flex-row items-center mt-4 ">
      {Array.from({ length }, (_, index) => (
        <Box
          key={index}
          className={getIndicatorStyle(index)}
        />
      ))}
    </Box>
  );
};

export default SliderIndicator;
