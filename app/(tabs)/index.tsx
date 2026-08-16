import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Fonts, Palette } from '@/constants/theme';

type Step = 1 | 2 | 3 | 4;
type PreferenceType = 'visual' | 'hearing';

export default function OnboardingScreen() {
  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [preference, setPreference] = useState<PreferenceType>('visual');

  // Form State for Login Step
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Splash Screen Pulse Animation
  const splashScale = useSharedValue(0.9);
  const splashOpacity = useSharedValue(0);

  useEffect(() => {
    splashOpacity.value = withTiming(1, { duration: 600 });
    splashScale.value = withSpring(1, { damping: 12, stiffness: 100 });

    // Automatically transition from Step 1 to Step 2 after 2 seconds
    const timer = setTimeout(() => {
      if (step === 1) {
        goToStep(2);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const goToStep = (nextStep: Step) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setDirection(nextStep > step ? 'forward' : 'backward');
    setStep(nextStep);
  };

  const handleSelectPreference = (selected: PreferenceType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setPreference(selected);
    goToStep(3);
  };

  const handleMicPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsListening((prev) => !prev);
  };

  const handleLogin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (!email || !password) {
      Alert.alert('Info', 'Silakan masukkan email dan kata sandi Anda.');
      return;
    }
    Alert.alert('Sukses', `Login berhasil dengan email: ${email}`);
  };

  const handleRegister = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Daftar', 'Membuka formulir pendaftaran akun baru...');
  };

  const isFormFilled = email.trim().length > 0 && password.trim().length > 0;

  const enteringAnimation =
    direction === 'forward'
      ? SlideInRight.duration(350)
      : SlideInLeft.duration(350);

  const exitingAnimation =
    direction === 'forward'
      ? SlideOutLeft.duration(250)
      : SlideOutRight.duration(250);

  const splashAnimatedStyle = useAnimatedStyle(() => ({
    opacity: splashOpacity.value,
    transform: [{ scale: splashScale.value }],
  }));

  // ==========================================
  // STEP 1: SPLASH / WELCOME SCREEN
  // ==========================================
  if (step === 1) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.splashContainer}
        onPress={() => goToStep(2)}>
        <ImageBackground
          source={require('@/assets/images/bg-onboarding.png')}
          style={styles.splashBackground}
          resizeMode="cover">
          <SafeAreaView style={styles.splashSafeArea}>
            <Animated.View style={[styles.splashCenter, splashAnimatedStyle]}>
              <View style={styles.splashLogoRow}>
                <Image
                  source={require('@/assets/images/logo-arahkita.png')}
                  style={styles.splashLogo}
                  resizeMode="contain"
                />
                <ThemedText style={styles.splashText}>ArahKita</ThemedText>
              </View>
            </Animated.View>
          </SafeAreaView>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  // ==========================================
  // STEP 2, 3, & 4 SCREENS
  // ==========================================
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        
        {/* ==========================================
            STEP 2: DISABILITY / PREFERENCE SELECTION
        ========================================== */}
        {step === 2 && (
          <Animated.View
            key="step-2"
            entering={enteringAnimation}
            exiting={exitingAnimation}
            style={styles.stepContainer}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}>
              
              {/* Header: Logo + App Name */}
              <View style={styles.topLogoHeader}>
                <Image
                  source={require('@/assets/images/logo-arahkita.png')}
                  style={styles.headerLogoIcon}
                  resizeMode="contain"
                />
                <ThemedText style={styles.headerLogoText}>ArahKita</ThemedText>
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
                    source={require('@/assets/icons/ic-onboarding-voice.png')}
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
                  onPress={handleMicPress}>
                  <Image
                    source={require('@/assets/icons/ic-onboarding-mic.png')}
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
                  onPress={() => handleSelectPreference('visual')}>
                  <Image
                    source={require('@/assets/icons/ic-onboarding-blind.png')}
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
                  onPress={() => handleSelectPreference('hearing')}>
                  <Image
                    source={require('@/assets/icons/ic-onboarding-deaf.png')}
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
          </Animated.View>
        )}

        {/* ==========================================
            STEP 3: ACCOUNT PROMPT (DAFTAR / MASUK)
        ========================================== */}
        {step === 3 && (
          <Animated.View
            key="step-3"
            entering={enteringAnimation}
            exiting={exitingAnimation}
            style={styles.stepContainer}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}>
              
              {/* Header: Back Button + Centered Logo */}
              <View style={styles.navHeader}>
                <TouchableOpacity
                  style={styles.backButton}
                  activeOpacity={0.7}
                  onPress={() => goToStep(2)}>
                  <Ionicons name="chevron-back" size={22} color={Palette.text.active} />
                </TouchableOpacity>

                <View style={styles.navLogoCenter}>
                  <Image
                    source={require('@/assets/images/logo-arahkita.png')}
                    style={styles.headerLogoIcon}
                    resizeMode="contain"
                  />
                  <ThemedText style={styles.headerLogoText}>ArahKita</ThemedText>
                </View>

                <View style={styles.headerSpacer} />
              </View>

              {/* Selected Mode Banner Pill */}
              <View style={styles.selectedBanner}>
                <Image
                  source={
                    preference === 'hearing'
                      ? require('@/assets/icons/ic-onboarding-deaf.png')
                      : require('@/assets/icons/ic-onboarding-blind.png')
                  }
                  style={styles.selectedBannerIcon}
                  resizeMode="contain"
                />
                <ThemedText style={styles.selectedBannerText}>
                  {preference === 'hearing'
                    ? 'Saya tuna rungu atau memiliki gangguan pendengaran'
                    : 'Saya tuna netra atau memiliki gangguan penglihatan'}
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
                    source={require('@/assets/icons/ic-onboarding-voice.png')}
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
                  onPress={handleMicPress}>
                  <Image
                    source={require('@/assets/icons/ic-onboarding-mic.png')}
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
                  onPress={handleRegister}>
                  <ThemedText style={styles.secondaryAuthButtonText}>
                    Daftar
                  </ThemedText>
                </TouchableOpacity>

                {/* Masuk Button */}
                <TouchableOpacity
                  style={styles.primaryAuthButton}
                  activeOpacity={0.85}
                  onPress={() => goToStep(4)}>
                  <ThemedText style={styles.primaryAuthButtonText}>
                    Masuk
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Animated.View>
        )}

        {/* ==========================================
            STEP 4: FULL LOGIN / MASUK SCREEN
        ========================================== */}
        {step === 4 && (
          <Animated.View
            key="step-4"
            entering={enteringAnimation}
            exiting={exitingAnimation}
            style={styles.stepContainer}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              
              {/* Header Bar */}
              <View style={styles.navHeader}>
                <TouchableOpacity
                  style={styles.backButton}
                  activeOpacity={0.7}
                  onPress={() => goToStep(3)}>
                  <Ionicons name="chevron-back" size={22} color={Palette.text.active} />
                </TouchableOpacity>

                <ThemedText style={styles.screenTitle}>Masuk</ThemedText>

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
                    source={require('@/assets/icons/ic-onboarding-voice.png')}
                    style={styles.waveformImage}
                    resizeMode="contain"
                  />
                </View>

                {/* Glowing Microphone Button */}
                <TouchableOpacity
                  style={[
                    styles.micWrapper,
                    isListening && styles.micWrapperActive,
                  ]}
                  activeOpacity={0.8}
                  onPress={handleMicPress}>
                  <Image
                    source={require('@/assets/icons/ic-onboarding-mic.png')}
                    style={styles.micImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              {/* Form Fields */}
              <View style={styles.formContainer}>
                {/* Email Field */}
                <View style={styles.inputGroup}>
                  <ThemedText style={styles.label}>Email</ThemedText>
                  <View
                    style={[
                      styles.inputWrapper,
                      emailFocused && styles.inputWrapperFocused,
                    ]}>
                    <View style={styles.iconBadge}>
                      <Ionicons
                        name="mail-outline"
                        size={18}
                        color={emailFocused ? Palette.blue[500] : Palette.blue[400]}
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
                </View>

                {/* Password Field */}
                <View style={styles.inputGroup}>
                  <ThemedText style={styles.label}>Kata Sandi</ThemedText>
                  <View
                    style={[
                      styles.inputWrapper,
                      passwordFocused && styles.inputWrapperFocused,
                    ]}>
                    <View style={styles.iconBadge}>
                      <Ionicons
                        name="lock-closed-outline"
                        size={18}
                        color={passwordFocused ? Palette.blue[500] : Palette.blue[400]}
                      />
                    </View>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Masukkan kata sandimu"
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
                      activeOpacity={0.7}>
                      <Ionicons
                        name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                        size={19}
                        color={Palette.text.inactive}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Forgot Password Link */}
                <TouchableOpacity
                  style={styles.forgotPasswordContainer}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    Alert.alert('Lupa Sandi', 'Tautan pemulihan kata sandi akan dikirim ke email Anda.');
                  }}
                  activeOpacity={0.7}>
                  <ThemedText style={styles.forgotPasswordText}>Lupa sandi?</ThemedText>
                </TouchableOpacity>

                {/* Login Button */}
                <TouchableOpacity
                  style={[
                    styles.primaryButton,
                    {
                      backgroundColor: isFormFilled
                        ? Palette.button.primary
                        : Palette.button.second,
                    },
                  ]}
                  onPress={handleLogin}
                  activeOpacity={0.85}>
                  <ThemedText style={styles.primaryButtonText}>Login</ThemedText>
                </TouchableOpacity>

                {/* Google Sign-In Button */}
                <TouchableOpacity
                  style={styles.googleButton}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    Alert.alert('Google Sign-In', 'Melanjutkan dengan akun Google...');
                  }}
                  activeOpacity={0.85}>
                  <Ionicons name="logo-google" size={18} color="#FFFFFF" style={styles.btnIcon} />
                  <ThemedText style={styles.socialButtonText}>
                    Lanjutkan dengan Google
                  </ThemedText>
                </TouchableOpacity>

                {/* Facebook Sign-In Button */}
                <TouchableOpacity
                  style={styles.facebookButton}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    Alert.alert('Facebook Sign-In', 'Melanjutkan dengan akun Facebook...');
                  }}
                  activeOpacity={0.85}>
                  <Ionicons name="logo-facebook" size={20} color="#FFFFFF" style={styles.btnIcon} />
                  <ThemedText style={styles.socialButtonText}>
                    Lanjutkan dengan Facebook
                  </ThemedText>
                </TouchableOpacity>

                {/* Footer Registration Link */}
                <View style={styles.footer}>
                  <ThemedText style={styles.footerNormalText}>
                    Belum punya akun?{' '}
                  </ThemedText>
                  <TouchableOpacity onPress={handleRegister} activeOpacity={0.7}>
                    <ThemedText style={styles.footerLinkText}>Daftar</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </Animated.View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFCFE',
  },
  keyboardView: {
    flex: 1,
  },
  stepContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },

  // ==========================================
  // SPLASH SCREEN (STEP 1) STYLES
  // ==========================================
  splashContainer: {
    flex: 1,
    backgroundColor: '#5590FF',
  },
  splashBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  splashSafeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  splashLogo: {
    width: 58,
    height: 58,
    borderRadius: 14,
  },
  splashText: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },

  // ==========================================
  // STEP 2 & 3 HEADER STYLES
  // ==========================================
  topLogoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 16,
    gap: 8,
  },
  headerLogoIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
  },
  headerLogoText: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    fontWeight: '700',
    color: Palette.text.active,
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  navLogoCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  screenTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    fontWeight: '700',
    color: Palette.text.active,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EDF3FD',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  headerSpacer: {
    width: 44,
  },

  // ==========================================
  // ASSISTANT CARD STYLES
  // ==========================================
  assistantCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: '#E7EFFC',
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 20,
    padding: 14,
    alignItems: 'center',
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  greetingBox: {
    width: '100%',
    backgroundColor: Palette.blue[100],
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  greetingTitle: {
    fontFamily: Fonts.medium,
    fontSize: 13.5,
    fontWeight: '500',
    color: Palette.text.active,
    textAlign: 'center',
  },
  greetingSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 12.5,
    color: Palette.text.inactive,
    textAlign: 'center',
    marginTop: 4,
  },
  waveContainer: {
    width: '100%',
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  waveformImage: {
    width: '92%',
    height: '100%',
  },
  micWrapper: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -4,
  },
  micWrapperActive: {
    transform: [{ scale: 1.08 }],
  },
  micImage: {
    width: 72,
    height: 72,
  },

  // ==========================================
  // STEP 2: OPTIONS STYLES
  // ==========================================
  optionsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  optionCard: {
    backgroundColor: Palette.blue[100],
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  optionIcon: {
    width: 40,
    height: 40,
  },
  optionText: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: 12.5,
    fontWeight: '500',
    color: Palette.blue[700],
    paddingHorizontal: 12,
    lineHeight: 17,
  },
  chevronCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Palette.button.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ==========================================
  // STEP 3: BANNER & AUTH BUTTONS
  // ==========================================
  selectedBanner: {
    backgroundColor: Palette.blue[100],
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  selectedBannerIcon: {
    width: 38,
    height: 38,
  },
  selectedBannerText: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: 12.5,
    fontWeight: '500',
    color: Palette.blue[700],
    paddingHorizontal: 12,
    lineHeight: 17,
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
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Palette.blue[500],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  secondaryAuthButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    fontWeight: '600',
    color: Palette.blue[700],
  },
  primaryAuthButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: Palette.button.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Palette.blue[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryAuthButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // ==========================================
  // STEP 4: FORM STYLES
  // ==========================================
  formContainer: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    fontWeight: '600',
    color: Palette.text.active,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: '#E6EDF8',
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
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Palette.blue[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 12,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Palette.text.active,
  },
  eyeButton: {
    padding: 6,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginTop: -4,
  },
  forgotPasswordText: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    fontWeight: '500',
    color: Palette.brand.danger,
  },
  primaryButton: {
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontWeight: '600',
    color: '#FFFFFF',
  },
  googleButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: Palette.brand.google,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontWeight: '600',
    color: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontWeight: '600',
    color: Palette.blue[500],
  },
});
