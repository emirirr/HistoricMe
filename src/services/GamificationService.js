import AsyncStorage from '@react-native-async-storage/async-storage';
import HapticService from './HapticService';
import SoundService from './SoundService';

class GamificationService {
  static STORAGE_KEYS = {
    USER_LEVEL: 'user_level',
    USER_XP: 'user_xp',
    USER_BADGES: 'user_badges',
    DAILY_TASKS: 'daily_tasks',
    STREAK: 'user_streak',
    LAST_ACTIVITY: 'last_activity',
  };

  // XP values for different actions
  static XP_VALUES = {
    CREATE_IMAGE: 50,
    SHARE_IMAGE: 25,
    LIKE_IMAGE: 5,
    COMMENT_IMAGE: 10,
    DAILY_LOGIN: 20,
    COMPLETE_PROFILE: 100,
    FIRST_IMAGE: 200,
    LEVEL_UP: 0, // Special case
  };

  // Level requirements (XP needed for each level)
  static LEVEL_REQUIREMENTS = [
    0,    // Level 1
    100,  // Level 2
    250,  // Level 3
    450,  // Level 4
    700,  // Level 5
    1000, // Level 6
    1350, // Level 7
    1750, // Level 8
    2200, // Level 9
    2700, // Level 10
  ];

  // Badge definitions
  static BADGES = {
    FIRST_STEPS: {
      id: 'first_steps',
      name: 'İlk Adımlar',
      description: 'İlk fotoğrafınızı oluşturun',
      icon: 'footsteps',
      xpReward: 50,
      condition: (stats) => stats.totalCreations >= 1,
    },
    SOCIAL_BUTTERFLY: {
      id: 'social_butterfly',
      name: 'Sosyal Kelebek',
      description: '10 fotoğraf paylaşın',
      icon: 'share-social',
      xpReward: 100,
      condition: (stats) => stats.totalShares >= 10,
    },
    ARTIST: {
      id: 'artist',
      name: 'Sanatçı',
      description: '50 fotoğraf oluşturun',
      icon: 'brush',
      xpReward: 200,
      condition: (stats) => stats.totalCreations >= 50,
    },
    HISTORIAN: {
      id: 'historian',
      name: 'Tarihçi',
      description: 'Tüm tarihi dönemleri deneyin',
      icon: 'library',
      xpReward: 150,
      condition: (stats) => stats.erasUsed >= 5,
    },
    STREAK_MASTER: {
      id: 'streak_master',
      name: 'Seri Ustası',
      description: '7 gün üst üste giriş yapın',
      icon: 'flame',
      xpReward: 100,
      condition: (stats) => stats.currentStreak >= 7,
    },
  };

  // Get user level
  static async getUserLevel() {
    try {
      const level = await AsyncStorage.getItem(this.STORAGE_KEYS.USER_LEVEL);
      return level ? parseInt(level) : 1;
    } catch (error) {
      console.error('Error getting user level:', error);
      return 1;
    }
  }

  // Get user XP
  static async getUserXP() {
    try {
      const xp = await AsyncStorage.getItem(this.STORAGE_KEYS.USER_XP);
      return xp ? parseInt(xp) : 0;
    } catch (error) {
      console.error('Error getting user XP:', error);
      return 0;
    }
  }

  // Get user badges
  static async getUserBadges() {
    try {
      const badges = await AsyncStorage.getItem(this.STORAGE_KEYS.USER_BADGES);
      return badges ? JSON.parse(badges) : [];
    } catch (error) {
      console.error('Error getting user badges:', error);
      return [];
    }
  }

  // Add XP and check for level up
  static async addXP(action, amount = null) {
    try {
      const currentXP = await this.getUserXP();
      const currentLevel = await this.getUserLevel();
      
      const xpToAdd = amount || this.XP_VALUES[action] || 0;
      const newXP = currentXP + xpToAdd;
      
      // Save new XP
      await AsyncStorage.setItem(this.STORAGE_KEYS.USER_XP, newXP.toString());
      
      // Check for level up
      const newLevel = this.calculateLevel(newXP);
      if (newLevel > currentLevel) {
        await this.levelUp(newLevel, currentLevel);
        return { xp: newXP, level: newLevel, leveledUp: true };
      }
      
      return { xp: newXP, level: currentLevel, leveledUp: false };
    } catch (error) {
      console.error('Error adding XP:', error);
      return { xp: 0, level: 1, leveledUp: false };
    }
  }

  // Calculate level from XP
  static calculateLevel(xp) {
    for (let i = this.LEVEL_REQUIREMENTS.length - 1; i >= 0; i--) {
      if (xp >= this.LEVEL_REQUIREMENTS[i]) {
        return i + 1;
      }
    }
    return 1;
  }

  // Handle level up
  static async levelUp(newLevel, oldLevel) {
    try {
      await AsyncStorage.setItem(this.STORAGE_KEYS.USER_LEVEL, newLevel.toString());
      
      // Play level up effects
      HapticService.heavy();
      SoundService.playAchievement();
      
      // Add level up XP
      await this.addXP('LEVEL_UP', 0);
      
      return {
        newLevel,
        oldLevel,
        xpReward: 0,
        message: `Tebrikler! Seviye ${newLevel}'e yükseldiniz!`,
      };
    } catch (error) {
      console.error('Error leveling up:', error);
    }
  }

