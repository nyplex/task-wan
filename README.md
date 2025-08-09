
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

- **React Native** (Expo bare workflow)
- **Expo Router** for navigation
- **Redux** for state management
- **PowerSync** for real-time/offline data sync
- **Supabase** for backend/auth
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

- `app/` — App entry and screens (Expo Router)
- `components/` — Reusable UI components
- `context/` — React context providers
- `redux/` — Redux store, slices, and middleware
- `powersync/` — PowerSync integration
- `lib/` — Supabase and other libraries
- `assets/` — Fonts and images
- `types/` — TypeScript types
- `utils/` — Utility functions

---

## 🧑‍🎨 Credits

- **UI Design:** [Hub Academy](https://hubacademy.io/) (Figma)
- **Development:** [@nyplex](https://github.com/nyplex)

---

## 📣 About

This project was built to demonstrate my ability to deliver a production-ready, full-stack React Native app using modern tools and best practices. If you’re hiring for a React Native developer, I’d love to chat!

---

## 📄 License

MIT
