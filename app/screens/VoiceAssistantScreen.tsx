import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { Fonts, Palette } from "@/constants/theme";

export interface VoiceAssistantScreenProps {
  onBack?: () => void;
  onNavigateToRoute?: () => void;
}

const FULL_WORDS = [
  "Jam",
  "11",
  "siang",
  "nanti",
  "aku",
  "mau",
  "ke",
  "Stasiun",
  "Pasar",
  "Senen,",
  "gimana",
  "rutenya?",
];

export default function VoiceAssistantScreen({
  onBack,
  onNavigateToRoute,
}: VoiceAssistantScreenProps) {
  // Step 1: Greeting ("Ada yang bisa kami bantu?")
  // Step 2: Listening ("Sedang Mendengarkan......")
  // Step 3: Response ("Jaraknya 800 meter...")
  const [voiceStep, setVoiceStep] = useState<1 | 2 | 3>(1);
  const [visibleWordCount, setVisibleWordCount] = useState(0);

  // Subtle breathing animation for center avatar circle
  const pulseCircleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulseCircleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseCircleAnim, {
          toValue: 1.06,
          duration: 1400,
          useNativeDriver: true,
        }),
        Animated.timing(pulseCircleAnim, {
          toValue: 1,
          duration: 1400,
          useNativeDriver: true,
        }),
      ]),
    );

    pulseCircleAnimation.start();

    return () => {
      pulseCircleAnimation.stop();
    };
  }, [pulseCircleAnim]);

  // Word-by-Word Live Speech Typewriter Animation in Step 2
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (voiceStep === 2) {
      setVisibleWordCount(1);
      interval = setInterval(() => {
        setVisibleWordCount((prev) => {
          if (prev < FULL_WORDS.length) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            return prev + 1;
          }
          if (interval) clearInterval(interval);
          return prev;
        });
      }, 230);
    } else {
      setVisibleWordCount(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [voiceStep]);

  // Automatic Step Progression: Step 1 -> Step 2 -> Step 3
  useEffect(() => {
    let timer1: ReturnType<typeof setTimeout> | null = null;
    let timer2: ReturnType<typeof setTimeout> | null = null;

    if (voiceStep === 1) {
      timer1 = setTimeout(() => {
        setVoiceStep(2);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }, 2500);
    } else if (voiceStep === 2) {
      timer2 = setTimeout(() => {
        setVoiceStep(3);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }, 3800);
    }

    return () => {
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
    };
  }, [voiceStep]);

  const handleBackPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onBack) {
      onBack();
    } else {
      Alert.alert("Kembali", "Kembali ke halaman sebelumnya.");
    }
  };

  const handleHangup = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (onBack) {
      onBack();
    } else {
      Alert.alert("Selesai", "Sesi asisten suara diakhiri.");
    }
  };

  const handleYesGuide = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      "Panduan Rute",
      "Memulai panduan rute navigasi ke Stasiun Pasar Senen...",
      [
        {
          text: "Mulai Navigasi",
          onPress: () => {
            if (onNavigateToRoute) onNavigateToRoute();
            else if (onBack) onBack();
          },
        },
      ],
    );
  };

  const handleNoGuide = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onBack) {
      onBack();
    } else {
      Alert.alert("Info", "Panduan rute dibatalkan.");
    }
  };

  const renderedWords = FULL_WORDS.slice(0, visibleWordCount);

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

            <ThemedText style={styles.screenTitle}>Asisten Suara</ThemedText>

            <View style={styles.headerSpacer} />
          </View>

          {/* Main Interactive Stage */}
          <View style={styles.stageContainer}>
            {/* Center Avatar & Static Wave Container */}
            <View style={styles.centerAvatarWrapper}>
              {/* Static Wave Background Asset img-ai-voice.png */}
              <View style={styles.waveBackgroundLayer}>
                <Image
                  source={require("@/assets/images/img-ai-voice.png")}
                  style={styles.waveImage}
                  resizeMode="contain"
                />
              </View>

              {/* Center Avatar Circle */}
              <Animated.View
                style={[
                  styles.avatarOuterRing,
                  { transform: [{ scale: pulseCircleAnim }] },
                ]}
              >
                <View style={styles.avatarInnerCircle}>
                  <Image
                    source={
                      voiceStep === 2
                        ? require("@/assets/icons/ic-ai-voice.png")
                        : require("@/assets/icons/ic-ai-logo.png")
                    }
                    style={
                      voiceStep === 2
                        ? styles.avatarMicIcon
                        : styles.avatarIllustrationIcon
                    }
                    resizeMode="contain"
                  />
                </View>
              </Animated.View>
            </View>

            {/* Step Status Capsule Badge */}
            <View style={styles.statusCapsule}>
              <ThemedText style={styles.statusCapsuleText}>
                {voiceStep === 2 ? "Sedang Mendengarkan......" : "Sahabat AI"}
              </ThemedText>
            </View>

            {/* Step Content Area */}
            <View style={styles.contentArea}>
              {/* STEP 1: AI Initial Prompt */}
              {voiceStep === 1 && (
                <View style={styles.stepContentBox}>
                  <ThemedText style={styles.step1PromptTitle}>
                    Ada yang bisa kami bantu?
                  </ThemedText>

                  {/* Pulsing Dots */}
                  <View style={styles.dotsRow}>
                    <View style={[styles.dotPill, styles.dotPillActive]} />
                    <View style={styles.dotPill} />
                    <View style={[styles.dotPill, styles.dotPillActive]} />
                  </View>
                </View>
              )}

              {/* STEP 2: User Speaking / Listening (Word by Word Live Animation) */}
              {voiceStep === 2 && (
                <View style={styles.stepContentBox}>
                  <ThemedText style={styles.step2SpeechText}>
                    {renderedWords.map((word, index) => {
                      const isBold = word.toLowerCase().includes("stasiun");
                      const isGray = index >= 8;
                      return (
                        <ThemedText
                          key={index}
                          style={[
                            styles.wordText,
                            isBold && styles.boldSpeechText,
                            isGray && styles.subtleSpeechText,
                          ]}
                        >
                          {word}{" "}
                        </ThemedText>
                      );
                    })}
                  </ThemedText>

                  {/* Glowing Animated Soundbar */}
                  <View style={styles.soundbarRow}>
                    <View style={[styles.soundbar, { height: 16 }]} />
                    <View style={[styles.soundbar, { height: 26 }]} />
                    <View style={[styles.soundbar, { height: 18 }]} />
                  </View>
                </View>
              )}

              {/* STEP 3: AI Response & Confirmation Buttons */}
              {voiceStep === 3 && (
                <View style={styles.stepContentBox}>
                  <ThemedText style={styles.userSpeechPreview}>
                    Jam 11 siang nanti aku mau ke Stasiun Pasar Senen, gimana
                    rutenya?
                  </ThemedText>

                  <ThemedText style={styles.aiResponseText}>
                    Jaraknya 800 meter dari rumah jika menggunakan mobil. Ada
                    akses lift dan jalur pemandu. Mau aku pandu rutenya?
                  </ThemedText>

                  {/* Action Buttons: Ya & Tidak Perlu */}
                  <View style={styles.actionButtonsRow}>
                    <TouchableOpacity
                      style={styles.yesButton}
                      activeOpacity={0.85}
                      onPress={handleYesGuide}
                    >
                      <ThemedText style={styles.yesButtonText}>Ya</ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.noButton}
                      activeOpacity={0.8}
                      onPress={handleNoGuide}
                    >
                      <ThemedText style={styles.noButtonText}>
                        Tidak perlu
                      </ThemedText>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>

            {/* Bottom Red Hangup / End Call Button */}
            <View style={styles.bottomCallContainer}>
              <TouchableOpacity
                style={styles.hangupButton}
                activeOpacity={0.85}
                onPress={handleHangup}
              >
                <Image
                  source={require("@/assets/icons/ic-ai-phone.png")}
                  style={styles.hangupIconAsset}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
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
    paddingTop: 8,
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

  /* Stage Container */
  stageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 24,
  },

  /* Center Avatar & Wave Container */
  centerAvatarWrapper: {
    marginTop: 34,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    height: 160,
  },

  /* Static Wave Background Asset img-ai-voice.png */
  waveBackgroundLayer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  waveImage: {
    width: "100%",
    height: "100%",
  },

  avatarOuterRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(85, 144, 255, 0.18)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
  },
  avatarInnerCircle: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: Palette.blue[500],
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Palette.blue[500],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  avatarIllustrationIcon: {
    width: 64,
    height: 64,
  },
  avatarMicIcon: {
    width: 44,
    height: 44,
  },

  /* Status Capsule Badge */
  statusCapsule: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E7EFFC",
    marginTop: 14,
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  statusCapsuleText: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    color: Palette.text.active,
  },

  /* Step Content Area */
  contentArea: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  stepContentBox: {
    width: "100%",
    alignItems: "center",
  },

  /* Step 1 Styles */
  step1PromptTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    fontWeight: "600",
    color: Palette.text.active,
    marginBottom: 14,
    textAlign: "center",
  },
  dotsRow: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  dotPill: {
    width: 10,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#CBDAF6",
  },
  dotPillActive: {
    width: 14,
    backgroundColor: Palette.blue[500],
  },

  /* Step 2 Styles */
  step2SpeechText: {
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: Palette.text.active,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 16,
  },
  wordText: {
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: Palette.text.active,
  },
  boldSpeechText: {
    fontFamily: Fonts.bold,
    fontWeight: "700",
    color: Palette.text.active,
  },
  subtleSpeechText: {
    color: Palette.text.inactive,
  },
  soundbarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  soundbar: {
    width: 6,
    borderRadius: 3,
    backgroundColor: Palette.blue[500],
  },

  /* Step 3 Styles */
  userSpeechPreview: {
    fontFamily: Fonts.regular,
    fontSize: 12.5,
    color: Palette.text.inactive,
    textAlign: "center",
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  aiResponseText: {
    fontFamily: Fonts.medium,
    fontSize: 14.5,
    fontWeight: "500",
    color: Palette.text.active,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  actionButtonsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width: "100%",
  },
  yesButton: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: Palette.button.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Palette.blue[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  yesButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  noButton: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F0F4FA",
    alignItems: "center",
    justifyContent: "center",
  },
  noButtonText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Palette.text.inactive,
  },

  /* Bottom Red Call Button */
  bottomCallContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  hangupButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#FF4D4D",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF4D4D",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  hangupIconAsset: {
    width: 32,
    height: 32,
  },
});
