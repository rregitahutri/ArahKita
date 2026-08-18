import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
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

interface ForgotPasswordResetScreenProps {
  onBack: () => void;
  onFinish: () => void;
}

export default function ForgotPasswordResetScreen({
  onBack,
  onFinish,
}: ForgotPasswordResetScreenProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Validation
  const isPasswordTooShort = password.length > 0 && password.length < 6;
  const isConfirmPasswordMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const isValidForm =
    password.length >= 6 &&
    confirmPassword.length >= 6 &&
    password === confirmPassword;

  const handleMicPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsListening((prev) => !prev);
  };

  const handleBackPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onBack();
  };

  const handleNextPress = () => {
    if (!isValidForm) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setShowSuccessModal(true);
  };

  const handleBackToLoginPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShowSuccessModal(false);
    onFinish();
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
                Buat kata sandi baru
              </ThemedText>
              <ThemedText style={styles.greetingSubtitle}>
                Gunakan setidaknya 6 karakter, termasuk huruf, angka, dan
                simbol.
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
            {/* Password Field */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Kata sandi</ThemedText>
              <View
                style={[
                  styles.inputWrapper,
                  passwordFocused && styles.inputWrapperFocused,
                  isPasswordTooShort && styles.inputWrapperError,
                ]}
              >
                <View
                  style={[
                    styles.iconBadge,
                    isPasswordTooShort && styles.iconBadgeError,
                  ]}
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={18}
                    color={
                      isPasswordTooShort
                        ? Palette.brand.danger
                        : passwordFocused
                          ? Palette.blue[500]
                          : Palette.blue[400]
                    }
                  />
                </View>
                <TextInput
                  style={styles.textInput}
                  placeholder="Buat kata sandimu"
                  placeholderTextColor={Palette.text.inactive}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setShowPassword((prev) => !prev);
                  }}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={19}
                    color={Palette.text.inactive}
                  />
                </TouchableOpacity>
              </View>

              {/* Password Warning */}
              {isPasswordTooShort && (
                <ThemedText style={styles.errorText}>
                  Kata sandi minimal 6 karakter
                </ThemedText>
              )}
            </View>

            {/* Confirm Password Field */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>
                Konfirmasi kata sandi
              </ThemedText>
              <View
                style={[
                  styles.inputWrapper,
                  confirmPasswordFocused && styles.inputWrapperFocused,
                  isConfirmPasswordMismatch && styles.inputWrapperError,
                ]}
              >
                <View
                  style={[
                    styles.iconBadge,
                    isConfirmPasswordMismatch && styles.iconBadgeError,
                  ]}
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={18}
                    color={
                      isConfirmPasswordMismatch
                        ? Palette.brand.danger
                        : confirmPasswordFocused
                          ? Palette.blue[500]
                          : Palette.blue[400]
                    }
                  />
                </View>
                <TextInput
                  style={styles.textInput}
                  placeholder="Konfirmasi kata sandimu"
                  placeholderTextColor={Palette.text.inactive}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  onFocus={() => setConfirmPasswordFocused(true)}
                  onBlur={() => setConfirmPasswordFocused(false)}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setShowConfirmPassword((prev) => !prev);
                  }}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={
                      showConfirmPassword ? "eye-outline" : "eye-off-outline"
                    }
                    size={19}
                    color={Palette.text.inactive}
                  />
                </TouchableOpacity>
              </View>

              {/* Confirm Password Warning */}
              {isConfirmPasswordMismatch && (
                <ThemedText style={styles.errorText}>
                  Konfirmasi kata sandi tidak cocok
                </ThemedText>
              )}
            </View>

            {/* Next Button */}
            <TouchableOpacity
              style={[
                styles.primaryButton,
                {
                  backgroundColor: isValidForm
                    ? Palette.button.primary
                    : Palette.button.second,
                },
              ]}
              disabled={!isValidForm}
              onPress={handleNextPress}
              activeOpacity={isValidForm ? 0.85 : 1}
            >
              <ThemedText style={styles.primaryButtonText}>
                Selanjutnya
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Success Completion Notification Modal */}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {/* Green Checkmark Circle Icon */}
            <View style={styles.successCircle}>
              <Ionicons name="checkmark" size={32} color="#FFFFFF" />
            </View>

            {/* Notification Text */}
            <ThemedText style={styles.modalMessageText}>
              Congrats! Your password has been reset, please log in again
            </ThemedText>

            {/* Back to Login Button */}
            <TouchableOpacity
              style={styles.modalButton}
              activeOpacity={0.85}
              onPress={handleBackToLoginPress}
            >
              <ThemedText style={styles.modalButtonText}>
                Back to Login
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginBottom: 16,
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
  eyeButton: {
    padding: 6,
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
    marginTop: 8,
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
  /* Modal Styles matching iPhone 16 Plus - 24 mockup */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  modalCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  successCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#00C853",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#00C853",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  modalMessageText: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    fontWeight: "700",
    color: Palette.text.active,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  modalButton: {
    width: "100%",
    height: 48,
    borderRadius: 24,
    backgroundColor: Palette.button.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Palette.blue[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  modalButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
