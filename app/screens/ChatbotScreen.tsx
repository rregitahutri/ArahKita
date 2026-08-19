import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  ImageBackground,
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

export interface ChatbotScreenProps {
  onBack?: () => void;
  onNavigateToVoiceAssistant?: () => void;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  hasActions?: boolean;
  mapPreview?: boolean;
  voiceCallCard?: boolean;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    sender: "user",
    text: "Stasiun terdekat dari sini apa ya yang ramah untuk difabel?",
  },
  {
    id: "2",
    sender: "ai",
    text: "Stasiun terdekat adalah Stasiun MRT Fatmawati, jaraknya sekitar 800 meter. Akses lift dan jalur pemandu tersedia ✅",
    hasActions: true,
  },
  {
    id: "3",
    sender: "user",
    text: "Arah akses ke sananya gimana?",
  },
  {
    id: "4",
    sender: "ai",
    text: "Aku akan pandu rute yang aman untukmu. Keluar ke arah utara, lalu berjalan lurus sekitar 200 meter. Apakah kamu ingin panduan suara?",
    hasActions: true,
    mapPreview: true,
  },
  {
    id: "5",
    sender: "user",
    text: "Bolehh deh",
  },
  {
    id: "6",
    sender: "ai",
    text: "Baik. Panduan suara diaktifkan. Beri tahu aku kalau kamu butuh bantuan atau ingin berhenti.",
    voiceCallCard: true,
  },
];

// Single Animated Chat Bubble Component
function AnimatedBubble({
  message,
  index,
  onOpenVoiceCall,
  onOpenMapRoute,
}: {
  message: ChatMessage;
  index: number;
  onOpenVoiceCall: () => void;
  onOpenMapRoute: () => void;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
      ]).start();
    }, index * 1500);

    return () => clearTimeout(timer);
  }, [fadeAnim, translateYAnim, index]);

  const handleAction = (actionName: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert("Aksi AI", `Fitur ${actionName} dipilih.`);
  };

  const isUser = message.sender === "user";

  return (
    <Animated.View
      style={[
        styles.messageRow,
        isUser ? styles.userRow : styles.aiRow,
        {
          opacity: fadeAnim,
          transform: [{ translateY: translateYAnim }],
        },
      ]}
    >
      {/* AI Avatar for AI messages */}
      {!isUser && (
        <View style={styles.aiAvatarContainer}>
          <Image
            source={require("@/assets/icons/ic-ai-logo.png")}
            style={styles.aiAvatarIcon}
            resizeMode="contain"
          />
        </View>
      )}

      <View
        style={[
          styles.bubbleWrapper,
          isUser ? styles.userWrapper : styles.aiWrapper,
        ]}
      >
        {/* Chat Text Bubble */}
        <View
          style={[
            styles.chatBubble,
            isUser ? styles.userBubble : styles.aiBubble,
          ]}
        >
          <ThemedText style={isUser ? styles.userText : styles.aiText}>
            {message.text}
          </ThemedText>
        </View>

        {/* Map Route Card (Bubble 4) */}
        {message.mapPreview && (
          <View style={styles.mapCard}>
            <Image
              source={require("@/assets/images/img-ai-rute.png")}
              style={styles.mapImage}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={styles.mapButton}
              activeOpacity={0.8}
              onPress={onOpenMapRoute}
            >
              <ThemedText style={styles.mapButtonText}>
                Buka Panduan Rute
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}

        {/* AI Response Action Icons Row */}
        {message.hasActions && (
          <View style={styles.actionIconRow}>
            <TouchableOpacity
              style={styles.actionIconButton}
              onPress={() => handleAction("Volume Suara")}
            >
              <Image
                source={require("@/assets/icons/ic-ai-volume.png")}
                style={styles.actionIconAsset}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionIconButton}
              onPress={() => handleAction("Salin Teks")}
            >
              <Image
                source={require("@/assets/icons/ic-ai-copy.png")}
                style={styles.actionIconAsset}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionIconButton}
              onPress={() => handleAction("Sukai")}
            >
              <Image
                source={require("@/assets/icons/ic-ai-like.png")}
                style={styles.actionIconAsset}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionIconButton}
              onPress={() => handleAction("Tidak Suka")}
            >
              <Image
                source={require("@/assets/icons/ic-ai-dislike.png")}
                style={styles.actionIconAsset}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionIconButton}
              onPress={() => handleAction("Muat Ulang")}
            >
              <Image
                source={require("@/assets/icons/ic-ai-reload.png")}
                style={styles.actionIconAsset}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Voice Call Card (Bubble 6) */}
        {message.voiceCallCard && (
          <View style={styles.voiceCallCard}>
            <View style={styles.voiceCallPromptBox}>
              <View style={styles.voiceMicIconCircle}>
                <Image
                  source={require("@/assets/icons/ic-ai-mic.png")}
                  style={styles.voiceMicIconAsset}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.voiceTextGroup}>
                <ThemedText style={styles.voiceCallTitle}>
                  Bantuan Voice Call
                </ThemedText>
                <ThemedText style={styles.voiceCallSubtitle}>
                  Lewati rute sesuai arahan melalui voice call
                </ThemedText>
              </View>
            </View>

            <TouchableOpacity
              style={styles.voiceCallButton}
              activeOpacity={0.85}
              onPress={onOpenVoiceCall}
            >
              <ThemedText style={styles.voiceCallButtonText}>
                Panggil Voice
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Animated.View>
  );
}

