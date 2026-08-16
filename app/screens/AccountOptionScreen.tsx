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

interface AccountOptionScreenProps {
  preference: "visual" | "hearing";
  onBack: () => void;
  onRegister: () => void;
  onLogin: () => void;
}

export default function AccountOptionScreen({
  preference,
  onBack,
  onRegister,
  onLogin,
}: AccountOptionScreenProps) {
  const [isListening, setIsListening] = useState(false);

  const handleMicPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsListening((prev) => !prev);
  };

  const handleBackPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onBack();
  };

  const handleRegisterPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onRegister();
  };

  const handleLoginPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onLogin();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header: Back Button + Centered Large Logo */}
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

          <Image
            source={require("@/assets/images/logo-arahkita-black.png")}
            style={styles.headerLogoIcon}
            resizeMode="contain"
          />

          <View style={styles.headerSpacer} />
        </View>

        {/* Selected Mode Banner Pill */}
        <View style={styles.selectedBanner}>
          <Image
            source={
              preference === "hearing"
                ? require("@/assets/icons/ic-onboarding-deaf.png")
                : require("@/assets/icons/ic-onboarding-blind.png")
            }
            style={styles.selectedBannerIcon}
            resizeMode="contain"
          />
          <ThemedText style={styles.selectedBannerText}>
            {preference === "hearing"
              ? "Saya tuna rungu atau memiliki gangguan pendengaran"
              : "Saya tuna netra atau memiliki gangguan penglihatan"}
          </ThemedText>
        </View>

        {/* AI Voice Assistant Card */}
        <View style={styles.assistantCard}>
          <View style={styles.greetingBox}>
            <ThemedText style={styles.greetingTitle}>
              Apakah anda sudah punya akun sebelumnya?
            </ThemedText>
            <ThemedText style={styles.greetingSubtitle}>
              Silahkan pilih login jika iya, dan register jika belum.
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

        {/* Action Buttons: Daftar & Masuk */}
        <View style={styles.authButtonsContainer}>
          {/* Daftar Button */}
          <TouchableOpacity
            style={styles.secondaryAuthButton}
            activeOpacity={0.85}
            onPress={handleRegisterPress}
          >
            <ThemedText style={styles.secondaryAuthButtonText}>
              Daftar
            </ThemedText>
          </TouchableOpacity>

          {/* Masuk Button */}
          <TouchableOpacity
            style={styles.primaryAuthButton}
            activeOpacity={0.85}
            onPress={handleLoginPress}
          >
            <ThemedText style={styles.primaryAuthButtonText}>Masuk</ThemedText>
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
  navHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  headerLogoIcon: {
    width: 107,
    height: 37,
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
  selectedBanner: {
    backgroundColor: Palette.blue[100],
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 16,
  },
  selectedBannerIcon: {
    width: 70,
    height: 70,
  },
  selectedBannerText: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: 12.5,
    fontWeight: "500",
    color: Palette.blue[700],
    paddingHorizontal: 12,
    lineHeight: 17,
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
  authButtonsContainer: {
    paddingHorizontal: 20,
    gap: 12,
    marginTop: 8,
  },
  secondaryAuthButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: Palette.button.second,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Palette.blue[500],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  secondaryAuthButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    fontWeight: "600",
    color: Palette.blue[700],
  },
  primaryAuthButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: Palette.button.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Palette.blue[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryAuthButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
