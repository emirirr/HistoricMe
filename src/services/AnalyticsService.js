import AsyncStorage from '@react-native-async-storage/async-storage';

class AnalyticsService {
  static STORAGE_KEYS = {
    USER_ANALYTICS: 'user_analytics',
    APP_ANALYTICS: 'app_analytics',
    SESSION_DATA: 'session_data',
    CRASH_REPORTS: 'crash_reports',
    PERFORMANCE_METRICS: 'performance_metrics',
  };

  // Track user event
  static async trackEvent(eventName, properties = {}) {
    try {
      const timestamp = new Date().toISOString();
      const event = {
        name: eventName,
        properties,
        timestamp,
        sessionId: await this.getSessionId(),
      };

      // Store event
      await this.storeEvent(event);

      // Update user analytics
      await this.updateUserAnalytics(eventName, properties);

      console.log('Event tracked:', eventName, properties);
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }

  // Track screen view
  static async trackScreenView(screenName, properties = {}) {
    try {
      await this.trackEvent('screen_view', {
        screen_name: screenName,
        ...properties,
      });

      // Update session data
      await this.updateSessionData('current_screen', screenName);
    } catch (error) {
      console.error('Error tracking screen view:', error);
    }
  }

  // Track user action
  static async trackUserAction(action, target, properties = {}) {
    try {
      await this.trackEvent('user_action', {
        action,
        target,
        ...properties,
      });
    } catch (error) {
      console.error('Error tracking user action:', error);
    }
  }

  // Track AI generation
  static async trackAIGeneration(properties = {}) {
    try {
      await this.trackEvent('ai_generation', {
        ...properties,
      });
    } catch (error) {
      console.error('Error tracking AI generation:', error);
    }
  }

  // Track payment
  static async trackPayment(properties = {}) {
    try {
      await this.trackEvent('payment', {
        ...properties,
      });
    } catch (error) {
      console.error('Error tracking payment:', error);
    }
  }

  // Track error
  static async trackError(error, context = {}) {
    try {
      const errorEvent = {
        name: 'error',
        properties: {
          error_message: error.message,
          error_stack: error.stack,
          context,
        },
        timestamp: new Date().toISOString(),
        sessionId: await this.getSessionId(),
      };

      await this.storeEvent(errorEvent);
      await this.storeCrashReport(errorEvent);
    } catch (err) {
      console.error('Error tracking error:', err);
    }
  }

  // Track performance
  static async trackPerformance(metricName, value, properties = {}) {
    try {
      await this.trackEvent('performance', {
        metric_name: metricName,
        value,
        ...properties,
      });

      // Store performance metric
      await this.storePerformanceMetric(metricName, value, properties);
    } catch (error) {
      console.error('Error tracking performance:', error);
    }
  }

  // Get session ID
  static async getSessionId() {
    try {
      let sessionId = await AsyncStorage.getItem('session_id');
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        await AsyncStorage.setItem('session_id', sessionId);
      }
      return sessionId;
    } catch (error) {
      console.error('Error getting session ID:', error);
      return `session_${Date.now()}`;
    }
  }

  // Store event
  static async storeEvent(event) {
    try {
      const events = await AsyncStorage.getItem('analytics_events');
      const allEvents = events ? JSON.parse(events) : [];
      
      allEvents.push(event);
      
      // Keep only last 1000 events
      if (allEvents.length > 1000) {
        allEvents.splice(0, allEvents.length - 1000);
      }
      
      await AsyncStorage.setItem('analytics_events', JSON.stringify(allEvents));
    } catch (error) {
      console.error('Error storing event:', error);
    }
  }

  // Update user analytics
  static async updateUserAnalytics(eventName, properties) {
    try {
      const analytics = await AsyncStorage.getItem(this.STORAGE_KEYS.USER_ANALYTICS);
      const userAnalytics = analytics ? JSON.parse(analytics) : {
        totalEvents: 0,
        eventCounts: {},
        firstEvent: new Date().toISOString(),
        lastEvent: new Date().toISOString(),
        sessions: [],
        screenViews: {},
        userActions: {},
        aiGenerations: 0,
        payments: 0,
        errors: 0,
      };

      // Update basic stats
      userAnalytics.totalEvents += 1;
      userAnalytics.lastEvent = new Date().toISOString();
      userAnalytics.eventCounts[eventName] = (userAnalytics.eventCounts[eventName] || 0) + 1;

      // Update specific metrics
      switch (eventName) {
        case 'screen_view':
          const screenName = properties.screen_name;
          userAnalytics.screenViews[screenName] = (userAnalytics.screenViews[screenName] || 0) + 1;
          break;
        case 'user_action':
          const action = properties.action;
          userAnalytics.userActions[action] = (userAnalytics.userActions[action] || 0) + 1;
          break;
        case 'ai_generation':
          userAnalytics.aiGenerations += 1;
          break;
        case 'payment':
          userAnalytics.payments += 1;
          break;
        case 'error':
          userAnalytics.errors += 1;
          break;
      }

      await AsyncStorage.setItem(this.STORAGE_KEYS.USER_ANALYTICS, JSON.stringify(userAnalytics));
    } catch (error) {
      console.error('Error updating user analytics:', error);
    }
  }

