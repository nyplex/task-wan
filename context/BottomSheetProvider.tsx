import React, { createContext, useState, useCallback, ReactNode } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Pressable } from "@/components/gluestack/pressable";
import LogoutBottomSheet from "@/components/bottomSheets/LogoutBottomSheet";
// --- Added new InfoBottomSheet ---
import InfoBottomSheet, { InfoBottomSheetProps } from "@/components/bottomSheets/InfoBottomSheet";

// -----------------
// Type Definitions
// -----------------

// --- Added InfoBottomSheet to the props map ---
type BottomSheetPropsMap = {
  LogoutBottomSheet: {
    onPressLogout: () => void;
    onPressCancel: () => void;
  };
  InfoBottomSheet: InfoBottomSheetProps;
};

type SheetName = keyof BottomSheetPropsMap;

type BottomSheetContextType = {
  openBottomSheet: <T extends SheetName>(name: T, props: BottomSheetPropsMap[T]) => void;
  closeBottomSheet: () => void;
};

// -------------------
// Sheet Registry
// -------------------

// --- Added InfoBottomSheet to the registry ---
const sheetRegistry: {
  [K in SheetName]: React.FC<BottomSheetPropsMap[K]>;
} = {
  LogoutBottomSheet: LogoutBottomSheet,
  InfoBottomSheet: InfoBottomSheet,
};

// ------------------
// Context Creation
// ------------------
export const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

// ------------------
// Provider Component
// ------------------
const ANIMATION_DURATION = 300;
const screenHeight = Dimensions.get("window").height;

export const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
  // STATES
  const [sheetName, setSheetName] = useState<SheetName | null>(null);
  const [sheetProps, setSheetProps] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  // ANIMATIONS
  const opacityAnim = useSharedValue(0);
  const translateYAnim = useSharedValue(screenHeight);

  // ------------------
  // OPEN BOTTOM SHEET
  // ------------------
  const openBottomSheet = useCallback(
    <T extends SheetName>(name: T, props: BottomSheetPropsMap[T]) => {
      setSheetName(name);
      setSheetProps(props);
      setIsVisible(true);

      opacityAnim.value = withTiming(1, { duration: ANIMATION_DURATION });
      translateYAnim.value = withTiming(0, {
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.ease),
      });
    },
    []
  );

  // ------------------
  // CLOSE BOTTOM SHEET
  // ------------------
  const closeBottomSheet = useCallback(() => {
    opacityAnim.value = withTiming(0, { duration: ANIMATION_DURATION });
    translateYAnim.value = withTiming(screenHeight, {
      duration: ANIMATION_DURATION,
      easing: Easing.in(Easing.ease),
    });

    setTimeout(() => {
      setIsVisible(false);
      setSheetName(null);
      setSheetProps(null);
    }, ANIMATION_DURATION);
  }, []);

  // ------------------
  // GESTURE HANDLER
  // ------------------
  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      // Only allow downward swipe
      if (event.translationY > 0) {
        translateYAnim.value = event.translationY;
      }
    },
    onEnd: (event) => {
      if (event.translationY > 100) {
        runOnJS(closeBottomSheet)();
      } else {
        translateYAnim.value = withTiming(0, { duration: ANIMATION_DURATION });
      }
    },
  });

  // ------------------
  // ANIMATED STYLES
  // ------------------
  const backdropStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityAnim.value,
    };
  });

  const sheetContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateYAnim.value }],
    };
  });

  // ------------------
  // CONTENT COMPONENT
  // ------------------
  const ContentComponent = sheetName && sheetRegistry[sheetName] ? sheetRegistry[sheetName] : null;

  return (
    <BottomSheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
      {children}
      {isVisible && (
        <>
          <Pressable
            onPress={closeBottomSheet}
            style={StyleSheet.absoluteFill}>
            <Animated.View style={[styles.backdrop, backdropStyle]} />
          </Pressable>
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View
              style={[styles.sheetContainer, sheetContainerStyle]}
              className="bg-brand-background">
              {/* Top Bar for drag indicator */}
              <View style={styles.topBar}>
                <View style={styles.dragIndicator} />
              </View>
              {ContentComponent && <ContentComponent {...sheetProps} />}
            </Animated.View>
          </PanGestureHandler>
        </>
      )}
    </BottomSheetContext.Provider>
  );
};

// ------------------
// Styles
// ------------------
const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  sheetContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    backgroundColor: "#fff",
  },
  topBar: {
    alignItems: "center",
    marginBottom: 8,
  },
  dragIndicator: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#ccc",
  },
});

export default BottomSheetProvider;