  // Check and award badges
  static async checkBadges(userStats) {
    try {
      const currentBadges = await this.getUserBadges();
      const newBadges = [];
      
      for (const badge of Object.values(this.BADGES)) {
        // Skip if already earned
        if (currentBadges.includes(badge.id)) continue;
        
        // Check if condition is met
        if (badge.condition(userStats)) {
          newBadges.push(badge);
          currentBadges.push(badge.id);
          
          // Award XP for badge
          await this.addXP('BADGE', badge.xpReward);
        }
      }
      
      // Save updated badges
      if (newBadges.length > 0) {
        await AsyncStorage.setItem(this.STORAGE_KEYS.USER_BADGES, JSON.stringify(currentBadges));
        
        // Play badge earned effects
        HapticService.success();
        SoundService.playAchievement();
      }
      
      return newBadges;
    } catch (error) {
      console.error('Error checking badges:', error);
      return [];
    }
  }

  // Get daily tasks
  static async getDailyTasks() {
    try {
      const today = new Date().toDateString();
      const stored = await AsyncStorage.getItem(this.STORAGE_KEYS.DAILY_TASKS);
      
      if (stored) {
        const data = JSON.parse(stored);
        if (data.date === today) {
          return data.tasks;
        }
      }
      
      // Generate new daily tasks
      const tasks = this.generateDailyTasks();
      await AsyncStorage.setItem(this.STORAGE_KEYS.DAILY_TASKS, JSON.stringify({
        date: today,
        tasks,
      }));
      
      return tasks;
    } catch (error) {
      console.error('Error getting daily tasks:', error);
      return [];
    }
  }

  // Generate daily tasks
  static generateDailyTasks() {
    return [
      {
        id: 'daily_login',
        title: 'Günlük Giriş',
        description: 'Uygulamaya giriş yapın',
        xpReward: 20,
        completed: false,
        type: 'login',
      },
      {
        id: 'create_image',
        title: 'Fotoğraf Oluştur',
        description: '1 adet AI fotoğraf oluşturun',
        xpReward: 50,
        completed: false,
        type: 'create',
      },
      {
        id: 'share_image',
        title: 'Paylaşım Yap',
        description: '1 fotoğraf paylaşın',
        xpReward: 25,
        completed: false,
        type: 'share',
      },
    ];
  }

  // Complete daily task
  static async completeDailyTask(taskId) {
    try {
      const tasks = await this.getDailyTasks();
      const task = tasks.find(t => t.id === taskId);
      
      if (task && !task.completed) {
        task.completed = true;
        
        // Save updated tasks
        const today = new Date().toDateString();
        await AsyncStorage.setItem(this.STORAGE_KEYS.DAILY_TASKS, JSON.stringify({
          date: today,
          tasks,
        }));
        
        // Award XP
        await this.addXP('DAILY_TASK', task.xpReward);
        
        // Play completion effects
        HapticService.medium();
        SoundService.playSuccess();
        
        return task;
      }
      
      return null;
    } catch (error) {
      console.error('Error completing daily task:', error);
      return null;
    }
  }

  // Get user streak
  static async getUserStreak() {
    try {
      const streak = await AsyncStorage.getItem(this.STORAGE_KEYS.STREAK);
      return streak ? parseInt(streak) : 0;
    } catch (error) {
      console.error('Error getting user streak:', error);
      return 0;
    }
  }

  // Update daily streak
  static async updateStreak() {
    try {
      const today = new Date().toDateString();
      const lastActivity = await AsyncStorage.getItem(this.STORAGE_KEYS.LAST_ACTIVITY);
      const currentStreak = await this.getUserStreak();
      
      if (lastActivity !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toDateString();
        
        let newStreak = 1;
        if (lastActivity === yesterdayString) {
          newStreak = currentStreak + 1;
        }
        
        await AsyncStorage.setItem(this.STORAGE_KEYS.STREAK, newStreak.toString());
        await AsyncStorage.setItem(this.STORAGE_KEYS.LAST_ACTIVITY, today);
        
        return newStreak;
      }
      
      return currentStreak;
    } catch (error) {
      console.error('Error updating streak:', error);
      return 0;
    }
  }

  // Get user stats
  static async getUserStats() {
    try {
      const level = await this.getUserLevel();
      const xp = await this.getUserXP();
      const badges = await this.getUserBadges();
      const streak = await this.getUserStreak();
      const tasks = await this.getDailyTasks();
      
      return {
        level,
        xp,
        badges,
        streak,
        tasks,
        nextLevelXP: this.LEVEL_REQUIREMENTS[level] || this.LEVEL_REQUIREMENTS[this.LEVEL_REQUIREMENTS.length - 1],
        currentLevelXP: this.LEVEL_REQUIREMENTS[level - 1] || 0,
      };
    } catch (error) {
      console.error('Error getting user stats:', error);
      return {
        level: 1,
        xp: 0,
        badges: [],
        streak: 0,
        tasks: [],
        nextLevelXP: 100,
        currentLevelXP: 0,
      };
    }
  }
}

export default GamificationService;
