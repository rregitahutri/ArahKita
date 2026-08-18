import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { Fonts, Palette } from "@/constants/theme";

export interface EditProfileScreenProps {
  onBack?: () => void;
  onSave?: () => void;
}

export default function EditProfileScreen({
  onBack,
  onSave,
}: EditProfileScreenProps) {
  const [name, setName] = useState("Shafza Lekatompessy");
  const [username, setUsername] = useState("shafzale.4za");
  const [password, setPassword] = useState("123456789012");
  const [phone, setPhone] = useState("08123456789");
  const [birthday, setBirthday] = useState("28 Agustus 2004");
  const [showPassword, setShowPassword] = useState(false);

  const [nameFocused, setNameFocused] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [birthdayFocused, setBirthdayFocused] = useState(false);

  const handleBackPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onBack) {
      onBack();
    } else {
      Alert.alert("Kembali", "Kembali ke halaman profil.");
    }
  };

  const handleEditAvatar = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert("Ubah Foto Profil", "Pilih foto baru dari galeri atau kamera.");
  };

  const handleSaveProfile = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert(
      "Profil Diperbarui",
      "Perubahan profil Anda telah berhasil disimpan.",
      [
        {
          text: "OK",
          onPress: () => {
            if (onSave) {
              onSave();
            } else if (onBack) {
              onBack();
            }
          },
        },
      ],
    );
  };

  const handleDeleteAccount = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert(
      "Hapus Akun",
      "Apakah Anda yakin ingin menghapus akun Anda secara permanen?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: () =>
            Alert.alert("Akun Dihapus", "Akun Anda telah berhasil dihapus."),
        },
      ],
    );
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

              <ThemedText style={styles.screenTitle}>Profile</ThemedText>

              <View style={styles.headerSpacer} />
            </View>

            {/* Form Outer Card Container */}
            <View style={styles.formCard}>
              {/* Profile Avatar Section */}
              <View style={styles.avatarSection}>
                <View style={styles.avatarWrapper}>
                  <View style={styles.avatarPlaceholder}>
                    <Ionicons
                      name="person"
                      size={54}
                      color={Palette.blue[500]}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.avatarEditBadge}
                    activeOpacity={0.8}
                    onPress={handleEditAvatar}
                  >
                    <Image
                      source={require("@/assets/icons/ic-profil-edit.png")}
                      style={styles.avatarEditIconAsset}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* 1. Nama Field */}
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Nama</ThemedText>
                <View
                  style={[
                    styles.inputWrapper,
                    nameFocused && styles.inputWrapperFocused,
                  ]}
                >
                  <View style={styles.iconBadge}>
                    <Image
                      source={require("@/assets/icons/ic-profil-account.png")}
                      style={styles.iconAsset}
                      resizeMode="contain"
                    />
                  </View>
                  <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    onFocus={() => setNameFocused(true)}
                    onBlur={() => setNameFocused(false)}
                    placeholder="Masukkan Nama Lengkap"
                    placeholderTextColor={Palette.text.inactive}
                  />
                </View>
              </View>

              {/* 2. Nama Pengguna Field */}
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Nama Pengguna</ThemedText>
                <View
                  style={[
                    styles.inputWrapper,
                    usernameFocused && styles.inputWrapperFocused,
                  ]}
                >
                  <View style={styles.iconBadge}>
                    <Image
                      source={require("@/assets/icons/ic-edit-username.png")}
                      style={styles.iconAsset}
                      resizeMode="contain"
                    />
                  </View>
                  <TextInput
                    style={styles.textInput}
                    value={username}
                    onChangeText={setUsername}
                    onFocus={() => setUsernameFocused(true)}
                    onBlur={() => setUsernameFocused(false)}
                    placeholder="Masukkan Nama Pengguna"
                    placeholderTextColor={Palette.text.inactive}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* 3. Kata Sandi Field */}
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Kata Sandi</ThemedText>
                <View
                  style={[
                    styles.inputWrapper,
                    passwordFocused && styles.inputWrapperFocused,
                  ]}
                >
                  <View style={styles.iconBadge}>
                    <Image
                      source={require("@/assets/icons/ic-edit-password.png")}
                      style={styles.iconAsset}
                      resizeMode="contain"
                    />
                  </View>
                  <TextInput
                    style={styles.textInput}
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    secureTextEntry={!showPassword}
                    placeholder="Masukkan Kata Sandi"
                    placeholderTextColor={Palette.text.inactive}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      setShowPassword((prev) => !prev);
                    }}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={18}
                      color={Palette.text.inactive}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* 4. Nomor Telepon Field */}
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Nomor Telepon</ThemedText>
                <View
                  style={[
                    styles.inputWrapper,
                    phoneFocused && styles.inputWrapperFocused,
                  ]}
                >
                  <View style={styles.iconBadge}>
                    <Image
                      source={require("@/assets/icons/ic-edit-phone.png")}
                      style={styles.iconAsset}
                      resizeMode="contain"
                    />
                  </View>
                  <TextInput
                    style={styles.textInput}
                    value={phone}
                    onChangeText={setPhone}
                    onFocus={() => setPhoneFocused(true)}
                    onBlur={() => setPhoneFocused(false)}
                    keyboardType="phone-pad"
                    placeholder="Masukkan Nomor Telepon"
                    placeholderTextColor={Palette.text.inactive}
                  />
                </View>
              </View>

              {/* 5. Tanggal Ulang Tahun Field */}
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>
                  Tanggal Ulang Tahun
                </ThemedText>
                <View
                  style={[
                    styles.inputWrapper,
                    birthdayFocused && styles.inputWrapperFocused,
                  ]}
                >
                  <View style={styles.iconBadge}>
                    <Image
                      source={require("@/assets/icons/ic-edit-birthday.png")}
                      style={styles.iconAsset}
                      resizeMode="contain"
                    />
                  </View>
                  <TextInput
                    style={styles.textInput}
                    value={birthday}
                    onChangeText={setBirthday}
                    onFocus={() => setBirthdayFocused(true)}
                    onBlur={() => setBirthdayFocused(false)}
                    placeholder="Pilih Tanggal Ulang Tahun"
                    placeholderTextColor={Palette.text.inactive}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      Alert.alert(
                        "Kalender",
                        "Membuka pemilih tanggal ulang tahun.",
                      );
                    }}
                    activeOpacity={0.7}
                  >
                    <Image
                      source={require("@/assets/icons/ic-edit-calendar.png")}
                      style={styles.calendarIconAsset}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Simpan Perubahan Button */}
            <TouchableOpacity
              style={styles.saveButton}
              activeOpacity={0.85}
              onPress={handleSaveProfile}
            >
              <ThemedText style={styles.saveButtonText}>
                Simpan Perubahan
              </ThemedText>
            </TouchableOpacity>

            {/* Hapus Akun Button (Bright Red Background with White Text) */}
            <TouchableOpacity
              style={styles.deleteButton}
              activeOpacity={0.85}
              onPress={handleDeleteAccount}
            >
              <ThemedText style={styles.deleteButtonText}>
                Hapus Akun
              </ThemedText>
            </TouchableOpacity>
          </ScrollView>
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
  scrollContent: {
    paddingBottom: 36,
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

  /* Form Card Container */
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1.2,
    borderColor: "#E7EFFC",
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 20,
    padding: 18,
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },

  /* Avatar Section */
  avatarSection: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    marginBottom: 20,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Palette.blue[100],
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#EDF3FD",
  },
  avatarEditBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#EDF3FD",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  avatarEditIconAsset: {
    width: 16,
    height: 16,
  },

  /* Input Fields */
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: Fonts.semiBold,
    fontSize: 13.5,
    fontWeight: "600",
    color: Palette.text.active,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFCFE",
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: "#E6EDF8",
    height: 52,
    paddingHorizontal: 10,
  },
  inputWrapperFocused: {
    borderColor: Palette.blue[500],
    backgroundColor: "#FFFFFF",
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EDF3FD",
    alignItems: "center",
    justifyContent: "center",
  },
  iconAsset: {
    width: 20,
    height: 20,
  },
  textInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 12,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Palette.text.active,
  },
  eyeButton: {
    padding: 6,
  },
  calendarIconAsset: {
    width: 20,
    height: 20,
  },

  /* Simpan Perubahan Button */
  saveButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: Palette.button.primary,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 12,
    shadowColor: Palette.blue[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  saveButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  /* Delete Account Button (Bright Red with White Text) */
  deleteButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FF4D4D",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    shadowColor: "#FF4D4D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  deleteButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
