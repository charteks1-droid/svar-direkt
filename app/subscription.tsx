import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useCreateSubscription } from "@/hooks/use-subscription";
import { useDeviceId } from "@/hooks/use-device-id";
import { getApiBaseUrl } from "@/constants/oauth";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";

export default function SubscriptionScreen() {
  const router = useRouter();
  const colors = useColors();
  const { deviceId } = useDeviceId();
  const { createLink, loading, error } = useCreateSubscription();
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    const apiUrl = getApiBaseUrl();
    console.log("[DEBUG-SUBSCRIPTION] API Base URL:", apiUrl);
    console.log("[DEBUG-SUBSCRIPTION] Device ID:", deviceId);
    console.log("[DEBUG-SUBSCRIPTION] Full createLink URL:", `${apiUrl}/api/trpc/subscription.createLink`);
  }, [deviceId]);

  const handleSubscribe = async () => {
    if (isProcessing || loading) return;

    setIsProcessing(true);
    try {
      const result = await createLink();

      if (!result) {
        alert("Błąd: Nie można utworzyć linku subskrypcji");
        setIsProcessing(false);
        return;
      }

      if (result.error) {
        alert(`Błąd: ${result.error}\n\nFull response: ${JSON.stringify(result, null, 2)}`);
        setIsProcessing(false);
        return;
      }

      if (!result.approvalUrl) {
        alert(`Nie można otworzyć PayPal. Spróbuj ponownie.\n\nFull response: ${JSON.stringify(result, null, 2)}`);
        setIsProcessing(false);
        return;
      }

      // Open PayPal in WebView
      router.push({
        pathname: "/paypal-webview",
        params: {
          approvalUrl: result.approvalUrl,
          deviceId,
          subscriptionId: result.subscriptionId,
        },
      });
    } catch (err) {
      console.error("[Subscription] Error:", err);
      alert("Błąd podczas otwierania PayPal");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ScreenContainer className="px-6 pt-4 pb-8" edges={["top", "left", "right", "bottom"]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [pressed && { opacity: 0.6 }]}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
            <Text style={[styles.backText, { color: colors.primary }]}>Tillbaka</Text>
          </View>
        </Pressable>

        {/* DEBUG: Show API URL */}
        <View style={[{ padding: 12, marginBottom: 16, borderRadius: 8, borderWidth: 1 }, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[{ fontSize: 12, fontFamily: 'monospace' }, { color: colors.muted }]}>API: {getApiBaseUrl()}</Text>
          <Text style={[{ fontSize: 12, fontFamily: 'monospace' }, { color: colors.muted }]}>Device: {deviceId?.substring(0, 12)}...</Text>
        </View>

        {/* Title */}
        <View style={{ marginBottom: 24 }}>
          <Text style={[styles.title, { color: colors.foreground }]}>
            Svar Direkt Pro
          </Text>
          <Text style={[styles.subtitle, { color: colors.muted }]}>
            Lås upp alla premiumfunktioner
          </Text>
        </View>

        {/* Features List */}
        <View
          style={[
            styles.featuresBox,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.featuresTitle, { color: colors.foreground }]}>
            Du får tillgång till:
          </Text>

          {[
            "Obegränsade påminnelser",
            "Egna mallar",
            "Avancerad sökning",
            "Favoritmallar",
            "Mallredigering",
            "Prioriterad support",
          ].map((feature, index) => (
            <View key={index} style={{ flexDirection: "row", gap: 12, marginBottom: 12 }}>
              <MaterialIcons name="check-circle" size={20} color={colors.primary} />
              <Text style={[styles.featureText, { color: colors.foreground }]}>
                {feature}
              </Text>
            </View>
          ))}
        </View>

        {/* Pricing */}
        <View style={{ marginVertical: 24, alignItems: "center" }}>
          <Text style={[styles.price, { color: colors.primary }]}>29 kr</Text>
          <Text style={[styles.pricePeriod, { color: colors.muted }]}>per månad</Text>
          <Text style={[styles.priceNote, { color: colors.muted }]}>
            Avbryt när som helst
          </Text>
        </View>

        {/* Error Message */}
        {error && (
          <View
            style={[
              styles.errorBox,
              { backgroundColor: colors.error + "15", borderColor: colors.error },
            ]}
          >
            <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
          </View>
        )}

        {/* Subscribe Button */}
        <Pressable
          onPress={handleSubscribe}
          disabled={isProcessing || loading}
          style={({ pressed }) => [
            styles.subscribeButton,
            {
              backgroundColor: isProcessing || loading ? colors.muted : colors.primary,
            },
            pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
          ]}
        >
          <Text style={[styles.subscribeButtonText, { color: colors.background }]}>
            {isProcessing || loading ? "Laddar..." : "Gå till PayPal"}
          </Text>
        </Pressable>

        {/* Info Box */}
        <View
          style={[
            styles.infoBox,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <MaterialIcons name="info" size={18} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.muted }]}>
            Du dirigeras till PayPal för säker betalning. Dina kortuppgifter lagras aldrig på
            våra servrar.
          </Text>
        </View>

        {/* Terms */}
        <Text style={[styles.termsText, { color: colors.muted }]}>
          Genom att klicka "Gå till PayPal" godkänner du våra{" "}
          <Text style={{ color: colors.primary, fontWeight: "600" }}>Användarvillkor</Text>
        </Text>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  backText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  featuresBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 16,
  },
  featureText: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  price: {
    fontSize: 48,
    fontWeight: "700",
    marginBottom: 4,
  },
  pricePeriod: {
    fontSize: 14,
    marginBottom: 8,
  },
  priceNote: {
    fontSize: 12,
  },
  errorBox: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 13,
    lineHeight: 18,
  },
  subscribeButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subscribeButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  infoBox: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 12,
    lineHeight: 16,
    flex: 1,
  },
  termsText: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
  },
});