  // Update session data
  static async updateSessionData(key, value) {
    try {
      const sessionData = await AsyncStorage.getItem(this.STORAGE_KEYS.SESSION_DATA);
      const data = sessionData ? JSON.parse(sessionData) : {};
      
      data[key] = value;
      data.lastUpdated = new Date().toISOString();
      
      await AsyncStorage.setItem(this.STORAGE_KEYS.SESSION_DATA, JSON.stringify(data));
    } catch (error) {
      console.error('Error updating session data:', error);
    }
  }

  // Store crash report
  static async storeCrashReport(errorEvent) {
    try {
      const crashes = await AsyncStorage.getItem(this.STORAGE_KEYS.CRASH_REPORTS);
      const allCrashes = crashes ? JSON.parse(crashes) : [];
      
      allCrashes.push(errorEvent);
      
      // Keep only last 50 crash reports
      if (allCrashes.length > 50) {
        allCrashes.splice(0, allCrashes.length - 50);
      }
      
      await AsyncStorage.setItem(this.STORAGE_KEYS.CRASH_REPORTS, JSON.stringify(allCrashes));
    } catch (error) {
      console.error('Error storing crash report:', error);
    }
  }

  // Store performance metric
  static async storePerformanceMetric(metricName, value, properties) {
    try {
      const metrics = await AsyncStorage.getItem(this.STORAGE_KEYS.PERFORMANCE_METRICS);
      const allMetrics = metrics ? JSON.parse(metrics) : {};
      
      if (!allMetrics[metricName]) {
        allMetrics[metricName] = [];
      }
      
      allMetrics[metricName].push({
        value,
        properties,
        timestamp: new Date().toISOString(),
      });
      
      // Keep only last 100 metrics per type
      if (allMetrics[metricName].length > 100) {
        allMetrics[metricName].splice(0, allMetrics[metricName].length - 100);
      }
      
      await AsyncStorage.setItem(this.STORAGE_KEYS.PERFORMANCE_METRICS, JSON.stringify(allMetrics));
    } catch (error) {
      console.error('Error storing performance metric:', error);
    }
  }

  // Get user analytics
  static async getUserAnalytics() {
    try {
      const analytics = await AsyncStorage.getItem(this.STORAGE_KEYS.USER_ANALYTICS);
      return analytics ? JSON.parse(analytics) : null;
    } catch (error) {
      console.error('Error getting user analytics:', error);
      return null;
    }
  }

  // Get app analytics
  static async getAppAnalytics() {
    try {
      const analytics = await AsyncStorage.getItem(this.STORAGE_KEYS.APP_ANALYTICS);
      return analytics ? JSON.parse(analytics) : null;
    } catch (error) {
      console.error('Error getting app analytics:', error);
      return null;
    }
  }

  // Get session data
  static async getSessionData() {
    try {
      const data = await AsyncStorage.getItem(this.STORAGE_KEYS.SESSION_DATA);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error getting session data:', error);
      return {};
    }
  }

  // Get crash reports
  static async getCrashReports() {
    try {
      const crashes = await AsyncStorage.getItem(this.STORAGE_KEYS.CRASH_REPORTS);
      return crashes ? JSON.parse(crashes) : [];
    } catch (error) {
      console.error('Error getting crash reports:', error);
      return [];
    }
  }

  // Get performance metrics
  static async getPerformanceMetrics() {
    try {
      const metrics = await AsyncStorage.getItem(this.STORAGE_KEYS.PERFORMANCE_METRICS);
      return metrics ? JSON.parse(metrics) : {};
    } catch (error) {
      console.error('Error getting performance metrics:', error);
      return {};
    }
  }

