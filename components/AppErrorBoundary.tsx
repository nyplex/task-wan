import React from "react";
import { View, Text } from "react-native";
import { reportError } from "@/lib/errors/reportError";

export class AppErrorBoundary extends React.Component<
  any,
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: any, info: any) {
    this.setState({ hasError: true });
    reportError(error, { info });
  }

  render() {
    if (this.state.hasError) {
      // render a stunning fallback UI
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1a1a2e",
            paddingHorizontal: 24,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 24,
              padding: 32,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#1a1a2e",
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              Oops! Something went wrong.
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#555",
                marginBottom: 24,
                textAlign: "center",
              }}
            >
              Please try refreshing the app or contact support if the problem
              persists.
            </Text>
            <View
              style={{
                backgroundColor: "#1a1a2e",
                borderRadius: 8,
                paddingVertical: 12,
                paddingHorizontal: 32,
              }}
            >
              <Text
                style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}
                onPress={() => {
                  // reload the app
                  if (typeof window !== "undefined") {
                    window.location.reload();
                  }
                }}
              >
                Refresh
              </Text>
            </View>
          </View>
        </View>
      );
    }
    return this.props.children;
  }
}
