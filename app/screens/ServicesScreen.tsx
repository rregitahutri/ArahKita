import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { Fonts, Palette } from "@/constants/theme";

export interface ServicesScreenProps {
  onNavigateToTab?: (tabName: string) => void;
  onOpenNotification?: () => void;
  onOpenEmergency?: () => void;
  onOpenDigitalAssistant?: () => void;
}

export default function ServicesScreen({
  onNavigateToTab,
  onOpenNotification,
  onOpenEmergency,
  onOpenDigitalAssistant,
}: ServicesScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<
    "beranda" | "layanan" | "komunitas" | "profil"
  >("layanan");
  const [isListening, setIsListening] = useState(false);

  const handleMicSearch = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsListening((prev) => !prev);
    Alert.alert(
      "Asisten Suara",
      isListening
        ? "Mencoba menghentikan pencarian suara..."
        : "Mendengarkan... Silakan sebutkan layanan yang Anda cari.",
    );
  };

  const handleNotificationPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onOpenNotification) {
      onOpenNotification();
    } else {
      Alert.alert("Notifikasi", "Belum ada notifikasi baru saat ini.");
    }
  };

  const handleTabPress = (
    tab: "beranda" | "layanan" | "komunitas" | "profil",
  ) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveTab(tab);
    if (onNavigateToTab) {
      onNavigateToTab(tab);
    }
  };

  const handleCategoryPress = (categoryName: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (categoryName === "Layanan Darurat" && onOpenEmergency) {
      onOpenEmergency();
    } else {
      Alert.alert("Layanan", `Menampilkan fasilitas ${categoryName} terdekat.`);
    }
  };

  const handleAiSparklePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    if (onOpenDigitalAssistant) {
      onOpenDigitalAssistant();
    } else {
      Alert.alert(
        "Asisten AI ArahKita",
        "Halo! Saya Asisten AI ArahKita. Ada yang bisa saya bantu hari ini?",
      );
    }
  };

  const handleOpenMap = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert("Buka Peta", "Membuka peta lokasi layanan publik terdekat.");
  };

  return (
    <ImageBackground
      source={require("@/assets/images/bg-homepage.png")}
      style={styles.bgImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header: Location & Notification Bell */}
            <View style={styles.topHeader}>
              <View style={styles.locationContainer}>
                <Image
                  source={require("@/assets/icons/ic-homepage-current-location.png")}
                  style={styles.locationIconAsset}
                  resizeMode="contain"
                />
                <View>
                  <ThemedText style={styles.locationSubLabel}>
                    Lokasi kamu, saat ini
                  </ThemedText>
                  <ThemedText style={styles.locationMainLabel}>
                    Jakarta Selatan
                  </ThemedText>
                </View>
              </View>

              <TouchableOpacity
                style={styles.notificationButton}
                activeOpacity={0.8}
                onPress={handleNotificationPress}
              >
                <Image
                  source={require("@/assets/icons/ic-homepage-notification.png")}
                  style={styles.notifIconAsset}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            {/* Service Search Hero Card */}
            <View style={styles.heroCard}>
              {/* AI Prompt Box */}
              <View style={styles.aiPromptContainer}>
                <View style={styles.aiAvatarBox}>
                  <Image
                    source={require("@/assets/icons/ic-homepage-ai-assistant.png")}
                    style={styles.aiAvatarAsset}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.aiPromptTextGroup}>
                  <ThemedText style={styles.aiPromptTitle}>
                    Layanan apa yang kamu cari?
                  </ThemedText>
                  <ThemedText style={styles.aiPromptSub}>
                    Cari layanan terdekatmu sekarang.
                  </ThemedText>
                </View>
                <Image
                  source={require("@/assets/icons/ic-homepage-mic.png")}
                  style={styles.volumeButton}
                  resizeMode="contain"
                />
              </View>

              {/* Search Bar */}
              <View style={styles.searchBar}>
                <Image
                  source={require("@/assets/icons/ic-homepage-search.png")}
                  style={styles.searchIconAsset}
                  resizeMode="contain"
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Cari layanan publik disini.."
                  placeholderTextColor={Palette.text.inactive}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                <TouchableOpacity activeOpacity={0.7} onPress={handleMicSearch}>
                  <Image
                    source={require("@/assets/icons/ic-homepage-voice.png")}
                    style={styles.micIconAsset}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              {/* 6 Category Services Grid (2 Rows x 3 Items) */}
              <View style={styles.categoriesGrid}>
                {/* Row 1 */}
                <View style={styles.categoryRow}>
                  {/* Category 1: Transportasi */}
                  <TouchableOpacity
                    style={styles.categoryCard}
                    activeOpacity={0.8}
                    onPress={() => handleCategoryPress("Transportasi")}
                  >
                    <View style={styles.categoryIconCircle}>
                      <Image
                        source={require("@/assets/icons/ic-service-transportation.png")}
                        style={styles.categoryIconAsset}
                        resizeMode="contain"
                      />
                    </View>
                    <ThemedText style={styles.categoryLabel}>
                      Transportasi
                    </ThemedText>
                  </TouchableOpacity>

                  {/* Category 2: Rumah Sakit */}
                  <TouchableOpacity
                    style={styles.categoryCard}
                    activeOpacity={0.8}
                    onPress={() => handleCategoryPress("Rumah Sakit")}
                  >
                    <View style={styles.categoryIconCircle}>
                      <Image
                        source={require("@/assets/icons/ic-service-hospital.png")}
                        style={styles.categoryIconAsset}
                        resizeMode="contain"
                      />
                    </View>
                    <ThemedText style={styles.categoryLabel}>
                      Rumah Sakit
                    </ThemedText>
                  </TouchableOpacity>

                  {/* Category 3: Akses & Fasilitas */}
                  <TouchableOpacity
                    style={styles.categoryCard}
                    activeOpacity={0.8}
                    onPress={() => handleCategoryPress("Akses & Fasilitas")}
                  >
                    <View style={styles.categoryIconCircle}>
                      <Image
                        source={require("@/assets/icons/ic-service-facility.png")}
                        style={styles.categoryIconAsset}
                        resizeMode="contain"
                      />
                    </View>
                    <ThemedText style={styles.categoryLabel}>
                      Akses & Fasilitas
                    </ThemedText>
                  </TouchableOpacity>
                </View>

                {/* Row 2 */}
                <View style={styles.categoryRow}>
                  {/* Category 4: Layanan Darurat */}
                  <TouchableOpacity
                    style={styles.categoryCard}
                    activeOpacity={0.8}
                    onPress={() => handleCategoryPress("Layanan Darurat")}
                  >
                    <View style={styles.categoryIconCircle}>
                      <Image
                        source={require("@/assets/icons/ic-service-emergency.png")}
                        style={styles.categoryIconAsset}
                        resizeMode="contain"
                      />
                    </View>
                    <ThemedText style={styles.categoryLabel}>
                      Layanan Darurat
                    </ThemedText>
                  </TouchableOpacity>

                  {/* Category 5: Penginapan */}
                  <TouchableOpacity
                    style={styles.categoryCard}
                    activeOpacity={0.8}
                    onPress={() => handleCategoryPress("Penginapan")}
                  >
                    <View style={styles.categoryIconCircle}>
                      <Image
                        source={require("@/assets/icons/ic-service-housing.png")}
                        style={styles.categoryIconAsset}
                        resizeMode="contain"
                      />
                    </View>
                    <ThemedText style={styles.categoryLabel}>
                      Penginapan
                    </ThemedText>
                  </TouchableOpacity>

                  {/* Category 6: Kebutuhan Harian */}
                  <TouchableOpacity
                    style={styles.categoryCard}
                    activeOpacity={0.8}
                    onPress={() => handleCategoryPress("Kebutuhan Harian")}
                  >
                    <View style={styles.categoryIconCircle}>
                      <Image
                        source={require("@/assets/icons/ic-service-daily-needs.png")}
                        style={styles.categoryIconAsset}
                        resizeMode="contain"
                      />
                    </View>
                    <ThemedText style={styles.categoryLabel}>
                      Kebutuhan Harian
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Section 1: Layanan Terdekat */}
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>
                Layanan Terdekat
              </ThemedText>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  Alert.alert(
                    "Semua Layanan",
                    "Menampilkan daftar semua layanan terdekat.",
                  )
                }
              >
                <ThemedText style={styles.sectionSeeAll}>
                  Lihat Semua {">"}
                </ThemedText>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalCardsScroll}
            >
              {/* Card 1: Stasiun MRT Fatmawati */}
              <TouchableOpacity
                style={styles.nearbyCard}
                activeOpacity={0.9}
                onPress={handleOpenMap}
              >
                <View style={styles.cardImageWrapper}>
                  <Image
                    source={require("@/assets/images/img-train-station-1.png")}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                  <View style={styles.imageOverlayBadge}>
                    <Image
                      source={require("@/assets/icons/ic-homepage-train-station.png")}
                      style={styles.categoryIconAsset}
                      resizeMode="contain"
                    />
                    <ThemedText style={styles.badgeText}>
                      Stasiun Kereta
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.cardInfoPadding}>
                  <View style={styles.tagsRow}>
                    <View style={styles.tagPill}>
                      <ThemedText style={styles.tagText}>
                        Jarak 800 m
                      </ThemedText>
                    </View>
                    <View style={styles.tagPill}>
                      <ThemedText style={styles.tagText}>Akses Lift</ThemedText>
                    </View>
                  </View>

                  <ThemedText style={styles.cardTitle}>
                    Stasiun MRT Fatmawati
                  </ThemedText>
                  <ThemedText style={styles.cardDesc} numberOfLines={2}>
                    Akses lift dan jalur pemandu tersedia untuk pengguna
                    difabel.
                  </ThemedText>
                </View>
              </TouchableOpacity>

              {/* Card 2: Halte Blok M */}
              <TouchableOpacity
                style={styles.nearbyCard}
                activeOpacity={0.9}
                onPress={handleOpenMap}
              >
                <View style={styles.cardImageWrapper}>
                  <Image
                    source={require("@/assets/images/img-bus-stop.png")}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                  <View style={styles.imageOverlayBadge}>
                    <Image
                      source={require("@/assets/icons/ic-homepage-bus-stop.png")}
                      style={styles.categoryIconAsset}
                      resizeMode="contain"
                    />
                    <ThemedText style={styles.badgeText}>Halte Bus</ThemedText>
                  </View>
                </View>

                <View style={styles.cardInfoPadding}>
                  <View style={styles.tagsRow}>
                    <View style={styles.tagPill}>
                      <ThemedText style={styles.tagText}>
                        Jarak 950 m
                      </ThemedText>
                    </View>
                    <View style={styles.tagPill}>
                      <ThemedText style={styles.tagText}>Kursi Roda</ThemedText>
                    </View>
                  </View>

                  <ThemedText style={styles.cardTitle}>Halte Blok M</ThemedText>
                  <ThemedText style={styles.cardDesc} numberOfLines={2}>
                    Halte dengan akses kursi roda dan informasi audio.
                  </ThemedText>
                </View>
              </TouchableOpacity>

              {/* Card 3: RSUP Fatmawati */}
              <TouchableOpacity
                style={styles.nearbyCard}
                activeOpacity={0.9}
                onPress={handleOpenMap}
              >
                <View style={styles.cardImageWrapper}>
                  <Image
                    source={require("@/assets/images/img-hospital.png")}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                  <View style={styles.imageOverlayBadge}>
                    <Image
                      source={require("@/assets/icons/ic-homepage-hospital.png")}
                      style={styles.categoryIconAsset}
                      resizeMode="contain"
                    />
                    <ThemedText style={styles.badgeText}>
                      RSUP Fatmawati
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.cardInfoPadding}>
                  <View style={styles.tagsRow}>
                    <View style={styles.tagPill}>
                      <ThemedText style={styles.tagText}>
                        Jarak 1.1 km
                      </ThemedText>
                    </View>
                    <View style={styles.tagPill}>
                      <ThemedText style={styles.tagText}>IGD 24 jam</ThemedText>
                    </View>
                  </View>

                  <ThemedText style={styles.cardTitle}>
                    RSUP Fatmawati
                  </ThemedText>
                  <ThemedText style={styles.cardDesc} numberOfLines={2}>
                    Rumah sakit rujukan ramah difabel dan IGD 24 jam.
                  </ThemedText>
                </View>
              </TouchableOpacity>
            </ScrollView>

            {/* Section 2: Lihat di Maps */}
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Lihat di Maps</ThemedText>
            </View>

            <View style={styles.mapCardContainer}>
              <View style={styles.mapViewPlaceholder}>
                <Image
                  source={require("@/assets/images/img-service-maps.png")}
                  style={styles.mapGraphicImage}
                  resizeMode="cover"
                />
              </View>

              <TouchableOpacity
                style={styles.mapActionButton}
                activeOpacity={0.85}
                onPress={handleOpenMap}
              >
                <ThemedText style={styles.mapActionButtonText}>
                  Lihat Sekarang
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Bottom Navigation Bar */}
          <View style={styles.bottomNavContainer}>
            <View style={styles.bottomNavContent}>
              {/* Tab 1: Beranda */}
              <TouchableOpacity
                style={styles.navItem}
                activeOpacity={0.7}
                onPress={() => handleTabPress("beranda")}
              >
                <Image
                  source={require("@/assets/icons/ic-nav-home.png")}
                  style={styles.navIconAsset}
                  resizeMode="contain"
                />
                <ThemedText style={styles.navLabel}>Beranda</ThemedText>
              </TouchableOpacity>

              {/* Tab 2: Layanan (ACTIVE) */}
              <TouchableOpacity
                style={styles.navItem}
                activeOpacity={0.7}
                onPress={() => handleTabPress("layanan")}
              >
                <Image
                  source={require("@/assets/icons/ic-nav-layanan-active.png")}
                  style={styles.navIconAsset}
                  resizeMode="contain"
                />
                <ThemedText style={[styles.navLabel, styles.navLabelActive]}>
                  Layanan
                </ThemedText>
              </TouchableOpacity>

              {/* Center Spacer */}
              <View style={styles.centerFloatingSpacer} />

              {/* Tab 3: Komunitas */}
              <TouchableOpacity
                style={styles.navItem}
                activeOpacity={0.7}
                onPress={() => handleTabPress("komunitas")}
              >
                <Image
                  source={require("@/assets/icons/ic-nav-komunitas.png")}
                  style={styles.navIconAsset}
                  resizeMode="contain"
                />
                <ThemedText style={styles.navLabel}>Komunitas</ThemedText>
              </TouchableOpacity>

              {/* Tab 4: Profil */}
              <TouchableOpacity
                style={styles.navItem}
                activeOpacity={0.7}
                onPress={() => handleTabPress("profil")}
              >
                <Image
                  source={require("@/assets/icons/ic-nav-profil.png")}
                  style={styles.navIconAsset}
                  resizeMode="contain"
                />
                <ThemedText style={styles.navLabel}>Profil</ThemedText>
              </TouchableOpacity>
            </View>

            {/* Center Floating AI Sparkle Button */}
            <TouchableOpacity
              style={styles.floatingAiButton}
              activeOpacity={0.85}
              onPress={handleAiSparklePress}
            >
              <Image
                source={require("@/assets/icons/ic-nav-ai.png")}
                style={styles.floatingAiAsset}
                resizeMode="contain"
              />
            </TouchableOpacity>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 90,
  },

  /* Top Header: Location & Notif Bell */
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingBottom: 16,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  locationIconAsset: {
    width: 44,
    height: 44,
  },
  locationSubLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Palette.text.inactive,
  },
  locationMainLabel: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    fontWeight: "700",
    color: Palette.text.active,
  },
  notificationButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  notifIconAsset: {
    width: 44,
    height: 44,
  },
  notifBadgeDot: {
    position: "absolute",
    top: 10,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF4D4D",
  },

  /* Service Hero Card */
  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.2,
    borderColor: "#E8F0FD",
    marginBottom: 20,
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },
  aiPromptContainer: {
    backgroundColor: Palette.blue[100],
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    height: 70,
  },
  aiAvatarBox: {
    backgroundColor: Palette.blue[100],
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    height: 70,
  },
  aiAvatarAsset: {
    width: 70,
    height: 120,
  },
  aiPromptTextGroup: {
    paddingTop: 16,
    flex: 1,
  },
  aiPromptTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 13,
    fontWeight: "600",
    color: Palette.text.active,
    lineHeight: 18,
  },
  aiPromptSub: {
    fontFamily: Fonts.regular,
    fontSize: 11.5,
    color: Palette.text.inactive,
    marginTop: 2,
    lineHeight: 15,
  },
  volumeButton: {
    width: 50,
    height: 100,
  },

  /* Search Bar */
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFCFE",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E6EDF8",
    height: 48,
    paddingHorizontal: 8,
    gap: 8,
    marginBottom: 20,
  },
  searchIconAsset: {
    width: 34,
    height: 34,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Palette.text.active,
  },
  micIconAsset: {
    width: 30,
    height: 50,
  },

  /* 6 Categories Grid */
  categoriesGrid: {
    gap: 12,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: "#FAFCFE",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EDF3FD",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(85, 144, 255, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  categoryIconAsset: {
    width: 22,
    height: 22,
  },
  categoryLabel: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    color: Palette.text.active,
    textAlign: "center",
  },

  /* Section Headers */
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    fontWeight: "700",
    color: Palette.text.active,
  },
  sectionSeeAll: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: Palette.blue[600],
  },

  /* Section 1: Layanan Terdekat Cards */
  horizontalCardsScroll: {
    gap: 14,
    paddingBottom: 16,
  },
  nearbyCard: {
    width: 240,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: "#E7EFFC",
    overflow: "hidden",
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardImageWrapper: {
    width: "100%",
    height: 125,
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlayBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    paddingVertical: 4,
    paddingLeft: 6,
    paddingRight: 12,
    borderRadius: 20,
  },
  badgeIconAsset: {
    width: 20,
    height: 20,
  },
  badgeText: {
    fontFamily: Fonts.semiBold,
    fontSize: 11,
    fontWeight: "600",
    color: Palette.text.active,
  },
  cardInfoPadding: {
    padding: 12,
  },
  tagsRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 6,
  },
  tagPill: {
    backgroundColor: Palette.blue[100],
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  tagText: {
    fontFamily: Fonts.medium,
    fontSize: 10.5,
    color: Palette.blue[700],
  },
  cardTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 13.5,
    fontWeight: "600",
    color: Palette.text.active,
    marginBottom: 4,
  },
  cardDesc: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: Palette.text.inactive,
    lineHeight: 15,
  },

  /* Section 2: Map Card */
  mapCardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: "#E7EFFC",
    padding: 12,
    marginBottom: 20,
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },
  mapViewPlaceholder: {
    width: "100%",
    height: 180,
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 12,
  },
  mapGraphicImage: {
    width: "100%",
    height: "100%",
  },
  mapActionButton: {
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
  mapActionButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  /* Bottom Navigation Bar */
  bottomNavContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 72,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bottomNavContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 64,
    borderTopWidth: 1,
    borderTopColor: "#EDF3FD",
    paddingHorizontal: 12,
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  navIconAsset: {
    width: 22,
    height: 22,
  },
  navLabel: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    color: Palette.text.inactive,
  },
  navLabelActive: {
    color: Palette.blue[500],
    fontFamily: Fonts.semiBold,
  },
  centerFloatingSpacer: {
    width: 60,
  },
  floatingAiButton: {
    position: "absolute",
    top: -20,
    width: 100,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  floatingAiAsset: {
    width: 75,
    height: 75,
  },
});
