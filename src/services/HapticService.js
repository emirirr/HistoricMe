import * as Haptics from 'expo-haptics';

class HapticService {
  // Light haptic feedback for subtle interactions
  static light() {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      console.log('Haptic feedback not available');
    }
  }

  // Medium haptic feedback for standard interactions
  static medium() {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      console.log('Haptic feedback not available');
    }
  }

  // Heavy haptic feedback for important interactions
  static heavy() {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch (error) {
      console.log('Haptic feedback not available');
    }
  }

  // Success haptic feedback
  static success() {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.log('Haptic feedback not available');
    }
  }

  // Warning haptic feedback
  static warning() {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } catch (error) {
      console.log('Haptic feedback not available');
    }
  }

  // Error haptic feedback
  static error() {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } catch (error) {
      console.log('Haptic feedback not available');
    }
  }

  // Selection haptic feedback
  static selection() {
    try {
      Haptics.selectionAsync();
    } catch (error) {
      console.log('Haptic feedback not available');
    }
  }

  // Custom haptic patterns
  static doubleTap() {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setTimeout(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }, 100);
    } catch (error) {
      console.log('Haptic feedback not available');
    }
  }

  static longPress() {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch (error) {
      console.log('Haptic feedback not available');
    }
  }
}

export default HapticService;
