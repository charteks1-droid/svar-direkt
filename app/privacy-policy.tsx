import { useRouter } from "expo-router";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function PrivacyPolicyScreen() {
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
          Integritetspolicy
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Integritetspolicy för Svar Direkt
          </Text>

          <Text style={[styles.lastUpdated, { color: colors.muted }]}>
            Senast uppdaterad: 2026-03-01
          </Text>

          <View style={styles.section}>
            <Text style={[styles.heading, { color: colors.foreground }]}>
              1. Datainsamling
            </Text>
            <Text style={[styles.body, { color: colors.foreground }]}>
              Svar Direkt samlar INTE in några personuppgifter från användare. Appen fungerar helt lokalt på din enhet och lagrar all data endast i din enhets lokala lagring (AsyncStorage).
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.heading, { color: colors.foreground }]}>
              2. Lokal lagring
            </Text>
            <Text style={[styles.body, { color: colors.foreground }]}>
              All data som du skapar i appen (anteckningar, favoriter, påminnelser, egna mallar) lagras endast lokalt på din enhet. Dessa data lämnar aldrig din enhet och delas inte med några tredje parter.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.heading, { color: colors.foreground }]}>
              3. Ingen serveröverföring
            </Text>
            <Text style={[styles.body, { color: colors.foreground }]}>
              Appen skickar ingen data till externa servrar, molntjänster eller tredje parter. All funktionalitet är offline och kräver ingen internetanslutning för att fungera.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.heading, { color: colors.foreground }]}>
              4. Ingen spårning
            </Text>
            <Text style={[styles.body, { color: colors.foreground }]}>
              Appen innehåller ingen spårning, analys eller övervakning av användaraktiviteter. Vi vet inte hur du använder appen eller vilka mallar du använder.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.heading, { color: colors.foreground }]}>
              5. Säkerhet
            </Text>
            <Text style={[styles.body, { color: colors.foreground }]}>
              Din data är säker eftersom den aldrig lämnar din enhet. Om du raderar appen raderas all data som är associerad med den från din enhet.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.heading, { color: colors.foreground }]}>
              6. Ändringar av denna policy
            </Text>
            <Text style={[styles.body, { color: colors.foreground }]}>
              Vi kan uppdatera denna integritetspolicy från tid till annan. Du uppmanas att granska denna policy regelbundet för ändringar.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.heading, { color: colors.foreground }]}>
              7. Kontakt
            </Text>
            <Text style={[styles.body, { color: colors.foreground }]}>
              Om du har frågor om denna integritetspolicy, kontakta oss via Google Play-appen.
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.muted }]}>
              Denna integritetspolicy gäller endast för Svar Direkt-appen.
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
