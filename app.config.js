export default {
  expo: {
    name: "HistoricMe",
    slug: "historicme",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    icon: "./assets/ico.png",
    splash: {
      image: "./assets/ico.png",
      resizeMode: "contain",
      backgroundColor: "#386160"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    web: {
      bundler: "metro"
    },
    plugins: [
      "expo-font",
      "expo-camera",
      "expo-image-picker"
    ],
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.historicme.app",
      newArchEnabled: true
    },
    android: {
      icon: "./assets/ico.png",
      adaptiveIcon: {
        foregroundImage: "./assets/ico.png",
        backgroundColor: "#386160"
      },
      package: "com.historicme.app",
      newArchEnabled: true
    },
    extra: {
      clerkPublishableKey: "pk_test_dmFsdWVkLXJlZGZpc2gtNzMuY2xlcmsuYWNjb3VudHMuZGV2JA"
    },
    scheme: "Rhistoricme"
  }
};
