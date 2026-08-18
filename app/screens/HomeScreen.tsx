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

interface NearbyServiceItem {
  id: string;
  title: string;
  category: string;
  categoryIconAsset: any;
  distance: string;
  featureBadge: string;
  description: string;
  image: any;
}

const NEARBY_SERVICES: NearbyServiceItem[] = [
  {
    id: "1",
    title: "Stasiun MRT Fatmawati",
    category: "Stasiun Kereta",
    categoryIconAsset: require("@/assets/icons/ic-homepage-train-station.png"),
    distance: "Jarak 800 m",
    featureBadge: "Akses Lift",
    description:
      "Akses lift dan jalur pemandu tersedia untuk pengguna difabel.",
    image: require("@/assets/images/img-train-station-1.png"),
  },
  {
    id: "2",
    title: "Halte Blok M",
    category: "Halte Bus",
    categoryIconAsset: require("@/assets/icons/ic-homepage-bus-stop.png"),
    distance: "Jarak 950 m",
    featureBadge: "Kursi Roda",
    description: "Halte dengan akses kursi roda dan informasi audio.",
    image: require("@/assets/images/img-bus-stop.png"),
  },
  {
    id: "3",
    title: "RSUP Fatmawati",
    category: "Rumah Sakit",
    categoryIconAsset: require("@/assets/icons/ic-homepage-hospital.png"),
    distance: "Jarak 1.1 km",
    featureBadge: "IGD 24 jam",
    description: "Rumah sakit rujukan ramah difabel dan IGD 24 jam.",
    image: require("@/assets/images/img-hospital.png"),
  },
  {
    id: "4",
    title: "Pos Damkar Jakarta Sela...",
    category: "Layanan Darurat",
    categoryIconAsset: require("@/assets/icons/ic-homepage-emergency-services.png"),
    distance: "Jarak 1.5 km",
    featureBadge: "Respon Darurat",
    description: "Layanan darurat kebakaran dan evakuasi dengan respon cepat.",
    image: require("@/assets/images/img-fire-department.png"),
  },
  {
    id: "5",
    title: "Stasiun KRL Pasar Minggu",
    category: "Stasiun Kereta",
    categoryIconAsset: require("@/assets/icons/ic-homepage-train-station.png"),
    distance: "Jarak 2.3 km",
    featureBadge: "Akses Prioritas",
    description: "Stasiun kereta dengan bantuan petugas dan akses prioritas.",
    image: require("@/assets/images/img-train-station-2.png"),
  },
];

interface HomeScreenProps {
  onNavigateToTab?: (tabName: string) => void;
  onOpenNotification?: () => void;
  onOpenEmergency?: () => void;
  onOpenDigitalAssistant?: () => void;
}

