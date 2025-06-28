import Button from "@/components/buttons/Button";
import useAuth from "@/hooks/useAuth";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Profile() {
  const { logout } = useAuth();
  return (
    <View style={{ flex: 1 }}>
      <Text className="mt-24 text-white">Profile</Text>
      <Link
        href={"/(root)/(tabs)/(profile)/MyProfile"}
        style={{ marginTop: 20 }}>
        <Text className="text-blue-500">Go to My Profile</Text>
        <Button
          title="Logout"
          onPress={logout}
        />
      </Link>
    </View>
  );
}
