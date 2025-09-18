import AsyncStorage from '@react-native-async-storage/async-storage';

class CommentService {
  static STORAGE_KEYS = {
    COMMENTS: 'image_comments',
    LIKES: 'comment_likes',
  };

  // Mock comments data
  static MOCK_COMMENTS = [
    {
      id: '1',
      imageId: 'image_1',
      userId: '1',
      username: 'tarih_sever',
      displayName: 'Tarih Sever',
      avatar: null,
      comment: 'Harika bir fotoğraf! Çok gerçekçi görünüyor.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      likes: 5,
      replies: [
        {
          id: '1_1',
          userId: '2',
          username: 'osmanli_asker',
          displayName: 'Osmanlı Askeri',
          avatar: null,
          comment: 'Teşekkürler! Senin fotoğrafların da çok güzel.',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          likes: 2,
        },
      ],
    },
    {
      id: '2',
      imageId: 'image_1',
      userId: '3',
      username: 'sanat_ci',
      displayName: 'Sanatçı',
      avatar: null,
      comment: 'Bu stili nasıl elde ettin? Çok etkileyici!',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      likes: 3,
      replies: [],
    },
    {
      id: '3',
      imageId: 'image_2',
      userId: '4',
      username: 'tarih_ogretmeni',
      displayName: 'Tarih Öğretmeni',
      avatar: null,
      comment: 'Öğrencilerime göstereceğim, çok eğitici!',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      likes: 8,
      replies: [],
    },
  ];

  // Get comments for an image
  static async getComments(imageId) {
    try {
      const comments = await AsyncStorage.getItem(this.STORAGE_KEYS.COMMENTS);
      const allComments = comments ? JSON.parse(comments) : this.MOCK_COMMENTS;
      
      return allComments.filter(comment => comment.imageId === imageId);
    } catch (error) {
      console.error('Error getting comments:', error);
      return [];
    }
  }

  // Add comment
  static async addComment(imageId, userId, username, displayName, avatar, comment) {
    try {
      const comments = await AsyncStorage.getItem(this.STORAGE_KEYS.COMMENTS);
      const allComments = comments ? JSON.parse(comments) : this.MOCK_COMMENTS;
      
      const newComment = {
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        imageId,
        userId,
        username,
        displayName,
        avatar,
        comment,
        timestamp: new Date().toISOString(),
        likes: 0,
        replies: [],
      };
      
      allComments.push(newComment);
      await AsyncStorage.setItem(this.STORAGE_KEYS.COMMENTS, JSON.stringify(allComments));
      
      return newComment;
    } catch (error) {
      console.error('Error adding comment:', error);
      return null;
    }
  }

