import React, { useEffect } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { Fonts } from "@/constants/theme";

interface SplashScreenProps {
  onFinish?: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const splashScale = useSharedValue(0.85);
  const splashOpacity = useSharedValue(0);

  useEffect(() => {
    splashOpacity.value = withTiming(1, { duration: 700 });
    splashScale.value = withSpring(1, { damping: 12, stiffness: 100 });

    const timer = setTimeout(() => {
      onFinish?.();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  const splashAnimatedStyle = useAnimatedStyle(() => ({
    opacity: splashOpacity.value,
    transform: [{ scale: splashScale.value }],
  }));

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={onFinish}
    >
      <ImageBackground
        source={require("@/assets/images/bg-onboarding.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          <Animated.View style={[styles.centerContent, splashAnimatedStyle]}>
            <View style={styles.logoRow}>
              <Image
                source={require("@/assets/images/logo-arahkita-white.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </Animated.View>
        </SafeAreaView>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5590FF",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 16,
  },
  brandText: {
    fontFamily: Fonts.bold,
    fontSize: 38,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
});
