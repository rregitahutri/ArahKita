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

interface RegisterNameScreenProps {
  initialFirstName?: string;
  initialLastName?: string;
  onBack: () => void;
  onSubmit: (firstName: string, lastName: string) => void;
  onLogin: () => void;
}

export default function RegisterNameScreen({
  initialFirstName = "",
  initialLastName = "",
  onBack,
  onSubmit,
  onLogin,
}: RegisterNameScreenProps) {
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [isListening, setIsListening] = useState(false);
  const [firstNameFocused, setFirstNameFocused] = useState(false);
  const [lastNameFocused, setLastNameFocused] = useState(false);

  const isFirstNameEmpty = firstName.trim().length === 0;
  const isLastNameEmpty = lastName.trim().length === 0;

  const isValidForm = !isFirstNameEmpty && !isLastNameEmpty;

  const handleMicPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsListening((prev) => !prev);
  };

  const handleBackPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onBack();
  };

  const handleSubmitPress = () => {
    if (!isValidForm) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSubmit(firstName.trim(), lastName.trim());
  };

  const handleGoogleRegister = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert("Google Sign-In", "Mendaftar dengan akun Google...");
  };

  const handleFacebookRegister = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert("Facebook Sign-In", "Mendaftar dengan akun Facebook...");
  };

  const handleLoginPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onLogin();
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

            <ThemedText style={styles.screenTitle}>Daftar</ThemedText>

            <View style={styles.headerSpacer} />
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
            {/* First Name Field */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Nama Depan</ThemedText>
              <View
                style={[
                  styles.inputWrapper,
                  firstNameFocused && styles.inputWrapperFocused,
                ]}
              >
                <View style={styles.iconBadge}>
                  <Ionicons
                    name="person-outline"
                    size={18}
                    color={
                      firstNameFocused ? Palette.blue[500] : Palette.blue[400]
                    }
                  />
                </View>
                <TextInput
                  style={styles.textInput}
                  placeholder="Masukkan nama depan"
                  placeholderTextColor={Palette.text.inactive}
                  value={firstName}
                  onChangeText={setFirstName}
                  onFocus={() => setFirstNameFocused(true)}
                  onBlur={() => setFirstNameFocused(false)}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Last Name Field */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Nama Belakang</ThemedText>
              <View
                style={[
                  styles.inputWrapper,
                  lastNameFocused && styles.inputWrapperFocused,
                ]}
              >
                <View style={styles.iconBadge}>
                  <Ionicons
                    name="person-outline"
                    size={18}
                    color={
                      lastNameFocused ? Palette.blue[500] : Palette.blue[400]
                    }
                  />
                </View>
                <TextInput
                  style={styles.textInput}
                  placeholder="Masukkan nama belakang"
                  placeholderTextColor={Palette.text.inactive}
                  value={lastName}
                  onChangeText={setLastName}
                  onFocus={() => setLastNameFocused(true)}
                  onBlur={() => setLastNameFocused(false)}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Final Register Button (Disabled when form is invalid/incomplete) */}
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
              onPress={handleSubmitPress}
              activeOpacity={isValidForm ? 0.85 : 1}
            >
              <ThemedText style={styles.primaryButtonText}>Daftar</ThemedText>
            </TouchableOpacity>

            {/* Google Register Button */}
            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleRegister}
              activeOpacity={0.85}
            >
              <Ionicons
                name="logo-google"
                size={18}
                color="#FFFFFF"
                style={styles.btnIcon}
              />
              <ThemedText style={styles.socialButtonText}>
                Daftar dengan Google
              </ThemedText>
            </TouchableOpacity>

            {/* Facebook Register Button */}
            <TouchableOpacity
              style={styles.facebookButton}
              onPress={handleFacebookRegister}
              activeOpacity={0.85}
            >
              <Ionicons
                name="logo-facebook"
                size={20}
                color="#FFFFFF"
                style={styles.btnIcon}
              />
              <ThemedText style={styles.socialButtonText}>
                Daftar dengan Facebook
              </ThemedText>
            </TouchableOpacity>

            {/* Footer Login Link */}
            <View style={styles.footer}>
              <ThemedText style={styles.footerNormalText}>
                Sudah punya akun?{" "}
              </ThemedText>
              <TouchableOpacity onPress={handleLoginPress} activeOpacity={0.7}>
                <ThemedText style={styles.footerLinkText}>Masuk</ThemedText>
              </TouchableOpacity>
            </View>
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
  googleButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: Palette.brand.google,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: Palette.brand.google,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  facebookButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: Palette.brand.facebook,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: Palette.brand.facebook,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  btnIcon: {
    marginRight: 8,
  },
  socialButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 12,
  },
  footerNormalText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Palette.text.active,
  },
  footerLinkText: {
    fontFamily: Fonts.semiBold,
    fontSize: 13,
    fontWeight: "600",
    color: Palette.blue[500],
  },
});
