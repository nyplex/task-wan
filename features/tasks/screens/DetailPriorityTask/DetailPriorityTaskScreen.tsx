import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const DetailPriorityTaskScreen = () => {
  const { taskID } = useLocalSearchParams();

  return (
    <View
      style={{
        marginTop: 50,
      }}
    >
      <Text>DetailPriorityTaskScreen: {taskID}</Text>
    </View>
  );
};
export default DetailPriorityTaskScreen;
