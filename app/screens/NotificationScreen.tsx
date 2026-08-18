import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { Fonts, Palette } from "@/constants/theme";

export interface NotificationItem {
  id: string;
  title: string;
  preview: string;
  time: string;
  unread: boolean;
  section: "today" | "yesterday";
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "Seseorang membuat postingan di komunitas",
    preview:
      "“Ada yang tahu akses rute untuk ke matcha bar baru di Tebet? di maps sepertinya belum tersedia”",
    time: "37menit",
    unread: true,
    section: "today",
  },
  {
    id: "2",
    title: "Seseorang membuat postingan di komunitas",
    preview:
      "“Ada yang tahu akses rute untuk ke matcha bar baru di Tebet? di maps sepertinya belum tersedia”",
    time: "37menit",
    unread: true,
    section: "today",
  },
  {
    id: "3",
    title: "Seseorang membuat postingan di komunitas",
    preview:
      "“Ada yang tahu akses rute untuk ke matcha bar baru di Tebet? di maps sepertinya belum tersedia”",
    time: "37menit",
    unread: true,
    section: "today",
  },
  {
    id: "4",
    title: "Seseorang membuat postingan di komunitas",
    preview:
      "“Ada yang tahu akses rute untuk ke matcha bar baru di Tebet? di maps sepertinya belum tersedia”",
    time: "1hr",
    unread: false,
    section: "yesterday",
  },
  {
    id: "5",
    title: "Seseorang membuat postingan di komunitas",
    preview:
      "“Ada yang tahu akses rute untuk ke matcha bar baru di Tebet? di maps sepertinya belum tersedia”",
    time: "3hr",
    unread: false,
    section: "yesterday",
  },
];

interface NotificationScreenProps {
  onBack?: () => void;
  onOpenSettings?: () => void;
}

export default function NotificationScreen({
  onBack,
  onOpenSettings,
}: NotificationScreenProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    INITIAL_NOTIFICATIONS,
  );

  const handleBackPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onBack) {
      onBack();
    } else {
      Alert.alert("Kembali", "Kembali ke halaman sebelumnya.");
    }
  };

  const handleSettingsPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onOpenSettings) {
      onOpenSettings();
    } else {
      Alert.alert("Pengaturan Notifikasi", "Membuka pengaturan notifikasi.");
    }
  };

  const handleItemPress = (item: NotificationItem) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Mark item as read on press
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, unread: false } : n)),
    );
    Alert.alert(item.title, item.preview);
  };

  const todayItems = notifications.filter((n) => n.section === "today");
  const yesterdayItems = notifications.filter((n) => n.section === "yesterday");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        {/* Header Bar */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            activeOpacity={0.7}
            onPress={handleBackPress}
          >
            <Ionicons
              name="chevron-back"
              size={22}
              color={Palette.text.active}
            />
          </TouchableOpacity>

          <ThemedText style={styles.headerTitle}>Notifikasi</ThemedText>

          <TouchableOpacity
            style={styles.headerButton}
            activeOpacity={0.7}
            onPress={handleSettingsPress}
          >
            <Image
              source={require("@/assets/icons/ic-notif-settings.png")}
              style={styles.settingsIconAsset}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Scrollable Notifications List */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Section 1: Hari ini */}
          {todayItems.length > 0 && (
            <View style={styles.sectionContainer}>
              <ThemedText style={styles.sectionHeaderTitle}>
                Hari ini
              </ThemedText>

              {todayItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <TouchableOpacity
                    style={[
                      styles.notificationCard,
                      item.unread && styles.unreadNotificationCard,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => handleItemPress(item)}
                  >
                    {/* Unread Indicator Dot */}
                    <View style={styles.unreadDotContainer}>
                      {item.unread && <View style={styles.blueDot} />}
                    </View>

                    {/* Chat Icon Asset */}
                    <Image
                      source={require("@/assets/icons/ic-notif-chats.png")}
                      style={styles.chatIconAsset}
                      resizeMode="contain"
                    />

                    {/* Content Group */}
                    <View style={styles.contentGroup}>
                      <View style={styles.titleRow}>
                        <ThemedText style={styles.itemTitle} numberOfLines={1}>
                          {item.title}
                        </ThemedText>
                        <ThemedText style={styles.itemTime}>
                          {item.time}
                        </ThemedText>
                      </View>

                      <ThemedText style={styles.itemPreview} numberOfLines={2}>
                        {item.preview}
                      </ThemedText>
                    </View>
                  </TouchableOpacity>
                  {index < todayItems.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </React.Fragment>
              ))}
            </View>
          )}

          {/* Section 2: Kemarin */}
          {yesterdayItems.length > 0 && (
            <View style={styles.sectionContainer}>
              <ThemedText style={styles.sectionHeaderTitle}>Kemarin</ThemedText>

              {yesterdayItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <TouchableOpacity
                    style={[
                      styles.notificationCard,
                      item.unread && styles.unreadNotificationCard,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => handleItemPress(item)}
                  >
                    {/* Unread Indicator Dot Container */}
                    <View style={styles.unreadDotContainer}>
                      {item.unread && <View style={styles.blueDot} />}
                    </View>

                    {/* Chat Icon Asset */}
                    <Image
                      source={require("@/assets/icons/ic-notif-chats.png")}
                      style={styles.chatIconAsset}
                      resizeMode="contain"
                    />

                    {/* Content Group */}
                    <View style={styles.contentGroup}>
                      <View style={styles.titleRow}>
                        <ThemedText style={styles.itemTitle} numberOfLines={1}>
                          {item.title}
                        </ThemedText>
                        <ThemedText style={styles.itemTime}>
                          {item.time}
                        </ThemedText>
                      </View>

                      <ThemedText style={styles.itemPreview} numberOfLines={2}>
                        {item.preview}
                      </ThemedText>
                    </View>
                  </TouchableOpacity>
                  {index < yesterdayItems.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </React.Fragment>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F4FA",
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    fontWeight: "700",
    color: Palette.text.active,
  },
  headerButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsIconAsset: {
    width: 24,
    height: 24,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  sectionContainer: {
    marginTop: 12,
  },
  sectionHeaderTitle: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    color: Palette.text.inactive,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  notificationCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
  },
  unreadNotificationCard: {
    backgroundColor: "#EDF3FD",
  },
  unreadDotContainer: {
    width: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 6,
    marginRight: 6,
  },
  blueDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Palette.blue[700],
  },
  chatIconAsset: {
    width: 38,
    height: 38,
    marginRight: 12,
  },
  contentGroup: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  itemTitle: {
    flex: 1,
    fontFamily: Fonts.semiBold,
    fontSize: 13.5,
    fontWeight: "600",
    color: Palette.text.active,
    marginRight: 8,
  },
  itemTime: {
    fontFamily: Fonts.regular,
    fontSize: 11.5,
    color: Palette.text.inactive,
  },
  itemPreview: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#666666",
    lineHeight: 17,
  },
  divider: {
    height: 1,
    backgroundColor: "#EFF4FB",
    marginLeft: 68,
  },
});
