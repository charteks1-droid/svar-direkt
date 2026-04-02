import { useRouter, useLocalSearchParams } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useDeviceId } from "@/hooks/use-device-id";
import { getApiBaseUrl } from "@/constants/oauth";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { WebView } from "react-native-webview";
import { Pressable, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useState } from "react";

export default function PayPalWebViewScreen() {
  const router = useRouter();
  const colors = useColors();
  const { approvalUrl, deviceId, subscriptionId } = useLocalSearchParams<{
    approvalUrl: string;
    deviceId: string;
    subscriptionId: string;
  }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugResult, setDebugResult] = useState<any>(null);
  const [checkStatusResult, setCheckStatusResult] = useState<any>(null);
  const { deviceId: currentDeviceId } = useDeviceId();

  if (!approvalUrl) {
    return (
      <ScreenContainer className="px-6 pt-4 pb-8" edges={["top", "left", "right", "bottom"]}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={[styles.errorText, { color: colors.error }]}>
            Brak linku do PayPal
          </Text>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: colors.primary },
              pressed && { opacity: 0.8 },
            ]}
          >
            <Text style={[styles.buttonText, { color: colors.background }]}>Wróć</Text>
          </Pressable>
        </View>
      </ScreenContainer>
    );
  }

  const handleReturnFromPayPal = async (returnUrl: string) => {
    console.log("[PayPal] Return URL detected:", returnUrl);

    if (!subscriptionId || !deviceId) {
      console.error("[PayPal] Missing subscriptionId or deviceId");
      setDebugResult({
        success: false,
        error: "Missing subscriptionId or deviceId",
        subscriptionId,
        deviceId,
      });
      return;
    }

    try {
      // Call backend to verify subscription status
      const response = await fetch("https://svardirekt-cy96hsrb.manus.space/api/trpc/subscription.handleReturn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: {
            subscriptionId,
            deviceId,
          },
        }),
      });

      const result = await response.json();
      console.log("[PayPal] Verification result:", result);
      console.log("[PayPal] API URL used: https://svardirekt-cy96hsrb.manus.space/api/trpc/subscription.handleReturn");

      // Store full debug result
      setDebugResult({
        success: result.result?.data?.json?.success || false,
        message: result.result?.data?.json?.message || "No message",
        subscriptionId,
        deviceId,
        paypalStatus: result.result?.data?.json?.paypalStatus,
        databaseUpdated: result.result?.data?.json?.databaseUpdated,
        fullResponse: result,
      });

      if (result.result?.data?.json?.success) {
        console.log("[PayPal] Subscription verified as active!");
        // DO NOT auto-redirect - keep debug screen visible
      } else {
        console.error("[PayPal] Subscription verification failed");
        // Show debug result instead of generic error
      }
    } catch (err: any) {
      console.error("[PayPal] Error verifying subscription:", err);
      setDebugResult({
        success: false,
        error: err.message || "Unknown error",
        subscriptionId,
        deviceId,
        fullError: err,
      });
    }
  };

  return (
    <ScreenContainer
      className="px-0 pt-0 pb-0"
      edges={["top", "left", "right", "bottom"]}
      containerClassName="flex-1"
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.background, borderBottomColor: colors.border },
        ]}
      >
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [pressed && { opacity: 0.6 }]}
        >
          <MaterialIcons name="close" size={24} color={colors.primary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>PayPal</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Loading Indicator */}
      {loading && (
        <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.muted }]}>
            Ładowanie PayPal...
          </Text>
        </View>
      )}

      {/* WebView */}
      <WebView
        source={{ uri: approvalUrl }}
        style={styles.webview}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={(navState) => {
          // Check if user returned from PayPal
          if (navState.url.includes("/api/paypal/return")) {
            console.log("[PayPal] Return URL detected:", navState.url);
            handleReturnFromPayPal(navState.url);
          }
        }}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error("[PayPal WebView] Error:", nativeEvent);
          setError(nativeEvent.description);
          setLoading(false);
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
      />

      {/* Debug Result Screen - stays visible until user closes */}
      {debugResult && (
        <View
          style={[
            styles.debugContainer,
            { backgroundColor: colors.surface, borderColor: debugResult.success ? colors.success : colors.error },
          ]}
        >
          <Text style={[styles.debugTitle, { color: debugResult.success ? colors.success : colors.error }]}>
            {debugResult.success ? "✓ Sukces" : "✗ Błąd"}
          </Text>
          <Text style={[styles.debugText, { color: colors.foreground }]}>
            {debugResult.message || debugResult.error}
          </Text>
          <Text style={[styles.debugLabel, { color: colors.muted }]}>Subscription ID:</Text>
          <Text style={[styles.debugValue, { color: colors.foreground }]}>{debugResult.subscriptionId}</Text>
          <Text style={[styles.debugLabel, { color: colors.muted }]}>Device ID:</Text>
          <Text style={[styles.debugValue, { color: colors.foreground }]}>{debugResult.deviceId}</Text>
          {debugResult.paypalStatus && (
            <>
              <Text style={[styles.debugLabel, { color: colors.muted }]}>PayPal Status:</Text>
              <Text style={[styles.debugValue, { color: colors.foreground }]}>{debugResult.paypalStatus}</Text>
            </>
          )}
          {debugResult.databaseUpdated !== undefined && (
            <>
              <Text style={[styles.debugLabel, { color: colors.muted }]}>Database Updated:</Text>
              <Text style={[styles.debugValue, { color: colors.foreground }]}>{debugResult.databaseUpdated ? "Yes" : "No"}</Text>
            </>
          )}
          {debugResult.error && (
            <>
              <Text style={[styles.debugLabel, { color: colors.error }]}>Error Details:</Text>
              <Text style={[styles.debugValue, { color: colors.error }]}>{debugResult.error}</Text>
            </>
          )}
          {checkStatusResult && (
            <>
              <Text style={[styles.debugLabel, { color: colors.muted }]}>CheckStatus Result:</Text>
              <Text style={[styles.debugValue, { color: colors.foreground }]}>isPremium: {checkStatusResult.isPremium ? "true" : "false"}</Text>
              {checkStatusResult.subscription && (
                <Text style={[styles.debugValue, { color: colors.muted }]}>Status: {checkStatusResult.subscription.status}</Text>
              )}
            </>
          )}
          <Pressable
            onPress={async () => {
              console.log("[PayPal] User pressed 'Wróć do aplikacji'");
              console.log("[PayPal] Current deviceId:", currentDeviceId);
              console.log("[PayPal] PayPal response deviceId:", debugResult.deviceId);
              console.log("[PayPal] DeviceIds match:", currentDeviceId === debugResult.deviceId);
              
              // Call checkStatus to refresh premium state
              try {
                console.log("[PayPal] Calling checkStatus to refresh premium state...");
                const apiUrl = getApiBaseUrl() || "";
                const checkResponse = await fetch(
                  `${apiUrl}/api/trpc/subscription.checkStatus?input=${encodeURIComponent(
                    JSON.stringify({ json: { deviceId: currentDeviceId } })
                  )}`,
                  {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                
                const checkData = await checkResponse.json();
                console.log("[PayPal] Full checkStatus response:", JSON.stringify(checkData, null, 2));
                
                const checkResult = checkData.result?.data?.json || { isPremium: false, subscription: null };
                console.log("[PayPal] Extracted checkStatus result:", checkResult);
                console.log("[PayPal] isPremium from checkStatus:", checkResult.isPremium);
                
                setCheckStatusResult(checkResult);
              } catch (err) {
                console.error("[PayPal] Error calling checkStatus:", err);
              }
              
              // Wait a moment then navigate back
              setTimeout(() => {
                console.log("[PayPal] Navigating back to app");
                router.back();
              }, 1000);
            }}
            style={({ pressed }) => [
              styles.debugButton,
              { backgroundColor: colors.primary },
              pressed && { opacity: 0.8 },
            ]}
          >
            <Text style={[styles.buttonText, { color: colors.background }]}>Wróć do aplikacji</Text>
          </Pressable>
        </View>
      )}

      {/* Error State */}
      {error && !debugResult && (
        <View
          style={[
            styles.errorContainer,
            { backgroundColor: colors.surface, borderColor: colors.error },
          ]}
        >
          <Text style={[styles.errorMessage, { color: colors.error }]}>{error}</Text>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.errorButton,
              { backgroundColor: colors.primary },
              pressed && { opacity: 0.8 },
            ]}
          >
            <Text style={[styles.buttonText, { color: colors.background }]}>Wróć</Text>
          </Pressable>
        </View>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },
  debugContainer: {
    padding: 16,
    borderTopWidth: 2,
    gap: 12,
    maxHeight: "80%",
  },
  debugTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  debugText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  debugLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 8,
  },
  debugValue: {
    fontSize: 13,
    fontFamily: "monospace",
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  debugButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  errorContainer: {
    padding: 16,
    borderTopWidth: 1,
    gap: 12,
  },
  errorMessage: {
    fontSize: 14,
    lineHeight: 20,
  },
  errorButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    fontSize: 16,
    marginBottom: 16,
  },
});
