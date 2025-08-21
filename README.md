
# TASK-WAN

**TASK-WAN** is a modern, cross-platform task manager app built with React Native and Expo (bare workflow). The UI is based on a Figma design by Hub Academy. This project is part of my portfolio to showcase my skills as a React Native developer.

---

## ✨ Features

- Beautiful, responsive UI (Figma by Hub Academy)
- Task management: create, update, delete, and organize tasks
- Authentication and user management (Supabase)
- Real-time sync and offline support (PowerSync)
- State management with Redux
- Navigation with Expo Router (file-based routing)
- Cross-platform: iOS, Android

---

## 🛠️ Tech Stack

- **React Native** (Expo Continuous Native Generation (CNG))
- **EAS Build** for building native apps
- **Expo Router** for navigation
- **Redux** for state management
- **PowerSync** for real-time/offline data sync
- **Supabase** for backend/auth
- **Gluestack** for UI components
- **Jest** for testing
- **Maestro** for end-to-end testing
- **Storybook** for UI component development
- **TypeScript**

---

## 🚀 Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/nyplex/task-wan.git
   cd task-wan
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the app:**
   ```bash
   npx expo start
   ```

4. **Run on device/emulator:**
   - This project uses native code and cannot run in Expo Go.
   - Run the following steps:
     1. Prebuild native code:
        ```bash
        npx expo prebuild
        ```
     2. Build the app on EAS servers:
        ```bash
        npx eas build --profile [see profile in eas.json] --platform ios # or android
        ```
     3. Download and install the build on your device or simulator.
     4. Start the development server:
        ```bash
        npx expo start
        ```

---

## 🗂️ Project Structure

- `__mocks__/` — Mock data for testing
- `.eas/` — EAS workflows
- `.github/` — GitHub Actions workflows
- `.rnstorybook/` — Storybook configuration + stories
- `app/` — App entry and screens (Expo Router)
- `assets/` — Images and other static assets
- `components/` — Reusable UI components
- `context/` — Context providers for global state
- `features/` — Feature-specific screens, components, and logic
- `gluestack-ui/` — Gluestack UI components
- `hooks/` — Global custom hooks
- `lib/` — Utility functions and libraries
- `maestro/` — End-to-end tests
- `plugins/` — Custom Expo plugins
- `poweersync/` — PowerSync configuration
- `redux/` — Redux store and global slices
- `types/` — Global TypeScript types
- `utils/` — Utility functions
- `app.config.ts` — Expo app configuration
- `app.json` — Expo app manifest
- `eas.json` — EAS build configuration

---

## 🧑‍🎨 Credits

- **UI Design:** [Hub Academy](https://hubacademy.io/) (Figma)
- **Development:** [@nyplex](https://github.com/nyplex)

---

## 📣 About

This project was built to demonstrate my ability to deliver a production-ready, full-stack React Native app using modern tools and best practices. If you’re hiring for a React Native developer, I’d love to chat!

---

## 📄 License

Creative Commons Non-Commercial (CC BY-NC)
- Allows copying, modifying and merging. 
- No commercial use allowed.
- Must credit the original creator.