export default function ChatbotScreen({
  onBack,
  onNavigateToVoiceAssistant,
}: ChatbotScreenProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  const handleBackPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onBack) {
      onBack();
    } else {
      Alert.alert("Kembali", "Kembali ke halaman sebelumnya.");
    }
  };

  const handleHeaderCallPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (onNavigateToVoiceAssistant) {
      onNavigateToVoiceAssistant();
    } else {
      Alert.alert("Panggil Voice", "Membuka sesi panggilan asisten suara.");
    }
  };

  const handleSendMessage = () => {
    if (inputText.trim().length === 0) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: inputText.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Auto reply mock AI
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "Terima kasih atas pertanyaannya! Saya siap membantu rute perjalanan Anda.",
        hasActions: true,
      };
      setMessages((prev) => [...prev, aiMsg]);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 1000);
  };

  const handleAttachFile = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert("Lampirkan File", "Pilih dokumen atau gambar untuk dikirim.");
  };

  return (
    <ImageBackground
      source={require("@/assets/images/bg-homepage.png")}
      style={styles.bgImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
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

            <ThemedText style={styles.screenTitle}>Chatbot</ThemedText>

            <TouchableOpacity
              style={styles.callButton}
              activeOpacity={0.7}
              onPress={handleHeaderCallPress}
            >
              <Image
                source={require("@/assets/icons/ic-edit-phone.png")}
                style={styles.phoneIconAsset}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Scrollable Animated Messages Area */}
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }
          >
            {messages.map((msg, idx) => (
              <AnimatedBubble
                key={msg.id}
                message={msg}
                index={idx}
                onOpenVoiceCall={
                  onNavigateToVoiceAssistant || handleHeaderCallPress
                }
                onOpenMapRoute={() =>
                  Alert.alert("Panduan Rute", "Membuka panduan rute navigasi.")
                }
              />
            ))}
          </ScrollView>

          {/* Bottom Capsule Input Bar */}
          <View style={styles.bottomInputContainer}>
            <View style={styles.inputCapsule}>
              <TouchableOpacity
                style={styles.attachButton}
                activeOpacity={0.7}
                onPress={handleAttachFile}
              >
                <Image
                  source={require("@/assets/icons/ic-ai-file.png")}
                  style={styles.attachIconAsset}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <TextInput
                style={styles.textInput}
                placeholder="Ketik disini.."
                placeholderTextColor={Palette.text.inactive}
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={handleSendMessage}
              />

              <TouchableOpacity
                style={[
                  styles.sendButton,
                  inputText.trim().length > 0 && styles.sendButtonActive,
                ]}
                activeOpacity={0.85}
                onPress={handleSendMessage}
              >
                <Image
                  source={require("@/assets/icons/ic-ai-send.png")}
                  style={styles.sendIconAsset}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
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
  navHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
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
  callButton: {
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
  phoneIconAsset: {
    width: 20,
    height: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    gap: 16,
  },

  /* Message Rows */
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  userRow: {
    justifyContent: "flex-end",
  },
  aiRow: {
    justifyContent: "flex-start",
  },
  aiAvatarContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#F0F5FE",
    borderWidth: 1,
    borderColor: "#E2EDFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 2,
  },
  aiAvatarIcon: {
    width: 26,
    height: 26,
  },
  bubbleWrapper: {
    maxWidth: "80%",
  },
  userWrapper: {
    alignItems: "flex-end",
  },
  aiWrapper: {
    alignItems: "flex-start",
  },

  /* Chat Bubbles */
  chatBubble: {
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  userBubble: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.2,
    borderColor: "#E6EDF8",
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.2,
    borderColor: "#E7EFFC",
    borderTopLeftRadius: 4,
  },
  userText: {
    fontFamily: Fonts.regular,
    fontSize: 13.5,
    color: Palette.text.active,
    lineHeight: 19,
  },
  aiText: {
    fontFamily: Fonts.regular,
    fontSize: 13.5,
    color: Palette.text.active,
    lineHeight: 19,
  },

  /* AI Action Icon Row */
  actionIconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
    marginLeft: 4,
  },
  actionIconButton: {
    padding: 2,
  },
  actionIconAsset: {
    width: 18,
    height: 18,
  },

  /* Map Card Preview */
  mapCard: {
    width: 220,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: "#E7EFFC",
    overflow: "hidden",
    marginTop: 10,
    padding: 8,
  },
  mapImage: {
    width: "100%",
    height: 130,
    borderRadius: 12,
  },
  mapButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  mapButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 12.5,
    fontWeight: "600",
    color: Palette.blue[500],
  },

  /* Voice Call Card Container */
  voiceCallCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: "#E7EFFC",
    padding: 12,
    marginTop: 10,
  },
  voiceCallPromptBox: {
    backgroundColor: Palette.blue[100],
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  voiceMicIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  voiceMicIconAsset: {
    width: 20,
    height: 20,
  },
  voiceTextGroup: {
    flex: 1,
  },
  voiceCallTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 13,
    fontWeight: "600",
    color: Palette.text.active,
  },
  voiceCallSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: Palette.text.inactive,
    marginTop: 2,
  },
  voiceCallButton: {
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
  voiceCallButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  /* Bottom Capsule Input Bar */
  bottomInputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "transparent",
  },
  inputCapsule: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    borderWidth: 1.2,
    borderColor: "#E6EDF8",
    height: 52,
    paddingHorizontal: 8,
    shadowColor: Palette.blue[300],
    elevation: 1.5,
  },
  attachButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },
  attachIconAsset: {
    width: 22,
    height: 22,
  },
  textInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 10,
    fontFamily: Fonts.regular,
    fontSize: 13.5,
    color: Palette.text.active,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Palette.button.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 2,
  },
  sendButtonActive: {
    backgroundColor: Palette.blue[700],
  },
  sendIconAsset: {
    width: 20,
    height: 20,
  },
});
