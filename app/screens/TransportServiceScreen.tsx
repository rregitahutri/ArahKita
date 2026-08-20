import { Ionicons } from "@expo/vector-icons";
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

export interface TransportServiceScreenProps {
  onBack?: () => void;
  onNavigateToTab?: (tabName: string) => void;
  onOpenNotification?: () => void;
  onOpenEmergency?: () => void;
  onOpenDigitalAssistant?: () => void;
}

export default function TransportServiceScreen({
  onBack,
  onNavigateToTab,
  onOpenNotification,
  onOpenEmergency,
  onOpenDigitalAssistant,
}: TransportServiceScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleBackPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onBack) {
      onBack();
    } else {
      Alert.alert("Kembali", "Kembali ke halaman sebelumnya.");
    }
  };

  const handleMicSearch = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsListening((prev) => !prev);
    Alert.alert(
      "Asisten Suara",
      isListening
        ? "Mencoba menghentikan pencarian suara..."
        : "Mendengarkan... Silakan sebutkan halte atau stasiun yang Anda cari.",
    );
  };

  const handleTabPress = (
    tab: "beranda" | "layanan" | "komunitas" | "profil",
  ) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onNavigateToTab) {
      onNavigateToTab(tab);
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
    Alert.alert("Buka Peta", "Membuka peta lokasi transportasi terdekat.");
  };

  return (
    <ImageBackground
      source={require("@/assets/images/bg-homepage.png")}
      style={styles.bgImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <View style={styles.container}>
          {/* Header Bar with Back Button */}
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

            <ThemedText style={styles.screenTitle}>Transportasi</ThemedText>

            <View style={styles.headerSpacer} />
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
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
            </View>

            {/* Section 1: Layanan Terdekat */}
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>
                Layanan Terdekat
              </ThemedText>
              <TouchableOpacity
                style={styles.seeAllRow}
                activeOpacity={0.7}
                onPress={() =>
                  Alert.alert(
                    "Semua Layanan",
                    "Menampilkan daftar semua transportasi terdekat.",
                  )
                }
              >
                <ThemedText style={styles.sectionSeeAll}>
                  Lihat Semua
                </ThemedText>
                <Ionicons
                  name="chevron-forward"
                  size={14}
                  color={Palette.blue[600]}
                />
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
            </ScrollView>

            {/* Section 2: Tempat Lain */}
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Tempat Lain</ThemedText>
              <TouchableOpacity
                style={styles.seeAllRow}
                activeOpacity={0.7}
                onPress={() =>
                  Alert.alert(
                    "Tempat Lain",
                    "Menampilkan daftar opsi transportasi lainnya.",
                  )
                }
              >
                <ThemedText style={styles.sectionSeeAll}>
                  Lihat Semua
                </ThemedText>
                <Ionicons
                  name="chevron-forward"
                  size={14}
                  color={Palette.blue[600]}
                />
              </TouchableOpacity>
            </View>

            {/* Vertical List of 4 Transport Cards */}
            <View style={styles.verticalListContainer}>
              {/* Item 1: Stasiun MRT Blok M BCA */}
              <TouchableOpacity
                style={styles.listCard}
                activeOpacity={0.9}
                onPress={handleOpenMap}
              >
                <View style={styles.listImageWrapper}>
                  <Image
                    source={require("@/assets/images/img-service-blokm.png")}
                    style={styles.listImage}
                    resizeMode="cover"
                  />
                  <View style={styles.listImageOverlayBadge}>
                    <Image
                      source={require("@/assets/icons/ic-homepage-train-station.png")}
                      style={styles.categoryIconAsset2}
                      resizeMode="contain"
                    />
                    <ThemedText style={styles.badgeText}>
                      Stasiun Kereta
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.listCardContent}>
                  <View style={styles.tagsRow}>
                    <View style={styles.tagPill}>
                      <ThemedText style={styles.tagText}>
                        Jarak 1.2 km
                      </ThemedText>
                    </View>
                    <View style={styles.tagPill}>
                      <ThemedText style={styles.tagText}>Akses Lift</ThemedText>
                    </View>
                  </View>

                  <ThemedText style={styles.listCardTitle}>
                    Stasiun MRT Blok M BCA
                  </ThemedText>
                  <ThemedText style={styles.listCardDesc} numberOfLines={2}>
                    Akses lift, jalur pemandu, dan petugas bantuan tersedia.
                  </ThemedText>
                </View>
              </TouchableOpacity>

              {/* Item 2: Stasiun MRT Lebak Bulus Grab */}
              <TouchableOpacity
                style={styles.listCard}
                activeOpacity={0.9}
                onPress={handleOpenMap}
              >
                <View style={styles.listImageWrapper}>
                  <Image
                    source={require("@/assets/images/img-service-lebakbulus.png")}
                    style={styles.listImage}
                    resizeMode="cover"
                  />
                  <View style={styles.listImageOverlayBadge}>
                    <Image
                      source={require("@/assets/icons/ic-homepage-train-station.png")}
                      style={styles.categoryIconAsset2}
                      resizeMode="contain"
                    />
                    <ThemedText style={styles.badgeText}>
                      Stasiun Kereta
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.listCardContent}>
                  <View style={styles.tagsRow}>
                    <View style={styles.tagPill}>
                      <ThemedText style={styles.tagText}>
                        Jarak 2.6 km
                      </ThemedText>
                    </View>
                    <View style={styles.tagPill}>
                      <ThemedText style={styles.tagText}>
                        Drop-Off Luas
                      </ThemedText>
                    </View>
                  </View>

                  <ThemedText style={styles.listCardTitle}>
                    Stasiun MRT Lebak Bulus Grab
                  </ThemedText>
                  <ThemedText style={styles.listCardDesc} numberOfLines={2}>
                    Stasiun MRT dengan area drop off luas dan akses ramah
                    difabel.
                  </ThemedText>
                </View>
              </TouchableOpacity>

              {/* Item 3: Terminal Blok M */}
              <TouchableOpacity
                style={styles.listCard}
                activeOpacity={0.9}
                onPress={handleOpenMap}
              >
                <View style={styles.listImageWrapper}>
                  <Image
                    source={require("@/assets/images/img-service-terminal-blokm.png")}
                    style={styles.listImage}
                    resizeMode="cover"
                  />
                  <View style={styles.listImageOverlayBadge}>
                    <Image
                      source={require("@/assets/icons/ic-homepage-bus-stop.png")}
                      style={styles.categoryIconAsset2}
                      resizeMode="contain"
                    />
                    <ThemedText style={styles.badgeText}>Halte Bus</ThemedText>
                  </View>
                </View>

                <View style={styles.listCardContent}>
                  <View style={styles.tagsRow}>
                    <View style={styles.tagPill}>
                      <ThemedText style={styles.tagText}>
                        Jarak 3.0 km
                      </ThemedText>
                    </View>
                    <View style={styles.tagPill}>
                      <ThemedText style={styles.tagText}>Kursi Roda</ThemedText>
                    </View>
                  </View>

                  <ThemedText style={styles.listCardTitle}>
                    Terminal Blok M
                  </ThemedText>
                  <ThemedText style={styles.listCardDesc} numberOfLines={2}>
                    Terminal bus kota dengan akses kursi roda dan rute ke
                    berbagai wilayah.
                  </ThemedText>
                </View>
              </TouchableOpacity>

              {/* Item 4: Stasiun KRL Sudirman */}
              <TouchableOpacity
                style={styles.listCard}
                activeOpacity={0.9}
                onPress={handleOpenMap}
              >
                <View style={styles.listImageWrapper}>
                  <Image
                    source={require("@/assets/images/img-service-krl-sudirman.png")}
                    style={styles.listImage}
                    resizeMode="cover"
                  />
                  <View style={styles.listImageOverlayBadge}>
                    <Image
                      source={require("@/assets/icons/ic-homepage-train-station.png")}
                      style={styles.categoryIconAsset2}
                      resizeMode="contain"
                    />
                    <ThemedText style={styles.badgeText}>
                      Stasiun Kereta
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.listCardContent}>
                  <View style={styles.tagsRow}>
                    <View style={styles.tagPill}>
                      <ThemedText style={styles.tagText}>
                        Jarak 6.5 km
                      </ThemedText>
                    </View>
                    <View style={styles.tagPill}>
                      <ThemedText style={styles.tagText}>
                        Akses Prioritas
                      </ThemedText>
                    </View>
                  </View>

                  <ThemedText style={styles.listCardTitle}>
                    Stasiun KRL Sudirman
                  </ThemedText>
                  <ThemedText style={styles.listCardDesc} numberOfLines={2}>
                    Stasiun transit besar dengan akses prioritas dan koneksi
                    antar moda.
                  </ThemedText>
                </View>
              </TouchableOpacity>
            </View>

            {/* Section 3: Lihat di Maps */}
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 90,
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
  seeAllRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
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
  badgeText: {
    fontFamily: Fonts.semiBold,
    fontSize: 11,
    fontWeight: "600",
    color: Palette.text.active,
  },
  cardInfoPadding: {
    padding: 12,
  },
  categoryIconAsset: {
    width: 22,
    height: 22,
  },
  categoryIconAsset2: {
    width: 16,
    height: 16,
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

  /* Section 2: Tempat Lain Vertical List */
  verticalListContainer: {
    gap: 12,
    marginBottom: 16,
  },
  listCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: "#E7EFFC",
    padding: 10,
    alignItems: "center",
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  listImageWrapper: {
    width: 110,
    height: 86,
    borderRadius: 14,
    overflow: "hidden",
    position: "relative",
  },
  listImage: {
    width: "100%",
    height: "100%",
  },
  listImageOverlayBadge: {
    position: "absolute",
    top: 4,
    left: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 8,
  },
  listCardContent: {
    flex: 1,
    marginLeft: 12,
  },
  listCardTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 13,
    fontWeight: "600",
    color: Palette.text.active,
    marginBottom: 3,
  },
  listCardDesc: {
    fontFamily: Fonts.regular,
    fontSize: 10.5,
    color: Palette.text.inactive,
    lineHeight: 14,
  },

  /* Section 3: Map Card */
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
    borderRadius: 12,
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
