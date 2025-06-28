import Text from "../Text";
import { Box } from "../gluestack/box";
import { HStack } from "../gluestack/hstack";
import { Pressable } from "../gluestack/pressable";

type Props = {
  tabs: string[];
  selectedTab: number;
  disabled?: boolean;
  onTabSelect: (index: number) => void;
};

const TabsSelector = ({ tabs, selectedTab, disabled, onTabSelect }: Props) => {
  return (
    <HStack className="items-center gap-4 justify-between">
      {tabs.map((tab, index) => (
        <Pressable
          key={index}
          onPress={() => onTabSelect(index)}
          disabled={disabled}
          className="flex-1 justify-center items-center h-[40px]">
          <Text
            className={
              selectedTab === index
                ? "text-primary-50 text-center line-clamp-1"
                : "text-typography-primary text-center line-clamp-1"
            }
            size="body"
            weight="semi-bold">
            {tab}
          </Text>
          <Box
            className={
              selectedTab === index
                ? "h-[2px] bg-primary-50 w-[20px] mt-1"
                : "h-[2px] opacity-0 w-[20px] mt-1"
            }
          />
        </Pressable>
      ))}
    </HStack>
  );
};

export default TabsSelector;
