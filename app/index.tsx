
import { useMemo } from "react";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { categories } from "@/data/scenarios";

const ScreenContainer = View;

const colors = {
  bg: "#eef5f8",
  surface: "#ffffff",
  border: "#dbe7ee",
  text: "#0f172a",
  muted: "#6f8191",
  primary: "#1185a8",
  primarySoft: "#e7f6fb",
  red: "#d83a3a",
  redSoft: "#fbeeee",
  orange: "#d77a57",
  orangeSoft: "#fbf1ed",
  purple: "#7f6de1",
  purpleSoft: "#f1effc",
  teal: "#19b59f",
  tealSoft: "#eafaf7",
  yellow: "#e8bf57",
  yellowSoft: "#fdf7e8",
  pink: "#e880b2",
  pinkSoft: "#fdf0f6",
  iconBlueBg: "#dfeafb",
  iconBlue: "#2e67db",
};

type CategoryType = (typeof categories)[number];
type ScenarioType = CategoryType["scenarios"][number];

export default function HomeScreen() {
  const router = useRouter();

  const tap = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const openCategory = (categoryId: string) => {
    tap();
    router.push({
      pathname: "/situations",
      params: { categoryId },
    } as any);
  };

  const openScenario = (categoryId: string, scenarioId: string) => {
    tap();
    router.push({
      pathname: "/template",
      params: { categoryId, scenarioId },
    } as any);
  };

  const openRoute = (pathname: string) => {
    tap();
    router.push(pathname as any);
  };

  const recentItems = useMemo(() => {
    const flat: Array<{
      categoryId: string;
      title: string;
      scenarioId: string;
    }> = [];

    for (const category of categories) {
      for (const scenario of category.scenarios.slice(0, 2)) {
        flat.push({
          categoryId: category.id,
          title: scenario.title,
          scenarioId: scenario.id,
        });
      }
    }

    return flat.slice(0, 2);
  }, []);

  const boverketsCategory = useMemo(
    () => categories.find((c) => c.id === "boverkets"),
    [],
  );

  const boverketsCards = boverketsCategory?.scenarios.slice(0, 6) ?? [];

  const authorityCards = useMemo(() => {
    const order = [
      "inkasso",
      "kronofogden",
      "skatteverket",
      "forsakringskassan",
      "migrationsverket",
      "arbetsformedlingen",
      "socialstyrelsen",
      "polisen",
      "domstol",
      "boverkets",
    ];

    return order
      .map((id) => categories.find((c) => c.id === id))
      .filter(Boolean) as CategoryType[];
  }, []);

  return (
    <ScreenContainer style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.heroWrap}>
          <View style={[styles.heroCard, styles.shadowCard]}>
            <View style={styles.heroRow}>
              <View style={[styles.heroIconBox, { backgroundColor: colors.iconBlueBg }]}>
                <MaterialIcons
                  name="chat-bubble-outline"
                  size={34}
                  color={colors.iconBlue}
                />
              </View>

              <Pressable
                onPress={() => openRoute("/about")}
                style={({ pressed }) => [
                  styles.infoCircle,
                  pressed && { opacity: 0.85 },
                ]}
              >
                <MaterialIcons
                  name="info-outline"
                  size={28}
                  color={colors.primary}
                />
              </Pressable>
            </View>

            <Text style={[styles.heroTitle, { color: colors.text }]}>Svar Direkt</Text>
            <Text style={[styles.heroSubtitle, { color: colors.muted }]}>
              Skriv rätt. Få svar direkt.
            </Text>
          </View>
        </View>

        <SectionHeader
          title="Senast använda"
          actionText="Visa alla"
          onPressAction={() => openRoute("/history")}
        />

        <View style={styles.stack12}>
          {recentItems.map((item) => (
            <Pressable
              key={`${item.categoryId}-${item.scenarioId}`}
              onPress={() => openScenario(item.categoryId, item.scenarioId)}
              style={({ pressed }) => [
                styles.recentCard,
                styles.shadowCard,
                pressed && styles.pressed,
              ]}
            >
              <View style={[styles.recentIconBox, { backgroundColor: colors.primarySoft }]}>
                <MaterialIcons name="schedule" size={26} color={colors.primary} />
              </View>

              <View style={styles.recentTextWrap}>
                <Text style={[styles.recentTitle, { color: colors.text }]} numberOfLines={1}>
                  {item.title}
                </Text>
              </View>

              <Pressable
                onPress={() => openScenario(item.categoryId, item.scenarioId)}
                style={({ pressed }) => [
                  styles.copyMiniButton,
                  { backgroundColor: colors.primarySoft },
                  pressed && { opacity: 0.85 },
                ]}
              >
                <MaterialIcons
                  name="content-copy"
                  size={22}
                  color={colors.primary}
                />
                <Text style={[styles.copyMiniText, { color: colors.primary }]}>
                  Kopiera
                </Text>
              </Pressable>
            </Pressable>
          ))}
        </View>

        {boverketsCategory && boverketsCards.length > 0 && (
          <>
            <View style={styles.sectionTitleRow}>
              <Text style={[styles.sectionTitleSmall, { color: colors.muted }]}>
                {boverketsCategory.title.toUpperCase()}S MALLAR
              </Text>
              <View style={[styles.badgePill, { backgroundColor: colors.primarySoft }]}>
                <Text style={[styles.badgeText, { color: colors.primary }]}>
                  {boverketsCategory.scenarios.length} mallar
                </Text>
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalCards}
            >
              {boverketsCards.map((scenario) => (
                <Pressable
                  key={scenario.id}
                  onPress={() => openScenario(boverketsCategory.id, scenario.id)}
                  style={({ pressed }) => [
                    styles.mallCard,
                    styles.shadowCard,
                    pressed && styles.pressed,
                  ]}
                >
                  <View style={[styles.mallIconBox, { backgroundColor: colors.primarySoft }]}>
                    <MaterialIcons
                      name="description"
                      size={28}
                      color={colors.primary}
                    />
                  </View>

                  <Text style={[styles.mallTitle, { color: colors.text }]} numberOfLines={3}>
                    {scenario.title}
                  </Text>

                  <Text style={[styles.mallSubtitle, { color: colors.muted }]} numberOfLines={1}>
                    {scenario.description}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </>
        )}

        <Text style={[styles.blockTitle, { color: colors.muted }]}>VERKTYG</Text>

        <View style={styles.stack14}>
          <ToolRow
            icon="flash-on"
            iconColor={colors.orange}
            iconBg={colors.orangeSoft}
            title="Snabb lösning ⚡"
            subtitle="Direkta svar på några sekunder"
            onPress={() => openRoute("/quick-replies")}
          />
          <ToolRow
            icon="description"
            iconColor={colors.purple}
            iconBg={colors.purpleSoft}
            title="Anteckningsblock"
            subtitle="Dina personliga noteringar"
            onPress={() => openRoute("/notepad")}
          />
          <ToolRow
            icon="schedule"
            iconColor={colors.primary}
            iconBg={colors.primarySoft}
            title="Historik"
            subtitle="Senast använda mallar"
            onPress={() => openRoute("/history")}
          />
          <ToolRow
            icon="menu-book"
            iconColor={colors.teal}
            iconBg={colors.tealSoft}
            title="Vägledning och ordlista"
            subtitle="Juridiska termer och guide"
            onPress={() => openRoute("/tips")}
          />
          <ToolRow
            icon="chat-bubble-outline"
            iconColor={colors.yellow}
            iconBg={colors.yellowSoft}
            title="Snabba svar"
            subtitle="Kortare färdiga svar"
            onPress={() => openRoute("/quick-replies")}
          />
        </View>

        <View
          style={[
            styles.defendBox,
            styles.shadowCard,
            {
              backgroundColor: colors.redSoft,
              borderColor: "#efc9c9",
            },
          ]}
        >
          <View style={styles.defendHeader}>
            <View style={[styles.defendShield, { backgroundColor: "#f6dede" }]}>
              <MaterialIcons name="shield" size={28} color={colors.red} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={[styles.defendTitle, { color: "#251515" }]}>
                FÖRSVARA DIG ⚖️
              </Text>
              <Text style={[styles.defendSubtitle, { color: "#7f6666" }]}>
                Skydda dina rättigheter och agera mot felaktiga krav
              </Text>
            </View>
          </View>

          <View style={styles.defendChipWrap}>
            <DefendChip
              icon="cancel"
              label="Felaktigt krav"
              onPress={() => openCategory("inkasso")}
            />
            <DefendChip
              icon="attach-money"
              label="För hög avgift"
              onPress={() => openCategory("kronofogden")}
            />
            <DefendChip
              icon="mail-outline"
              label="Inget svar"
              onPress={() => openCategory("myndighet")}
            />
            <DefendChip
              icon="north"
              label="Överklagan"
              onPress={() => openCategory("domstol")}
            />
            <DefendChip
              icon="description"
              label="Begäran om bevis"
              onPress={() => openCategory("inkasso")}
            />
          </View>
        </View>

        <Text style={[styles.blockTitle, { color: colors.muted }]}>PRO-FUNKTIONER</Text>

        <View style={styles.stack14}>
          <ToolRow
            icon="notifications-none"
            iconColor={colors.orange}
            iconBg={colors.orangeSoft}
            title="Påminnelser"
            subtitle="Ange viktiga datum"
            onPress={() => openRoute("/reminders")}
          />
          <ToolRow
            icon="edit"
            iconColor={colors.primary}
            iconBg={colors.primarySoft}
            title="Mina mallar"
            subtitle="Skapa egna mallar"
            onPress={() => openRoute("/custom-templates")}
          />
          <ToolRow
            icon="search"
            iconColor="#8d80e8"
            iconBg="#f1effc"
            title="Sök mallar"
            subtitle="Hitta rätt mall snabbt"
            onPress={() => openRoute("/quick-replies")}
          />
          <ToolRow
            icon="favorite-border"
            iconColor={colors.pink}
            iconBg={colors.pinkSoft}
            title="Favoriter"
            subtitle="Dina sparade mallar"
            onPress={() => openRoute("/quick-replies")}
          />
        </View>

        <Text style={[styles.blockTitle, { color: colors.muted }]}>MYNDIGHETER</Text>

        <View style={styles.stack12}>
          {authorityCards.map((category) => (
            <Pressable
              key={category.id}
              onPress={() => openCategory(category.id)}
              style={({ pressed }) => [
                styles.authorityCard,
                styles.shadowCard,
                pressed && styles.pressed,
              ]}
            >
              <View style={[styles.authorityIconBox, { backgroundColor: colors.iconBlueBg }]}>
                <MaterialIcons
                  name={category.icon as any}
                  size={30}
                  color={colors.iconBlue}
                />
              </View>

              <View style={styles.authorityTextWrap}>
                <Text style={[styles.authorityTitle, { color: colors.text }]}>
                  {category.title}
                </Text>
                <Text style={[styles.authoritySubtitle, { color: colors.muted }]}>
                  {category.subtitle}
                </Text>
                <Text style={[styles.authorityCount, { color: colors.muted }]}>
                  {category.scenarios.length} färdiga svar
                </Text>
              </View>

              <MaterialIcons
                name="chevron-right"
                size={28}
                color="#9aa9b5"
              />
            </Pressable>
          ))}
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <BottomTab
          icon="home"
          label="Hem"
          active
          onPress={() => {}}
        />
        <BottomTab
          icon="description"
          label="Mallar"
          onPress={() => openCategory("boverkets")}
        />
        <BottomTab
          icon="note-alt"
          label="Anteckn."
          onPress={() => openRoute("/notepad")}
        />
        <BottomTab
          icon="favorite-border"
          label="Favoriter"
          onPress={() => openRoute("/quick-replies")}
        />
        <BottomTab
          icon="search"
          label="Sök"
          onPress={() => openRoute("/quick-replies")}
        />
      </View>
    </ScreenContainer>
  );
}

function SectionHeader({
  title,
  actionText,
  onPressAction,
}: {
  title: string;
  actionText?: string;
  onPressAction?: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={[styles.sectionHeaderTitle, { color: colors.muted }]}>
        {title.toUpperCase()}
      </Text>

      {actionText && onPressAction ? (
        <Pressable onPress={onPressAction} style={({ pressed }) => [pressed && { opacity: 0.8 }]}>
          <Text style={[styles.sectionHeaderAction, { color: colors.primary }]}>
            {actionText}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function ToolRow({
  icon,
  iconColor,
  iconBg,
  title,
  subtitle,
  onPress,
}: {
  icon: any;
  iconColor: string;
  iconBg: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.toolRow,
        styles.shadowCard,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.toolIconBox, { backgroundColor: iconBg }]}>
        <MaterialIcons name={icon} size={30} color={iconColor} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={[styles.toolTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.toolSubtitle, { color: colors.muted }]}>{subtitle}</Text>
      </View>

      <MaterialIcons name="chevron-right" size={30} color="#9aa9b5" />
    </Pressable>
  );
}

function DefendChip({
  icon,
  label,
  onPress,
}: {
  icon: any;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.defendChip,
        pressed && { opacity: 0.9, transform: [{ scale: 0.985 }] },
      ]}
    >
      <MaterialIcons name={icon} size={22} color={colors.red} />
      <Text style={styles.defendChipText}>{label}</Text>
    </Pressable>
  );
}

function BottomTab({
  icon,
  label,
  active,
  onPress,
}: {
  icon: any;
  label: string;
  active?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.bottomTab,
        pressed && { opacity: 0.8 },
      ]}
    >
      <MaterialIcons
        name={icon}
        size={31}
        color={active ? colors.primary : "#97a8b5"}
      />
      <Text
        style={[
          styles.bottomTabLabel,
          { color: active ? colors.primary : "#97a8b5" },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 0,
  },
  heroWrap: {
    marginBottom: 18,
  },
  heroCard: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 22,
  },
  heroRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  heroIconBox: {
    width: 92,
    height: 92,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  infoCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fcfd",
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: "800",
    marginBottom: 8,
    letterSpacing: -0.9,
  },
  heroSubtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  sectionHeader: {
    marginBottom: 12,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionHeaderTitle: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
  },
  sectionHeaderAction: {
    fontSize: 14,
    fontWeight: "700",
  },
  stack12: {
    gap: 12,
    marginBottom: 18,
  },
  stack14: {
    gap: 14,
    marginBottom: 18,
  },
  recentCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  recentIconBox: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  recentTextWrap: {
    flex: 1,
    paddingRight: 8,
  },
  recentTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  copyMiniButton: {
    minWidth: 108,
    height: 52,
    borderRadius: 16,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  copyMiniText: {
    fontSize: 15,
    fontWeight: "700",
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  sectionTitleSmall: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
  },
  badgePill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "700",
  },
  horizontalCards: {
    paddingBottom: 8,
    gap: 14,
    paddingRight: 16,
  },
  mallCard: {
    width: 246,
    backgroundColor: colors.surface,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    minHeight: 258,
  },
  mallIconBox: {
    width: 78,
    height: 78,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  mallTitle: {
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 24,
    marginBottom: 14,
  },
  mallSubtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  blockTitle: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 12,
    marginTop: 4,
  },
  toolRow: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  toolIconBox: {
    width: 82,
    height: 82,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  toolTitle: {
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 4,
  },
  toolSubtitle: {
    fontSize: 14,
    lineHeight: 21,
  },
  defendBox: {
    borderRadius: 28,
    borderWidth: 1,
    padding: 18,
    marginBottom: 18,
  },
  defendHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  defendShield: {
    width: 88,
    height: 88,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  defendTitle: {
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 4,
  },
  defendSubtitle: {
    fontSize: 14,
    lineHeight: 21,
  },
  defendChipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  defendChip: {
    minHeight: 54,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#efc9c9",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  defendChipText: {
    color: "#3a2020",
    fontSize: 15,
    fontWeight: "700",
  },
  authorityCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  authorityIconBox: {
    width: 82,
    height: 82,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  authorityTextWrap: {
    flex: 1,
    paddingRight: 8,
  },
  authorityTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 4,
  },
  authoritySubtitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  authorityCount: {
    fontSize: 14,
  },
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 20,
  },
  bottomTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  bottomTabLabel: {
    fontSize: 11,
    fontWeight: "600",
  },
  shadowCard: {
    shadowColor: "#9fb6c5",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  pressed: {
    opacity: 0.94,
    transform: [{ scale: 0.988 }],
  },
});