export default function HomeScreen({
  onNavigateToTab,
  onOpenNotification,
  onOpenEmergency,
  onOpenDigitalAssistant,
}: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<
    "beranda" | "layanan" | "komunitas" | "profil"
  >("beranda");
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

  const handleEmergencyCall = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    if (onOpenEmergency) {
      onOpenEmergency();
    } else {
      Alert.alert(
        "Panggil Bantuan Darurat",
        "Menghubungkan ke layanan darurat terdekat...",
        [
          { text: "Batal", style: "cancel" },
          {
            text: "Panggil Sekarang",
            style: "destructive",
            onPress: () =>
              Alert.alert(
                "Menghubungi...",
                "Layanan darurat sedang merespons lokasi Anda.",
              ),
          },
        ],
      );
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

  return (
    <ImageBackground
      source={require("@/assets/images/bg-homepage.png")}
      style={styles.bgImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <View style={styles.mainContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Top Location & Notification Header */}
            <View style={styles.topHeader}>
              <View style={styles.locationContainer}>
                <Image
                  source={require("@/assets/icons/ic-homepage-current-location.png")}
                  style={styles.locationIconAsset}
                  resizeMode="contain"
                />
                <View style={styles.locationTextGroup}>
                  <ThemedText style={styles.locationLabel}>
                    Lokasi kamu, saat ini
                  </ThemedText>
                  <ThemedText style={styles.locationName}>
                    Jakarta Selatan
                  </ThemedText>
                </View>
              </View>

              {/* Notification Bell Button Asset */}
              <TouchableOpacity
                style={styles.notificationButton}
                activeOpacity={0.8}
                onPress={handleNotificationPress}
              >
                <Image
                  source={require("@/assets/icons/ic-homepage-notification.png")}
                  style={styles.notificationIconAsset}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            {/* AI Voice Assistant Hero Search Card */}
            <View style={styles.heroCard}>
              {/* Top Assistant Prompt Box */}
              <TouchableOpacity
                style={styles.heroPromptBox}
                activeOpacity={0.9}
                onPress={handleAiSparklePress}
              >
                <Image
                  source={require("@/assets/icons/ic-homepage-ai-assistant.png")}
                  style={styles.heroAiIconAsset}
                  resizeMode="contain"
                />

                <View style={styles.heroPromptTextGroup}>
                  <ThemedText style={styles.heroPromptTitle}>
                    Ada yang bisa kami bantu hari ini?
                  </ThemedText>
                  <ThemedText style={styles.heroPromptSubtitle}>
                    Cari layanan terdekat, minta bantuan, atau tanya apa pun.
                  </ThemedText>
                </View>

                <Image
                  source={require("@/assets/icons/ic-homepage-mic.png")}
                  style={styles.micIconAsset}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {/* Search Input Bar with Icon Assets */}
              <View style={styles.searchBarWrapper}>
                <Image
                  source={require("@/assets/icons/ic-homepage-search.png")}
                  style={styles.searchIconAsset}
                  resizeMode="contain"
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Cari layanan publik disini..."
                  placeholderTextColor={Palette.text.inactive}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                <TouchableOpacity
                  style={styles.micSearchButton}
                  activeOpacity={0.7}
                  onPress={handleMicSearch}
                >
                  <Image
                    source={require("@/assets/icons/ic-homepage-voice.png")}
                    style={styles.searchIconAsset}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* 4 Feature Cards Grid (2x2 Grid using icon assets) */}
            <View style={styles.featureGrid}>
              {/* Feature 1: Layanan Publik */}
              <TouchableOpacity
                style={styles.featureCard}
                activeOpacity={0.8}
                onPress={() =>
                  Alert.alert(
                    "Layanan Publik",
                    "Membuka daftar fasilitas publik ramah difabel terdekat.",
                  )
                }
              >
                <Image
                  source={require("@/assets/icons/ic-homepage-public-services.png")}
                  style={styles.featureIconAsset}
                  resizeMode="contain"
                />
                <ThemedText style={styles.featureTitle}>
                  Layanan Publik
                </ThemedText>
                <ThemedText style={styles.featureSubtitle}>
                  Temukan layanan umum ramah difabel di sekitarmu.
                </ThemedText>
              </TouchableOpacity>

              {/* Feature 2: Asisten Digital */}
              <TouchableOpacity
                style={styles.featureCard}
                activeOpacity={0.8}
                onPress={handleAiSparklePress}
              >
                <Image
                  source={require("@/assets/icons/ic-homepage-digital-assistant.png")}
                  style={styles.featureIconAsset}
                  resizeMode="contain"
                />
                <ThemedText style={styles.featureTitle}>
                  Asisten Digital
                </ThemedText>
                <ThemedText style={styles.featureSubtitle}>
                  Tanya dan kendalikan aplikasi dengan suara atau teks.
                </ThemedText>
              </TouchableOpacity>

              {/* Feature 3: Navigasi Rute */}
              <TouchableOpacity
                style={styles.featureCard}
                activeOpacity={0.8}
                onPress={() =>
                  Alert.alert(
                    "Navigasi Rute",
                    "Membuka panduan navigasi rute ramah difabel.",
                  )
                }
              >
                <Image
                  source={require("@/assets/icons/ic-homepage-route-navigation.png")}
                  style={styles.featureIconAsset}
                  resizeMode="contain"
                />
                <ThemedText style={styles.featureTitle}>
                  Navigasi Rute
                </ThemedText>
                <ThemedText style={styles.featureSubtitle}>
                  Panduan rute aman dan mudah diakses sesuai kebutuhanmu.
                </ThemedText>
              </TouchableOpacity>

              {/* Feature 4: Bantuan Darurat */}
              <TouchableOpacity
                style={styles.featureCard}
                activeOpacity={0.8}
                onPress={handleEmergencyCall}
              >
                <Image
                  source={require("@/assets/icons/ic-homepage-emergency-assistance.png")}
                  style={styles.featureIconAsset}
                  resizeMode="contain"
                />
                <ThemedText style={styles.featureTitle}>
                  Bantuan Darurat
                </ThemedText>
                <ThemedText style={styles.featureSubtitle}>
                  Hubungi layanan darurat dan bagikan lokasi dengan cepat.
                </ThemedText>
              </TouchableOpacity>
            </View>

            {/* Section: Layanan Terdekat (Horizontal Scroll) */}
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>
                Layanan Terdekat
              </ThemedText>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  Alert.alert(
                    "Layanan Terdekat",
                    "Menampilkan seluruh daftar layanan terdekat.",
                  )
                }
              >
                <View style={styles.seeAllGroup}>
                  <ThemedText style={styles.seeAllText}>Lihat Semua</ThemedText>
                  <Ionicons
                    name="chevron-forward"
                    size={14}
                    color={Palette.blue[500]}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollContent}
            >
              {NEARBY_SERVICES.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.serviceCard}
                  activeOpacity={0.85}
                  onPress={() =>
                    Alert.alert(
                      item.title,
                      `${item.category} • ${item.distance}\n${item.description}`,
                    )
                  }
                >
                  {/* Image Container with Category Icon Asset Overlay */}
                  <View style={styles.serviceImageContainer}>
                    <Image
                      source={item.image}
                      style={styles.serviceImage}
                      resizeMode="cover"
                    />
                    <View style={styles.categoryPill}>
                      <Image
                        source={item.categoryIconAsset}
                        style={styles.categoryIconAsset}
                        resizeMode="contain"
                      />
                      <ThemedText style={styles.categoryPillText}>
                        {item.category}
                      </ThemedText>
                    </View>
                  </View>

                  {/* Card Info Content */}
                  <View style={styles.serviceCardContent}>
                    {/* Badges Row */}
                    <View style={styles.badgeRow}>
                      <View style={styles.distanceBadge}>
                        <ThemedText style={styles.distanceBadgeText}>
                          {item.distance}
                        </ThemedText>
                      </View>
                      <View style={styles.featureBadge}>
                        <ThemedText style={styles.featureBadgeText}>
                          {item.featureBadge}
                        </ThemedText>
                      </View>
                    </View>

                    {/* Title & Description */}
                    <ThemedText
                      style={styles.serviceCardTitle}
                      numberOfLines={1}
                    >
                      {item.title}
                    </ThemedText>
                    <ThemedText
                      style={styles.serviceCardDescription}
                      numberOfLines={2}
                    >
                      {item.description}
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Section: Bantuan Darurat */}
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>
                Bantuan Darurat
              </ThemedText>
            </View>

            <View style={styles.emergencyCard}>
              <View style={styles.emergencyPromptBox}>
                <Image
                  source={require("@/assets/icons/ic-emergency.png")}
                  style={styles.emergencyIconAsset}
                  resizeMode="contain"
                />
                <View style={styles.emergencyTextGroup}>
                  <ThemedText style={styles.emergencyPromptTitle}>
                    Kamu butuh bantuan darurat sekarang?
                  </ThemedText>
                  <ThemedText style={styles.emergencyPromptSubtitle}>
                    Kami akan menghubungkanmu dengan layanan darurat di sekitar.
                  </ThemedText>
                </View>
              </View>

              <TouchableOpacity
                style={styles.emergencyButton}
                activeOpacity={0.85}
                onPress={handleEmergencyCall}
              >
                <ThemedText style={styles.emergencyButtonText}>
                  Panggil Bantuan Darurat
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Bottom Navigation Bar with Exact Nav Icon Assets */}
          <View style={styles.bottomNavContainer}>
            <View style={styles.bottomNavContent}>
              {/* Tab 1: Beranda */}
              <TouchableOpacity
                style={styles.navItem}
                activeOpacity={0.7}
                onPress={() => handleTabPress("beranda")}
              >
                <Image
                  source={
                    activeTab === "beranda"
                      ? require("@/assets/icons/ic-nav-home-active.png")
                      : require("@/assets/icons/ic-nav-home.png")
                  }
                  style={styles.navIconAsset}
                  resizeMode="contain"
                />
                <ThemedText
                  style={[
                    styles.navLabel,
                    activeTab === "beranda" && styles.navLabelActive,
                  ]}
                >
                  Beranda
                </ThemedText>
              </TouchableOpacity>

              {/* Tab 2: Layanan */}
              <TouchableOpacity
                style={styles.navItem}
                activeOpacity={0.7}
                onPress={() => handleTabPress("layanan")}
              >
                <Image
                  source={
                    activeTab === "layanan"
                      ? require("@/assets/icons/ic-nav-layanan-active.png")
                      : require("@/assets/icons/ic-nav-layanan.png")
                  }
                  style={styles.navIconAsset}
                  resizeMode="contain"
                />
                <ThemedText
                  style={[
                    styles.navLabel,
                    activeTab === "layanan" && styles.navLabelActive,
                  ]}
                >
                  Layanan
                </ThemedText>
              </TouchableOpacity>

              {/* Floating Center AI Button Spacer */}
              <View style={styles.centerFloatingSpacer} />

              {/* Tab 3: Komunitas */}
              <TouchableOpacity
                style={styles.navItem}
                activeOpacity={0.7}
                onPress={() => handleTabPress("komunitas")}
              >
                <Image
                  source={
                    activeTab === "komunitas"
                      ? require("@/assets/icons/ic-nav-komunitas-active.png")
                      : require("@/assets/icons/ic-nav-komunitas.png")
                  }
                  style={styles.navIconAsset}
                  resizeMode="contain"
                />
                <ThemedText
                  style={[
                    styles.navLabel,
                    activeTab === "komunitas" && styles.navLabelActive,
                  ]}
                >
                  Komunitas
                </ThemedText>
              </TouchableOpacity>

              {/* Tab 4: Profil */}
              <TouchableOpacity
                style={styles.navItem}
                activeOpacity={0.7}
                onPress={() => handleTabPress("profil")}
              >
                <Image
                  source={
                    activeTab === "profil"
                      ? require("@/assets/icons/ic-nav-profil-active.png")
                      : require("@/assets/icons/ic-nav-profil.png")
                  }
                  style={styles.navIconAsset}
                  resizeMode="contain"
                />
                <ThemedText
                  style={[
                    styles.navLabel,
                    activeTab === "profil" && styles.navLabelActive,
                  ]}
                >
                  Profil
                </ThemedText>
              </TouchableOpacity>
            </View>

            {/* Floating Sparkle AI Center Button Asset */}
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
  mainContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 110,
  },

  /* Location Header */
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
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
  locationTextGroup: {
    gap: 2,
  },
  locationLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Palette.text.inactive,
  },
  locationName: {
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
  notificationIconAsset: {
    width: 44,
    height: 44,
  },

  /* Hero Card */
  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: "#E7EFFC",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 12,
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  heroPromptBox: {
    backgroundColor: Palette.blue[100],
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    height: 70,
  },
  heroAiIconAsset: {
    width: 70,
    height: 120,
  },
  heroPromptTextGroup: {
    paddingTop: 12,
    flex: 1,
  },
  heroPromptTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 13,
    fontWeight: "600",
    color: Palette.text.active,
    lineHeight: 18,
  },
  heroPromptSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 11.5,
    color: Palette.text.inactive,
    marginTop: 2,
    lineHeight: 15,
  },
  heroArrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Palette.blue[500],
    alignItems: "center",
    justifyContent: "center",
  },
  searchBarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFCFE",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E6EDF8",
    height: 48,
    paddingHorizontal: 8,
    gap: 8,
  },
  searchIconAsset: {
    width: 36,
    height: 36,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Palette.text.active,
  },
  micSearchButton: {
    padding: 4,
  },
  micIconAsset: {
    width: 50,
    height: 100,
  },

  /* Feature 2x2 Grid */
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  featureCard: {
    width: "48%",
    backgroundColor: "#FAFCFE",
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: "#EDF3FD",
    padding: 14,
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  featureIconAsset: {
    width: 44,
    height: 44,
    marginBottom: 10,
  },
  featureTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: Palette.text.active,
    marginBottom: 4,
  },
  featureSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 11.5,
    color: Palette.text.inactive,
    lineHeight: 16,
  },

  /* Sections */
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    fontWeight: "700",
    color: Palette.text.active,
  },
  seeAllGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  seeAllText: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    color: Palette.blue[500],
  },
  horizontalScrollContent: {
    paddingHorizontal: 20,
    gap: 14,
    paddingBottom: 8,
    marginBottom: 20,
  },

  /* Service Card */
  serviceCard: {
    width: 240,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: "#EDF3FD",
    overflow: "hidden",
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  serviceImageContainer: {
    width: "100%",
    height: 125,
    position: "relative",
  },
  serviceImage: {
    width: "100%",
    height: "100%",
  },
  categoryPill: {
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
    width: 20,
    height: 20,
  },
  categoryPillText: {
    fontFamily: Fonts.semiBold,
    fontSize: 11,
    fontWeight: "600",
    color: Palette.blue[700],
  },
  serviceCardContent: {
    padding: 12,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  distanceBadge: {
    backgroundColor: Palette.blue[100],
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  distanceBadgeText: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    color: Palette.blue[700],
  },
  featureBadge: {
    backgroundColor: Palette.blue[100],
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  featureBadgeText: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    color: Palette.blue[700],
  },
  serviceCardTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: Palette.text.active,
    marginBottom: 4,
  },
  serviceCardDescription: {
    fontFamily: Fonts.regular,
    fontSize: 11.5,
    color: Palette.text.inactive,
    lineHeight: 16,
  },

  /* Emergency Card */
  emergencyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F2F2F2",
    marginHorizontal: 20,
    padding: 14,
    shadowColor: Palette.brand.danger,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 1,
  },
  emergencyPromptBox: {
    backgroundColor: "#FEF2F2",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    height: 90,
  },
  emergencyIconAsset: {
    width: 70,
    height: 120,
  },
  emergencyTextGroup: {
    paddingTop: 20,
    flex: 1,
  },
  emergencyPromptTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 13,
    fontWeight: "600",
    color: Palette.text.active,
    lineHeight: 18,
  },
  emergencyPromptSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 11.5,
    color: Palette.text.inactive,
    marginTop: 2,
    lineHeight: 15,
  },
  emergencyButton: {
    height: 46,
    borderRadius: 23,
    backgroundColor: "#FF4D4D",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF4D4D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  emergencyButtonText: {
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
