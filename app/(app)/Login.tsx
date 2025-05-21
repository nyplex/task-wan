import { supabase } from "@/lib/supabase";
import { Alert, Button, Text, View } from "react-native";

const Login = () => {
  async function signInWithEmail() {
    // setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: "nypelsa@gmail.com",
      password: "123456",
    });

    if (error) Alert.alert(error.message);
    // setLoading(false);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Text style={{marginTop: 100}} className="text-white">Login</Text>
      <Button
        title="Login"
        onPress={signInWithEmail}
        // disabled={loading}
      />
    </View>
  );
};

export default Login;
