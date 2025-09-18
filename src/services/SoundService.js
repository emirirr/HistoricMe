import { Audio } from 'expo-av';

class SoundService {
  static sounds = {};
  static isEnabled = true;

  // Initialize sounds
  static async initialize() {
    try {
      // Success sound
      this.sounds.success = new Audio.Sound();
      await this.sounds.success.loadAsync(require('../assets/sounds/success.mp3'));

      // Error sound
      this.sounds.error = new Audio.Sound();
      await this.sounds.error.loadAsync(require('../assets/sounds/error.mp3'));

      // Button click sound
      this.sounds.click = new Audio.Sound();
      await this.sounds.click.loadAsync(require('../assets/sounds/click.mp3'));

      // Notification sound
      this.sounds.notification = new Audio.Sound();
      await this.sounds.notification.loadAsync(require('../assets/sounds/notification.mp3'));

      // Achievement sound
      this.sounds.achievement = new Audio.Sound();
      await this.sounds.achievement.loadAsync(require('../assets/sounds/achievement.mp3'));
    } catch (error) {
      console.log('Sound initialization failed:', error);
    }
  }

  // Play success sound
  static async playSuccess() {
    if (!this.isEnabled) return;
    try {
      await this.sounds.success?.replayAsync();
    } catch (error) {
      console.log('Success sound failed:', error);
    }
  }

  // Play error sound
  static async playError() {
    if (!this.isEnabled) return;
    try {
      await this.sounds.error?.replayAsync();
    } catch (error) {
      console.log('Error sound failed:', error);
    }
  }

  // Play button click sound
  static async playClick() {
    if (!this.isEnabled) return;
    try {
      await this.sounds.click?.replayAsync();
    } catch (error) {
      console.log('Click sound failed:', error);
    }
  }

  // Play notification sound
  static async playNotification() {
    if (!this.isEnabled) return;
    try {
      await this.sounds.notification?.replayAsync();
    } catch (error) {
      console.log('Notification sound failed:', error);
    }
  }

  // Play achievement sound
  static async playAchievement() {
    if (!this.isEnabled) return;
    try {
      await this.sounds.achievement?.replayAsync();
    } catch (error) {
      console.log('Achievement sound failed:', error);
    }
  }

  // Toggle sound on/off
  static toggleSound() {
    this.isEnabled = !this.isEnabled;
    return this.isEnabled;
  }

  // Set sound enabled/disabled
  static setSoundEnabled(enabled) {
    this.isEnabled = enabled;
  }

  // Cleanup sounds
  static async cleanup() {
    try {
      for (const sound of Object.values(this.sounds)) {
        if (sound) {
          await sound.unloadAsync();
        }
      }
      this.sounds = {};
    } catch (error) {
      console.log('Sound cleanup failed:', error);
    }
  }
}

export default SoundService;
