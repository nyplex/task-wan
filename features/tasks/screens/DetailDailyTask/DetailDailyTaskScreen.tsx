import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const DetailDailyTaskScreen = () => {
  const { taskID } = useLocalSearchParams();

  return (
    <View
      style={{
        marginTop: 50,
      }}
    >
      <Text>DetailDailyTaskScreen: {taskID}</Text>
    </View>
  );
};
export default DetailDailyTaskScreen;