  // Get analytics summary
  static async getAnalyticsSummary() {
    try {
      const userAnalytics = await this.getUserAnalytics();
      const sessionData = await this.getSessionData();
      const crashReports = await this.getCrashReports();
      const performanceMetrics = await this.getPerformanceMetrics();

      if (!userAnalytics) {
        return {
          hasData: false,
          message: 'Henüz analitik veri yok',
        };
      }

      const summary = {
        hasData: true,
        user: {
          totalEvents: userAnalytics.totalEvents,
          aiGenerations: userAnalytics.aiGenerations,
          payments: userAnalytics.payments,
          errors: userAnalytics.errors,
          mostUsedScreen: this.getMostUsedScreen(userAnalytics.screenViews),
          mostUsedAction: this.getMostUsedAction(userAnalytics.userActions),
        },
        session: {
          currentScreen: sessionData.current_screen,
          lastUpdated: sessionData.lastUpdated,
        },
        performance: {
          averageLoadTime: this.getAveragePerformance(performanceMetrics, 'load_time'),
          averageGenerationTime: this.getAveragePerformance(performanceMetrics, 'generation_time'),
        },
        crashes: {
          total: crashReports.length,
          recent: crashReports.slice(-5),
        },
        insights: this.generateInsights(userAnalytics, performanceMetrics),
      };

      return summary;
    } catch (error) {
      console.error('Error getting analytics summary:', error);
      return {
        hasData: false,
        message: 'Analitik veriler alınırken hata oluştu',
      };
    }
  }

  // Helper: Get most used screen
  static getMostUsedScreen(screenViews) {
    if (!screenViews || Object.keys(screenViews).length === 0) {
      return null;
    }

    return Object.entries(screenViews).reduce((a, b) => 
      screenViews[a[0]] > screenViews[b[0]] ? a : b
    )[0];
  }

  // Helper: Get most used action
  static getMostUsedAction(userActions) {
    if (!userActions || Object.keys(userActions).length === 0) {
      return null;
    }

    return Object.entries(userActions).reduce((a, b) => 
      userActions[a[0]] > userActions[b[0]] ? a : b
    )[0];
  }

  // Helper: Get average performance
  static getAveragePerformance(metrics, metricName) {
    if (!metrics[metricName] || metrics[metricName].length === 0) {
      return 0;
    }

    const values = metrics[metricName].map(m => m.value);
    return values.reduce((a, b) => a + b, 0) / values.length;
  }

  // Helper: Generate insights
  static generateInsights(userAnalytics, performanceMetrics) {
    const insights = [];

    // Usage insights
    if (userAnalytics.aiGenerations > 10) {
      insights.push({
        type: 'usage',
        message: 'Çok aktif bir kullanıcısınız!',
        icon: 'star',
      });
    }

    if (userAnalytics.aiGenerations === 0) {
      insights.push({
        type: 'suggestion',
        message: 'İlk AI fotoğrafınızı oluşturmayı deneyin!',
        icon: 'camera',
      });
    }

    // Performance insights
    const avgGenerationTime = this.getAveragePerformance(performanceMetrics, 'generation_time');
    if (avgGenerationTime > 10000) {
      insights.push({
        type: 'performance',
        message: 'AI işleme süreniz ortalamadan yüksek',
        icon: 'time',
      });
    }

    // Error insights
    if (userAnalytics.errors > 5) {
      insights.push({
        type: 'error',
        message: 'Son zamanlarda birkaç hata yaşadınız',
        icon: 'warning',
      });
    }

    return insights;
  }

  // Clear analytics data
  static async clearAnalyticsData() {
    try {
      await AsyncStorage.removeItem(this.STORAGE_KEYS.USER_ANALYTICS);
      await AsyncStorage.removeItem(this.STORAGE_KEYS.APP_ANALYTICS);
      await AsyncStorage.removeItem(this.STORAGE_KEYS.SESSION_DATA);
      await AsyncStorage.removeItem(this.STORAGE_KEYS.CRASH_REPORTS);
      await AsyncStorage.removeItem(this.STORAGE_KEYS.PERFORMANCE_METRICS);
      await AsyncStorage.removeItem('analytics_events');
      await AsyncStorage.removeItem('session_id');
      
      return true;
    } catch (error) {
      console.error('Error clearing analytics data:', error);
      return false;
    }
  }

  // Export analytics data
  static async exportAnalyticsData() {
    try {
      const userAnalytics = await this.getUserAnalytics();
      const sessionData = await this.getSessionData();
      const crashReports = await this.getCrashReports();
      const performanceMetrics = await this.getPerformanceMetrics();
      const events = await AsyncStorage.getItem('analytics_events');
      const allEvents = events ? JSON.parse(events) : [];

      const exportData = {
        userAnalytics,
        sessionData,
        crashReports,
        performanceMetrics,
        events: allEvents,
        exportedAt: new Date().toISOString(),
        version: '1.0.0',
      };

      return exportData;
    } catch (error) {
      console.error('Error exporting analytics data:', error);
      return null;
    }
  }
}

export default AnalyticsService;
