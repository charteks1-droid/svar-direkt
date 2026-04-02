import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useAnalytics } from "@/hooks/use-analytics";
import { useSubscription } from "@/hooks/use-subscription";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { categories } from "@/data/scenarios";
import * as Haptics from "expo-haptics";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();
  const { trackEvent } = useAnalytics();
  const { isPremium } = useSubscription();

  const handleProFeaturePress = () => {
    if (!isPremium) {
      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      router.push("/subscription");
      return;
    }
  };

  const handleCategoryPress = (categoryId: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    trackEvent("category_opened", categoryId);
    router.push({ pathname: "/situations", params: { categoryId } });
  };

  const handleTipsPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    trackEvent("tips_opened");
    router.push("/tips");
  };

  const handleNotepadPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    trackEvent("notepad_opened");
    router.push("/notepad");
  };

  const handleHistoryPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    trackEvent("history_opened");
    router.push("/history");
  };

  const handleRemindersPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push("/reminders");
  };

  const handleCustomTemplatesPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push("/custom-templates");
  };

  const handleSearchPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push({ pathname: "/situations", params: { categoryId: "skatteverket" } });
  };

  const handleFavoritesPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push({ pathname: "/situations", params: { categoryId: "skatteverket" } });
  };

  const handleSharePress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push("/notepad");
  };

  const handleAboutPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push("/about");
  };

  const handleQuickRepliesPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push("/quick-replies");
  };

  const handleAIGeneratorPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    trackEvent("ai_generator_opened");
    router.push("/ai-generator");
  };

  const handleSubscribePress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    trackEvent("subscribe_clicked");
    router.push("/subscription");
  };



  const handleTextFormattingPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push("/notepad");
  };

  const handleCommentsPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push({ pathname: "/situations", params: { categoryId: "skatteverket" } });
  };

  // Reorder categories: Skatteverket, Försäkringskassan, Migrationsverket, Inkasso, Kronofogden
  const categoryOrder = ["skatteverket", "forsakringskassan", "migrationsverket", "inkasso", "kronofogden", "arbetsformedlingen", "socialstyrelsen", "polisen", "domstol", "boverkets"];
  const sortedCategories = categoryOrder.map(id => categories.find(c => c.id === id)).filter((c): c is typeof categories[0] => c !== undefined);

  return (
    <ScreenContainer className="px-6 pt-4 pb-8" edges={["top", "left", "right", "bottom"]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="items-center mb-4">
          <Text className="text-3xl font-bold text-primary tracking-tight">
            Svar Direkt
          </Text>
        </View>

        {/* Legal Information Box */}
        <View style={[styles.legalBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "flex-start" }}>
            <MaterialIcons
              name="info"
              size={20}
              color={colors.primary}
              style={{ marginTop: 2, flexShrink: 0 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={[styles.legalTitle, { color: colors.foreground }]}>
                Viktig information
              </Text>
              <Text style={[styles.legalText, { color: colors.muted }]}>
                Denna app är ett privat verktyg som ger exempel på meddelanden och formuleringar för olika situationer i Sverige.{"\n\n"}Appen erbjuder inte juridisk rådgivning och ersätter inte kontakt med myndighet, jurist eller annan professionell rådgivare.{"\n\n"}Syftet är att ge praktisk vägledning och hjälp att formulera meddelanden på ett tydligt och korrekt sätt.{"\n\n"}Observationerna (Väg, Lag, Länk, Ort) är ENDAST OBSERVATIONER - INTE juridisk rådgivning. Varje situation är unik. Om du behöver juridisk rådgivning, kontakta en jurist.{"\n\n"}Användaren ansvarar själv för hur informationen används.
              </Text>
            </View>
          </View>
        </View>

        {/* Categories Section */}
        <View className="mb-6">
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Myndigheter
          </Text>
          {sortedCategories.map((category) => (
            <Pressable
              key={category.id}
              onPress={() => handleCategoryPress(category.id)}
              style={({ pressed }) => [
                styles.card,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
                pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
              ]}
            >
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + "15", marginTop: 2 }]}>
                <MaterialIcons
                  name={category.icon as any}
                  size={24}
                  color={colors.primary}
                />
              </View>
              <View style={styles.cardContent}>
                <Text
                  style={[styles.cardTitle, { color: colors.foreground }]}
                  numberOfLines={2}
                >
                  {category.title}
                </Text>
                <Text
                  style={[styles.cardSubtitle, { color: colors.muted }]}
                >
                  {category.subtitle}
                </Text>
                <Text
                  style={[styles.cardCount, { color: colors.muted }]}
                >
                  {category.scenarios.length} färdiga svar
                </Text>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={20}
                color={colors.muted}
                style={{ flexShrink: 0 }}
              />
            </Pressable>
          ))}
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Tools Section */}
        <View className="mb-4">
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Verktyg
          </Text>

          {/* Notepad Button */}
          <Pressable
            onPress={handleNotepadPress}
            style={({ pressed }) => [
              styles.toolButton,
              {
                backgroundColor: colors.primary,
              },
              pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
            ]}
          >
            <MaterialIcons
              name="note"
              size={18}
              color={colors.background}
            />
            <Text style={[styles.toolButtonText, { color: colors.background }]}>
              Anteckningsblock
            </Text>
          </Pressable>

          {/* History Button */}
          <Pressable
            onPress={handleHistoryPress}
            style={({ pressed }) => [
              styles.toolButton,
              {
                backgroundColor: colors.primary,
              },
              pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
            ]}
          >
            <MaterialIcons
              name="history"
              size={18}
              color={colors.background}
            />
            <Text style={[styles.toolButtonText, { color: colors.background }]}>
              Historik
            </Text>
          </Pressable>

          {/* AI Generator Button */}
          <Pressable
            onPress={handleAIGeneratorPress}
            style={({ pressed }) => [
              styles.toolButton,
              {
                backgroundColor: colors.primary,
              },
              pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
            ]}
          >
            <MaterialIcons
              name="auto-awesome"
              size={18}
              color={colors.background}
            />
            <Text style={[styles.toolButtonText, { color: colors.background }]}>
              AI Generator
            </Text>
          </Pressable>

          {/* Tips Button */}
          <Pressable
            onPress={handleTipsPress}
            style={({ pressed }) => [
              styles.toolButton,
              {
                backgroundColor: colors.primary,
              },
              pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
            ]}
          >
            <MaterialIcons
              name="info"
              size={18}
              color={colors.background}
            />
            <Text style={[styles.toolButtonText, { color: colors.background }]}>
              Vägledning och ordlista
            </Text>
          </Pressable>

          {/* Quick Replies Button */}
          <Pressable
            onPress={handleQuickRepliesPress}
            style={({ pressed }) => [
              styles.toolButton,
              {
                backgroundColor: colors.primary,
              },
              pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
            ]}
          >
            <MaterialIcons
              name="message"
              size={18}
              color={colors.background}
            />
            <Text style={[styles.toolButtonText, { color: colors.background }]}>
              Snabba svar
            </Text>
          </Pressable>



        </View>

        {/* Subscribe Section */}
        <View className="mb-6 p-4 rounded-lg" style={{ backgroundColor: colors.primary + "15", borderWidth: 1, borderColor: colors.primary }}>
          <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
            <MaterialIcons
              name="star"
              size={24}
              color={colors.primary}
            />
            <View style={{ flex: 1 }}>
              <Text style={[styles.proButtonText, { color: colors.primary, marginBottom: 4 }]}>
                Svar Direkt Pro
              </Text>
              <Text style={[{ fontSize: 12, color: colors.muted, lineHeight: 16 }]}>
                Låsa upp alla pro-funktioner för endast 29 kr/månad
              </Text>
            </View>
          </View>
          <Pressable
            onPress={handleSubscribePress}
            style={({ pressed }) => [
              styles.subscribeButton,
              {
                backgroundColor: colors.primary,
              },
              pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
            ]}
          >
            <Text style={[styles.subscribeButtonText, { color: colors.background }]}>
              Prenumerera nu
            </Text>
          </Pressable>
        </View>

        {/* Pro Section */}
        <View className="mb-4">
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Pro-funktioner
          </Text>

          {/* Reminders Button (Pro) */}
          <Pressable
            onPress={() => {
              if (!isPremium) {
                handleProFeaturePress();
              } else {
                handleRemindersPress();
              }
            }}
            style={({ pressed }) => [
              styles.proButton,
              {
                backgroundColor: colors.primary + "20",
                borderColor: colors.primary,
              },
              pressed && { transform: [{ scale: 0.97 }], opacity: 0.8 },
            ]}
          >
            <MaterialIcons
              name="notifications"
              size={18}
              color={colors.primary}
            />
            <Text style={[styles.proButtonText, { color: colors.primary }]}>
              Påminnelser
            </Text>

          </Pressable>

          {/* Custom Templates Button (Pro) */}
          <Pressable
            onPress={() => {
              if (!isPremium) {
                handleProFeaturePress();
              } else {
                handleCustomTemplatesPress();
              }
            }}
            style={({ pressed }) => [
              styles.proButton,
              {
                backgroundColor: colors.primary + "20",
                borderColor: colors.primary,
              },
              pressed && { transform: [{ scale: 0.97 }], opacity: 0.8 },
            ]}
          >
            <MaterialIcons
              name="description"
              size={18}
              color={colors.primary}
            />
            <Text style={[styles.proButtonText, { color: colors.primary }]}>
              Mina mallar
            </Text>

          </Pressable>

          {/* Search Button (Pro) */}
          <Pressable
            onPress={() => {
              if (!isPremium) {
                handleProFeaturePress();
              } else {
                handleSearchPress();
              }
            }}
            style={({ pressed }) => [
              styles.proButton,
              {
                backgroundColor: colors.primary + "20",
                borderColor: colors.primary,
              },
              pressed && { transform: [{ scale: 0.97 }], opacity: 0.8 },
            ]}
          >
            <MaterialIcons
              name="search"
              size={18}
              color={colors.primary}
            />
            <Text style={[styles.proButtonText, { color: colors.primary }]}>
              Sok mallar
            </Text>

          </Pressable>

          {/* Favorites Button (Pro) */}
          <Pressable
            onPress={() => {
              if (!isPremium) {
                handleProFeaturePress();
              } else {
                handleFavoritesPress();
              }
            }}
            style={({ pressed }) => [
              styles.proButton,
              {
                backgroundColor: colors.primary + "20",
                borderColor: colors.primary,
              },
              pressed && { transform: [{ scale: 0.97 }], opacity: 0.8 },
            ]}
          >
            <MaterialIcons
              name="favorite"
              size={18}
              color={colors.primary}
            />
            <Text style={[styles.proButtonText, { color: colors.primary }]}>
              Favoriter
            </Text>

          </Pressable>

          {/* Text Formatting Button (Pro) */}
          <Pressable
            onPress={() => {
              if (!isPremium) {
                handleProFeaturePress();
              } else {
                handleTextFormattingPress();
              }
            }}
            style={({ pressed }) => [
              styles.proButton,
              {
                backgroundColor: colors.primary + "20",
                borderColor: colors.primary,
              },
              pressed && { transform: [{ scale: 0.97 }], opacity: 0.8 },
            ]}
          >
            <MaterialIcons
              name="edit"
              size={18}
              color={colors.primary}
            />
            <Text style={[styles.proButtonText, { color: colors.primary }]}>
              Redigera mall
            </Text>

          </Pressable>


        </View>

        {/* About Button */}
        <View className="mb-4">
          <Pressable
            onPress={handleAboutPress}
            style={({ pressed }) => [
              styles.toolButton,
              {
                backgroundColor: colors.surface,
              },
              pressed && { transform: [{ scale: 0.97 }], opacity: 0.8 },
            ]}
          >
            <MaterialIcons
              name="info-outline"
              size={18}
              color={colors.foreground}
            />
            <Text style={[styles.toolButtonText, { color: colors.foreground }]}>
              Om appen
            </Text>
          </Pressable>
        </View>

        {/* Footer */}
        <View className="items-center mt-4 mb-4">
          <Text className="text-xs text-muted text-center leading-relaxed">
            Kopiera och skicka professionella svar.{"\n"}Ingen inloggning krävs.
          </Text>
        </View>

        {/* Legal Links */}
        <View className="flex-row justify-center gap-3 mt-4 pt-4 border-t border-border">
          <Pressable
            onPress={() => router.push("/privacy-policy")}
            style={({ pressed }) => [pressed && { opacity: 0.6 }]}
          >
            <Text style={[{ color: colors.primary, fontSize: 12, fontWeight: "600" }]}>
              Integritetspolicy
            </Text>
          </Pressable>
          <Text style={[{ color: colors.border }]}>•</Text>
          <Pressable
            onPress={() => router.push("/terms-of-use")}
            style={({ pressed }) => [pressed && { opacity: 0.6 }]}
          >
            <Text style={[{ color: colors.primary, fontSize: 12, fontWeight: "600" }]}>
              Användarvillkor
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  legalBox: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  legalTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  legalText: {
    fontSize: 12,
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
    marginBottom: 8,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardContent: {
    flex: 1,
    minWidth: 0,
    marginRight: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 2,
    lineHeight: 20,
  },
  cardSubtitle: {
    fontSize: 12,
    marginBottom: 2,
    lineHeight: 16,
  },
  cardCount: {
    fontSize: 11,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  toolButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    gap: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  toolButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  proButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1.5,
    marginBottom: 8,
  },
  proButtonText: {
    fontSize: 15,
    fontWeight: "600",
  },
  subscribeButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  subscribeButtonText: {
    fontSize: 15,
    fontWeight: "700",
  },
  proLabel: {
    fontSize: 11,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
});
