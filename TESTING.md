# Svar Direkt - Testing Guide

## Quick Start

### Option 1: Test on Mobile Device (Recommended)

1. **Install Expo Go** on your iOS or Android device
   - iOS: App Store → Search "Expo Go"
   - Android: Google Play → Search "Expo Go"

2. **Open Expo Go** and scan the QR code from the dev server
   - The QR code is displayed in the terminal when the dev server is running
   - Or navigate to: https://8081-ibr883q33gqhtiuswxbz8-9ad68570.us1.manus.computer

3. **Test the app** on your device

### Option 2: Test in Web Browser

- Open: https://8081-ibr883q33gqhtiuswxbz8-9ad68570.us1.manus.computer
- Note: Some native features may not work in web browser

---

## Testing Checklist

### 1. Home Screen
- [ ] All 10 categories visible (Skatteverket, Försäkringskassan, Migrationsverket, Inkasso, Kronofogden, Arbetsförmedlingen, Socialstyrelsen, Polisen, Domstol, Boverkets)
- [ ] All category cards display correctly with icons and descriptions
- [ ] Legal information box visible at top
- [ ] VERKTYG section visible (Anteckningsblock, Historia, Vägledning)
- [ ] PRO-FUNKTIONER section visible (all 6 buttons)

### 2. Categories & Templates
- [ ] Click each category and verify templates load
- [ ] Each category shows correct number of templates
- [ ] Template titles and descriptions display correctly
- [ ] All text is in Swedish (no Polish or English)

### 3. Template Details
- [ ] Click a template to open detail screen
- [ ] Template content displays with editable placeholders [Namn], [Personnummer], etc.
- [ ] Copy button works and copies text to clipboard
- [ ] Success message appears after copying
- [ ] Placeholders can be edited before copying

### 4. Anteckningsblock (Notepad)
- [ ] Click "Anteckningsblock" button from home screen
- [ ] Text editor works - can type and edit
- [ ] Full Name field works
- [ ] Personal Number field works
- [ ] "Kopiera" (Copy) button copies all content
- [ ] "Rensa allt" (Clear all) button clears everything
- [ ] Data persists after closing and reopening app

### 5. Historia (History)
- [ ] Click "Historia" button from home screen
- [ ] History screen loads
- [ ] Copy some templates and verify they appear in history
- [ ] History shows timestamps
- [ ] Can clear history

### 6. Vägledning (Tips/Glossary)
- [ ] Click "Vägledning och ordlista" button from home screen
- [ ] Tips and glossary content displays
- [ ] All Swedish terminology is clear and helpful

### 7. Pro Features

#### Search & Filter (Sök mallar)
- [ ] Click "Sök mallar" button
- [ ] Can search templates by keyword
- [ ] Results filter correctly
- [ ] Case-insensitive search works

#### Favorites (Favoriter)
- [ ] Click "Favoriter" button
- [ ] Can mark templates as favorites
- [ ] Favorites are saved and persist
- [ ] Can remove from favorites

#### Share Template (Dela mall)
- [ ] Click "Dela mall" button
- [ ] Can share template via system share sheet
- [ ] Share message includes app name and template content
- [ ] Works with email, messaging, etc.

#### Copy History (Kopieringshistorik)
- [ ] Click "Kopieringshistorik" button
- [ ] Shows history of copied templates
- [ ] Newest items appear first
- [ ] Can copy from history again
- [ ] Can clear history

#### Text Formatting (Redigera mall)
- [ ] Click "Redigera mall" button
- [ ] Can apply bold, italic, underline formatting
- [ ] Can add bullet points and numbered lists
- [ ] Formatting is preserved when copying

#### Comments (Kommentarer)
- [ ] Click "Kommentarer" button
- [ ] Can add comments to templates
- [ ] Can like comments
- [ ] Comments are saved and persist
- [ ] Can view all comments for a template

### 8. Navigation
- [ ] Back button works on all screens
- [ ] Can navigate between categories smoothly
- [ ] No dead ends or broken links
- [ ] Tab bar is always accessible

### 9. Performance
- [ ] App loads quickly
- [ ] No lag when scrolling through templates
- [ ] Copying to clipboard is instant
- [ ] Navigation between screens is smooth

### 10. Appearance
- [ ] All text is readable
- [ ] Colors match Swedish institutional blue theme
- [ ] Icons display correctly
- [ ] Layout is clean and professional
- [ ] No overlapping text or UI elements
- [ ] Works in both light and dark mode

---

## Reporting Issues

When you find a bug or problem, please provide:

1. **What you were doing** - Step-by-step description
2. **What happened** - The problem or error
3. **What should happen** - Expected behavior
4. **Device info** - iOS/Android, device model, app version
5. **Screenshots** - If applicable

Example:
```
Bug: Copy button doesn't work on Skatteverket templates

Steps:
1. Open app
2. Click Skatteverket category
3. Click first template
4. Click Copy button

Result: Nothing happens, text not copied
Expected: Text should be copied to clipboard and success message shown

Device: iPhone 14, iOS 17.2
```

---

## Feature Requests

If you want to suggest a new feature or improvement:

1. **Describe the feature** - What should it do?
2. **Why is it useful** - How does it help users?
3. **Example usage** - How would users interact with it?

---

## Performance Tips

- Keep the app open in Expo Go while testing
- If the app crashes, close Expo Go completely and reopen
- Clear app cache if you experience persistent issues
- Test on both iOS and Android if possible

---

## Contact

Report all issues and feedback to the development team. We're ready to fix bugs and implement improvements based on your testing!

Lycka till med testningen! 🚀
