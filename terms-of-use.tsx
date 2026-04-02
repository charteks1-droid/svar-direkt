import { useRouter } from "expo-router";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TermsOfUseScreen() {
  const router = useRouter();
  const colors = useColors();

  return (
    <ScreenContainer edges={["top", "left", "right", "bottom"]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && { opacity: 0.6 },
          ]}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>
          Användarvillkor
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Användarvillkor för Svar Direkt
          </Text>

          <Text style={[styles.lastUpdated, { color: colors.muted }]}>
            Senast uppdaterad: 2026-03-01
          </Text>

          <View style={styles.section}>
            <Text style={[styles.heading, { color: colors.foreground }]}>
              1. Acceptans av villkor
            </Text>
            <Text style={[styles.body, { color: colors.foreground }]}>
              Genom att använda Svar Direkt accepterar du dessa användarvillkor. Om du inte godkänner dessa villkor, använd inte appen.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.heading, { color: colors.foreground }]}>
              2. Syfte
            </Text>
            <Text style={[styles.body, { color: colors.foreground }]}>
              Svar Direkt tillhandahåller mallar för meddelanden till svenska myndigheter. Mallarna är endast exempel och inte juridisk rådgivning.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.heading, { color: colors.foreground }]}>
              3. Användaransvar
            </Text>
            <Text style={[styles.body, { color: colors.foreground }]}>
              Du är helt ansvarig för innehållet i meddelanden du skickar baserat på mallarna. Du måste säkerställa att innehållet är korrekt, lagligt och inte kränker någons rättigheter.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.heading, { color: colors.foreground }]}>
              4. Ingen juridisk rådgivning
            </Text>
            <Text style={[styles.body, { color: colors.foreground }]}>
              Svar Direkt ger INTE juridisk rådgivning. Mallarna är endast exempel. För juridisk rådgivning, kontakta en advokat eller juridisk expert.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.heading, { color: colors.foreground }]}>
              5. Begränsning av ansvar
            </Text>
            <Text style={[styles.body, { color: colors.foreground }]}>
              Vi är INTE ansvariga för: (a) fel eller felaktigheter i mallarna, (b) förlust av data, (c) skador från att använda appen, (d) konsekvenser av att skicka meddelanden baserade på mallarna.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.heading, { color: colors.foreground }]}>
              6. Ändringar av villkor
            </Text>
            <Text style={[styles.body, { color: colors.foreground }]}>
              Vi förbehåller oss rätten att ändra dessa villkor när som helst. Fortsatt användning av appen innebär acceptans av ändrade villkor.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.heading, { color: colors.foreground }]}>
              7. Avslutning
            </Text>
            <Text style={[styles.body, { color: colors.foreground }]}>
              Vi kan avsluta eller begränsa din åtkomst till appen om du bryter mot dessa villkor.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.heading, { color: colors.foreground }]}>
              8. Tillämplig lag
            </Text>
            <Text style={[styles.body, { color: colors.foreground }]}>
              Dessa villkor regleras av och tolkas i enlighet med svensk lag.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.heading, { color: colors.foreground }]}>
              9. Kontakt
            </Text>
            <Text style={[styles.body, { color: colors.foreground }]}>
              Om du har frågor om dessa användarvillkor, kontakta oss via Google Play-appen.
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.muted }]}>
              Dessa användarvillkor gäller endast för Svar Direkt-appen.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  content: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 12,
    marginBottom: 16,
  },
  section: {
    gap: 8,
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
  },
  footer: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
  },
  footerText: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
});
