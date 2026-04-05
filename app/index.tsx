import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import { categories } from "@/data/scenarios";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const ScreenContainer = View;

const colors = {
  primary: "#2563eb",
  background: "#ffffff",
  foreground: "#111111",
  muted: "#666666",
  border: "#e5e5e5",
  surface: "#f5f5f5",
};

export default function HomeScreen() {
  const router = useRouter();

  const handleCategoryPress = (categoryId: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push({ pathname: "/situations", params: { categoryId } });
  };

  const sortedCategories = categories;

  return (
    <ScreenContainer style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: "center", marginBottom: 16 }}>
          <Text style={{ fontSize: 30, fontWeight: "700", color: colors.primary }}>
            Svar Direkt
          </Text>
        </View>

        <View
          style={[
            styles.legalBox,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
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
                Denna app är ett privat verktyg som ger exempel på meddelanden och formuleringar för olika situationer i Sverige.{"\n\n"}
                Appen erbjuder inte juridisk rådgivning och ersätter inte kontakt med myndighet, jurist eller annan professionell rådgivare.{"\n\n"}
                Syftet är att ge praktisk vägledning och hjälp att formulera meddelanden på ett tydligt och korrekt sätt.{"\n\n"}
                Varje situation är unik. Om du behöver juridisk rådgivning, kontakta en jurist.
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginBottom: 24 }}>
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
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: `${colors.primary}15`,
                    marginTop: 2,
                  },
                ]}
              >
                <MaterialIcons name={category.icon as any} size={24} color={colors.primary} />
              </View>

              <View style={styles.cardContent}>
                <Text
                  style={[styles.cardTitle, { color: colors.foreground }]}
                  numberOfLines={2}
                >
                  {category.title}
                </Text>

                <Text style={[styles.cardSubtitle, { color: colors.muted }]}>
                  {category.subtitle}
                </Text>

                <Text style={[styles.cardCount, { color: colors.muted }]}>
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

        <View style={{ alignItems: "center", marginTop: 8, marginBottom: 8 }}>
          <Text
            style={{
              fontSize: 12,
              color: colors.muted,
              textAlign: "center",
              lineHeight: 18,
            }}
          >
            Kopiera och skicka professionella svar.{"\n"}Ingen inloggning krävs.
          </Text>
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
});
