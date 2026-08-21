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

export interface CommunityScreenProps {
  onNavigateToTab?: (tabName: string) => void;
  onOpenNotification?: () => void;
  onOpenEmergency?: () => void;
  onOpenDigitalAssistant?: () => void;
  onOpenServiceDetail?: () => void;
  onOpenNewPost?: () => void;
}

export default function CommunityScreen({
  onNavigateToTab,
  onOpenNotification,
  onOpenEmergency,
  onOpenDigitalAssistant,
  onOpenServiceDetail,
  onOpenNewPost,
}: CommunityScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "semua" | "cerita" | "infotempat" | "tanyakan"
  >("semua");
  const [isListening, setIsListening] = useState(false);

  const handleNewPostPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onOpenNewPost) {
      onOpenNewPost();
    } else {
      Alert.alert(
        "Postingan Baru",
        "Membuka formulir membuat postingan komunitas.",
      );
    }
  };

  const handleMicSearch = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsListening((prev) => !prev);
    Alert.alert(
      "Asisten Suara",
      isListening
        ? "Mencoba menghentikan pencarian suara..."
        : "Mendengarkan... Silakan sebutkan kata kunci pencarian komunitas.",
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

  const handleOpenFacilityDetail = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (onOpenServiceDetail) {
      onOpenServiceDetail();
    } else {
      Alert.alert("Detail Layanan", "Membuka detail Stasiun MRT Fatmawati.");
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/bg-homepage.png")}
      style={styles.bgImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <View style={styles.container}>
          {/* Main Scrollable Content */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Top Search & Filter Bar */}
            <View style={styles.searchSection}>
              <View style={styles.searchBar}>
                <Ionicons
                  name="search"
                  size={20}
                  color={Palette.text.inactive}
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Cari layanan publik disini.."
                  placeholderTextColor={Palette.text.inactive}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                <TouchableOpacity onPress={handleMicSearch} activeOpacity={0.7}>
                  <Image
                    source={require("@/assets/icons/ic-homepage-search.png")}
                    style={styles.micIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Category Filter Pills Scroll */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterPillsScroll}
            >
              <TouchableOpacity
                style={[
                  styles.filterPill,
                  activeFilter === "semua" && styles.filterPillActive,
                ]}
                activeOpacity={0.8}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setActiveFilter("semua");
                }}
              >
                <ThemedText
                  style={[
                    styles.filterPillText,
                    activeFilter === "semua" && styles.filterPillTextActive,
                  ]}
                >
                  Semua
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterPill,
                  activeFilter === "cerita" && styles.filterPillActive,
                ]}
                activeOpacity={0.8}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setActiveFilter("cerita");
                }}
              >
                <Image
                  source={require("@/assets/icons/ic-commun-story.png")}
                  style={[
                    styles.filterPillIcon,
                    activeFilter === "cerita" && styles.filterPillIconActive,
                  ]}
                  resizeMode="contain"
                />
                <ThemedText
                  style={[
                    styles.filterPillText,
                    activeFilter === "cerita" && styles.filterPillTextActive,
                  ]}
                >
                  Cerita
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterPill,
                  activeFilter === "infotempat" && styles.filterPillActive,
                ]}
                activeOpacity={0.8}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setActiveFilter("infotempat");
                }}
              >
                <Image
                  source={require("@/assets/icons/ic-commun-place-info.png")}
                  style={[
                    styles.filterPillIcon,
                    activeFilter === "infotempat" &&
                      styles.filterPillIconActive,
                  ]}
                  resizeMode="contain"
                />
                <ThemedText
                  style={[
                    styles.filterPillText,
                    activeFilter === "infotempat" &&
                      styles.filterPillTextActive,
                  ]}
                >
                  Info Tempat
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterPill,
                  activeFilter === "tanyakan" && styles.filterPillActive,
                ]}
                activeOpacity={0.8}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setActiveFilter("tanyakan");
                }}
              >
                <Image
                  source={require("@/assets/icons/ic-commun-ask-2.png")}
                  style={[
                    styles.filterPillIcon,
                    activeFilter === "tanyakan" && styles.filterPillIconActive,
                  ]}
                  resizeMode="contain"
                />
                <ThemedText
                  style={[
                    styles.filterPillText,
                    activeFilter === "tanyakan" && styles.filterPillTextActive,
                  ]}
                >
                  Tanya Komunitas
                </ThemedText>
              </TouchableOpacity>
            </ScrollView>

            {/* AI Hero Banner Card */}
            <View style={styles.aiHeroCard}>
              <View style={styles.aiHeroHeaderRow}>
                <View style={styles.aiMascotCircle}>
                  <Image
                    source={require("@/assets/icons/ic-homepage-ai-assistant.png")}
                    style={styles.aiMascotImg}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.aiHeroTextGroup}>
                  <ThemedText style={styles.aiHeroTitle}>
                    Butuh bantuan dari komunitas?
                  </ThemedText>
                  <ThemedText style={styles.aiHeroSubtitle}>
                    Dengarkan cerita, ajukan pertanyaan, atau tulis postingan.
                  </ThemedText>
                </View>
                <Image
                  source={require("@/assets/icons/ic-homepage-mic.png")}
                  style={styles.volumeButton}
                  resizeMode="contain"
                />
              </View>

              {/* 2 Action Buttons Row */}
              <View style={styles.actionButtonsRow}>
                <TouchableOpacity
                  style={styles.primaryActionButton}
                  activeOpacity={0.85}
                  onPress={handleNewPostPress}
                >
                  <Image
                    source={require("@/assets/icons/ic-commun-new-post.png")}
                    style={styles.actionBtnIcon}
                    resizeMode="contain"
                  />
                  <ThemedText style={styles.primaryActionText}>
                    Postingan Baru
                  </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryActionButton}
                  activeOpacity={0.85}
                  onPress={handleNewPostPress}
                >
                  <Image
                    source={require("@/assets/icons/ic-commun-ask-2.png")}
                    style={styles.actionBtnIcon}
                    resizeMode="contain"
                  />
                  <ThemedText style={styles.secondaryActionText}>
                    Tanya Komunitas
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>

            {/* Section Header: Cerita Untukmu */}
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>
                Cerita Untukmu
              </ThemedText>
            </View>

            {/* Dynamic Filtered Feed Posts Stack */}
            <View style={styles.postsStack}>
              {/* Post 0: Anda (Visible in Tanya Komunitas & Semua) */}
              {(activeFilter === "semua" || activeFilter === "tanyakan") && (
                <View style={styles.postCard}>
                  <View style={styles.postHeader}>
                    <View style={styles.authorAvatarBox}>
                      <Image
                        source={require("@/assets/images/img-commun-review-1.png")}
                        style={styles.authorAvatarImg}
                        resizeMode="cover"
                      />
                    </View>

                    <View style={styles.authorInfoGroup}>
                      <ThemedText style={styles.authorName}>Anda</ThemedText>
                      <ThemedText style={styles.postTime}>
                        Beberapa saat lalu
                      </ThemedText>
                    </View>

                    <View style={styles.tagPill}>
                      <ThemedText style={styles.tagText}>
                        Pengguna Kursi Roda
                      </ThemedText>
                    </View>

                    <TouchableOpacity style={styles.moreOptionsButton}>
                      <Ionicons
                        name="ellipsis-horizontal"
                        size={18}
                        color={Palette.text.inactive}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Story Text Box */}
                  <View style={styles.embeddedStoryBox}>
                    <View style={styles.embeddedStoryIconCircle}>
                      <Image
                        source={require("@/assets/icons/ic-commun-story.png")}
                        style={styles.embeddedBoxIcon}
                        resizeMode="contain"
                      />
                    </View>
                    <ThemedText style={styles.embeddedStoryText}>
                      Di MRT Fatmawati aku baru sadar kalau papan petunjuk
                      visualnya jelas banget. Ga perlu nanya, tinggal ikutin
                      warna dan simbol. Semoga makin banyak stasiun yang kaya
                      gini.
                    </ThemedText>
                  </View>

                  {/* Question Text Box */}
                  <View style={styles.embeddedQuestionBox}>
                    <View style={styles.embeddedQuestionIconCircle}>
                      <Image
                        source={require("@/assets/icons/ic-commun-ask-2.png")}
                        style={styles.embeddedBoxIcon}
                        resizeMode="contain"
                      />
                    </View>
                    <ThemedText style={styles.embeddedQuestionText}>
                      Stasiun atau halte mana lagi yang punya petunjuk visual
                      yang mudah diikuti?
                    </ThemedText>
                  </View>

                  {/* Attached Photo Thumbnail */}
                  <View style={styles.userPostAttachedPhotoWrap}>
                    <Image
                      source={require("@/assets/images/img-train-station-1.png")}
                      style={styles.userPostAttachedPhoto}
                      resizeMode="cover"
                    />
                  </View>

                  {/* Reaction Bar */}
                  <View style={styles.reactionBar}>
                    <View style={styles.leftReactions}>
                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-like.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>32</ThemedText>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-repost.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>4</ThemedText>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-reply.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>12</ThemedText>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-edit.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>0</ThemedText>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.rightReactions}>
                      <TouchableOpacity style={styles.iconOnlyBtn}>
                        <Image
                          source={require("@/assets/icons/ic-commun-save.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconOnlyBtn}>
                        <Image
                          source={require("@/assets/icons/ic-service-share.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}

              {/* Post 1: Ahmad Fauzie (Visible in Info Tempat & Semua) */}
              {(activeFilter === "semua" || activeFilter === "infotempat") && (
                <View style={styles.postCard}>
                  <View style={styles.postHeader}>
                    <View style={styles.authorAvatarBox}>
                      <Image
                        source={require("@/assets/images/img-commun-review-2.png")}
                        style={styles.authorAvatarImg}
                        resizeMode="cover"
                      />
                    </View>

                    <View style={styles.authorInfoGroup}>
                      <ThemedText style={styles.authorName}>
                        Ahmad Fauzie
                      </ThemedText>
                      <ThemedText style={styles.postTime}>
                        2 menit lalu
                      </ThemedText>
                    </View>

                    <View style={styles.tagPill}>
                      <ThemedText style={styles.tagText}>
                        Pengguna Kursi Roda
                      </ThemedText>
                    </View>

                    <TouchableOpacity style={styles.moreOptionsButton}>
                      <Ionicons
                        name="ellipsis-horizontal"
                        size={18}
                        color={Palette.text.inactive}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Embedded Facility Card */}
                  <TouchableOpacity
                    style={styles.embeddedFacilityCard}
                    activeOpacity={0.9}
                    onPress={handleOpenFacilityDetail}
                  >
                    <Image
                      source={require("@/assets/images/img-train-station-2.png")}
                      style={styles.facilityThumb}
                      resizeMode="cover"
                    />
                    <View style={styles.facilityInfo}>
                      <ThemedText style={styles.facilityTitle}>
                        Stasiun MRT Fatmawati
                      </ThemedText>
                      <ThemedText style={styles.facilityDesc} numberOfLines={2}>
                        Akses lift, jalur pemandu, dan petugas bantuan tersedia.
                      </ThemedText>
                    </View>
                    <View style={styles.facilityChevronBox}>
                      <Ionicons
                        name="chevron-forward"
                        size={16}
                        color={Palette.blue[600]}
                      />
                    </View>
                  </TouchableOpacity>

                  <ThemedText style={styles.postBodyText}>
                    Ramp di pintu masuk RSUP Fatmawati cukup landai dan aman.
                    Tapi pintu otomatisnya agak berat kalau sendirian.
                  </ThemedText>

                  {/* 3 Photos Attachment Grid */}
                  <View style={styles.attachmentPhotosGrid}>
                    <Image
                      source={require("@/assets/images/img-commun-review-1.png")}
                      style={styles.gridPhoto}
                      resizeMode="cover"
                    />
                    <Image
                      source={require("@/assets/images/img-commun-review-2.png")}
                      style={styles.gridPhoto}
                      resizeMode="cover"
                    />
                    <Image
                      source={require("@/assets/images/img-commun-review-3.png")}
                      style={styles.gridPhoto}
                      resizeMode="cover"
                    />
                  </View>

                  {/* Reaction Bar */}
                  <View style={styles.reactionBar}>
                    <View style={styles.leftReactions}>
                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-like.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>32</ThemedText>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-repost.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>4</ThemedText>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-reply.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>12</ThemedText>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-edit.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>0</ThemedText>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.rightReactions}>
                      <TouchableOpacity style={styles.iconOnlyBtn}>
                        <Image
                          source={require("@/assets/icons/ic-commun-save.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconOnlyBtn}>
                        <Image
                          source={require("@/assets/icons/ic-service-share.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}

              {/* Post 2: Rina Oktaviani (Visible in Cerita, Info Tempat & Semua) */}
              {(activeFilter === "semua" ||
                activeFilter === "cerita" ||
                activeFilter === "infotempat") && (
                <View style={styles.postCard}>
                  <View style={styles.postHeader}>
                    <View style={styles.authorAvatarBox}>
                      <Image
                        source={require("@/assets/images/img-commun-review-3.png")}
                        style={styles.authorAvatarImg}
                        resizeMode="cover"
                      />
                    </View>

                    <View style={styles.authorInfoGroup}>
                      <ThemedText style={styles.authorName}>
                        Rina Oktaviani
                      </ThemedText>
                      <ThemedText style={styles.postTime}>
                        1 jam lalu
                      </ThemedText>
                    </View>

                    <View style={styles.tagPill}>
                      <ThemedText style={styles.tagText}>
                        Difabel Netra
                      </ThemedText>
                    </View>

                    <TouchableOpacity style={styles.moreOptionsButton}>
                      <Ionicons
                        name="ellipsis-horizontal"
                        size={18}
                        color={Palette.text.inactive}
                      />
                    </TouchableOpacity>
                  </View>

                  <ThemedText style={styles.postBodyText}>
                    Pertama kali ke MRT Fatmawati sendiri. Petunjuk suara dari
                    aplikasi cukup membantu sampai ke gate. Petugas juga cepat
                    datang waktu aku minta bantuan. Semoga guiding block-nya
                    bisa diperpanjang sampai area parkir.
                  </ThemedText>

                  {/* Reaction Bar */}
                  <View style={styles.reactionBar}>
                    <View style={styles.leftReactions}>
                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-like.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>48</ThemedText>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-repost.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>12</ThemedText>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-reply.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>22</ThemedText>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-edit.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>2</ThemedText>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.rightReactions}>
                      <TouchableOpacity style={styles.iconOnlyBtn}>
                        <Image
                          source={require("@/assets/icons/ic-commun-save.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconOnlyBtn}>
                        <Image
                          source={require("@/assets/icons/ic-service-share.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}

              {/* Post 3: Siti Christy (Visible in Tanya Komunitas & Semua) */}
              {(activeFilter === "semua" || activeFilter === "tanyakan") && (
                <View style={styles.postCard}>
                  <View style={styles.postHeader}>
                    <View style={styles.authorAvatarBox}>
                      <Image
                        source={require("@/assets/images/img-commun-review-4.png")}
                        style={styles.authorAvatarImg}
                        resizeMode="cover"
                      />
                    </View>

                    <View style={styles.authorInfoGroup}>
                      <ThemedText style={styles.authorName}>
                        Siti Christy
                      </ThemedText>
                      <ThemedText style={styles.postTime}>
                        2 jam lalu
                      </ThemedText>
                    </View>

                    <View style={styles.multipleTagsColumn}>
                      <View style={styles.tagPillStack}>
                        <ThemedText style={styles.tagText}>
                          Difabel Daksa
                        </ThemedText>
                      </View>
                      <View style={styles.tagPillStack}>
                        <ThemedText style={styles.tagText}>
                          Pengguna Kursi Roda
                        </ThemedText>
                      </View>
                    </View>

                    <TouchableOpacity style={styles.moreOptionsButton}>
                      <Ionicons
                        name="ellipsis-horizontal"
                        size={18}
                        color={Palette.text.inactive}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Question Quote Card */}
                  <View style={styles.questionQuoteCard}>
                    <View style={styles.questionCardContent}>
                      <View style={styles.questionUserRow}>
                        <View style={styles.questionUserAvatar}>
                          <Ionicons name="person" size={12} color="#6C7F9B" />
                        </View>
                        <ThemedText style={styles.questionUserName}>
                          Christian Budi
                        </ThemedText>
                      </View>
                      <View style={styles.questionTextRow}>
                        <Image
                          source={require("@/assets/icons/ic-commun-ask.png")}
                          style={styles.questionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.questionText}>
                          Akses kursi roda di Halte Blok M gimana ya?
                        </ThemedText>
                      </View>
                    </View>
                    <View style={styles.questionChevronBox}>
                      <Ionicons
                        name="chevron-forward"
                        size={16}
                        color={Palette.blue[600]}
                      />
                    </View>
                  </View>

                  <ThemedText style={styles.postBodyText}>
                    Ada ramp di sisi barat halte dan petugas biasanya siap
                    membantu. Lebih nyaman datang di luar jam sibuk.
                  </ThemedText>

                  {/* Reaction Bar */}
                  <View style={styles.reactionBar}>
                    <View style={styles.leftReactions}>
                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-like.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>
                          120
                        </ThemedText>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-repost.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>32</ThemedText>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-reply.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>64</ThemedText>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-edit.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>3</ThemedText>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.rightReactions}>
                      <TouchableOpacity style={styles.iconOnlyBtn}>
                        <Image
                          source={require("@/assets/icons/ic-commun-save.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconOnlyBtn}>
                        <Image
                          source={require("@/assets/icons/ic-service-share.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}

              {/* Post 4: Shaz Xie Xie (Visible in Info Tempat & Semua) */}
              {(activeFilter === "semua" || activeFilter === "infotempat") && (
                <View style={styles.postCard}>
                  <View style={styles.postHeader}>
                    <View style={styles.authorAvatarBox}>
                      <Image
                        source={require("@/assets/images/img-commun-gallery-1.png")}
                        style={styles.authorAvatarImg}
                        resizeMode="cover"
                      />
                    </View>

                    <View style={styles.authorInfoGroup}>
                      <ThemedText style={styles.authorName}>
                        Shaz Xie Xie
                      </ThemedText>
                      <ThemedText style={styles.postTime}>Kemarin</ThemedText>
                    </View>

                    <View style={styles.multipleTagsColumn}>
                      <View style={styles.tagPillStack}>
                        <ThemedText style={styles.tagText}>
                          Difabel Daksa
                        </ThemedText>
                      </View>
                      <View style={styles.tagPillStack}>
                        <ThemedText style={styles.tagText}>
                          Pengguna Kursi Roda
                        </ThemedText>
                      </View>
                    </View>

                    <TouchableOpacity style={styles.moreOptionsButton}>
                      <Ionicons
                        name="ellipsis-horizontal"
                        size={18}
                        color={Palette.text.inactive}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Embedded Facility Card */}
                  <TouchableOpacity
                    style={styles.embeddedFacilityCard}
                    activeOpacity={0.9}
                    onPress={handleOpenFacilityDetail}
                  >
                    <Image
                      source={require("@/assets/images/img-train-station-2.png")}
                      style={styles.facilityThumb}
                      resizeMode="cover"
                    />
                    <View style={styles.facilityInfo}>
                      <ThemedText style={styles.facilityTitle}>
                        Stasiun MRT Fatmawati
                      </ThemedText>
                      <ThemedText style={styles.facilityDesc} numberOfLines={2}>
                        Akses lift, jalur pemandu, dan petugas bantuan tersedia.
                      </ThemedText>
                    </View>
                    <View style={styles.facilityChevronBox}>
                      <Ionicons
                        name="chevron-forward"
                        size={16}
                        color={Palette.blue[600]}
                      />
                    </View>
                  </TouchableOpacity>

                  <ThemedText style={styles.postBodyText}>
                    Stasiun ini punya lift dan guiding block dari pintu masuk
                    sampai peron. Kalau bingung, petugasnya cukup responsif.
                  </ThemedText>

                  {/* Reaction Bar */}
                  <View style={styles.reactionBar}>
                    <View style={styles.leftReactions}>
                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-like.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>
                          422
                        </ThemedText>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-repost.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>32</ThemedText>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-reply.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>80</ThemedText>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-edit.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>22</ThemedText>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.rightReactions}>
                      <TouchableOpacity style={styles.iconOnlyBtn}>
                        <Image
                          source={require("@/assets/icons/ic-commun-save.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconOnlyBtn}>
                        <Image
                          source={require("@/assets/icons/ic-service-share.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}

              {/* Post 5: Dimas Citra Pistachio (Visible in Cerita & Semua) */}
              {(activeFilter === "semua" || activeFilter === "cerita") && (
                <View style={styles.postCard}>
                  <View style={styles.postHeader}>
                    <View style={styles.authorAvatarBox}>
                      <Image
                        source={require("@/assets/images/img-commun-gallery-2.png")}
                        style={styles.authorAvatarImg}
                        resizeMode="cover"
                      />
                    </View>

                    <View style={styles.authorInfoGroup}>
                      <ThemedText style={styles.authorName}>
                        Dimas Citra Pistachio
                      </ThemedText>
                      <ThemedText style={styles.postTime}>
                        1 minggu lalu
                      </ThemedText>
                    </View>

                    <View style={styles.tagPill}>
                      <ThemedText style={styles.tagText}>
                        Difabel Netra
                      </ThemedText>
                    </View>

                    <TouchableOpacity style={styles.moreOptionsButton}>
                      <Ionicons
                        name="ellipsis-horizontal"
                        size={18}
                        color={Palette.text.inactive}
                      />
                    </TouchableOpacity>
                  </View>

                  <ThemedText style={styles.postBodyText}>
                    Hari ini nyoba turun di Stasiun KRL Pasar Minggu. Salah arah
                    dikit karena suara kereta rame banget, tapi akhirnya ketemu
                    petugas yang ramah. Ternyata nanya itu jauh lebih cepat
                    daripada nebak-nebak sendiri.
                  </ThemedText>

                  {/* Reaction Bar */}
                  <View style={styles.reactionBar}>
                    <View style={styles.leftReactions}>
                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-like.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>48</ThemedText>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-repost.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>12</ThemedText>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-reply.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>22</ThemedText>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-edit.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>2</ThemedText>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.rightReactions}>
                      <TouchableOpacity style={styles.iconOnlyBtn}>
                        <Image
                          source={require("@/assets/icons/ic-commun-save.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconOnlyBtn}>
                        <Image
                          source={require("@/assets/icons/ic-service-share.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}

              {/* Post 6: Devita Cromboloni (Visible in Cerita & Semua) */}
              {(activeFilter === "semua" || activeFilter === "cerita") && (
                <View style={styles.postCard}>
                  <View style={styles.postHeader}>
                    <View style={styles.authorAvatarBox}>
                      <Image
                        source={require("@/assets/images/img-commun-gallery-3.png")}
                        style={styles.authorAvatarImg}
                        resizeMode="cover"
                      />
                    </View>

                    <View style={styles.authorInfoGroup}>
                      <ThemedText style={styles.authorName}>
                        Devita Cromboloni
                      </ThemedText>
                      <ThemedText style={styles.postTime}>
                        1 minggu lalu
                      </ThemedText>
                    </View>

                    <View style={styles.tagPill}>
                      <ThemedText style={styles.tagText}>
                        Pengguna Kursi Roda
                      </ThemedText>
                    </View>

                    <TouchableOpacity style={styles.moreOptionsButton}>
                      <Ionicons
                        name="ellipsis-horizontal"
                        size={18}
                        color={Palette.text.inactive}
                      />
                    </TouchableOpacity>
                  </View>

                  <ThemedText style={styles.postBodyText}>
                    Tadi pagi ke rumah sakit sendirian dan sempat panik karena
                    lift penuh. Tapi ada ibu-ibu yang langsung nawarin bantu
                    buka jalan. Hari ini terasa ditemenin, walaupun berangkat
                    sendiri.
                  </ThemedText>

                  {/* Reaction Bar */}
                  <View style={styles.reactionBar}>
                    <View style={styles.leftReactions}>
                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-like.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>54</ThemedText>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-repost.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>12</ThemedText>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-reply.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>20</ThemedText>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.reactionItem}>
                        <Image
                          source={require("@/assets/icons/ic-commun-edit.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.reactionCount}>1</ThemedText>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.rightReactions}>
                      <TouchableOpacity style={styles.iconOnlyBtn}>
                        <Image
                          source={require("@/assets/icons/ic-commun-save.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconOnlyBtn}>
                        <Image
                          source={require("@/assets/icons/ic-service-share.png")}
                          style={styles.reactionIcon}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>

          {/* Bottom Floating Navigation Bar */}
          <View style={styles.bottomNavContainer}>
            <TouchableOpacity
              style={styles.navItem}
              activeOpacity={0.7}
              onPress={() => handleTabPress("beranda")}
            >
              <Image
                source={require("@/assets/icons/ic-nav-home.png")}
                style={styles.navIcon}
                resizeMode="contain"
              />
              <ThemedText style={styles.navLabel}>Beranda</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              activeOpacity={0.7}
              onPress={() => handleTabPress("layanan")}
            >
              <Image
                source={require("@/assets/icons/ic-nav-layanan.png")}
                style={styles.navIcon}
                resizeMode="contain"
              />
              <ThemedText style={styles.navLabel}>Layanan</ThemedText>
            </TouchableOpacity>

            {/* AI Assistant Center Sparkle Button */}
            <TouchableOpacity
              style={styles.aiSparkleContainer}
              activeOpacity={0.85}
              onPress={handleAiSparklePress}
            >
              <Image
                source={require("@/assets/icons/ic-nav-ai.png")}
                style={styles.aiSparkleImage}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              activeOpacity={0.7}
              onPress={() => handleTabPress("komunitas")}
            >
              <Image
                source={require("@/assets/icons/ic-nav-komunitas-active.png")}
                style={styles.navIconActive}
                resizeMode="contain"
              />
              <ThemedText style={styles.navLabelActive}>Komunitas</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              activeOpacity={0.7}
              onPress={() => handleTabPress("profil")}
            >
              <Image
                source={require("@/assets/icons/ic-nav-profil.png")}
                style={styles.navIcon}
                resizeMode="contain"
              />
              <ThemedText style={styles.navLabel}>Profil</ThemedText>
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
    paddingBottom: 110,
  },

  /* Search Section */
  searchSection: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Palette.text.active,
    paddingVertical: 0,
  },
  micIcon: {
    width: 22,
    height: 22,
    marginLeft: 8,
  },

  /* Category Filter Pills */
  filterPillsScroll: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    gap: 8,
  },
  filterPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EDF3FD",
    gap: 6,
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  filterPillActive: {
    backgroundColor: Palette.button.primary,
    borderColor: Palette.button.primary,
  },
  filterPillIcon: {
    width: 16,
    height: 16,
  },
  filterPillIconActive: {
    tintColor: "#FFFFFF",
  },
  filterPillText: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    color: Palette.blue[600],
  },
  filterPillTextActive: {
    fontFamily: Fonts.semiBold,
    color: "#FFFFFF",
  },

  /* AI Hero Card */
  aiHeroCard: {
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#EDF3FD",
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  aiHeroHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    backgroundColor: "#F0F5FE",
    borderRadius: 16,
    padding: 12,
  },
  aiMascotCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Palette.blue[100],
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  aiMascotImg: {
    width: 28,
    height: 28,
  },
  aiHeroTextGroup: {
    flex: 1,
  },
  aiHeroTitle: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    fontWeight: "700",
    color: Palette.text.active,
    marginBottom: 2,
  },
  aiHeroSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 11.5,
    color: Palette.text.inactive,
    lineHeight: 15,
  },
  volumeButton: {
    width: 26,
    height: 26,
    marginLeft: 6,
  },
  actionButtonsRow: {
    flexDirection: "row",
    gap: 10,
  },
  primaryActionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Palette.button.primary,
    paddingVertical: 12,
    borderRadius: 16,
    gap: 8,
  },
  primaryActionText: {
    fontFamily: Fonts.semiBold,
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  secondaryActionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DCE6FA",
    paddingVertical: 12,
    borderRadius: 16,
    gap: 8,
  },
  secondaryActionText: {
    fontFamily: Fonts.semiBold,
    fontSize: 13,
    fontWeight: "600",
    color: Palette.blue[600],
  },
  actionBtnIcon: {
    width: 18,
    height: 18,
  },

  /* Section Header */
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    fontWeight: "700",
    color: Palette.text.active,
  },

  /* Feed Posts Stack */
  postsStack: {
    paddingHorizontal: 20,
    gap: 14,
  },
  postCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EDF3FD",
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  authorAvatarBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F4FA",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginRight: 10,
  },
  authorAvatarImg: {
    width: "100%",
    height: "100%",
  },
  authorInfoGroup: {
    flex: 1,
  },
  authorName: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    fontWeight: "700",
    color: Palette.text.active,
  },
  postTime: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: Palette.text.inactive,
    marginTop: 1,
  },
  tagPill: {
    backgroundColor: Palette.blue[100],
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginRight: 8,
  },
  multipleTagsColumn: {
    flexDirection: "column",
    gap: 4,
    marginRight: 8,
  },
  tagPillStack: {
    backgroundColor: Palette.blue[100],
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  tagText: {
    fontFamily: Fonts.medium,
    fontSize: 10.5,
    color: Palette.blue[600],
  },
  moreOptionsButton: {
    padding: 4,
  },

  /* User's Post Embedded Boxes */
  embeddedStoryBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F4F8FF",
    borderRadius: 14,
    padding: 12,
    marginTop: 4,
    marginBottom: 8,
  },
  embeddedStoryIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 1,
  },
  embeddedBoxIcon: {
    width: 16,
    height: 16,
  },
  embeddedStoryText: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 12.5,
    color: Palette.blue[700],
    lineHeight: 18,
  },
  embeddedQuestionBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F4F8FF",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  embeddedQuestionIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 1,
  },
  embeddedQuestionText: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 12.5,
    color: Palette.blue[700],
    lineHeight: 18,
  },
  userPostAttachedPhotoWrap: {
    width: 100,
    height: 100,
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 12,
  },
  userPostAttachedPhoto: {
    width: "100%",
    height: "100%",
  },

  /* Embedded Facility Card */
  embeddedFacilityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCE6FA",
    borderRadius: 16,
    padding: 10,
    marginBottom: 12,
  },
  facilityThumb: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 10,
  },
  facilityInfo: {
    flex: 1,
  },
  facilityTitle: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    fontWeight: "700",
    color: Palette.blue[700],
    marginBottom: 2,
  },
  facilityDesc: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: Palette.blue[600],
    lineHeight: 15,
  },
  facilityChevronBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },

  /* Post Body Text */
  postBodyText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Palette.text.active,
    lineHeight: 20,
    marginBottom: 12,
  },

  /* 3 Photos Grid */
  attachmentPhotosGrid: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  gridPhoto: {
    flex: 1,
    height: 90,
    borderRadius: 12,
  },

  /* Question Quote Card */
  questionQuoteCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCE6FA",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  questionCardContent: {
    flex: 1,
  },
  questionUserRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  questionUserAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  questionUserName: {
    fontFamily: Fonts.medium,
    fontSize: 11.5,
    color: Palette.blue[700],
  },
  questionTextRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  questionIcon: {
    width: 18,
    height: 18,
  },
  questionText: {
    fontFamily: Fonts.semiBold,
    fontSize: 12.5,
    fontWeight: "600",
    color: Palette.blue[700],
    flex: 1,
  },
  questionChevronBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  /* Reaction Bar */
  reactionBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#F0F4FA",
    paddingTop: 10,
  },
  leftReactions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  reactionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  reactionIcon: {
    width: 16,
    height: 16,
  },
  reactionCount: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Palette.text.inactive,
  },
  rightReactions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconOnlyBtn: {
    padding: 2,
  },

  /* Bottom Navigation Bar */
  bottomNavContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 10,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: Palette.text.inactive,
    marginBottom: 4,
  },
  navIconActive: {
    width: 24,
    height: 24,
    tintColor: Palette.blue[600],
    marginBottom: 4,
  },
  navLabel: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    color: Palette.text.inactive,
  },
  navLabelActive: {
    fontFamily: Fonts.semiBold,
    fontSize: 11,
    fontWeight: "600",
    color: Palette.blue[600],
  },
  aiSparkleContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -24,
  },
  aiSparkleImage: {
    width: 56,
    height: 56,
  },
});
