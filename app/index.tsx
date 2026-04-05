import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import { categories } from "@/data/scenarios";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const ScreenContainer = View;

const colors = {
  primary: "#2563eb",
  primarySoft: "#dbeafe",
  background: "#f8fafc",
  foreground: "#0f172a",
  muted: "#64748b",
  border: "#e2e8f0",
  surface: "#ffffff",
};

export default function HomeScreen() {
  const router = useRouter();

  const handleCategoryPress = (categoryId: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push({ pathname: "/situations", params: { categoryId } });
  };

  return (
    <ScreenContainer style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View style={[styles.heroIconWrap, { backgroundColor: colors.primarySoft }]}>
              <MaterialIcons name="chat" size={28} color={colors.primary} />
            </View>
          </View>

          <Text style={[styles.heroTitle, { color: colors.foreground }]}>
            Svar Direkt
          </Text>

          <Text style={[styles.heroSubtitle, { color: colors.muted }]}>
            Färdiga meddelanden för vanliga situationer i Sverige.
          </Text>
        </View>

        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.infoHeader}>
            <MaterialIcons name="info-outline" size={18} color={colors.primary} />
            <Text style={[styles.infoTitle, { color: colors.foreground }]}>
              Viktig information
            </Text>
          </View>

          <Text style={[styles.infoText, { color: colors.muted }]}>
            Denna app ger exempel på meddelanden och formuleringar för olika situationer.
            Appen erbjuder inte juridisk rådgivning och ersätter inte kontakt med myndighet,
            jurist eller annan professionell rådgivare.
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Myndigheter
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.muted }]}>
            Välj kategori
          </Text>
        </View>

        <View style={styles.cardList}>
          {categories.map((category) => (
            <Pressable
              key={category.id}
              onPress={() => handleCategoryPress(category.id)}
              style={({ pressed }) => [
                styles.card,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
                pressed && styles.cardPressed,
              ]}
            >
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: colors.primarySoft,
                  },
                ]}
              >
                <MaterialIcons name={category.icon as any} size={22} color={colors.primary} />
              </View>

              <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, { color: colors.foreground }]} numberOfLines={1}>
                  {category.title}
                </Text>

                <Text style={[styles.cardSubtitle, { color: colors.muted }]} numberOfLines={1}>
                  {category.subtitle}
                </Text>

                <Text style={[styles.cardCount, { color: colors.muted }]}>
                  {category.scenarios.length} färdiga svar
                </Text>
              </View>

              <MaterialIcons name="chevron-right" size={22} color={colors.muted} />
            </Pressable>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.muted }]}>
            Kopiera och skicka professionella svar.
          </Text>
          <Text style={[styles.footerText, { color: colors.muted }]}>
            Ingen inloggning krävs.
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 28,
  },
  heroCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
    backgroundColor: "#ffffff",
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  heroIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  infoCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  infoText: {
    fontSize: 13,
    lineHeight: 19,
  },
  sectionHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: 13,
  },
  cardList: {
    gap: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
  },
  cardPressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.92,
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
    minWidth: 0,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    marginBottom: 4,
  },
  cardCount: {
    fontSize: 11,
  },
  footer: {
    alignItems: "center",
    marginTop: 22,
    paddingTop: 8,
  },
  footerText: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },
});
