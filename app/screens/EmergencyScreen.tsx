import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef } from "react";
import {
  Alert,
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { Fonts, Palette } from "@/constants/theme";

export interface EmergencyScreenProps {
  onBack?: () => void;
}

export default function EmergencyScreen({ onBack }: EmergencyScreenProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseRingAnim = useRef(new Animated.Value(1)).current;

  // Continuous Expanding and Contracting (Breathing) Pulse Animation
  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.08,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(pulseRingAnim, {
            toValue: 1.16,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(pulseRingAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ]),
      ]),
    );

    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, [pulseAnim, pulseRingAnim]);

  const handleBackPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onBack) {
      onBack();
    } else {
      Alert.alert("Kembali", "Kembali ke halaman sebelumnya.");
    }
  };

  const handleSosPress = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert(
      "Sinyal SOS Darurat",
      "Mengirimkan sinyal darurat dan lokasi Anda ke kontak darurat & layanan terdekat...",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Kirim Sekarang",
          style: "destructive",
          onPress: () =>
            Alert.alert(
              "Sinyal Terkirim",
              "Bantuan darurat sedang menuju lokasi Anda saat ini.",
            ),
        },
      ],
    );
  };

  const handleServicePress = (serviceName: string, number: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      `Hubungi ${serviceName}`,
      `Menghubungkan ke layanan ${serviceName} (${number})...`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Panggil",
          onPress: () =>
            Alert.alert("Memanggil...", `Menghubungi nomor darurat ${number}`),
        },
      ],
    );
  };

  return (
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

          <ThemedText style={styles.screenTitle}>Bantuan Darurat</ThemedText>

          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Big Animated Expanding/Contracting SOS Circle Button */}
          <View style={styles.sosContainer}>
            {/* Outer Ring 2 (Expanding animation) */}
            <Animated.View
              style={[
                styles.sosOuterRing2,
                { transform: [{ scale: pulseRingAnim }] },
              ]}
            >
              {/* Outer Ring 1 (Expanding animation) */}
              <Animated.View
                style={[
                  styles.sosOuterRing1,
                  { transform: [{ scale: pulseAnim }] },
                ]}
              >
                {/* Center Solid Red SOS Button */}
                <TouchableOpacity
                  style={styles.sosCircleButton}
                  activeOpacity={0.85}
                  onPress={handleSosPress}
                >
                  <ThemedText style={styles.sosText}>SOS</ThemedText>
                  <ThemedText style={styles.sosSubtext}>
                    Tekan 3 detik
                  </ThemedText>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          </View>

          {/* 4 Emergency Services Shortcut Cards (2x2 Grid) */}
          <View style={styles.servicesGrid}>
            {/* Card 1: Rumah Sakit */}
            <TouchableOpacity
              style={styles.serviceCard}
              activeOpacity={0.85}
              onPress={() => handleServicePress("Rumah Sakit", "118")}
            >
              <Image
                source={require("@/assets/icons/ic-emergency-hospital.png")}
                style={styles.serviceIconAsset}
                resizeMode="contain"
              />
              <ThemedText style={styles.serviceTitle}>Rumah Sakit</ThemedText>
            </TouchableOpacity>

            {/* Card 2: Pemadam Kebakaran */}
            <TouchableOpacity
              style={styles.serviceCard}
              activeOpacity={0.85}
              onPress={() => handleServicePress("Pemadam Kebakaran", "113")}
            >
              <Image
                source={require("@/assets/icons/ic-emergency-firefighter.png")}
                style={styles.serviceIconAsset}
                resizeMode="contain"
              />
              <ThemedText style={styles.serviceTitle}>
                Pemadam Kebakaran
              </ThemedText>
            </TouchableOpacity>

            {/* Card 3: Kecelakaan */}
            <TouchableOpacity
              style={styles.serviceCard}
              activeOpacity={0.85}
              onPress={() => handleServicePress("Layanan Kecelakaan", "119")}
            >
              <Image
                source={require("@/assets/icons/ic-emergency-accident.png")}
                style={styles.serviceIconAsset}
                resizeMode="contain"
              />
              <ThemedText style={styles.serviceTitle}>Kecelakaan</ThemedText>
            </TouchableOpacity>

            {/* Card 4: Polisi */}
            <TouchableOpacity
              style={styles.serviceCard}
              activeOpacity={0.85}
              onPress={() => handleServicePress("Kepolisian", "110")}
            >
              <Image
                source={require("@/assets/icons/ic-emergency-police.png")}
                style={styles.serviceIconAsset}
                resizeMode="contain"
              />
              <ThemedText style={styles.serviceTitle}>Polisi</ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  navHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 14,
    backgroundColor: "#FFFFFF",
  },
  screenTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    fontWeight: "700",
    color: Palette.text.active,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerSpacer: {
    width: 36,
  },
  scrollContent: {
    paddingBottom: 32,
    paddingTop: 10,
  },

  /* SOS Circle Button & Animated Glow Rings */
  sosContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
  },
  sosOuterRing2: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(255, 77, 77, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  sosOuterRing1: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255, 77, 77, 0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  sosCircleButton: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#FF4D4D",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF4D4D",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  sosText: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  sosSubtext: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: "#FFFFFF",
    marginTop: 4,
    opacity: 0.9,
  },

  /* 2x2 Services Grid */
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 16,
    marginTop: 16,
  },
  serviceCard: {
    width: "47.5%",
    height: 150,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    borderWidth: 1.2,
    borderColor: "#EEF3FC",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  serviceIconAsset: {
    width: 52,
    height: 52,
    marginBottom: 12,
  },
  serviceTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 13.5,
    fontWeight: "600",
    color: Palette.text.active,
    textAlign: "center",
    lineHeight: 18,
  },
});
