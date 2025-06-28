import ThemedText from "@/components/Text";
import { HStack } from "@/components/gluestack/hstack";
import { VStack } from "@/components/gluestack/vstack";
import Octicons from "@expo/vector-icons/Octicons";
import PriorityTaskList from "./components/PriorityTaskList";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/redux/slices/apiSlice/apiSlice";
import { useSelector } from "react-redux";
import { selectSession, selectUsersResult } from "@/redux/slices/authSlice/authSelectors";
import Button from "@/components/buttons/Button";
import { Box } from "@/components/gluestack/box";

export default function HomeScreen() {
  console.log("Rendering HomeScreen");

  const [todoItem, setTodoItem] = useState([]);
  const session = useSelector(selectSession);

  const user = useSelector(selectUsersResult);
  console.log("User data:", user.data);

  const [updateProfile, { isLoading: loading }] = useUpdateProfileMutation();

  const dispatch = useAppDispatch();

  return (
    <Box className="flex-1 bg-backrgound py-safe-offset-4 px-4">
      <HStack className="justify-between items-center">
        <ThemedText size="bodyS">Saturday, Feb 20 2022</ThemedText>
        <Octicons
          name="bell-fill"
          size={24}
          color="#006EE9"
        />
      </HStack>
      <VStack className="mt-8">
        <ThemedText
          size="heading"
          weight="bold">
          Welcome {user && user?.data[0]?.username}
        </ThemedText>
        <Button
          title="Update Name"
          onPress={() => {
            updateProfile({
              id: session?.user.id || "",
              username: "666",
            });
          }}
        />
        <ThemedText
          size="bodyXS"
          weight="regular">
          Have a nice day !
        </ThemedText>
      </VStack>
      <VStack className="mt-12">
        <ThemedText
          size="bodyL"
          weight="bold">
          My Priority Task
        </ThemedText>
        {/* <PriorityTaskCard /> */}
        <PriorityTaskList />
      </VStack>
    </Box>
  );
}