  // Add reply to comment
  static async addReply(commentId, userId, username, displayName, avatar, reply) {
    try {
      const comments = await AsyncStorage.getItem(this.STORAGE_KEYS.COMMENTS);
      const allComments = comments ? JSON.parse(comments) : this.MOCK_COMMENTS;
      
      const commentIndex = allComments.findIndex(c => c.id === commentId);
      if (commentIndex === -1) return null;
      
      const newReply = {
        id: `${commentId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId,
        username,
        displayName,
        avatar,
        comment: reply,
        timestamp: new Date().toISOString(),
        likes: 0,
      };
      
      allComments[commentIndex].replies.push(newReply);
      await AsyncStorage.setItem(this.STORAGE_KEYS.COMMENTS, JSON.stringify(allComments));
      
      return newReply;
    } catch (error) {
      console.error('Error adding reply:', error);
      return null;
    }
  }

  // Like comment
  static async likeComment(commentId, userId) {
    try {
      const likes = await AsyncStorage.getItem(this.STORAGE_KEYS.LIKES);
      const allLikes = likes ? JSON.parse(likes) : {};
      
      if (!allLikes[commentId]) {
        allLikes[commentId] = [];
      }
      
      const userLiked = allLikes[commentId].includes(userId);
      
      if (userLiked) {
        // Unlike
        allLikes[commentId] = allLikes[commentId].filter(id => id !== userId);
      } else {
        // Like
        allLikes[commentId].push(userId);
      }
      
      await AsyncStorage.setItem(this.STORAGE_KEYS.LIKES, JSON.stringify(allLikes));
      
      // Update comment likes count
      const comments = await AsyncStorage.getItem(this.STORAGE_KEYS.COMMENTS);
      const allComments = comments ? JSON.parse(comments) : this.MOCK_COMMENTS;
      
      const commentIndex = allComments.findIndex(c => c.id === commentId);
      if (commentIndex !== -1) {
        allComments[commentIndex].likes = allLikes[commentId].length;
        await AsyncStorage.setItem(this.STORAGE_KEYS.COMMENTS, JSON.stringify(allComments));
      }
      
      return {
        liked: !userLiked,
        likesCount: allLikes[commentId].length,
      };
    } catch (error) {
      console.error('Error liking comment:', error);
      return { liked: false, likesCount: 0 };
    }
  }

  // Like reply
  static async likeReply(commentId, replyId, userId) {
    try {
      const likes = await AsyncStorage.getItem(this.STORAGE_KEYS.LIKES);
      const allLikes = likes ? JSON.parse(likes) : {};
      
      const replyLikeKey = `${commentId}_${replyId}`;
      if (!allLikes[replyLikeKey]) {
        allLikes[replyLikeKey] = [];
      }
      
      const userLiked = allLikes[replyLikeKey].includes(userId);
      
      if (userLiked) {
        // Unlike
        allLikes[replyLikeKey] = allLikes[replyLikeKey].filter(id => id !== userId);
      } else {
        // Like
        allLikes[replyLikeKey].push(userId);
      }
      
      await AsyncStorage.setItem(this.STORAGE_KEYS.LIKES, JSON.stringify(allLikes));
      
      // Update reply likes count
      const comments = await AsyncStorage.getItem(this.STORAGE_KEYS.COMMENTS);
      const allComments = comments ? JSON.parse(comments) : this.MOCK_COMMENTS;
      
      const commentIndex = allComments.findIndex(c => c.id === commentId);
      if (commentIndex !== -1) {
        const replyIndex = allComments[commentIndex].replies.findIndex(r => r.id === replyId);
        if (replyIndex !== -1) {
          allComments[commentIndex].replies[replyIndex].likes = allLikes[replyLikeKey].length;
          await AsyncStorage.setItem(this.STORAGE_KEYS.COMMENTS, JSON.stringify(allComments));
        }
      }
      
      return {
        liked: !userLiked,
        likesCount: allLikes[replyLikeKey].length,
      };
    } catch (error) {
      console.error('Error liking reply:', error);
      return { liked: false, likesCount: 0 };
    }
  }

  // Delete comment
  static async deleteComment(commentId, userId) {
    try {
      const comments = await AsyncStorage.getItem(this.STORAGE_KEYS.COMMENTS);
      const allComments = comments ? JSON.parse(comments) : this.MOCK_COMMENTS;
      
      const commentIndex = allComments.findIndex(c => c.id === commentId);
      if (commentIndex === -1) return false;
      
      // Check if user owns the comment
      if (allComments[commentIndex].userId !== userId) return false;
      
      // Remove comment
      allComments.splice(commentIndex, 1);
      await AsyncStorage.setItem(this.STORAGE_KEYS.COMMENTS, JSON.stringify(allComments));
      
      return true;
    } catch (error) {
      console.error('Error deleting comment:', error);
      return false;
    }
  }

  // Delete reply
  static async deleteReply(commentId, replyId, userId) {
    try {
      const comments = await AsyncStorage.getItem(this.STORAGE_KEYS.COMMENTS);
      const allComments = comments ? JSON.parse(comments) : this.MOCK_COMMENTS;
      
      const commentIndex = allComments.findIndex(c => c.id === commentId);
      if (commentIndex === -1) return false;
      
      const replyIndex = allComments[commentIndex].replies.findIndex(r => r.id === replyId);
      if (replyIndex === -1) return false;
      
      // Check if user owns the reply
      if (allComments[commentIndex].replies[replyIndex].userId !== userId) return false;
      
      // Remove reply
      allComments[commentIndex].replies.splice(replyIndex, 1);
      await AsyncStorage.setItem(this.STORAGE_KEYS.COMMENTS, JSON.stringify(allComments));
      
      return true;
    } catch (error) {
      console.error('Error deleting reply:', error);
      return false;
    }
  }

  // Get comment likes
  static async getCommentLikes(commentId) {
    try {
      const likes = await AsyncStorage.getItem(this.STORAGE_KEYS.LIKES);
      const allLikes = likes ? JSON.parse(likes) : {};
      
      return allLikes[commentId] || [];
    } catch (error) {
      console.error('Error getting comment likes:', error);
      return [];
    }
  }

  // Get reply likes
  static async getReplyLikes(commentId, replyId) {
    try {
      const likes = await AsyncStorage.getItem(this.STORAGE_KEYS.LIKES);
      const allLikes = likes ? JSON.parse(likes) : {};
      
      const replyLikeKey = `${commentId}_${replyId}`;
      return allLikes[replyLikeKey] || [];
    } catch (error) {
      console.error('Error getting reply likes:', error);
      return [];
    }
  }

  // Check if user liked comment
  static async hasUserLikedComment(commentId, userId) {
    try {
      const likes = await this.getCommentLikes(commentId);
      return likes.includes(userId);
    } catch (error) {
      console.error('Error checking comment like:', error);
      return false;
    }
  }

  // Check if user liked reply
  static async hasUserLikedReply(commentId, replyId, userId) {
    try {
      const likes = await this.getReplyLikes(commentId, replyId);
      return likes.includes(userId);
    } catch (error) {
      console.error('Error checking reply like:', error);
      return false;
    }
  }

  // Get comment count for image
  static async getCommentCount(imageId) {
    try {
      const comments = await this.getComments(imageId);
      return comments.length;
    } catch (error) {
      console.error('Error getting comment count:', error);
      return 0;
    }
  }

  // Get total likes for image
  static async getTotalLikes(imageId) {
    try {
      const comments = await this.getComments(imageId);
      let totalLikes = 0;
      
      comments.forEach(comment => {
        totalLikes += comment.likes;
        comment.replies.forEach(reply => {
          totalLikes += reply.likes;
        });
      });
      
      return totalLikes;
    } catch (error) {
      console.error('Error getting total likes:', error);
      return 0;
    }
  }
}

export default CommentService;
