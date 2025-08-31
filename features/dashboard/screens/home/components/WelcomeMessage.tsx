import { useMemo } from "react";
import { VStack } from "@/gluestack-ui/vstack";
import { Box } from "@/gluestack-ui/box";
import { useGetProfileQuery } from "@/redux/slices/apiSlice/endpoints/profile/getProfile";
import getCustomGreeting from "@/features/dashboard/utils/getCustomGreeting";
import Text from "@/components/UI/Text";

const WelcomeMessage = () => {
  const { name, isFetching, isError } = useGetProfileQuery(undefined, {
    selectFromResult: ({ data, isFetching, isError }) => ({
      isFetching: isFetching,
      isError: isError,
      name: data?.name,
    }),
  });

  const greeting = useMemo(() => getCustomGreeting(), []);

  return (
    <VStack className="mt-8 gap-1">
      {isFetching && (
        <Box
          testID="loading-box"
          className="animate-pulse w-40 h-8 bg-gray-300 rounded-md"
        />
      )}
      {!isFetching && !isError && (
        <Text size="heading" weight="bold">
          Welcome {name}
        </Text>
      )}
      {!isFetching && isError && (
        <Text size="heading" weight="bold">
          Error loading profile
        </Text>
      )}
      <Text size="bodyS" weight="medium">
        {greeting}
      </Text>
    </VStack>
  );
};

export default WelcomeMessage;
