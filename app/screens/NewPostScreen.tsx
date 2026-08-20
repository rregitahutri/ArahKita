import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Alert,
  Animated,
  Image,
  KeyboardAvoidingView,
  Modal,
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

export interface NewPostScreenProps {
  onBack?: () => void;
  onPostSuccess?: () => void;
}

export default function NewPostScreen({
  onBack,
  onPostSuccess,
}: NewPostScreenProps) {
  const [postText, setPostText] = useState("");
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);
  const [selectedVisibility, setSelectedVisibility] = useState<
    "publik" | "teman" | "anonim"
  >("publik");

  // Bottom Sheet 1: Plus Button Modal
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(300));
  const [fadeAnim] = useState(new Animated.Value(0));

  // Bottom Sheet 2: Visibility Modal
  const [isVisibilityModalVisible, setIsVisibilityModalVisible] =
    useState(false);
  const [visibilitySlideAnim] = useState(new Animated.Value(350));
  const [visibilityFadeAnim] = useState(new Animated.Value(0));

  const openBottomSheet = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsBottomSheetVisible(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 65,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeBottomSheet = (callback?: () => void) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsBottomSheetVisible(false);
      if (callback) callback();
    });
  };

  const openVisibilityModal = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsVisibilityModalVisible(true);
    Animated.parallel([
      Animated.timing(visibilityFadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.spring(visibilitySlideAnim, {
        toValue: 0,
        tension: 65,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeVisibilityModal = (
    newVisibility?: "publik" | "teman" | "anonim",
  ) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.parallel([
      Animated.timing(visibilityFadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(visibilitySlideAnim, {
        toValue: 350,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsVisibilityModalVisible(false);
      if (newVisibility) {
        setSelectedVisibility(newVisibility);
      }
    });
  };

  const handleBackPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onBack) {
      onBack();
    } else {
      Alert.alert("Kembali", "Kembali ke halaman komunitas.");
    }
  };

  const handlePostSubmit = () => {
    if (!postText.trim() && selectedPhotos.length === 0) {
      Alert.alert(
        "Postingan Kosong",
        "Silakan tulis cerita Anda atau pilih setidaknya satu foto terlebih dahulu.",
      );
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      "Postingan Terkirim!",
      "Cerita Anda berhasil dipublikasikan ke komunitas.",
      [
        {
          text: "OK",
          onPress: () => {
            if (onPostSuccess) {
              onPostSuccess();
            } else if (onBack) {
              onBack();
            }
          },
        },
      ],
    );
  };

  const togglePhotoSelection = (index: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedPhotos((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const isPostButtonActive =
    postText.trim().length > 0 || selectedPhotos.length > 0;

  return (
    <View style={styles.bgWhiteContainer}>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
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

            <ThemedText style={styles.screenTitle}>Postingan Baru</ThemedText>

            <TouchableOpacity
              style={[
                styles.postSubmitButton,
                isPostButtonActive && styles.postSubmitButtonActive,
              ]}
              disabled={!isPostButtonActive}
              activeOpacity={0.8}
              onPress={handlePostSubmit}
            >
              <ThemedText
                style={[
                  styles.postSubmitText,
                  isPostButtonActive && styles.postSubmitTextActive,
                ]}
              >
                Posting
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Main Content Input Box */}
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.inputCard}>
              {postText.length === 0 && (
                <View style={styles.inputPromptHeader}>
                  <View style={styles.chatIconBox}>
                    <Image
                      source={require("@/assets/icons/ic-commun-story.png")}
                      style={styles.chatIconAsset}
                      resizeMode="contain"
                    />
                  </View>
                  <ThemedText style={styles.promptHeaderPlaceholder}>
                    Apa yang ingin kamu ceritakan?
                  </ThemedText>
                </View>
              )}

              <TextInput
                style={styles.mainTextInput}
                placeholder=""
                placeholderTextColor={Palette.text.inactive}
                value={postText}
                onChangeText={setPostText}
                multiline
                textAlignVertical="top"
              />
            </View>
          </ScrollView>

          {/* Photo Gallery Selector Horizontal List */}
          <View style={styles.photoSelectorContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.photosScrollContent}
            >
              {/* Photo 1 */}
              <TouchableOpacity
                style={[
                  styles.photoThumbWrapper,
                  selectedPhotos.includes(1) && styles.photoThumbSelected,
                ]}
                activeOpacity={0.85}
                onPress={() => togglePhotoSelection(1)}
              >
                <Image
                  source={require("@/assets/images/img-commun-gallery-1.png")}
                  style={styles.photoThumbImage}
                  resizeMode="cover"
                />
                <View style={styles.photoOverlayBadge}>
                  <Ionicons name="images-outline" size={16} color="#FFFFFF" />
                </View>
              </TouchableOpacity>

              {/* Photo 2 */}
              <TouchableOpacity
                style={[
                  styles.photoThumbWrapper,
                  selectedPhotos.includes(2) && styles.photoThumbSelected,
                ]}
                activeOpacity={0.85}
                onPress={() => togglePhotoSelection(2)}
              >
                <Image
                  source={require("@/assets/images/img-commun-gallery-2.png")}
                  style={styles.photoThumbImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>

              {/* Photo 3 */}
              <TouchableOpacity
                style={[
                  styles.photoThumbWrapper,
                  selectedPhotos.includes(3) && styles.photoThumbSelected,
                ]}
                activeOpacity={0.85}
                onPress={() => togglePhotoSelection(3)}
              >
                <Image
                  source={require("@/assets/images/img-commun-gallery-3.png")}
                  style={styles.photoThumbImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>

              {/* Photo 4 */}
              <TouchableOpacity
                style={[
                  styles.photoThumbWrapper,
                  selectedPhotos.includes(4) && styles.photoThumbSelected,
                ]}
                activeOpacity={0.85}
                onPress={() => togglePhotoSelection(4)}
              >
                <Image
                  source={require("@/assets/images/img-commun-gallery-4.png")}
                  style={styles.photoThumbImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>

              {/* Photo 5 */}
              <TouchableOpacity
                style={[
                  styles.photoThumbWrapper,
                  selectedPhotos.includes(5) && styles.photoThumbSelected,
                ]}
                activeOpacity={0.85}
                onPress={() => togglePhotoSelection(5)}
              >
                <Image
                  source={require("@/assets/images/img-commun-gallery-5.png")}
                  style={styles.photoThumbImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Bottom Toolbar */}
          <View style={styles.bottomToolbarContainer}>
            <View style={styles.leftToolbarGroup}>
              {/* Visibility Selector Pill */}
              <TouchableOpacity
                style={styles.visibilityPill}
                activeOpacity={0.8}
                onPress={openVisibilityModal}
              >
                <Image
                  source={
                    selectedVisibility === "teman"
                      ? require("@/assets/icons/ic-commun-friends.png")
                      : selectedVisibility === "anonim"
                        ? require("@/assets/icons/ic-commun-anonim.png")
                        : require("@/assets/icons/ic-commun-public.png")
                  }
                  style={styles.publicIconAsset}
                  resizeMode="contain"
                />
                <ThemedText style={styles.visibilityText}>
                  {selectedVisibility === "teman"
                    ? "Teman"
                    : selectedVisibility === "anonim"
                      ? "Anonim"
                      : "Publik"}
                </ThemedText>
              </TouchableOpacity>

              {/* Quick Attachment Icons */}
              <View style={styles.quickIconsRow}>
                <TouchableOpacity
                  style={styles.quickIconCircle}
                  onPress={() =>
                    Alert.alert(
                      "Kamera",
                      "Membuka kamera untuk mengambil foto.",
                    )
                  }
                >
                  <Image
                    source={require("@/assets/icons/ic-commun-camera.png")}
                    style={styles.quickIconAsset}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.quickIconCircle}
                  onPress={() =>
                    Alert.alert("Galeri", "Membuka galeri foto Anda.")
                  }
                >
                  <Image
                    source={require("@/assets/icons/ic-commun-image-black.png")}
                    style={styles.quickIconAsset}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.quickIconCircle}
                  onPress={() =>
                    Alert.alert(
                      "Lokasi",
                      "Menambahkan lokasi saat ini ke postingan.",
                    )
                  }
                >
                  <Image
                    source={require("@/assets/icons/ic-commun-map.png")}
                    style={styles.quickIconAsset}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Floating Add Item Button */}
            <TouchableOpacity
              style={styles.plusButtonCircle}
              activeOpacity={0.85}
              onPress={openBottomSheet}
            >
              <Image
                source={require("@/assets/icons/ic-commun-new-post.png")}
                style={styles.plusIconAsset}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Plus Button Bottom Sheet Modal */}
      <Modal
        visible={isBottomSheetVisible}
        transparent
        animationType="none"
        onRequestClose={() => closeBottomSheet()}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => closeBottomSheet()}
        >
          <Animated.View
            style={[styles.modalOverlayBg, { opacity: fadeAnim }]}
          />
        </TouchableOpacity>

        <Animated.View
          style={[
            styles.bottomSheetContainer,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Top Drag Handle */}
          <View style={styles.dragHandleBar} />

          {/* Option 1: Cerita */}
          <TouchableOpacity
            style={styles.bottomSheetOptionCard}
            activeOpacity={0.85}
            onPress={() =>
              closeBottomSheet(() => {
                Alert.alert(
                  "Cerita",
                  "Mulai bagikan pengalaman dan cerita pribadimu.",
                );
              })
            }
          >
            <View style={styles.optionIconCircle}>
              <Image
                source={require("@/assets/icons/ic-commun-story-2.png")}
                style={styles.optionIconAsset}
                resizeMode="contain"
              />
            </View>
            <View style={styles.optionTextGroup}>
              <ThemedText style={styles.optionTitle}>Cerita</ThemedText>
              <ThemedText style={styles.optionSub}>
                Bagikan pengalaman dan cerita pribadimu sehari-hari.
              </ThemedText>
            </View>
          </TouchableOpacity>

          {/* Option 2: Tanya Komunitas */}
          <TouchableOpacity
            style={styles.bottomSheetOptionCard}
            activeOpacity={0.85}
            onPress={() =>
              closeBottomSheet(() => {
                Alert.alert(
                  "Tanya Komunitas",
                  "Ajukan pertanyaan dan dapatkan jawaban dari komunitas.",
                );
              })
            }
          >
            <View style={styles.optionIconCircle}>
              <Image
                source={require("@/assets/icons/ic-commun-ask-2.png")}
                style={styles.optionIconAsset}
                resizeMode="contain"
              />
            </View>
            <View style={styles.optionTextGroup}>
              <ThemedText style={styles.optionTitle}>
                Tanya Komunitas
              </ThemedText>
              <ThemedText style={styles.optionSub}>
                Ajukan pertanyaan dan dapatkan jawaban dari komunitas.
              </ThemedText>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Modal>

      {/* Visibility Bottom Sheet Modal */}
      <Modal
        visible={isVisibilityModalVisible}
        transparent
        animationType="none"
        onRequestClose={() => closeVisibilityModal()}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => closeVisibilityModal()}
        >
          <Animated.View
            style={[styles.modalOverlayBg, { opacity: visibilityFadeAnim }]}
          />
        </TouchableOpacity>

        <Animated.View
          style={[
            styles.bottomSheetContainer,
            {
              transform: [{ translateY: visibilitySlideAnim }],
            },
          ]}
        >
          {/* Top Drag Handle */}
          <View style={styles.dragHandleBar} />

          {/* Option 1: Publik */}
          <TouchableOpacity
            style={[
              styles.bottomSheetOptionCard,
              selectedVisibility === "publik"
                ? styles.optionCardActive
                : styles.optionCardInactive,
            ]}
            activeOpacity={0.85}
            onPress={() => closeVisibilityModal("publik")}
          >
            <View
              style={[
                styles.optionIconCircle,
                selectedVisibility === "publik" &&
                  styles.optionIconCircleActive,
              ]}
            >
              <Image
                source={require("@/assets/icons/ic-commun-public.png")}
                style={[
                  styles.optionIconAsset,
                  selectedVisibility === "publik" &&
                    styles.optionIconAssetActive,
                ]}
                resizeMode="contain"
              />
            </View>
            <View style={styles.optionTextGroup}>
              <ThemedText
                style={[
                  styles.optionTitle,
                  selectedVisibility === "publik" && styles.optionTitleActive,
                ]}
              >
                Publik
              </ThemedText>
              <ThemedText
                style={[
                  styles.optionSub,
                  selectedVisibility === "publik" && styles.optionSubActive,
                ]}
              >
                Postingan dapat dilihat oleh semua pengguna ArahKita.
              </ThemedText>
            </View>
          </TouchableOpacity>

          {/* Option 2: Teman */}
          <TouchableOpacity
            style={[
              styles.bottomSheetOptionCard,
              selectedVisibility === "teman"
                ? styles.optionCardActive
                : styles.optionCardInactive,
            ]}
            activeOpacity={0.85}
            onPress={() => closeVisibilityModal("teman")}
          >
            <View
              style={[
                styles.optionIconCircle,
                selectedVisibility === "teman" && styles.optionIconCircleActive,
              ]}
            >
              <Image
                source={require("@/assets/icons/ic-commun-friends.png")}
                style={[
                  styles.optionIconAsset,
                  selectedVisibility === "teman" &&
                    styles.optionIconAssetActive,
                ]}
                resizeMode="contain"
              />
            </View>
            <View style={styles.optionTextGroup}>
              <ThemedText
                style={[
                  styles.optionTitle,
                  selectedVisibility === "teman" && styles.optionTitleActive,
                ]}
              >
                Teman
              </ThemedText>
              <ThemedText
                style={[
                  styles.optionSub,
                  selectedVisibility === "teman" && styles.optionSubActive,
                ]}
              >
                Hanya teman yang kamu tambahkan yang bisa melihat postingan.
              </ThemedText>
            </View>
          </TouchableOpacity>

          {/* Option 3: Anonim */}
          <TouchableOpacity
            style={[
              styles.bottomSheetOptionCard,
              selectedVisibility === "anonim"
                ? styles.optionCardActive
                : styles.optionCardInactive,
            ]}
            activeOpacity={0.85}
            onPress={() => closeVisibilityModal("anonim")}
          >
            <View
              style={[
                styles.optionIconCircle,
                selectedVisibility === "anonim" &&
                  styles.optionIconCircleActive,
              ]}
            >
              <Image
                source={require("@/assets/icons/ic-commun-anonim.png")}
                style={[
                  styles.optionIconAsset,
                  selectedVisibility === "anonim" &&
                    styles.optionIconAssetActive,
                ]}
                resizeMode="contain"
              />
            </View>
            <View style={styles.optionTextGroup}>
              <ThemedText
                style={[
                  styles.optionTitle,
                  selectedVisibility === "anonim" && styles.optionTitleActive,
                ]}
              >
                Anonim
              </ThemedText>
              <ThemedText
                style={[
                  styles.optionSub,
                  selectedVisibility === "anonim" && styles.optionSubActive,
                ]}
              >
                Nama dan profilmu tidak ditampilkan pada postingan ini.
              </ThemedText>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  bgWhiteContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
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
  postSubmitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: "#ADBDCD",
  },
  postSubmitButtonActive: {
    backgroundColor: Palette.button.primary,
  },
  postSubmitText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  postSubmitTextActive: {
    color: "#FFFFFF",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
  },
  inputCard: {
    backgroundColor: "#FFFFFF",
    padding: 6,
    minHeight: 280,
  },
  inputPromptHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  chatIconBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Palette.blue[100],
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  chatIconAsset: {
    width: 16,
    height: 16,
  },
  promptHeaderPlaceholder: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    color: Palette.text.inactive,
  },
  mainTextInput: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Palette.text.active,
    lineHeight: 22,
    minHeight: 200,
  },

  /* Photo Selector Gallery */
  photoSelectorContainer: {
    marginBottom: 14,
  },
  photosScrollContent: {
    paddingHorizontal: 20,
    gap: 4,
  },
  photoThumbWrapper: {
    width: 80,
    height: 80,
    borderRadius: 14,
    overflow: "hidden",
    position: "relative",
    borderWidth: 2,
    borderColor: "transparent",
  },
  photoThumbSelected: {
    borderColor: Palette.blue[500],
  },
  photoThumbImage: {
    width: "100%",
    height: "100%",
  },
  photoOverlayBadge: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Bottom Toolbar */
  bottomToolbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EDF3FD",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftToolbarGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  visibilityPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#EAF0FC",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  publicIconAsset: {
    width: 18,
    height: 18,
  },
  visibilityText: {
    fontFamily: Fonts.semiBold,
    fontSize: 12,
    fontWeight: "600",
    color: Palette.blue[600],
  },
  quickIconsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  quickIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F7FAFE",
    alignItems: "center",
    justifyContent: "center",
  },
  quickIconAsset: {
    width: 18,
    height: 18,
  },
  plusButtonCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Palette.button.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Palette.blue[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  plusIconAsset: {
    width: 18,
    height: 18,
    tintColor: "#FFFFFF",
  },

  /* Bottom Sheet Modal Styles */
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  modalOverlayBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  bottomSheetContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    paddingBottom: 34,
    paddingHorizontal: 20,
    gap: 12,
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 20,
  },
  dragHandleBar: {
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D0DCEB",
    alignSelf: "center",
    marginBottom: 8,
  },
  bottomSheetOptionCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    padding: 14,
    backgroundColor: "#F5F8FF",
  },
  optionCardInactive: {
    backgroundColor: "#F4F8FF",
  },
  optionCardActive: {
    backgroundColor: Palette.button.primary,
  },
  optionIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  optionIconCircleActive: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  optionIconAsset: {
    width: 22,
    height: 22,
  },
  optionIconAssetActive: {
    tintColor: Palette.blue[600],
  },
  optionTextGroup: {
    flex: 1,
  },
  optionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    fontWeight: "700",
    color: Palette.text.active,
    marginBottom: 3,
  },
  optionTitleActive: {
    color: "#FFFFFF",
  },
  optionSub: {
    fontFamily: Fonts.regular,
    fontSize: 11.5,
    color: Palette.text.inactive,
    lineHeight: 16,
  },
  optionSubActive: {
    color: "rgba(255, 255, 255, 0.9)",
  },
});
