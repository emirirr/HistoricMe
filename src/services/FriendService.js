import AsyncStorage from '@react-native-async-storage/async-storage';

class FriendService {
  static STORAGE_KEYS = {
    FRIENDS: 'user_friends',
    FOLLOWERS: 'user_followers',
    FOLLOWING: 'user_following',
    FRIEND_REQUESTS: 'friend_requests',
    BLOCKED_USERS: 'blocked_users',
  };

  // Mock user data (in real app, this would come from API)
  static MOCK_USERS = [
    {
      id: '1',
      username: 'tarih_sever',
      displayName: 'Tarih Sever',
      avatar: null,
      level: 5,
      totalCreations: 23,
      isOnline: true,
      lastSeen: new Date().toISOString(),
      bio: 'Tarihi figürlerle ilgileniyorum',
      joinDate: '2024-01-15',
    },
    {
      id: '2',
      username: 'osmanli_asker',
      displayName: 'Osmanlı Askeri',
      avatar: null,
      level: 8,
      totalCreations: 45,
      isOnline: false,
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      bio: 'Osmanlı tarihine hayranım',
      joinDate: '2024-01-10',
    },
    {
      id: '3',
      username: 'sanat_ci',
      displayName: 'Sanatçı',
      avatar: null,
      level: 12,
      totalCreations: 78,
      isOnline: true,
      lastSeen: new Date().toISOString(),
      bio: 'AI sanatı ile ilgileniyorum',
      joinDate: '2024-01-05',
    },
    {
      id: '4',
      username: 'tarih_ogretmeni',
      displayName: 'Tarih Öğretmeni',
      avatar: null,
      level: 15,
      totalCreations: 120,
      isOnline: false,
      lastSeen: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      bio: 'Tarih öğretmeniyim, öğrencilerime örnek oluyorum',
      joinDate: '2023-12-20',
    },
  ];

  // Get friends list
  static async getFriends() {
    try {
      const friends = await AsyncStorage.getItem(this.STORAGE_KEYS.FRIENDS);
      return friends ? JSON.parse(friends) : [];
    } catch (error) {
      console.error('Error getting friends:', error);
      return [];
    }
  }

  // Get followers list
  static async getFollowers() {
    try {
      const followers = await AsyncStorage.getItem(this.STORAGE_KEYS.FOLLOWERS);
      return followers ? JSON.parse(followers) : [];
    } catch (error) {
      console.error('Error getting followers:', error);
      return [];
    }
  }

  // Get following list
  static async getFollowing() {
    try {
      const following = await AsyncStorage.getItem(this.STORAGE_KEYS.FOLLOWING);
      return following ? JSON.parse(following) : [];
    } catch (error) {
      console.error('Error getting following:', error);
      return [];
    }
  }

  // Get friend requests
  static async getFriendRequests() {
    try {
      const requests = await AsyncStorage.getItem(this.STORAGE_KEYS.FRIEND_REQUESTS);
      return requests ? JSON.parse(requests) : [];
    } catch (error) {
      console.error('Error getting friend requests:', error);
      return [];
    }
  }

  // Search users
  static async searchUsers(query) {
    try {
      // In real app, this would be an API call
      const filteredUsers = this.MOCK_USERS.filter(user =>
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.displayName.toLowerCase().includes(query.toLowerCase())
      );
      
      return filteredUsers;
    } catch (error) {
      console.error('Error searching users:', error);
      return [];
    }
  }

  // Send friend request
  static async sendFriendRequest(userId) {
    try {
      const requests = await this.getFriendRequests();
      const user = this.MOCK_USERS.find(u => u.id === userId);
      
      if (user && !requests.find(r => r.id === userId)) {
        const newRequest = {
          id: userId,
          username: user.username,
          displayName: user.displayName,
          avatar: user.avatar,
          level: user.level,
          sentAt: new Date().toISOString(),
          status: 'pending',
        };
        
        requests.push(newRequest);
        await AsyncStorage.setItem(this.STORAGE_KEYS.FRIEND_REQUESTS, JSON.stringify(requests));
        
        return newRequest;
      }
      
      return null;
    } catch (error) {
      console.error('Error sending friend request:', error);
      return null;
    }
  }

