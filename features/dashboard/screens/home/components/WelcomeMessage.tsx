import { VStack } from "@/gluestack-ui/vstack";
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
  return (
    <VStack className="mt-8 gap-1">
      <Text size="heading" weight="bold">
        {isFetching
          ? "Loading..."
          : isError
            ? "Error loading profile"
            : `Welcome ${name}`}
      </Text>
      <Text size="bodyS" weight="medium">
        {getCustomGreeting()}
      </Text>
    </VStack>
  );
};

export default WelcomeMessage;
