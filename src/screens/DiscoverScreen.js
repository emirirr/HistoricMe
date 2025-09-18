import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Alert, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Card, Button } from '../components/ui';
import { BannerAd } from '../components/ads';
import { theme } from '../styles/theme';
import apiService from '../services/api';

const { width } = Dimensions.get('window');

const DiscoverScreen = ({ onNavigate }) => {
  const [discoverImages, setDiscoverImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Kategoriler
  const categories = [
    { id: 'all', name: 'Tümü', icon: 'grid-outline' },
    { id: 'osmanli', name: 'Osmanlı', icon: 'crown-outline' },
    { id: 'selcuklu', name: 'Selçuklu', icon: 'shield-outline' },
    { id: 'bizans', name: 'Bizans', icon: 'library-outline' },
    { id: 'roma', name: 'Roma', icon: 'build-outline' },
    { id: 'yunan', name: 'Antik Yunan', icon: 'school-outline' },
  ];

  // Keşfet verilerini çek
  const fetchDiscoverImages = async () => {
    setIsLoading(true);
    try {
      // TODO: Backend hazır olduğunda aktif edilecek
      // const data = await apiService.getDiscoverImages(selectedCategory);
      // setDiscoverImages(data.images || []);
      
      // Şimdilik örnek veriler
      const mockData = [
        {
          id: '1',
          title: 'Osmanlı Padişahı',
          era: 'Osmanlı İmparatorluğu',
          author: 'Kullanıcı123',
          date: '2 gün önce',
          likes: 24,
          isLiked: false,
          imageUrl: null, // Gerçek uygulamada API'den gelecek
        },
        {
          id: '2',
          title: 'Antik Yunan Filozofu',
          era: 'Antik Yunan',
          author: 'TarihSever',
          date: '1 hafta önce',
          likes: 18,
          isLiked: true,
          imageUrl: null,
        },
        {
          id: '3',
          title: 'Roma İmparatoru',
          era: 'Roma İmparatorluğu',
          author: 'KlasikTarih',
          date: '3 gün önce',
          likes: 31,
          isLiked: false,
          imageUrl: null,
        },
        {
          id: '4',
          title: 'Selçuklu Sultanı',
          era: 'Selçuklu Devleti',
          author: 'AnadoluTarih',
          date: '5 gün önce',
          likes: 15,
          isLiked: false,
          imageUrl: null,
        },
      ];
      
      setDiscoverImages(mockData);
    } catch (error) {
      console.error('Error fetching discover images:', error);
      setDiscoverImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Yenileme fonksiyonu
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDiscoverImages();
    setRefreshing(false);
  };

  // Kategori değiştirme
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Beğeni fonksiyonu
  const handleLike = async (imageId) => {
    try {
      // TODO: Backend hazır olduğunda aktif edilecek
      // await apiService.likeImage(imageId);
      
      setDiscoverImages(prev => 
        prev.map(img => 
          img.id === imageId 
            ? { 
                ...img, 
                isLiked: !img.isLiked, 
                likes: img.isLiked ? img.likes - 1 : img.likes + 1 
              }
            : img
        )
      );
    } catch (error) {
      console.error('Error liking image:', error);
      Alert.alert('Hata', 'Beğeni işlemi sırasında bir hata oluştu.');
    }
  };

  // Paylaşım fonksiyonu
  const handleShare = (image) => {
    Alert.alert(
      'Paylaş',
      `${image.title} görselini paylaşmak istediğinizden emin misiniz?`,
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Paylaş',
          onPress: () => {
            // Burada gerçek paylaşım işlevi olacak
            console.log('Sharing image:', image);
            Alert.alert('Başarılı', 'Görsel paylaşıldı');
          },
        },
      ]
    );
  };

  // İndirme fonksiyonu
  const handleDownload = (image) => {
    Alert.alert(
      'İndir',
      `${image.title} görselini cihazınıza indirmek istediğinizden emin misiniz?`,
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'İndir',
          onPress: () => {
            // Burada gerçek indirme işlevi olacak
            console.log('Downloading image:', image);
            Alert.alert('Başarılı', 'Görsel indirildi');
          },
        },
      ]
    );
  };

  // Component mount olduğunda verileri çek
  useEffect(() => {
    fetchDiscoverImages();
  }, [selectedCategory]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.cream }}>
      {/* Header */}
      <LinearGradient
        colors={[theme.colors.teal, theme.colors.tealLight]}
        style={{
          paddingTop: 60,
          paddingBottom: 20,
          paddingHorizontal: theme.spacing.xl,
          borderBottomLeftRadius: theme.borderRadius['2xl'],
          borderBottomRightRadius: theme.borderRadius['2xl'],
        }}
      >
        <View style={{ alignItems: 'center', marginBottom: theme.spacing.lg }}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: theme.colors.white,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: theme.spacing.md,
              ...theme.shadows.md,
            }}
          >
            <Ionicons name="compass" size={30} color={theme.colors.teal} />
          </View>
          
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.serif,
              fontSize: theme.typography.fontSize['2xl'],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.white,
              textAlign: 'center',
              marginBottom: theme.spacing.sm,
            }}
          >
            Keşfet
          </Text>
          
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.base,
              color: theme.colors.white,
              textAlign: 'center',
              opacity: 0.9,
            }}
          >
            Diğer kullanıcıların paylaştığı tarihi görselleri keşfedin
          </Text>
        </View>
      </LinearGradient>

      {/* Kategori Filtreleri */}
      <View style={{ padding: theme.spacing.md }}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: theme.spacing.sm }}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => handleCategoryChange(category.id)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: theme.spacing.sm,
                paddingHorizontal: theme.spacing.md,
                marginRight: theme.spacing.sm,
                borderRadius: theme.borderRadius.full,
                backgroundColor: selectedCategory === category.id ? theme.colors.burgundy : theme.colors.white,
                borderWidth: 1,
                borderColor: selectedCategory === category.id ? theme.colors.burgundy : theme.colors.gray200,
                ...theme.shadows.sm,
              }}
            >
              <Ionicons 
                name={category.icon} 
                size={16} 
                color={selectedCategory === category.id ? theme.colors.white : theme.colors.gray600}
                style={{ marginRight: theme.spacing.xs }}
              />
              <Text
                style={{
                  fontFamily: theme.typography.fontFamily.sans,
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: selectedCategory === category.id ? theme.colors.white : theme.colors.gray600,
                }}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* İçerik */}
      <ScrollView 
        style={{ flex: 1, padding: theme.spacing.md }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Banner Ad */}
        <BannerAd 
          size="medium"
          style={{ marginBottom: theme.spacing.lg }}
          onPress={() => console.log('Discover banner ad clicked')}
        />
        {isLoading ? (
          <View style={{ alignItems: 'center', paddingVertical: theme.spacing.xl }}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: theme.colors.gray200,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: theme.spacing.md,
              }}
            >
              <Ionicons name="hourglass-outline" size={30} color={theme.colors.gray500} />
            </View>
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.gray600,
                textAlign: 'center',
              }}
            >
              Görseller yükleniyor...
            </Text>
          </View>
        ) : discoverImages.length === 0 ? (
          <View style={{ alignItems: 'center', paddingVertical: theme.spacing.xl }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: theme.colors.gray100,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: theme.spacing.lg,
              }}
            >
              <Ionicons name="images-outline" size={40} color={theme.colors.gray400} />
            </View>
            
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.serif,
                fontSize: theme.typography.fontSize.lg,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.navy,
                textAlign: 'center',
                marginBottom: theme.spacing.sm,
              }}
            >
              Henüz Paylaşım Yok
            </Text>
            
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.gray600,
                textAlign: 'center',
                marginBottom: theme.spacing.lg,
                lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.base,
              }}
            >
              Bu kategoride henüz paylaşılan görsel bulunmuyor. İlk paylaşımı siz yapın!
            </Text>
            
            <Button
              title="Ana Sayfaya Git"
              onPress={() => onNavigate('Upload')}
              icon={<Ionicons name="arrow-forward" size={20} color={theme.colors.white} />}
              iconPosition="right"
            />
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            {discoverImages.map((item) => (
              <View
                key={item.id}
                style={{
                  width: (width - 60) / 2,
                  marginBottom: theme.spacing.lg,
                  borderRadius: theme.borderRadius.lg,
                  backgroundColor: theme.colors.white,
                  ...theme.shadows.sm,
                  position: 'relative',
                }}
              >
                {/* Placeholder görsel - gerçek uygulamada API'den gelecek */}
                <View
                  style={{
                    width: '100%',
                    height: 120,
                    borderTopLeftRadius: theme.borderRadius.lg,
                    borderTopRightRadius: theme.borderRadius.lg,
                    backgroundColor: theme.colors.gray100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name="image-outline" size={40} color={theme.colors.gray400} />
                </View>
                
                {/* Action Buttons Overlay */}
                <View
                  style={{
                    position: 'absolute',
                    top: theme.spacing.sm,
                    right: theme.spacing.sm,
                    flexDirection: 'row',
                    gap: theme.spacing.xs,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => handleLike(item.id)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Ionicons 
                      name={item.isLiked ? "heart" : "heart-outline"} 
                      size={16} 
                      color={item.isLiked ? theme.colors.red : theme.colors.white} 
                    />
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    onPress={() => handleShare(item)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Ionicons name="share-outline" size={16} color={theme.colors.white} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    onPress={() => handleDownload(item)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Ionicons name="download-outline" size={16} color={theme.colors.white} />
                  </TouchableOpacity>
                </View>
                
                <View style={{ padding: theme.spacing.md }}>
                  <Text
                    style={{
                      fontFamily: theme.typography.fontFamily.sans,
                      fontSize: theme.typography.fontSize.base,
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: theme.colors.navy,
                      marginBottom: theme.spacing.xs,
                    }}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  
                  <Text
                    style={{
                      fontFamily: theme.typography.fontFamily.sans,
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.gray600,
                      marginBottom: theme.spacing.xs,
                    }}
                  >
                    {item.era}
                  </Text>
                  
                  <Text
                    style={{
                      fontFamily: theme.typography.fontFamily.sans,
                      fontSize: theme.typography.fontSize.xs,
                      color: theme.colors.gray500,
                      marginBottom: theme.spacing.sm,
                    }}
                  >
                    {item.author} • {item.date}
                  </Text>
                  
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons 
                      name="heart" 
                      size={14} 
                      color={theme.colors.red} 
                      style={{ marginRight: theme.spacing.xs }}
                    />
                    <Text
                      style={{
                        fontFamily: theme.typography.fontFamily.sans,
                        fontSize: theme.typography.fontSize.xs,
                        color: theme.colors.gray600,
                      }}
                    >
                      {item.likes} beğeni
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default DiscoverScreen;
