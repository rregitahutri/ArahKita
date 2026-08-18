import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef } from "react";
import {
  Alert,
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { Fonts, Palette } from "@/constants/theme";

export interface DigitalAssistantScreenProps {
  onBack?: () => void;
}

export default function DigitalAssistantScreen({
  onBack,
}: DigitalAssistantScreenProps) {
  const pulseAnim1 = useRef(new Animated.Value(1)).current;
  const pulseRingAnim1 = useRef(new Animated.Value(1)).current;

  const pulseAnim2 = useRef(new Animated.Value(1)).current;
  const pulseRingAnim2 = useRef(new Animated.Value(1)).current;

  // Expanding and contracting breathing animation
  useEffect(() => {
    const pulse1 = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulseAnim1, {
            toValue: 1.08,
            duration: 1400,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim1, {
            toValue: 1,
            duration: 1400,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(pulseRingAnim1, {
            toValue: 1.16,
            duration: 1400,
            useNativeDriver: true,
          }),
          Animated.timing(pulseRingAnim1, {
            toValue: 1,
            duration: 1400,
            useNativeDriver: true,
          }),
        ]),
      ]),
    );

    const pulse2 = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulseAnim2, {
            toValue: 1.08,
            duration: 1400,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim2, {
            toValue: 1,
            duration: 1400,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(pulseRingAnim2, {
            toValue: 1.16,
            duration: 1400,
            useNativeDriver: true,
          }),
          Animated.timing(pulseRingAnim2, {
            toValue: 1,
            duration: 1400,
            useNativeDriver: true,
          }),
        ]),
      ]),
    );

    pulse1.start();
    pulse2.start();

    return () => {
      pulse1.stop();
      pulse2.stop();
    };
  }, [pulseAnim1, pulseRingAnim1, pulseAnim2, pulseRingAnim2]);

  const handleBackPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onBack) {
      onBack();
    } else {
      Alert.alert("Kembali", "Kembali ke halaman sebelumnya.");
    }
  };

  const handleChatbotPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      "Chatbot ArahKita",
      "Membuka percakapan percakapan teks dengan AI Chatbot.",
    );
  };

  const handleVoiceAssistantPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      "Asisten Suara",
      "Mendengarkan... Silakan sebutkan perintah suara Anda.",
    );
  };

  return (
    <ImageBackground
      source={require("@/assets/images/bg-homepage.png")}
      style={styles.bgImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <View style={styles.container}>
          {/* Header Bar */}
          <View style={styles.navHeader}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.7}
              onPress={handleBackPress}
            >
              <Ionicons
                name="chevron-back"
                size={22}
                color={Palette.text.active}
              />
            </TouchableOpacity>

            <ThemedText style={styles.screenTitle}>Asisten Digital</ThemedText>

            <View style={styles.headerSpacer} />
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Card 1: Chatbot */}
            <TouchableOpacity
              style={styles.assistantCard}
              activeOpacity={0.9}
              onPress={handleChatbotPress}
            >
              {/* Outer Pulsing Glow Rings */}
              <Animated.View
                style={[
                  styles.outerRing2,
                  { transform: [{ scale: pulseRingAnim1 }] },
                ]}
              >
                <Animated.View
                  style={[
                    styles.outerRing1,
                    { transform: [{ scale: pulseAnim1 }] },
                  ]}
                >
                  <View style={styles.iconCircle}>
                    <Image
                      source={require("@/assets/icons/ic-ai-chatbot.png")}
                      style={styles.iconAsset}
                      resizeMode="contain"
                    />
                  </View>
                </Animated.View>
              </Animated.View>

              <ThemedText style={styles.cardTitle}>Chatbot</ThemedText>
            </TouchableOpacity>

            {/* Card 2: Asisten Suara */}
            <TouchableOpacity
              style={styles.assistantCard}
              activeOpacity={0.9}
              onPress={handleVoiceAssistantPress}
            >
              {/* Outer Pulsing Glow Rings */}
              <Animated.View
                style={[
                  styles.outerRing2,
                  { transform: [{ scale: pulseRingAnim2 }] },
                ]}
              >
                <Animated.View
                  style={[
                    styles.outerRing1,
                    { transform: [{ scale: pulseAnim2 }] },
                  ]}
                >
                  <View style={styles.iconCircle}>
                    <Image
                      source={require("@/assets/icons/ic-ai-voice.png")}
                      style={styles.iconAsset}
                      resizeMode="contain"
                    />
                  </View>
                </Animated.View>
              </Animated.View>

              <ThemedText style={styles.cardTitle}>Asisten Suara</ThemedText>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  navHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 14,
  },
  screenTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    fontWeight: "700",
    color: Palette.text.active,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EDF3FD",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  headerSpacer: {
    width: 44,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
    gap: 20,
  },

  /* Assistant Large Cards */
  assistantCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1.2,
    borderColor: "#E7EFFC",
    height: 341,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  outerRing2: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(85, 144, 255, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  outerRing1: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(85, 144, 255, 0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Palette.blue[500],
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Palette.blue[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  iconAsset: {
    width: 32,
    height: 32,
  },
  cardTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    fontWeight: "600",
    color: Palette.text.active,
  },
});
