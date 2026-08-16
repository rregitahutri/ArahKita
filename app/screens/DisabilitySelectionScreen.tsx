import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { Fonts, Palette } from "@/constants/theme";

interface DisabilitySelectionScreenProps {
  onSelect: (preference: "visual" | "hearing") => void;
}

export default function DisabilitySelectionScreen({
  onSelect,
}: DisabilitySelectionScreenProps) {
  const [isListening, setIsListening] = useState(false);

  const handleMicPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsListening((prev) => !prev);
  };

  const handleOptionPress = (preference: "visual" | "hearing") => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSelect(preference);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header: Centered Large Logo */}
        <View style={styles.topLogoHeader}>
          <Image
            source={require("@/assets/images/logo-arahkita-black.png")}
            style={styles.headerLogoIcon}
            resizeMode="contain"
          />
        </View>

        {/* AI Voice Assistant Card */}
        <View style={styles.assistantCard}>
          <View style={styles.greetingBox}>
            <ThemedText style={styles.greetingTitle}>
              Halo, selamat datang di ArahKita.
            </ThemedText>
            <ThemedText style={styles.greetingSubtitle}>
              Saya akan membantu Anda.
            </ThemedText>
          </View>

          {/* Voice Waveform */}
          <View style={styles.waveContainer}>
            <Image
              source={require("@/assets/icons/ic-onboarding-voice.png")}
              style={styles.waveformImage}
              resizeMode="contain"
            />
          </View>

          {/* Microphone Button */}
          <TouchableOpacity
            style={[styles.micWrapper, isListening && styles.micWrapperActive]}
            activeOpacity={0.8}
            onPress={handleMicPress}
          >
            <Image
              source={require("@/assets/icons/ic-onboarding-mic.png")}
              style={styles.micImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Selection Options List */}
        <View style={styles.optionsContainer}>
          {/* Option 1: Tuna Netra */}
          <TouchableOpacity
            style={styles.optionCard}
            activeOpacity={0.8}
            onPress={() => handleOptionPress("visual")}
          >
            <Image
              source={require("@/assets/icons/ic-onboarding-blind.png")}
              style={styles.optionIcon}
              resizeMode="contain"
            />
            <ThemedText style={styles.optionText}>
              Saya tuna netra atau memiliki gangguan penglihatan
            </ThemedText>
            <View style={styles.chevronCircle}>
              <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          {/* Option 2: Tuna Rungu */}
          <TouchableOpacity
            style={styles.optionCard}
            activeOpacity={0.8}
            onPress={() => handleOptionPress("hearing")}
          >
            <Image
              source={require("@/assets/icons/ic-onboarding-deaf.png")}
              style={styles.optionIcon}
              resizeMode="contain"
            />
            <ThemedText style={styles.optionText}>
              Saya tuna rungu atau memiliki gangguan pendengaran
            </ThemedText>
            <View style={styles.chevronCircle}>
              <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFCFE",
  },
  scrollContent: {
    paddingBottom: 32,
  },
  topLogoHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    paddingBottom: 30,
  },
  headerLogoIcon: {
    width: 107,
    height: 37,
  },
  assistantCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 0.3,
    borderColor: "#E7EFFC",
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 20,
    padding: 14,
    alignItems: "center",
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  greetingBox: {
    width: "100%",
    backgroundColor: Palette.blue[100],
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  greetingTitle: {
    fontFamily: Fonts.medium,
    fontSize: 13.5,
    fontWeight: "500",
    color: Palette.text.active,
    textAlign: "center",
  },
  greetingSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 12.5,
    color: Palette.text.inactive,
    textAlign: "center",
    marginTop: 4,
  },
  waveContainer: {
    width: "100%",
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  },
  waveformImage: {
    width: "92%",
    height: "100%",
  },
  micWrapper: {
    width: 72,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -4,
  },
  micWrapperActive: {
    transform: [{ scale: 1.08 }],
  },
  micImage: {
    width: 72,
    height: 72,
  },
  optionsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  optionCard: {
    backgroundColor: Palette.blue[100],
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  optionIcon: {
    width: 70,
    height: 70,
  },
  optionText: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: 12.5,
    fontWeight: "500",
    color: Palette.blue[700],
    paddingHorizontal: 12,
    lineHeight: 17,
  },
  chevronCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Palette.button.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
