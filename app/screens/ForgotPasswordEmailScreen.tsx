import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { Fonts, Palette } from "@/constants/theme";

interface ForgotPasswordEmailScreenProps {
  initialEmail?: string;
  onBack: () => void;
  onNext: (email: string) => void;
}

export default function ForgotPasswordEmailScreen({
  initialEmail = "",
  onBack,
  onNext,
}: ForgotPasswordEmailScreenProps) {
  const [email, setEmail] = useState(initialEmail);
  const [isListening, setIsListening] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailEmpty = email.trim().length === 0;
  const isValidEmail = emailRegex.test(email.trim());
  const isEmailInvalid = !isEmailEmpty && !isValidEmail;

  const handleMicPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsListening((prev) => !prev);
  };

  const handleBackPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onBack();
  };

  const handleNextPress = () => {
    if (!isValidEmail) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onNext(email.trim());
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
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

            <ThemedText style={styles.screenTitle}>Lupa Sandi</ThemedText>

            <View style={styles.headerSpacer} />
          </View>

          {/* AI Voice Assistant Card */}
          <View style={styles.assistantCard}>
            <View style={styles.greetingBox}>
              <ThemedText style={styles.greetingTitle}>
                Tidak bisa mengakses akun?🤝
              </ThemedText>
              <ThemedText style={styles.greetingSubtitle}>
                Masukkan alamat email yang terdaftar, kami akan mengirimkan
                kode untuk mereset kata sandi Anda.
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
              style={[
                styles.micWrapper,
                isListening && styles.micWrapperActive,
              ]}
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

          {/* Form Section */}
          <View style={styles.formContainer}>
            {/* Email Field */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Email</ThemedText>
              <View
                style={[
                  styles.inputWrapper,
                  emailFocused && styles.inputWrapperFocused,
                  isEmailInvalid && styles.inputWrapperError,
                ]}
              >
                <View
                  style={[
                    styles.iconBadge,
                    isEmailInvalid && styles.iconBadgeError,
                  ]}
                >
                  <Ionicons
                    name="mail-outline"
                    size={18}
                    color={
                      isEmailInvalid
                        ? Palette.brand.danger
                        : emailFocused
                          ? Palette.blue[500]
                          : Palette.blue[400]
                    }
                  />
                </View>
                <TextInput
                  style={styles.textInput}
                  placeholder="Masukkan Emailmu"
                  placeholderTextColor={Palette.text.inactive}
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Email Warning */}
              {isEmailInvalid && (
                <ThemedText style={styles.errorText}>
                  Format email harus sesuai (contoh: email@example.com)
                </ThemedText>
              )}
            </View>

            {/* Next Button */}
            <TouchableOpacity
              style={[
                styles.primaryButton,
                {
                  backgroundColor: isValidEmail
                    ? Palette.button.primary
                    : Palette.button.second,
                },
              ]}
              disabled={!isValidEmail}
              onPress={handleNextPress}
              activeOpacity={isValidEmail ? 0.85 : 1}
            >
              <ThemedText style={styles.primaryButtonText}>
                Selanjutnya
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFCFE",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  navHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
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
  assistantCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1.2,
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
    lineHeight: 18,
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
  formContainer: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: Palette.text.active,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: "#E6EDF8",
    height: 52,
    paddingHorizontal: 10,
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  inputWrapperFocused: {
    borderColor: Palette.blue[500],
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  inputWrapperError: {
    borderColor: Palette.brand.danger,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Palette.blue[100],
    alignItems: "center",
    justifyContent: "center",
  },
  iconBadgeError: {
    backgroundColor: "#FEE2E2",
  },
  textInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 12,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Palette.text.active,
  },
  errorText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Palette.brand.danger,
    marginTop: 6,
    marginLeft: 4,
  },
  primaryButton: {
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: Palette.blue[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
