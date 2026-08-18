import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React from "react";
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

export interface ProfileScreenProps {
  onNavigateToTab?: (
    tabName: "beranda" | "layanan" | "komunitas" | "profil",
  ) => void;
  onOpenSettings?: () => void;
  onOpenNotification?: () => void;
}

export default function ProfileScreen({
  onNavigateToTab,
  onOpenSettings,
  onOpenNotification,
}: ProfileScreenProps) {
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
    Alert.alert(
      "Asisten AI ArahKita",
      "Halo! Saya Asisten AI ArahKita. Ada yang bisa saya bantu hari ini?",
    );
  };

  const handleEditProfile = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert("Edit Profil", "Membuka formulir pengeditan profil.");
  };

  const handleAddFriends = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert("Tambah Teman", "Membuka fitur pencarian dan tambah teman.");
  };

  const handleQrCode = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert("Kode QR Saya", "Menampilkan kode QR profil Anda.");
  };

  const handleOptionPress = (title: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (title === "Notifikasi" && onOpenNotification) {
      onOpenNotification();
    } else {
      Alert.alert(title, `Membuka pengaturan ${title}.`);
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
            {/* Top Header: Location Capsule & Settings Button */}
            <View style={styles.topHeader}>
              <TouchableOpacity
                style={styles.locationCapsule}
                activeOpacity={0.85}
                onPress={() =>
                  Alert.alert("Lokasi", "Lokasi Anda saat ini: Jakarta Selatan")
                }
              >
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
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={Palette.text.inactive}
                  style={styles.locationChevron}
                />
              </TouchableOpacity>

              {/* Settings Gear Button */}
              <TouchableOpacity
                style={styles.settingsButton}
                activeOpacity={0.8}
                onPress={
                  onOpenSettings ||
                  (() =>
                    Alert.alert("Pengaturan", "Membuka pengaturan aplikasi."))
                }
              >
                <Image
                  source={require("@/assets/icons/ic-notif-settings.png")}
                  style={styles.settingsIconAsset}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            {/* User Profile Card */}
            <View style={styles.profileCard}>
              <View style={styles.userInfoRow}>
                {/* Avatar */}
                <View style={styles.avatarContainer}>
                  <Ionicons name="person" size={44} color={Palette.blue[500]} />
                </View>

                {/* Name & Username */}
                <View style={styles.userTextGroup}>
                  <ThemedText style={styles.userName}>
                    Shafza Lekatompessy
                  </ThemedText>
                  <ThemedText style={styles.userHandle}>
                    @shafzale.4za
                  </ThemedText>
                </View>

                {/* Edit Profile Button */}
                <TouchableOpacity
                  style={styles.editButton}
                  activeOpacity={0.8}
                  onPress={handleEditProfile}
                >
                  <Image
                    source={require("@/assets/icons/ic-profil-edit.png")}
                    style={styles.editIconAsset}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              {/* Bottom Action Row: Tambah Teman & QR Code */}
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.addFriendsButton}
                  activeOpacity={0.85}
                  onPress={handleAddFriends}
                >
                  <Image
                    source={require("@/assets/icons/ic-profil-add-friends.png")}
                    style={styles.addFriendsIconAsset}
                    resizeMode="contain"
                  />
                  <ThemedText style={styles.addFriendsButtonText}>
                    Tambah Teman
                  </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.qrCodeButton}
                  activeOpacity={0.8}
                  onPress={handleQrCode}
                >
                  <Image
                    source={require("@/assets/icons/ic-profil-qrcode.png")}
                    style={styles.qrCodeIconAsset}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Profile Options List Container (6 Items) */}
            <View style={styles.optionsCard}>
              {/* Item 1: Akun */}
              <TouchableOpacity
                style={styles.optionRow}
                activeOpacity={0.7}
                onPress={() => handleOptionPress("Akun")}
              >
                <View style={styles.optionIconCircle}>
                  <Image
                    source={require("@/assets/icons/ic-profil-account.png")}
                    style={styles.optionIconAsset}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.optionTextGroup}>
                  <ThemedText style={styles.optionTitle}>Akun</ThemedText>
                  <ThemedText style={styles.optionSubtitle}>
                    Informasi akun, preferensi aksesibilitas, bahasa
                  </ThemedText>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={Palette.text.active}
                />
              </TouchableOpacity>

              <View style={styles.optionDivider} />

              {/* Item 2: Privasi & Keamanan */}
              <TouchableOpacity
                style={styles.optionRow}
                activeOpacity={0.7}
                onPress={() => handleOptionPress("Privasi & Keamanan")}
              >
                <View style={styles.optionIconCircle}>
                  <Image
                    source={require("@/assets/icons/ic-profil-privacy.png")}
                    style={styles.optionIconAsset}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.optionTextGroup}>
                  <ThemedText style={styles.optionTitle}>
                    Privasi & Keamanan
                  </ThemedText>
                  <ThemedText style={styles.optionSubtitle}>
                    Privasi postingan, kelola teman, keamanan akun
                  </ThemedText>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={Palette.text.active}
                />
              </TouchableOpacity>

              <View style={styles.optionDivider} />

              {/* Item 3: Aktivitas */}
              <TouchableOpacity
                style={styles.optionRow}
                activeOpacity={0.7}
                onPress={() => handleOptionPress("Aktivitas")}
              >
                <View style={styles.optionIconCircle}>
                  <Image
                    source={require("@/assets/icons/ic-profil-activity.png")}
                    style={styles.optionIconAsset}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.optionTextGroup}>
                  <ThemedText style={styles.optionTitle}>Aktivitas</ThemedText>
                  <ThemedText style={styles.optionSubtitle}>
                    Postingan saya, riwayat navigasi, review & kontribusi
                  </ThemedText>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={Palette.text.active}
                />
              </TouchableOpacity>

              <View style={styles.optionDivider} />

              {/* Item 4: Notifikasi */}
              <TouchableOpacity
                style={styles.optionRow}
                activeOpacity={0.7}
                onPress={() => handleOptionPress("Notifikasi")}
              >
                <View style={styles.optionIconCircle}>
                  <Image
                    source={require("@/assets/icons/ic-profil-notif.png")}
                    style={styles.optionIconAsset}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.optionTextGroup}>
                  <ThemedText style={styles.optionTitle}>Notifikasi</ThemedText>
                  <ThemedText style={styles.optionSubtitle}>
                    Notifikasi layanan, notifikasi darurat, notifikasi komunitas
                  </ThemedText>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={Palette.text.active}
                />
              </TouchableOpacity>

              <View style={styles.optionDivider} />

              {/* Item 5: Bantuan & Dukungan */}
              <TouchableOpacity
                style={styles.optionRow}
                activeOpacity={0.7}
                onPress={() => handleOptionPress("Bantuan & Dukungan")}
              >
                <View style={styles.optionIconCircle}>
                  <Image
                    source={require("@/assets/icons/ic-profil-help.png")}
                    style={styles.optionIconAsset}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.optionTextGroup}>
                  <ThemedText style={styles.optionTitle}>
                    Bantuan & Dukungan
                  </ThemedText>
                  <ThemedText style={styles.optionSubtitle}>
                    Pusat bantuan, laporkan masalah, panduan penggunaan
                  </ThemedText>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={Palette.text.active}
                />
              </TouchableOpacity>

              <View style={styles.optionDivider} />

              {/* Item 6: Tentang ArahKita */}
              <TouchableOpacity
                style={styles.optionRow}
                activeOpacity={0.7}
                onPress={() => handleOptionPress("Tentang ArahKita")}
              >
                <View style={styles.optionIconCircle}>
                  <Image
                    source={require("@/assets/icons/ic-profil-about.png")}
                    style={styles.optionIconAsset}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.optionTextGroup}>
                  <ThemedText style={styles.optionTitle}>
                    Tentang ArahKita
                  </ThemedText>
                  <ThemedText style={styles.optionSubtitle}>
                    Tentang ArahKita, kebijakan, versi aplikasi
                  </ThemedText>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={Palette.text.active}
                />
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

              {/* Tab 2: Layanan */}
              <TouchableOpacity
                style={styles.navItem}
                activeOpacity={0.7}
                onPress={() => handleTabPress("layanan")}
              >
                <Image
                  source={require("@/assets/icons/ic-nav-layanan.png")}
                  style={styles.navIconAsset}
                  resizeMode="contain"
                />
                <ThemedText style={styles.navLabel}>Layanan</ThemedText>
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
                  source={require("@/assets/icons/ic-nav-komunitas.png")}
                  style={styles.navIconAsset}
                  resizeMode="contain"
                />
                <ThemedText style={styles.navLabel}>Komunitas</ThemedText>
              </TouchableOpacity>

              {/* Tab 4: Profil (ACTIVE) */}
              <TouchableOpacity
                style={styles.navItem}
                activeOpacity={0.7}
                onPress={() => handleTabPress("profil")}
              >
                <Image
                  source={require("@/assets/icons/ic-nav-profil-active.png")}
                  style={styles.navIconAsset}
                  resizeMode="contain"
                />
                <ThemedText style={[styles.navLabel, styles.navLabelActive]}>
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

  /* Top Location Header & Settings */
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 12,
  },
  locationCapsule: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    height: 52,
    paddingHorizontal: 8,
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  locationIconAsset: {
    width: 36,
    height: 36,
    marginRight: 8,
  },
  locationTextGroup: {
    flex: 1,
    gap: 1,
  },
  locationLabel: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: Palette.text.inactive,
  },
  locationName: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    fontWeight: "700",
    color: Palette.text.active,
  },
  locationChevron: {
    marginRight: 6,
  },
  settingsButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  settingsIconAsset: {
    width: 24,
    height: 24,
  },

  /* Profile Card */
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: "#E7EFFC",
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  userInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Palette.blue[100],
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  userTextGroup: {
    flex: 1,
  },
  userName: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    fontWeight: "700",
    color: Palette.text.active,
    marginBottom: 2,
  },
  userHandle: {
    fontFamily: Fonts.regular,
    fontSize: 12.5,
    color: Palette.text.inactive,
  },
  editButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#EDF3FD",
    alignItems: "center",
    justifyContent: "center",
  },
  editIconAsset: {
    width: 20,
    height: 20,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  addFriendsButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: Palette.button.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: Palette.blue[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  addFriendsIconAsset: {
    width: 20,
    height: 20,
  },
  addFriendsButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  qrCodeButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#EDF3FD",
    alignItems: "center",
    justifyContent: "center",
  },
  qrCodeIconAsset: {
    width: 22,
    height: 22,
  },

  /* Options Card */
  optionsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: "#E7EFFC",
    marginHorizontal: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  optionIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FAFCFE",
    borderWidth: 1,
    borderColor: "#EDF3FD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  optionIconAsset: {
    width: 22,
    height: 22,
  },
  optionTextGroup: {
    flex: 1,
    marginRight: 8,
  },
  optionTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: Palette.text.active,
    marginBottom: 2,
  },
  optionSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 11.5,
    color: Palette.text.inactive,
    lineHeight: 15,
  },
  optionDivider: {
    height: 1,
    backgroundColor: "#F4F7FC",
    marginLeft: 52,
  },

  /* Bottom Nav */
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
    top: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  floatingAiAsset: {
    width: 60,
    height: 60,
  },
});
