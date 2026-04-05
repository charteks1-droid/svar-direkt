Import { useRouter } from „expo-router”;
Import MaterialIcons from „@expo/vector-icons/MaterialIcons”;
Import * as Haptics from „expo-haptics”;
Import { categories } from „@/data/scenarios”;
Import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from „react-native”;

Const ScreenContainer = View;

Const colors = {
  Primary: „#2563eb”,
  primarySoft: „#dbeafe”,
  background: „#f8fafc”,
  foreground: „#0f172a”,
  muted: „#64748b”,
  border: „#e2e8f0”,
  surface: „#ffffff”,
};

Export default function HomeScreen() {
  Const router = useRouter();

  Const handleCategoryPress = (categoryId: string) => {
    If (Platform.OS !== „web”) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    Router.push({ pathname: „/situations”, params: { categoryId } });
  };

  Return (
    <ScreenContainer style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          Style={[
            Styles.heroCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.heroTopRow}>
            <View style={[styles.heroIconWrap, { backgroundColor: colors.primarySoft }]}>
              <MaterialIcons name=”chat-bubble-outline” size={28} color={colors.primary} />
            </View>
          </View>

          <Text style={[styles.heroTitle, { color: colors.foreground }]}>Svar Direkt</Text>

          <Text style={[styles.heroSubtitle, { color: colors.muted }]}>
            Klara och tydliga meddelanden för vanliga situationer i Sverige.
          </Text>
        </View>

        <View
          Style={[
            Styles.infoCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.infoHeader}>
            <View style={[styles.infoIconWrap, { backgroundColor: colors.primarySoft }]}>
              <MaterialIcons name=”info-outline” size={16} color={colors.primary} />
            </View>
            <Text style={[styles.infoTitle, { color: colors.foreground }]}>
              Viktig information
            </Text>
          </View>

          <Text style={[styles.infoText, { color: colors.muted }]}>
            Denna app ger exempel på meddelanden och formuleringar för olika situationer.
            Den erbjuder inte juridisk rådgivning och ersätter inte kontakt med myndighet,
            Jurist eller annan professionell rådgivare.
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Myndigheter</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.muted }]}>Välj kategori</Text>
        </View>

        <View style={styles.cardList}>
          {categories.map((category) => (
            <Pressable
              Key={category.id}
              onPress={() => handleCategoryPress(category.id)}
              style={({ pressed }) => [
                styles.card,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
                Pressed && styles.cardPressed,
              ]}
            >
              <View
                Style={[
                  Styles.iconContainer,
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

              <View style={[styles.chevronWrap, { backgroundColor: „#f8fafc” }]}>
                <MaterialIcons name=”chevron-right” size={18} color={colors.muted} />
              </View>
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

Const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 28,
  },
  heroCard: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
  },
  heroTopRow: {
    flexDirection: „row”,
    justifyContent: „space-between”,
    marginBottom: 16,
  },
  heroIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: „center”,
    justifyContent: „center”,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: „800”,
    marginBottom: 8,
    letterSpacing: -0.6,
  },
  heroSubtitle: {
    fontSize: 14,
    lineHeight: 21,
    maxWidth: „92%”,
  },
  infoCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
  },
  infoHeader: {
    flexDirection: „row”,
    alignItems: „center”,
    gap: 10,
    marginBottom: 10,
  },
  infoIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 10,
    alignItems: „center”,
    justifyContent: „center”,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: „700”,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 20,
  },
  sectionHeader: {
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: „700”,
    marginBottom: 2,
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 13,
  },
  cardList: {
    gap: 10,
  },
  Card: {
    flexDirection: „row”,
    alignItems: „center”,
    borderWidth: 1,
    borderRadius: 20,
    padding: 14,
  },
  cardPressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.94,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: „center”,
    justifyContent: „center”,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
    minWidth: 0,
    paddingRight: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: „700”,
    marginBottom: 3,
  },
  cardSubtitle: {
    fontSize: 12,
    marginBottom: 4,
  },
  cardCount: {
    fontSize: 11,
  },
  chevronWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: „center”,
    justifyContent: „center”,
  },
  Footer: {
    alignItems: „center”,
    marginTop: 24,
    paddingTop: 10,
    paddingBottom: 8,
  },
  footerText: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: „center”,
  },
});

