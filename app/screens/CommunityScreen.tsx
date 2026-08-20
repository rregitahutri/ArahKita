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
  const [activeFilter, setActiveFilter] = useState<
    "semua" | "cerita" | "infotempat" | "tanyakan"
  >("semua");
  const [isListening, setIsListening] = useState(false);

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
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
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
                onPress={() => setActiveFilter("semua")}
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
                onPress={() => setActiveFilter("cerita")}
              >
                <Image
                  source={require("@/assets/icons/ic-commun-story.png")}
                  style={styles.filterPillIcon}
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
                onPress={() => setActiveFilter("infotempat")}
              >
                <Image
                  source={require("@/assets/icons/ic-commun-place-info.png")}
                  style={styles.filterPillIcon}
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
                onPress={() => setActiveFilter("tanyakan")}
              >
                <Image
                  source={require("@/assets/icons/ic-commun-ask.png")}
                  style={styles.filterPillIcon}
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
                  onPress={() =>
                    Alert.alert(
                      "Tanya Komunitas",
                      "Membuka formulir bertanya ke komunitas.",
                    )
                  }
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

            {/* Feed Posts Stack */}
            <View style={styles.postsStack}>
              {/* Post 1: Ahmad Fauzie */}
              <View style={styles.postCard}>
                <View style={styles.postHeader}>
                  <View style={styles.authorAvatarBox}>
                    <Ionicons name="person" size={20} color="#6C7F9B" />
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
                  Ramp di pintu masuk RSUP Fatmawati cukup landai dan aman. Tapi
                  pintu otomatisnya agak berat kalau sendirian.
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

              {/* Post 2: Rina Oktaviani */}
              <View style={styles.postCard}>
                <View style={styles.postHeader}>
                  <View style={styles.authorAvatarBox}>
                    <Ionicons name="person" size={20} color="#6C7F9B" />
                  </View>

                  <View style={styles.authorInfoGroup}>
                    <ThemedText style={styles.authorName}>
                      Rina Oktaviani
                    </ThemedText>
                    <ThemedText style={styles.postTime}>1 jam lalu</ThemedText>
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
                  datang waktu aku minta bantuan. Semoga guiding block-nya bisa
                  diperpanjang sampai area parkir.
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
                      <ThemedText style={styles.reactionCount}>46</ThemedText>
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

              {/* Post 3: Siti Christy */}
              <View style={styles.postCard}>
                <View style={styles.postHeader}>
                  <View style={styles.authorAvatarBox}>
                    <Ionicons name="person" size={20} color="#6C7F9B" />
                  </View>

                  <View style={styles.authorInfoGroup}>
                    <ThemedText style={styles.authorName}>
                      Siti Christy
                    </ThemedText>
                    <ThemedText style={styles.postTime}>2 jam lalu</ThemedText>
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
                      <ThemedText style={styles.reactionCount}>123</ThemedText>
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

              {/* Post 4: Shaz Xie Xie */}
              <View style={styles.postCard}>
                <View style={styles.postHeader}>
                  <View style={styles.authorAvatarBox}>
                    <Ionicons name="person" size={20} color="#6C7F9B" />
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
                      <ThemedText style={styles.reactionCount}>422</ThemedText>
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

              {/* Post 5: Dimas Citra Pistachio */}
              <View style={styles.postCard}>
                <View style={styles.postHeader}>
                  <View style={styles.authorAvatarBox}>
                    <Ionicons name="person" size={20} color="#6C7F9B" />
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
                      <ThemedText style={styles.reactionCount}>46</ThemedText>
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

              {/* Post 6: Devita Cromboloni */}
              <View style={styles.postCard}>
                <View style={styles.postHeader}>
                  <View style={styles.authorAvatarBox}>
                    <Ionicons name="person" size={20} color="#6C7F9B" />
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
                  lift penuh. Tapi ada ibu-ibu yang langsung nawarin bantu buka
                  jalan. Hari ini terasa ditemenin, walaupun berangkat sendiri.
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

              {/* Center Spacer */}
              <View style={styles.centerFloatingSpacer} />

              {/* Tab 3: Komunitas (ACTIVE) */}
              <TouchableOpacity
                style={styles.navItem}
                activeOpacity={0.7}
                onPress={() => handleTabPress("komunitas")}
              >
                <Image
                  source={require("@/assets/icons/ic-nav-komunitas-active.png")}
                  style={styles.navIconAsset}
                  resizeMode="contain"
                />
                <ThemedText style={[styles.navLabel, styles.navLabelActive]}>
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
    paddingTop: 12,
    paddingBottom: 90,
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
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Palette.text.active,
  },
  micIconAsset: {
    width: 30,
    height: 50,
  },

  /* Category Filter Pills */
  filterPillsScroll: {
    gap: 8,
    marginBottom: 16,
  },
  filterPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EDF3FD",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 20,
    shadowColor: Palette.blue[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  filterPillActive: {
    backgroundColor: Palette.button.primary,
    borderColor: Palette.button.primary,
  },
  filterPillIcon: {
    width: 20,
    height: 20,
  },
  filterPillText: {
    fontFamily: Fonts.medium,
    fontSize: 12.5,
    color: Palette.text.active,
  },
  filterPillTextActive: {
    color: "#FFFFFF",
    fontFamily: Fonts.semiBold,
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
  actionButtonsRow: {
    flexDirection: "row",
    gap: 10,
  },
  primaryActionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: Palette.button.primary,
    height: 42,
    borderRadius: 12,
  },
  actionBtnIcon: {
    width: 16,
    height: 16,
  },
  primaryActionText: {
    fontFamily: Fonts.semiBold,
    fontSize: 12.5,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  secondaryActionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#DCE8FF",
    height: 42,
    borderRadius: 12,
  },
  secondaryActionText: {
    fontFamily: Fonts.semiBold,
    fontSize: 12.5,
    fontWeight: "600",
    color: Palette.blue[700],
  },

  /* Section Header */
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    fontWeight: "700",
    color: Palette.text.active,
  },

  /* Posts Stack */
  postsStack: {
    gap: 14,
  },
  postCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: "#E7EFFC",
    padding: 14,
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
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EEF3FC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  authorInfoGroup: {
    flex: 1,
  },
  authorName: {
    fontFamily: Fonts.bold,
    fontSize: 13.5,
    fontWeight: "700",
    color: Palette.text.active,
  },
  postTime: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: Palette.text.inactive,
  },
  multipleTagsRow: {
    flexDirection: "row",
    gap: 4,
    marginRight: 6,
  },
  multipleTagsColumn: {
    flexDirection: "column",
    gap: 3,
    alignItems: "flex-end",
    marginRight: 6,
  },
  tagPill: {
    backgroundColor: Palette.blue[100],
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginRight: 6,
  },
  tagPillStack: {
    backgroundColor: Palette.blue[100],
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 7,
  },
  tagText: {
    fontFamily: Fonts.medium,
    fontSize: 10,
    color: Palette.blue[700],
  },
  moreOptionsButton: {
    padding: 4,
  },

  /* Embedded Facility Card */
  embeddedFacilityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCE8FF",
    borderRadius: 14,
    padding: 8,
    marginBottom: 12,
  },
  facilityThumb: {
    width: 60,
    height: 52,
    borderRadius: 10,
    marginRight: 10,
  },
  facilityInfo: {
    flex: 1,
  },
  facilityTitle: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    fontWeight: "700",
    color: Palette.blue[900],
    marginBottom: 2,
  },
  facilityDesc: {
    fontFamily: Fonts.regular,
    fontSize: 10.5,
    color: Palette.blue[700],
    lineHeight: 14,
  },
  facilityChevronBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },

  /* Question Quote Card */
  questionQuoteCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#DCE8FF",
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
  },
  questionCardContent: {
    flex: 1,
    marginRight: 8,
  },
  questionChevronBox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  questionUserRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  questionUserAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  questionUserName: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    color: Palette.blue[900],
  },
  questionTextRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  questionIcon: {
    width: 16,
    height: 16,
  },
  questionText: {
    fontFamily: Fonts.bold,
    fontSize: 12.5,
    fontWeight: "700",
    color: Palette.blue[900],
  },

  postBodyText: {
    fontFamily: Fonts.regular,
    fontSize: 12.5,
    color: Palette.text.active,
    lineHeight: 18,
    marginBottom: 12,
  },

  /* 3 Attachment Photos Grid */
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
    fontFamily: Fonts.medium,
    fontSize: 11,
    color: Palette.text.inactive,
  },
  rightReactions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
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
