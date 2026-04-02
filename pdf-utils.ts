import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Platform, Alert } from "react-native";

export async function exportMessageToPDF(
  messageText: string,
  templateTitle: string,
  categoryName: string
) {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              line-height: 1.6;
              color: #333;
            }
            .header {
              border-bottom: 2px solid #0a7ea4;
              padding-bottom: 10px;
              margin-bottom: 20px;
            }
            .title {
              font-size: 24px;
              font-weight: bold;
              color: #0a7ea4;
            }
            .subtitle {
              font-size: 14px;
              color: #666;
              margin-top: 5px;
            }
            .content {
              margin: 20px 0;
              white-space: pre-wrap;
              word-wrap: break-word;
              background: #f5f5f5;
              padding: 15px;
              border-radius: 5px;
              border-left: 4px solid #0a7ea4;
            }
            .footer {
              margin-top: 30px;
              padding-top: 10px;
              border-top: 1px solid #ddd;
              font-size: 12px;
              color: #999;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">${templateTitle}</div>
            <div class="subtitle">Kategori: ${categoryName}</div>
            <div class="subtitle">Genererad: ${new Date().toLocaleDateString("sv-SE")} ${new Date().toLocaleTimeString("sv-SE")}</div>
          </div>
          <div class="content">${messageText}</div>
          <div class="footer">
            <p>Genererad av Svar Direkt - ett verktyg för att formulera meddelanden till svenska myndigheter.</p>
          </div>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({
      html: htmlContent,
      base64: false,
    });

    // @ts-ignore
    await Sharing.shareAsync(uri, {
      mimeType: "application/pdf",
      dialogTitle: "Dela PDF",
    });

    return true;
  } catch (error) {
    console.error("Error exporting to PDF:", error);
    Alert.alert("Fel", "Kunde inte exportera till PDF");
    return false;
  }
}
