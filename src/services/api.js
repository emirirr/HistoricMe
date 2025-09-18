// API servis dosyası - HistoricMe backend entegrasyonu için

const API_BASE_URL = 'https://api.historicme.com';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Auth token'ı al - Clerk hook'u kullanarak
  async getAuthToken() {
    try {
      // Clerk'ten token al
      const { getToken } = await import('@clerk/clerk-expo');
      const token = await getToken();
      return token;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }

  // Generic API request
  async request(endpoint, options = {}) {
    const token = await this.getAuthToken();
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Kullanıcı istatistikleri
  async getUserStats(userId) {
    return this.request(`/users/${userId}/stats`);
  }

  // Kullanıcı geçmişi
  async getUserHistory(userId, page = 1, limit = 20) {
    return this.request(`/users/${userId}/history?page=${page}&limit=${limit}`);
  }

  // Görsel oluştur
  async createImage(userId, imageData) {
    return this.request(`/users/${userId}/images`, {
      method: 'POST',
      body: JSON.stringify(imageData),
    });
  }

  // Görsel sil
  async deleteImage(userId, imageId) {
    return this.request(`/users/${userId}/images/${imageId}`, {
      method: 'DELETE',
    });
  }

  // Tarihi figürler listesi
  async getHistoricalFigures(era = null, page = 1, limit = 50) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(era && { era }),
    });
    
    return this.request(`/historical-figures?${params}`);
  }

  // Kullanıcı profilini güncelle
  async updateUserProfile(userId, profileData) {
    return this.request(`/users/${userId}/profile`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Görsel paylaş
  async shareImage(userId, imageId, platform) {
    return this.request(`/users/${userId}/images/${imageId}/share`, {
      method: 'POST',
      body: JSON.stringify({ platform }),
    });
  }

  // Görsel beğen
  async likeImage(userId, imageId) {
    return this.request(`/users/${userId}/images/${imageId}/like`, {
      method: 'POST',
    });
  }

  // Görsel beğeniyi kaldır
  async unlikeImage(userId, imageId) {
    return this.request(`/users/${userId}/images/${imageId}/like`, {
      method: 'DELETE',
    });
  }
}

// Singleton instance
const apiService = new ApiService();

export default apiService;

// Kullanım örnekleri:
/*
// Kullanıcı istatistikleri
const stats = await apiService.getUserStats(userId);

// Kullanıcı geçmişi
const history = await apiService.getUserHistory(userId, 1, 20);

// Görsel oluştur
const newImage = await apiService.createImage(userId, {
  originalImage: 'base64...',
  historicalFigureId: 'figure123',
  style: 'realistic'
});

// Tarihi figürler
const figures = await apiService.getHistoricalFigures('osmanli', 1, 50);
*/
