import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { Fonts, Palette } from "@/constants/theme";

export interface ServiceDetailScreenProps {
  onBack?: () => void;
  onNavigateToTab?: (tabName: string) => void;
  onOpenNotification?: () => void;
  onOpenEmergency?: () => void;
  onOpenDigitalAssistant?: () => void;
}

export default function ServiceDetailScreen({
  onBack,
  onNavigateToTab,
  onOpenNotification,
  onOpenEmergency,
  onOpenDigitalAssistant,
}: ServiceDetailScreenProps) {
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | "all">(
    "all",
  );

  const handleBackPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onBack) {
      onBack();
    } else {
      Alert.alert("Kembali", "Kembali ke halaman sebelumnya.");
    }
  };

  const handleSharePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert("Bagikan", "Bagikan informasi Stasiun MRT Fatmawati.");
  };

  const handleCopyAddress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert("Tersalin", "Alamat berhasil disalin ke papan klip.");
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
    Alert.alert(
      "Buka Peta",
      "Membuka peta rute navigasi menuju Stasiun MRT Fatmawati.",
    );
  };

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

            <ThemedText style={styles.screenTitle}>Stasiun Kereta</ThemedText>

            <TouchableOpacity
              style={styles.shareButton}
              activeOpacity={0.7}
              onPress={handleSharePress}
            >
              <Image
                source={require("@/assets/icons/ic-service-share.png")}
                style={styles.shareIconAsset}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* AI Hero Prompt Card */}
            <View style={styles.aiHeroCard}>
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
            </View>

            {/* Main Service Info Card */}
            <View style={styles.mainInfoCard}>
              {/* Hero Banner Image */}
              <View style={styles.bannerWrapper}>
                <Image
                  source={require("@/assets/images/img-service-station.png")}
                  style={styles.bannerImage}
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
                {/* Pagination Dots Indicator */}
                <View style={styles.paginationDotsRow}>
                  <View style={[styles.pageDot, styles.pageDotActive]} />
                  <View style={styles.pageDot} />
                  <View style={styles.pageDot} />
                </View>
              </View>

              {/* Title & Distance Pill */}
              <View style={styles.titleDistanceRow}>
                <View style={styles.titleGroup}>
                  <ThemedText style={styles.serviceTitle}>
                    Stasiun MRT Fatmawati
                  </ThemedText>
                  <ThemedText style={styles.serviceSubtitle}>
                    Akses lift dan jalur pemandu tersedia untuk pengguna
                    difabel.
                  </ThemedText>
                </View>
                <View style={styles.distancePill}>
                  <ThemedText style={styles.distancePillSub}>Jarak</ThemedText>
                  <ThemedText style={styles.distancePillMain}>800 m</ThemedText>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Alamat Section */}
              <View style={styles.sectionBlock}>
                <ThemedText style={styles.blockTitle}>Alamat</ThemedText>
                <View style={styles.addressRow}>
                  <ThemedText style={styles.blockBodyText}>
                    Cilandak Barat, Kec. Cilandak, Kota Jakarta Selatan, Daerah
                    Khusus Ibukota Jakarta
                  </ThemedText>
                  <TouchableOpacity
                    style={styles.copyButton}
                    onPress={handleCopyAddress}
                  >
                    <Image
                      source={require("@/assets/icons/ic-service-copy.png")}
                      style={styles.copyIconAsset}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Waktu Operasional Section */}
              <View style={styles.sectionBlock}>
                <ThemedText style={styles.blockTitle}>
                  Waktu Operasional
                </ThemedText>
                <ThemedText style={styles.operatingTimeText}>
                  <ThemedText style={styles.boldTime}>24 Jam</ThemedText> Setiap
                  Hari
                </ThemedText>
              </View>

              {/* Fasilitas Section */}
              <View style={styles.sectionBlock}>
                <ThemedText style={styles.blockTitle}>Fasilitas</ThemedText>
                <View style={styles.facilitiesWrap}>
                  <View style={styles.facilityPill}>
                    <ThemedText style={styles.facilityText}>
                      Akses Lift
                    </ThemedText>
                  </View>
                  <View style={styles.facilityPill}>
                    <ThemedText style={styles.facilityText}>
                      Guiding Block
                    </ThemedText>
                  </View>
                  <View style={styles.facilityPill}>
                    <ThemedText style={styles.facilityText}>
                      Guiding Tactile
                    </ThemedText>
                  </View>
                  <View style={styles.facilityPill}>
                    <ThemedText style={styles.facilityText}>
                      Ruang Tunggu Prioritas
                    </ThemedText>
                  </View>
                  <View style={styles.facilityPill}>
                    <ThemedText style={styles.facilityText}>
                      Toilet Difabel
                    </ThemedText>
                  </View>
                  <View style={styles.facilityPill}>
                    <ThemedText style={styles.facilityText}>
                      Informasi Audio Dan Visual
                    </ThemedText>
                  </View>
                  <View style={styles.facilityPill}>
                    <ThemedText style={styles.facilityText}>
                      Petugas Siaga
                    </ThemedText>
                  </View>
                </View>
              </View>
            </View>

            {/* Ulasan Section */}
            <View style={styles.sectionHeaderRow}>
              <ThemedText style={styles.sectionTitle}>Ulasan</ThemedText>
              <TouchableOpacity
                style={styles.seeAllRow}
                activeOpacity={0.7}
                onPress={() =>
                  Alert.alert(
                    "Semua Ulasan",
                    "Menampilkan 424 ulasan pengguna.",
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

            {/* Rating Summary & Star Filters Card */}
            <View style={styles.reviewsCard}>
              <View style={styles.ratingSummaryRow}>
                <View style={styles.ratingCountGroup}>
                  <Image
                    source={require("@/assets/icons/ic-service-comment.png")}
                    style={styles.commentIconAsset}
                    resizeMode="contain"
                  />
                  <ThemedText style={styles.ratingCountText}>
                    424 Ulasan
                  </ThemedText>
                </View>

                <View style={styles.ratingStarsGroup}>
                  <Image
                    source={require("@/assets/icons/ic-service-star-filled.png")}
                    style={styles.starIconAsset}
                  />
                  <Image
                    source={require("@/assets/icons/ic-service-star-filled.png")}
                    style={styles.starIconAsset}
                  />
                  <Image
                    source={require("@/assets/icons/ic-service-star-filled.png")}
                    style={styles.starIconAsset}
                  />
                  <Image
                    source={require("@/assets/icons/ic-service-star-filled.png")}
                    style={styles.starIconAsset}
                  />
                  <Image
                    source={require("@/assets/icons/ic-service-star-unfilled.png")}
                    style={styles.starIconAsset}
                  />
                  <ThemedText style={styles.ratingNumber}>4.8</ThemedText>
                </View>
              </View>

              {/* Star Filter Pills Row */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.starFiltersScroll}
              >
                <TouchableOpacity
                  style={[
                    styles.filterPill,
                    selectedStarFilter === "all" && styles.filterPillActive,
                  ]}
                  onPress={() => setSelectedStarFilter("all")}
                >
                  <ThemedText
                    style={[
                      styles.filterText,
                      selectedStarFilter === "all" && styles.filterTextActive,
                    ]}
                  >
                    Semua
                  </ThemedText>
                </TouchableOpacity>

                {[5, 4, 3, 2, 1].map((starNum) => (
                  <TouchableOpacity
                    key={starNum}
                    style={[
                      styles.filterPill,
                      selectedStarFilter === starNum && styles.filterPillActive,
                    ]}
                    onPress={() => setSelectedStarFilter(starNum)}
                  >
                    <Image
                      source={require("@/assets/icons/ic-service-star-filled.png")}
                      style={styles.filterStarAsset}
                    />
                    <ThemedText
                      style={[
                        styles.filterText,
                        selectedStarFilter === starNum &&
                          styles.filterTextActive,
                      ]}
                    >
                      {starNum}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Review 1 */}
              <View style={styles.reviewItemCard}>
                <View style={styles.reviewHeaderRow}>
                  <View style={styles.userAvatarBox}>
                    <Ionicons name="person" size={18} color="#8A9BB5" />
                  </View>

                  <View style={styles.userInfoGroup}>
                    <ThemedText style={styles.userName}>
                      Bob Tarumanegara
                    </ThemedText>
                    <ThemedText style={styles.reviewTime}>
                      1 Minggu lalu
                    </ThemedText>
                  </View>

                  <View style={styles.reviewStarsRow}>
                    <Image
                      source={require("@/assets/icons/ic-service-star-filled.png")}
                      style={styles.smallStarAsset}
                    />
                    <Image
                      source={require("@/assets/icons/ic-service-star-filled.png")}
                      style={styles.smallStarAsset}
                    />
                    <Image
                      source={require("@/assets/icons/ic-service-star-filled.png")}
                      style={styles.smallStarAsset}
                    />
                    <Image
                      source={require("@/assets/icons/ic-service-star-filled.png")}
                      style={styles.smallStarAsset}
                    />
                    <Image
                      source={require("@/assets/icons/ic-service-star-unfilled.png")}
                      style={styles.smallStarAsset}
                    />
                    <ThemedText style={styles.smallStarNumber}>4</ThemedText>
                  </View>
                </View>

                <ThemedText style={styles.reviewBodyText}>
                  Lift mudah ditemukan, petugas cukup membantu. Jalur pemandu
                  masih terbatas.
                </ThemedText>

                <View style={styles.reviewTagsRow}>
                  <View style={styles.reviewTagPill}>
                    <ThemedText style={styles.reviewTagText}>
                      Difabel Netra
                    </ThemedText>
                  </View>
                  <View style={styles.reviewTagPill}>
                    <ThemedText style={styles.reviewTagText}>
                      Pengguna Kursi Roda
                    </ThemedText>
                  </View>
                </View>
              </View>

              {/* Review 2 */}
              <View style={styles.reviewItemCard}>
                <View style={styles.reviewHeaderRow}>
                  <View style={styles.userAvatarBox}>
                    <Ionicons name="person" size={18} color="#8A9BB5" />
                  </View>

                  <View style={styles.userInfoGroup}>
                    <ThemedText style={styles.userName}>
                      Robert Pratama
                    </ThemedText>
                    <ThemedText style={styles.reviewTime}>
                      1 Minggu lalu
                    </ThemedText>
                  </View>

                  <View style={styles.reviewStarsRow}>
                    <Image
                      source={require("@/assets/icons/ic-service-star-filled.png")}
                      style={styles.smallStarAsset}
                    />
                    <Image
                      source={require("@/assets/icons/ic-service-star-filled.png")}
                      style={styles.smallStarAsset}
                    />
                    <Image
                      source={require("@/assets/icons/ic-service-star-filled.png")}
                      style={styles.smallStarAsset}
                    />
                    <Image
                      source={require("@/assets/icons/ic-service-star-filled.png")}
                      style={styles.smallStarAsset}
                    />
                    <Image
                      source={require("@/assets/icons/ic-service-star-unfilled.png")}
                      style={styles.smallStarAsset}
                    />
                    <ThemedText style={styles.smallStarNumber}>4</ThemedText>
                  </View>
                </View>

                <ThemedText style={styles.reviewBodyText}>
                  Petunjuk suara cukup membantu sampai ke gate. Jalur pemandu
                  masih belum menyambung semua area.
                </ThemedText>

                <View style={styles.reviewTagsRow}>
                  <View style={styles.reviewTagPill}>
                    <ThemedText style={styles.reviewTagText}>
                      Difabel Netra
                    </ThemedText>
                  </View>
                </View>
              </View>

              {/* Review 3 */}
              <View style={styles.reviewItemCard}>
                <View style={styles.reviewHeaderRow}>
                  <View style={styles.userAvatarBox}>
                    <Ionicons name="person" size={18} color="#8A9BB5" />
                  </View>

                  <View style={styles.userInfoGroup}>
                    <ThemedText style={styles.userName}>
                      Stephanie Mei
                    </ThemedText>
                    <ThemedText style={styles.reviewTime}>
                      2 Bulan lalu
                    </ThemedText>
                  </View>

                  <View style={styles.reviewStarsRow}>
                    <Image
                      source={require("@/assets/icons/ic-service-star-filled.png")}
                      style={styles.smallStarAsset}
                    />
                    <Image
                      source={require("@/assets/icons/ic-service-star-filled.png")}
                      style={styles.smallStarAsset}
                    />
                    <Image
                      source={require("@/assets/icons/ic-service-star-filled.png")}
                      style={styles.smallStarAsset}
                    />
                    <Image
                      source={require("@/assets/icons/ic-service-star-unfilled.png")}
                      style={styles.smallStarAsset}
                    />
                    <Image
                      source={require("@/assets/icons/ic-service-star-unfilled.png")}
                      style={styles.smallStarAsset}
                    />
                    <ThemedText style={styles.smallStarNumber}>3</ThemedText>
                  </View>
                </View>

                <ThemedText style={styles.reviewBodyText}>
                  Informasi visual jelas, tapi belum ada papan teks di beberapa
                  titik pengumuman.
                </ThemedText>

                <View style={styles.reviewTagsRow}>
                  <View style={styles.reviewTagPill}>
                    <ThemedText style={styles.reviewTagText}>
                      Difabel Tuli
                    </ThemedText>
                  </View>
                </View>
              </View>
            </View>

            {/* Section: Lihat di Maps */}
            <View style={styles.sectionHeaderRow}>
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

            {/* Section: Layanan Lain */}
            <View style={styles.sectionHeaderRow}>
              <ThemedText style={styles.sectionTitle}>Layanan Lain</ThemedText>
              <TouchableOpacity
                style={styles.seeAllRow}
                activeOpacity={0.7}
                onPress={() =>
                  Alert.alert("Layanan Lain", "Menampilkan opsi layanan lain.")
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
              {/* Card 1: Stasiun MRT Lebak Bulus */}
              <TouchableOpacity
                style={styles.nearbyCard}
                activeOpacity={0.9}
                onPress={handleOpenMap}
              >
                <View style={styles.cardImageWrapper}>
                  <Image
                    source={require("@/assets/images/img-service-lebakbulus.png")}
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
                        Jarak 2.6 km
                      </ThemedText>
                    </View>
                    <View style={styles.tagPill}>
                      <ThemedText style={styles.tagText}>
                        Akses Prioritas
                      </ThemedText>
                    </View>
                  </View>

                  <ThemedText style={styles.cardTitle} numberOfLines={1}>
                    Stasiun MRT Lebak Bulus...
                  </ThemedText>
                  <ThemedText style={styles.cardDesc} numberOfLines={2}>
                    Stasiun MRT dengan area drop off luas dan akses ramah
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
  shareButton: {
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
  shareIconAsset: {
    width: 20,
    height: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 90,
  },

  /* AI Hero Prompt Card */
  aiHeroCard: {
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

  /* Main Info Card */
  mainInfoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: "#E7EFFC",
    padding: 14,
    marginBottom: 20,
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },
  bannerWrapper: {
    width: "100%",
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    marginBottom: 14,
  },
  bannerImage: {
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
  categoryIconAsset: {
    width: 22,
    height: 22,
  },
  badgeText: {
    fontFamily: Fonts.semiBold,
    fontSize: 11,
    fontWeight: "600",
    color: Palette.text.active,
  },
  paginationDotsRow: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    flexDirection: "row",
    gap: 6,
  },
  pageDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  pageDotActive: {
    width: 16,
    backgroundColor: "#FFFFFF",
  },
  titleDistanceRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  titleGroup: {
    flex: 1,
  },
  serviceTitle: {
    fontFamily: Fonts.bold,
    fontSize: 17,
    fontWeight: "700",
    color: Palette.text.active,
    marginBottom: 4,
  },
  serviceSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 11.5,
    color: Palette.text.inactive,
    lineHeight: 16,
  },
  distancePill: {
    backgroundColor: Palette.blue[100],
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  distancePillSub: {
    fontFamily: Fonts.regular,
    fontSize: 9.5,
    color: Palette.blue[600],
  },
  distancePillMain: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    fontWeight: "700",
    color: Palette.blue[700],
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F4FA",
    marginVertical: 14,
  },
  sectionBlock: {
    marginBottom: 14,
  },
  blockTitle: {
    fontFamily: Fonts.bold,
    fontSize: 13.5,
    fontWeight: "700",
    color: Palette.text.active,
    marginBottom: 6,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
  },
  blockBodyText: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Palette.text.inactive,
    lineHeight: 17,
  },
  copyButton: {
    padding: 2,
  },
  copyIconAsset: {
    width: 18,
    height: 18,
  },
  operatingTimeText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Palette.text.inactive,
  },
  boldTime: {
    fontFamily: Fonts.bold,
    fontWeight: "700",
    color: Palette.text.active,
  },
  facilitiesWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 4,
  },
  facilityPill: {
    backgroundColor: Palette.blue[100],
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  facilityText: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    color: Palette.blue[700],
  },

  /* Section Header Rows */
  sectionHeaderRow: {
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
  seeAllRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  sectionSeeAll: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: Palette.blue[600],
  },

  /* Reviews Card */
  reviewsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: "#E7EFFC",
    padding: 14,
    marginBottom: 20,
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },
  ratingSummaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  ratingCountGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  commentIconAsset: {
    width: 18,
    height: 18,
  },
  ratingCountText: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: Palette.text.inactive,
  },
  ratingStarsGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  starIconAsset: {
    width: 16,
    height: 16,
  },
  ratingNumber: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    fontWeight: "700",
    color: Palette.text.active,
    marginLeft: 4,
  },
  starFiltersScroll: {
    gap: 8,
    marginBottom: 14,
  },
  filterPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FAFCFE",
    borderWidth: 1,
    borderColor: "#EDF3FD",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  filterPillActive: {
    backgroundColor: Palette.button.primary,
    borderColor: Palette.button.primary,
  },
  filterStarAsset: {
    width: 14,
    height: 14,
  },
  filterText: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: Palette.text.active,
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  reviewItemCard: {
    backgroundColor: "#FAFCFE",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EDF3FD",
    padding: 12,
    marginBottom: 10,
  },
  reviewHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  userAvatarBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Palette.blue[100],
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  userInfoGroup: {
    flex: 1,
  },
  userName: {
    fontFamily: Fonts.semiBold,
    fontSize: 13,
    fontWeight: "600",
    color: Palette.text.active,
  },
  reviewTime: {
    fontFamily: Fonts.regular,
    fontSize: 10.5,
    color: Palette.text.inactive,
  },
  reviewStarsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  smallStarAsset: {
    width: 12,
    height: 12,
  },
  smallStarNumber: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    color: Palette.text.inactive,
    marginLeft: 2,
  },
  reviewBodyText: {
    fontFamily: Fonts.regular,
    fontSize: 11.5,
    color: Palette.text.inactive,
    lineHeight: 16,
    marginBottom: 8,
  },
  reviewTagsRow: {
    flexDirection: "row",
    gap: 6,
  },
  reviewTagPill: {
    backgroundColor: Palette.blue[100],
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  reviewTagText: {
    fontFamily: Fonts.medium,
    fontSize: 10,
    color: Palette.blue[700],
  },

  /* Section: Map Card */
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

  /* Horizontal Layanan Lain Cards */
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
