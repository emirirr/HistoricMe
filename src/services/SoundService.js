import { Audio } from 'expo-audio';

class SoundService {
  static sounds = {};
  static isEnabled = true;

  // Initialize sounds
  static async initialize() {
    try {
      // For now, we'll skip sound loading since files don't exist
      // This prevents the app from crashing while we can add sounds later
      console.log('Sound service initialized (no sound files loaded)');
      
      // TODO: Add actual sound files to src/assets/sounds/ directory
      // and uncomment the following lines:
      
      // // Success sound
      // this.sounds.success = await Audio.Sound.createAsync(require('../assets/sounds/success.mp3'));

      // // Error sound
      // this.sounds.error = await Audio.Sound.createAsync(require('../assets/sounds/error.mp3'));

      // // Button click sound
      // this.sounds.click = await Audio.Sound.createAsync(require('../assets/sounds/click.mp3'));

      // // Notification sound
      // this.sounds.notification = await Audio.Sound.createAsync(require('../assets/sounds/notification.mp3'));

      // // Achievement sound
      // this.sounds.achievement = await Audio.Sound.createAsync(require('../assets/sounds/achievement.mp3'));
    } catch (error) {
      console.log('Sound initialization failed:', error);
    }
  }

  // Play success sound
  static async playSuccess() {
    if (!this.isEnabled) return;
    try {
      await this.sounds.success?.sound?.replayAsync();
    } catch (error) {
      console.log('Success sound failed:', error);
    }
  }

  // Play error sound
  static async playError() {
    if (!this.isEnabled) return;
    try {
      await this.sounds.error?.sound?.replayAsync();
    } catch (error) {
      console.log('Error sound failed:', error);
    }
  }

  // Play button click sound
  static async playClick() {
    if (!this.isEnabled) return;
    try {
      await this.sounds.click?.sound?.replayAsync();
    } catch (error) {
      console.log('Click sound failed:', error);
    }
  }

  // Play notification sound
  static async playNotification() {
    if (!this.isEnabled) return;
    try {
      await this.sounds.notification?.sound?.replayAsync();
    } catch (error) {
      console.log('Notification sound failed:', error);
    }
  }

  // Play achievement sound
  static async playAchievement() {
    if (!this.isEnabled) return;
    try {
      await this.sounds.achievement?.sound?.replayAsync();
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
        if (sound?.sound) {
          await sound.sound.unloadAsync();
        }
      }
      this.sounds = {};
    } catch (error) {
      console.log('Sound cleanup failed:', error);
    }
  }
}

export default SoundService;
