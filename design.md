# Svar Direkt – Mobile App Interface Design

## Overview
Svar Direkt is a simple, fast utility app for Swedish users dealing with Inkasso (debt collection) or Kronofogden (Swedish Enforcement Authority). The app provides pre-written, professional Swedish-language message templates that users can customize and copy to their clipboard. The entire UI is in Swedish.

## Design Principles
- **Zero-learning curve:** The user should understand the app within 5 seconds.
- **3-tap flow:** Category → Situation → Copy message. Maximum 3 screens to reach the goal.
- **Mobile portrait (9:16), one-handed usage.**
- **iOS HIG alignment:** Clean typography, generous spacing, system-native feel.
- **No login, no cloud, no AI.** Pure local utility.

---

## Screen List

### Screen 1: Välj kategori (Home / Category Selection)
The home screen displays the app name/logo at the top and two large, tappable cards:
- **Inkasso** – with a brief subtitle: "Svar till inkassobolag"
- **Kronofogden** – with a brief subtitle: "Svar till Kronofogden"

Each card is a large rounded rectangle with an icon, the category title, and a short description. The cards fill most of the screen for easy one-handed tapping.

A small footer text: "Välj en kategori för att börja" (Choose a category to start).

### Screen 2: Välj situation (Situation Selection)
After tapping a category, the user sees a scrollable list of situations relevant to that category. Each situation is a list item (card style) with:
- A short Swedish title (e.g., "Begäran om specifikation av skuld")
- A chevron icon on the right indicating navigation

The screen has a back button and a header showing the selected category name.

### Screen 3: Meddelande (Message Template)
After tapping a situation, the user sees:
- The situation title at the top
- A text area displaying the full pre-written Swedish message
- Editable placeholder fields highlighted in a distinct color (e.g., [DITT NAMN], [ÄRENDENUMMER]) that the user can tap to fill in
- A large "Kopiera meddelande" (Copy message) button at the bottom
- After copying, a brief success toast/banner: "Kopierat!" (Copied!)

---

## Primary Content and Functionality

| Screen | Content | Functionality |
|--------|---------|---------------|
| Välj kategori | 2 category cards (Inkasso, Kronofogden) | Tap to navigate to situation list |
| Välj situation | Scrollable list of 10-20 situations per category | Tap to view message template |
| Meddelande | Full message template with editable fields | Fill placeholders, copy to clipboard |

---

## Key User Flows

### Flow 1: Copy a message (primary)
1. User opens app → sees two category cards
2. User taps "Inkasso" → sees list of situations
3. User taps "Begäran om specifikation av skuld" → sees message template
4. User fills in [DITT NAMN] and [ÄRENDENUMMER]
5. User taps "Kopiera meddelande" → message copied to clipboard
6. User pastes into email/SMS

### Flow 2: Browse and go back
1. User taps "Kronofogden" → sees situations
2. User scrolls through options
3. User taps back → returns to category selection
4. User taps "Inkasso" → sees different situations

---

## Color Choices

| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| primary | #1B4F72 | #5DADE2 | Deep Swedish blue – trust, authority |
| background | #F8F9FA | #121416 | Clean, neutral background |
| surface | #FFFFFF | #1C1F22 | Cards and elevated surfaces |
| foreground | #1A1A2E | #E8EAED | Primary text |
| muted | #6C757D | #9CA3AF | Secondary/helper text |
| border | #DEE2E6 | #374151 | Card borders, dividers |
| accent | #E74C3C | #FF6B6B | Placeholder highlights, important actions |
| success | #27AE60 | #4ADE80 | Copy success feedback |

The color palette is inspired by Swedish institutional design – authoritative blues paired with clean whites, conveying trust and professionalism.

---

## Navigation Structure
- **No tab bar needed.** The app uses a simple stack navigation:
  - Home (Category) → Situation List → Message Template
- Back navigation via header back button and swipe gesture.

---

## Typography
- Large, readable fonts (minimum 16px body text)
- Bold headings for category and situation titles
- Monospace-style rendering for the message template area to feel like a "document"