  // Accept friend request
  static async acceptFriendRequest(userId) {
    try {
      const requests = await this.getFriendRequests();
      const friends = await this.getFriends();
      const following = await this.getFollowing();
      
      const request = requests.find(r => r.id === userId);
      if (request) {
        // Add to friends
        friends.push({
          id: userId,
          username: request.username,
          displayName: request.displayName,
          avatar: request.avatar,
          level: request.level,
          addedAt: new Date().toISOString(),
        });
        
        // Add to following
        following.push(userId);
        
        // Remove from requests
        const updatedRequests = requests.filter(r => r.id !== userId);
        
        // Save all changes
        await AsyncStorage.setItem(this.STORAGE_KEYS.FRIENDS, JSON.stringify(friends));
        await AsyncStorage.setItem(this.STORAGE_KEYS.FOLLOWING, JSON.stringify(following));
        await AsyncStorage.setItem(this.STORAGE_KEYS.FRIEND_REQUESTS, JSON.stringify(updatedRequests));
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error accepting friend request:', error);
      return false;
    }
  }

  // Reject friend request
  static async rejectFriendRequest(userId) {
    try {
      const requests = await this.getFriendRequests();
      const updatedRequests = requests.filter(r => r.id !== userId);
      
      await AsyncStorage.setItem(this.STORAGE_KEYS.FRIEND_REQUESTS, JSON.stringify(updatedRequests));
      return true;
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      return false;
    }
  }

  // Follow user
  static async followUser(userId) {
    try {
      const following = await this.getFollowing();
      const user = this.MOCK_USERS.find(u => u.id === userId);
      
      if (user && !following.includes(userId)) {
        following.push(userId);
        await AsyncStorage.setItem(this.STORAGE_KEYS.FOLLOWING, JSON.stringify(following));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error following user:', error);
      return false;
    }
  }

  // Unfollow user
  static async unfollowUser(userId) {
    try {
      const following = await this.getFollowing();
      const friends = await this.getFriends();
      
      // Remove from following
      const updatedFollowing = following.filter(id => id !== userId);
      
      // Remove from friends if exists
      const updatedFriends = friends.filter(f => f.id !== userId);
      
      await AsyncStorage.setItem(this.STORAGE_KEYS.FOLLOWING, JSON.stringify(updatedFollowing));
      await AsyncStorage.setItem(this.STORAGE_KEYS.FRIENDS, JSON.stringify(updatedFriends));
      
      return true;
    } catch (error) {
      console.error('Error unfollowing user:', error);
      return false;
    }
  }

  // Block user
  static async blockUser(userId) {
    try {
      const blocked = await this.getBlockedUsers();
      const friends = await this.getFriends();
      const following = await this.getFollowing();
      
      // Add to blocked
      if (!blocked.includes(userId)) {
        blocked.push(userId);
      }
      
      // Remove from friends and following
      const updatedFriends = friends.filter(f => f.id !== userId);
      const updatedFollowing = following.filter(id => id !== userId);
      
      await AsyncStorage.setItem(this.STORAGE_KEYS.BLOCKED_USERS, JSON.stringify(blocked));
      await AsyncStorage.setItem(this.STORAGE_KEYS.FRIENDS, JSON.stringify(updatedFriends));
      await AsyncStorage.setItem(this.STORAGE_KEYS.FOLLOWING, JSON.stringify(updatedFollowing));
      
      return true;
    } catch (error) {
      console.error('Error blocking user:', error);
      return false;
    }
  }

  // Unblock user
  static async unblockUser(userId) {
    try {
      const blocked = await this.getBlockedUsers();
      const updatedBlocked = blocked.filter(id => id !== userId);
      
      await AsyncStorage.setItem(this.STORAGE_KEYS.BLOCKED_USERS, JSON.stringify(updatedBlocked));
      return true;
    } catch (error) {
      console.error('Error unblocking user:', error);
      return false;
    }
  }

  // Get blocked users
  static async getBlockedUsers() {
    try {
      const blocked = await AsyncStorage.getItem(this.STORAGE_KEYS.BLOCKED_USERS);
      return blocked ? JSON.parse(blocked) : [];
    } catch (error) {
      console.error('Error getting blocked users:', error);
      return [];
    }
  }

  // Get user profile
  static async getUserProfile(userId) {
    try {
      const user = this.MOCK_USERS.find(u => u.id === userId);
      if (!user) return null;
      
      const friends = await this.getFriends();
      const following = await this.getFollowing();
      const followers = await this.getFollowers();
      
      return {
        ...user,
        isFriend: friends.some(f => f.id === userId),
        isFollowing: following.includes(userId),
        isFollower: followers.includes(userId),
        friendsCount: friends.length,
        followingCount: following.length,
        followersCount: followers.length,
      };
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }

  // Get friend activity feed
  static async getFriendActivity() {
    try {
      const friends = await this.getFriends();
      const following = await this.getFollowing();
      
      // Mock activity data
      const activities = [
        {
          id: '1',
          userId: '1',
          username: 'tarih_sever',
          displayName: 'Tarih Sever',
          avatar: null,
          type: 'created_image',
          message: 'Yeni bir Osmanlı padişahı fotoğrafı oluşturdu',
          imageUrl: null,
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        },
        {
          id: '2',
          userId: '2',
          username: 'osmanli_asker',
          displayName: 'Osmanlı Askeri',
          avatar: null,
          type: 'shared_image',
          message: 'Fatih Sultan Mehmet fotoğrafını paylaştı',
          imageUrl: null,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '3',
          userId: '3',
          username: 'sanat_ci',
          displayName: 'Sanatçı',
          avatar: null,
          type: 'level_up',
          message: 'Seviye 12\'ye yükseldi!',
          imageUrl: null,
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        },
      ];
      
      // Filter activities from friends and following
      const friendIds = [...friends.map(f => f.id), ...following];
      return activities.filter(activity => friendIds.includes(activity.userId));
    } catch (error) {
      console.error('Error getting friend activity:', error);
      return [];
    }
  }

  // Get suggested friends
  static async getSuggestedFriends() {
    try {
      const friends = await this.getFriends();
      const following = await this.getFollowing();
      const blocked = await this.getBlockedUsers();
      
      const friendIds = [...friends.map(f => f.id), ...following, ...blocked];
      
      // Return users not in friends, following, or blocked
      return this.MOCK_USERS.filter(user => !friendIds.includes(user.id));
    } catch (error) {
      console.error('Error getting suggested friends:', error);
      return [];
    }
  }
}

export default FriendService;
