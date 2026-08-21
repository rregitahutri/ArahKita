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
  const [questionText, setQuestionText] = useState("");
  const [hasQuestionCard, setHasQuestionCard] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);
  const [capturedPhoto, setCapturedPhoto] = useState<any>(null);
  const [selectedVisibility, setSelectedVisibility] = useState<
    "publik" | "teman" | "anonim"
  >("publik");

  // Success Toast Popup State & Animation
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastSlideAnim] = useState(new Animated.Value(-120));
  const [toastFadeAnim] = useState(new Animated.Value(0));

  // Camera Modal States
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [cameraMode, setCameraMode] = useState<"video" | "foto">("foto");
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(false);

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
    if (
      !postText.trim() &&
      !questionText.trim() &&
      !capturedPhoto &&
      selectedPhotos.length === 0
    ) {
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShowSuccessToast(true);

    Animated.parallel([
      Animated.timing(toastFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(toastSlideAnim, {
        toValue: 0,
        tension: 70,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();

    // After 1.8 seconds, slide toast out and navigate back to Community Screen
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(toastFadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(toastSlideAnim, {
          toValue: -120,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowSuccessToast(false);
        if (onPostSuccess) {
          onPostSuccess();
        } else if (onBack) {
          onBack();
        }
      });
    }, 1800);
  };

  const togglePhotoSelection = (index: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedPhotos((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const isPostButtonActive =
    postText.trim().length > 0 ||
    questionText.trim().length > 0 ||
    capturedPhoto !== null ||
    selectedPhotos.length > 0;

  return (
    <View style={styles.bgWhiteContainer}>
      {/* Top Floating Success Toast Popup (Mockup) */}
      {showSuccessToast && (
        <Animated.View
          style={[
            styles.successToastContainer,
            {
              opacity: toastFadeAnim,
              transform: [{ translateY: toastSlideAnim }],
            },
          ]}
        >
          <View style={styles.toastIconGlowCircle}>
            <View style={styles.toastIconInnerCircle}>
              <Ionicons name="checkmark" size={16} color="#5590FF" />
            </View>
          </View>

          <View style={styles.toastTextGroup}>
            <ThemedText style={styles.toastTitleText}>
              Postingan baru anda berhasil dibagikan!
            </ThemedText>
            <ThemedText style={styles.toastSubtitleText}>
              Dengarkan cerita, ajukan pertanyaan, atau tulis postingan.
            </ThemedText>
          </View>
        </Animated.View>
      )}

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
            {/* Story Card */}
            <View style={styles.inputCard}>
              <View style={styles.inputRow}>
                <View style={styles.chatIconBox}>
                  <Image
                    source={require("@/assets/icons/ic-commun-story.png")}
                    style={styles.chatIconAsset}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.textInputWrap}>
                  {postText.length === 0 && (
                    <ThemedText style={styles.promptHeaderPlaceholder}>
                      Apa yang ingin kamu ceritakan?
                    </ThemedText>
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
              </View>
            </View>

            {/* Question Card (when Tanya Komunitas is selected) */}
            {hasQuestionCard && (
              <View style={[styles.inputCard, styles.questionInputCard]}>
                <View style={styles.inputRow}>
                  <View style={styles.askIconBox}>
                    <Image
                      source={require("@/assets/icons/ic-commun-ask-2.png")}
                      style={styles.chatIconAsset}
                      resizeMode="contain"
                    />
                  </View>

                  <View style={styles.textInputWrap}>
                    <TextInput
                      style={styles.questionTextInput}
                      placeholder="Ajukan pertanyaan Anda..."
                      placeholderTextColor={Palette.text.inactive}
                      value={questionText}
                      onChangeText={setQuestionText}
                      multiline
                      textAlignVertical="top"
                    />
                  </View>
                </View>
              </View>
            )}

            {/* Captured Photo Attachment Thumbnail (Mockup 3) */}
            {capturedPhoto && (
              <View style={styles.capturedPhotoContainer}>
                <Image
                  source={capturedPhoto}
                  style={styles.capturedPhotoThumb}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  style={styles.capturedPhotoCloseBtn}
                  activeOpacity={0.8}
                  onPress={() => setCapturedPhoto(null)}
                >
                  <Ionicons name="close" size={14} color="#000000" />
                </TouchableOpacity>
              </View>
            )}
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
                  onPress={() => setIsCameraModalOpen(true)}
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
                setPostText(
                  "Di MRT Fatmawati aku baru sadar kalau papan petunjuk visualnya jelas banget. Ga perlu nanya, tinggal ikutin warna dan simbol. Semoga makin banyak stasiun yang kaya gini.",
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
                setHasQuestionCard(true);
                setQuestionText(
                  "Stasiun atau halte mana lagi yang punya petunjuk visual yang mudah diikuti?",
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

      {/* Fullscreen Real-time Camera Screen Modal (Mockups 1 & 2) */}
      <Modal
        visible={isCameraModalOpen}
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setIsCameraModalOpen(false)}
      >
        <View style={styles.cameraScreenContainer}>
          {/* Real-time Viewfinder Background Preview */}
          <Image
            source={require("@/assets/images/img-train-station-1.png")}
            style={styles.cameraLivePreview}
            resizeMode="cover"
          />
          <View style={styles.cameraDarkOverlay} />

          <SafeAreaView style={styles.cameraSafeArea} edges={["top", "bottom"]}>
            {/* Camera Header Bar */}
            <View style={styles.cameraHeaderBar}>
              <TouchableOpacity
                style={styles.cameraBackBtn}
                activeOpacity={0.8}
                onPress={() => setIsCameraModalOpen(false)}
              >
                <Ionicons name="chevron-back" size={22} color="#000000" />
              </TouchableOpacity>

              <View style={styles.cameraHeaderActions}>
                {/* Flash Button */}
                <TouchableOpacity
                  style={[
                    styles.cameraActionCircle,
                    isFlashOn && styles.cameraActionCircleActive,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setIsFlashOn(!isFlashOn);
                  }}
                >
                  <Image
                    source={require("@/assets/icons/ic-commun-flash.png")}
                    style={styles.cameraActionIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                {/* Switch / Rotate Camera Button */}
                <TouchableOpacity
                  style={styles.cameraActionCircle}
                  activeOpacity={0.8}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setIsFrontCamera(!isFrontCamera);
                  }}
                >
                  <Image
                    source={require("@/assets/icons/ic-commun-camera-rotate.png")}
                    style={styles.cameraActionIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Spacer */}
            <View style={{ flex: 1 }} />

            {/* Bottom Camera Controls Area */}
            <View style={styles.cameraBottomControls}>
              {/* Circular Shutter Button */}
              <TouchableOpacity
                style={styles.shutterOuterCircle}
                activeOpacity={0.85}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  setCapturedPhoto(
                    require("@/assets/images/img-train-station-1.png"),
                  );
                  setIsCameraModalOpen(false);
                }}
              >
                {cameraMode === "video" ? (
                  /* Red Video Record Circle Button (Mockup 1) */
                  <View style={styles.shutterVideoInner} />
                ) : (
                  /* Gray Photo Shutter Circle Button (Mockup 2) */
                  <View style={styles.shutterPhotoInner} />
                )}
              </TouchableOpacity>

              {/* Mode Switcher Segmented Container */}
              <View style={styles.modeSwitchContainer}>
                <TouchableOpacity
                  style={[
                    styles.modePillBtn,
                    cameraMode === "video" && styles.modePillBtnActive,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setCameraMode("video");
                  }}
                >
                  <ThemedText
                    style={[
                      styles.modePillText,
                      cameraMode === "video" && styles.modePillTextActive,
                    ]}
                  >
                    Video
                  </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.modePillBtn,
                    cameraMode === "foto" && styles.modePillBtnActive,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setCameraMode("foto");
                  }}
                >
                  <ThemedText
                    style={[
                      styles.modePillText,
                      cameraMode === "foto" && styles.modePillTextActive,
                    ]}
                  >
                    Foto
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </View>
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

  /* Floating Success Toast Banner Styles (Mockup) */
  successToastContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 54 : 36,
    left: 20,
    right: 20,
    zIndex: 999,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBF2FF",
    borderRadius: 22,
    borderWidth: 1.2,
    borderColor: "#D2E2FE",
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: Palette.blue[500],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
  toastIconGlowCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#C6DCFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  toastIconInnerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Palette.blue[500],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toastTextGroup: {
    flex: 1,
  },
  toastTitleText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 3,
  },
  toastSubtitleText: {
    fontFamily: Fonts.regular,
    fontSize: 11.5,
    color: "#64748B",
    lineHeight: 16,
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
    paddingBottom: 14,
    gap: 10,
  },
  inputCard: {
    backgroundColor: "#F4F8FF",
    borderRadius: 18,
    padding: 14,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  chatIconBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 1,
  },
  chatIconAsset: {
    width: 16,
    height: 16,
  },
  textInputWrap: {
    flex: 1,
    position: "relative",
  },
  promptHeaderPlaceholder: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    color: Palette.text.inactive,
    position: "absolute",
    top: 2,
    left: 0,
  },
  mainTextInput: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 13.5,
    color: Palette.blue[700],
    lineHeight: 20,
    paddingTop: 2,
    paddingBottom: 2,
    paddingHorizontal: 0,
  },
  questionInputCard: {
    marginTop: 0,
  },
  askIconBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 1,
  },
  questionTextInput: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 13.5,
    color: Palette.blue[700],
    lineHeight: 20,
    paddingTop: 2,
    paddingBottom: 2,
    paddingHorizontal: 0,
  },

  /* Captured Photo Attachment Thumbnail in NewPostScreen (Mockup 3) */
  capturedPhotoContainer: {
    width: 110,
    height: 110,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    marginTop: 6,
  },
  capturedPhotoThumb: {
    width: "100%",
    height: "100%",
  },
  capturedPhotoCloseBtn: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
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
    backgroundColor: "#F5F8FF",
    alignItems: "center",
    borderRadius: 18,
    padding: 14,
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

  /* Camera Screen Modal Styles (Mockups 1 & 2) */
  cameraScreenContainer: {
    flex: 1,
    backgroundColor: "#000000",
  },
  cameraLivePreview: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.85,
  },
  cameraDarkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  cameraSafeArea: {
    flex: 1,
    justifyContent: "space-between",
  },
  cameraHeaderBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  cameraBackBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraHeaderActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cameraActionCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraActionCircleActive: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  cameraActionIcon: {
    width: 22,
    height: 22,
  },
  cameraBottomControls: {
    alignItems: "center",
    paddingBottom: 34,
    gap: 24,
  },
  shutterOuterCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "rgba(255, 255, 255, 0.4)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  shutterVideoInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#D9383A",
  },
  shutterPhotoInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#8E8E93",
    borderWidth: 3,
    borderColor: "#4A4A4A",
  },
  modeSwitchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F4FA",
    borderRadius: 24,
    padding: 4,
    width: 210,
  },
  modePillBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  modePillBtnActive: {
    backgroundColor: "#5590FF",
  },
  modePillText: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    color: "#5590FF",
  },
  modePillTextActive: {
    fontFamily: Fonts.semiBold,
    color: "#FFFFFF",
  },
});
