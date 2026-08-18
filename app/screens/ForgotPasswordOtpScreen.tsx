import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { Fonts, Palette } from "@/constants/theme";

interface ForgotPasswordOtpScreenProps {
  email: string;
  onBack: () => void;
  onNext: (otpCode: string) => void;
}

export default function ForgotPasswordOtpScreen({
  email,
  onBack,
  onNext,
}: ForgotPasswordOtpScreenProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [isListening, setIsListening] = useState(false);

  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  // Countdown timer for Resend Code
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const otpCode = otp.join("");
  const isOtpComplete =
    otpCode.length === 4 && otp.every((digit) => digit.trim() !== "");

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    const digit = text.slice(-1);
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit !== "" && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleResendCode = () => {
    if (timer > 0) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTimer(30);
    Alert.alert(
      "Kode Dikirim",
      `Kode verifikasi baru telah dikirimkan ke ${email}`,
    );
  };

  const handleHelpPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(
      "Mengalami Kesulitan?",
      "Pastikan memeriksa folder Spam email Anda, atau hubungi tim bantuan ArahKita.",
    );
  };

  const handleMicPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsListening((prev) => !prev);
  };

  const handleBackPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onBack();
  };

  const handleNextPress = () => {
    if (!isOtpComplete) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onNext(otpCode);
  };

  return (
    <ImageBackground
      source={require("@/assets/images/bg-forgot-password.png")}
      style={styles.bgImage}
      resizeMode="cover"
    >
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
                  Verifikasi Emailmu
                </ThemedText>
                <ThemedText style={styles.greetingSubtitle}>
                  Kami telah mengirimkan kode verifikasi, silakan masukkan kode
                  tersebut di bawah ini.
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
              <ThemedText style={styles.label}>Kode Verifikasi</ThemedText>

              {/* 4 OTP Box Input Fields */}
              <View style={styles.otpRow}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={inputRefs[index]}
                    style={[styles.otpBox, digit !== "" && styles.otpBoxFilled]}
                    value={digit}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                  />
                ))}
              </View>

              {/* Below OTP Row Links (Timer / Resend & Help) */}
              <View style={styles.otpFooterRow}>
                <TouchableOpacity
                  onPress={handleResendCode}
                  disabled={timer > 0}
                  activeOpacity={0.7}
                >
                  <ThemedText style={styles.timerText}>
                    {timer > 0 ? `${timer} s ` : ""}
                    <ThemedText
                      style={[
                        styles.resendLink,
                        timer > 0 && styles.resendLinkDisabled,
                      ]}
                    >
                      Kirim ulang kode
                    </ThemedText>
                  </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleHelpPress} activeOpacity={0.7}>
                  <ThemedText style={styles.helpLink}>
                    Mengalami kesulitan?
                  </ThemedText>
                </TouchableOpacity>
              </View>

              {/* Next Button */}
              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  {
                    backgroundColor: isOtpComplete
                      ? Palette.button.primary
                      : Palette.button.second,
                  },
                ]}
                disabled={!isOtpComplete}
                onPress={handleNextPress}
                activeOpacity={isOtpComplete ? 0.85 : 1}
              >
                <ThemedText style={styles.primaryButtonText}>
                  Selanjutnya
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  label: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: Palette.text.active,
    marginBottom: 12,
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 14,
  },
  otpBox: {
    flex: 1,
    height: 62,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: "#E6EDF8",
    textAlign: "center",
    fontFamily: Fonts.bold,
    fontSize: 18,
    fontWeight: "700",
    color: Palette.text.active,
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  otpBoxFilled: {
    borderColor: Palette.blue[500],
    backgroundColor: "#FAFCFF",
  },
  otpFooterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
    paddingHorizontal: 2,
  },
  timerText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Palette.text.inactive,
  },
  resendLink: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: Palette.blue[500],
  },
  resendLinkDisabled: {
    color: Palette.text.inactive,
  },
  helpLink: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: Palette.blue[500],
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
