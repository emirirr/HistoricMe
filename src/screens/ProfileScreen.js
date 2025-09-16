import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useUser, useAuth } from '@clerk/clerk-expo';
import { Button, Card, Modal, Input } from '../components/ui';
import { theme } from '../styles/theme';
import apiService from '../services/api';

const { width } = Dimensions.get('window');

const ProfileScreen = ({ onNavigate }) => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  // Kullanıcı profili - Clerk'ten alınan veriler
  const [userProfile, setUserProfile] = useState({
    firstName: user?.firstName || 'Kullanıcı',
    lastName: user?.lastName || 'Adı',
    email: user?.emailAddresses?.[0]?.emailAddress || 'user@example.com',
    joinDate: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }) : 'Ocak 2024',
    totalCreations: 0, // API'den gelecek
    favoriteEra: 'Henüz belirlenmedi', // API'den gelecek
    level: 'Yeni Başlayan', // API'den gelecek
  });

  // Favori dönem seçimi için state
  const [showEraSelector, setShowEraSelector] = useState(false);
  const [selectedEra, setSelectedEra] = useState(userProfile.favoriteEra);

  // Ayarlar için state'ler
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  
  // Profil düzenleme için state'ler
  const [editProfile, setEditProfile] = useState({
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    email: userProfile.email,
  });

  // Bildirim ayarları için state'ler
  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    newImageNotifications: true,
    weeklyDigest: false,
  });

  // Gizlilik ayarları için state'ler
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    allowMessages: true,
    dataSharing: false,
  });

  // Tarihi dönemler listesi
  const historicalEras = [
    { id: 'osmanli', name: 'Osmanlı İmparatorluğu', description: '1299-1922' },
    { id: 'selcuklu', name: 'Selçuklu Devleti', description: '1037-1194' },
    { id: 'bizans', name: 'Bizans İmparatorluğu', description: '330-1453' },
    { id: 'roma', name: 'Roma İmparatorluğu', description: 'MÖ 27-MS 476' },
    { id: 'yunan', name: 'Antik Yunan', description: 'MÖ 800-MÖ 146' },
    { id: 'misir', name: 'Antik Mısır', description: 'MÖ 3100-MÖ 30' },
    { id: 'cagdas', name: 'Çağdaş Dönem', description: '1900-Günümüz' },
    { id: 'orta', name: 'Orta Çağ', description: '476-1453' },
  ];

  // Geçmiş görseller - API'den gelecek
  const [historyImages, setHistoryImages] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // API fonksiyonları - gerçek backend'e istek atacak
  const fetchUserHistory = async () => {
    if (!user?.id) return;
    
    setIsLoadingHistory(true);
    try {
      // TODO: Backend hazır olduğunda aktif edilecek
      // const data = await apiService.getUserHistory(user.id);
      // setHistoryImages(data.images || []);
      
      // Şimdilik boş array döndürüyoruz
      setHistoryImages([]);
    } catch (error) {
      console.error('Error fetching user history:', error);
      setHistoryImages([]);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const fetchUserStats = async () => {
    if (!user?.id) return;
    
    try {
      // TODO: Backend hazır olduğunda aktif edilecek
      // const stats = await apiService.getUserStats(user.id);
      // setUserProfile(prev => ({
      //   ...prev,
      //   totalCreations: stats.totalCreations || 0,
      //   favoriteEra: stats.favoriteEra || 'Henüz belirlenmedi',
      //   level: stats.level || 'Yeni Başlayan'
      // }));
      
      // Şimdilik varsayılan değerleri kullanıyoruz
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  // Favori dönem seçimi fonksiyonları
  const handleEraSelect = async (era) => {
    setSelectedEra(era.name);
    setShowEraSelector(false);
    
    try {
      // TODO: Backend hazır olduğunda aktif edilecek
      // await apiService.updateUserProfile(user.id, {
      //   favoriteEra: era.id
      // });
      
      setUserProfile(prev => ({
        ...prev,
        favoriteEra: era.name
      }));
      
      Alert.alert('Başarılı', 'Favori döneminiz güncellendi!');
    } catch (error) {
      console.error('Error updating favorite era:', error);
      Alert.alert('Hata', 'Favori dönem güncellenirken bir hata oluştu.');
    }
  };

  // Profil düzenleme fonksiyonları
  const handleProfileUpdate = async () => {
    try {
      // TODO: Backend hazır olduğunda aktif edilecek
      // await apiService.updateUserProfile(user.id, editProfile);
      
      setUserProfile(prev => ({
        ...prev,
        firstName: editProfile.firstName,
        lastName: editProfile.lastName,
      }));
      
      setShowProfileEdit(false);
      Alert.alert('Başarılı', 'Profil bilgileriniz güncellendi!');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Hata', 'Profil güncellenirken bir hata oluştu.');
    }
  };

  // Bildirim ayarları fonksiyonları
  const handleNotificationToggle = (key) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleNotificationSave = async () => {
    try {
      // TODO: Backend hazır olduğunda aktif edilecek
      // await apiService.updateUserSettings(user.id, { notifications: notificationSettings });
      
      setShowNotificationSettings(false);
      Alert.alert('Başarılı', 'Bildirim ayarlarınız güncellendi!');
    } catch (error) {
      console.error('Error updating notification settings:', error);
      Alert.alert('Hata', 'Bildirim ayarları güncellenirken bir hata oluştu.');
    }
  };

  // Gizlilik ayarları fonksiyonları
  const handlePrivacyToggle = (key) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacySave = async () => {
    try {
      // TODO: Backend hazır olduğunda aktif edilecek
      // await apiService.updateUserSettings(user.id, { privacy: privacySettings });
      
      setShowPrivacySettings(false);
      Alert.alert('Başarılı', 'Gizlilik ayarlarınız güncellendi!');
    } catch (error) {
      console.error('Error updating privacy settings:', error);
      Alert.alert('Hata', 'Gizlilik ayarları güncellenirken bir hata oluştu.');
    }
  };

  const handleShareImage = (image) => {
    // Paylaşım işlevi - gerçek uygulamada Share API kullanılacak
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

  const handleDownloadImage = (image) => {
    // İndirme işlevi - gerçek uygulamada dosya indirme işlevi olacak
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
  React.useEffect(() => {
    if (activeTab === 'history') {
      fetchUserHistory();
    }
    fetchUserStats();
  }, [activeTab, user?.id]);

  const handleSignOut = async () => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkmak istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Çıkış Yap',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              console.error('Sign out error:', error);
            }
          },
        },
      ]
    );
  };

  const renderProfileTab = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* User Info Card */}
      <Card variant="default" style={{ marginBottom: theme.spacing.lg }}>
        <View style={{ alignItems: 'center', marginBottom: theme.spacing.lg }}>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: theme.colors.tealLight,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: theme.spacing.md,
              ...theme.shadows.md,
            }}
          >
            <Ionicons name="person" size={50} color={theme.colors.teal} />
          </View>
          
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.serif,
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.navy,
              textAlign: 'center',
              marginBottom: theme.spacing.xs,
            }}
          >
            {userProfile.firstName} {userProfile.lastName}
          </Text>
          
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.gray600,
              textAlign: 'center',
              marginBottom: theme.spacing.sm,
            }}
          >
            {userProfile.email}
          </Text>
          
          <View
            style={{
              backgroundColor: theme.colors.goldLight,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
              borderRadius: theme.borderRadius.full,
              marginBottom: theme.spacing.md,
            }}
          >
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.gold,
              }}
            >
              {userProfile.level}
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingVertical: theme.spacing.lg,
            borderTopWidth: 1,
            borderTopColor: theme.colors.gray200,
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.serif,
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.teal,
                marginBottom: theme.spacing.xs,
              }}
            >
              {userProfile.totalCreations}
            </Text>
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.gray600,
              }}
            >
              Oluşturulan Görsel
            </Text>
          </View>
          
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.serif,
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.burgundy,
                marginBottom: theme.spacing.xs,
              }}
            >
              {userProfile.joinDate}
            </Text>
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.gray600,
              }}
            >
              Katılım Tarihi
            </Text>
          </View>
        </View>
      </Card>

      {/* Favorite Era */}
      <Card variant="default" style={{ marginBottom: theme.spacing.lg }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.md }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: theme.colors.burgundyLight,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: theme.spacing.md,
            }}
          >
            <Ionicons name="star" size={20} color={theme.colors.burgundy} />
          </View>
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.serif,
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.navy,
            }}
          >
            Favori Dönem
          </Text>
        </View>
        
        <Text
          style={{
            fontFamily: theme.typography.fontFamily.sans,
            fontSize: theme.typography.fontSize.base,
            color: theme.colors.gray600,
            marginBottom: theme.spacing.sm,
          }}
        >
          En çok hangi tarihi dönemle ilgileniyorsunuz?
        </Text>
        
        <TouchableOpacity
          onPress={() => setShowEraSelector(true)}
          style={{
            backgroundColor: theme.colors.burgundyLight,
            padding: theme.spacing.md,
            borderRadius: theme.borderRadius.lg,
            borderWidth: 1,
            borderColor: theme.colors.burgundy,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.base,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.burgundy,
              flex: 1,
            }}
          >
            {userProfile.favoriteEra}
          </Text>
          <Ionicons name="chevron-down" size={20} color={theme.colors.burgundy} />
        </TouchableOpacity>
      </Card>

      {/* Settings */}
      <Card variant="default" style={{ marginBottom: theme.spacing.lg }}>
        <Text
          style={{
            fontFamily: theme.typography.fontFamily.serif,
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.navy,
            marginBottom: theme.spacing.md,
          }}
        >
          Ayarlar
        </Text>
        
        <View style={{ gap: theme.spacing.sm }}>
          <TouchableOpacity
            onPress={() => setShowProfileEdit(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: theme.spacing.md,
              paddingHorizontal: theme.spacing.sm,
              borderRadius: theme.borderRadius.lg,
              backgroundColor: theme.colors.gray50,
            }}
          >
            <Ionicons name="person-outline" size={20} color={theme.colors.gray500} />
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.navy,
                marginLeft: theme.spacing.md,
                flex: 1,
              }}
            >
              Profil Bilgilerini Düzenle
            </Text>
            <Ionicons name="chevron-forward" size={16} color={theme.colors.gray400} />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setShowNotificationSettings(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: theme.spacing.md,
              paddingHorizontal: theme.spacing.sm,
              borderRadius: theme.borderRadius.lg,
              backgroundColor: theme.colors.gray50,
            }}
          >
            <Ionicons name="notifications-outline" size={20} color={theme.colors.gray500} />
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.navy,
                marginLeft: theme.spacing.md,
                flex: 1,
              }}
            >
              Bildirimler
            </Text>
            <Ionicons name="chevron-forward" size={16} color={theme.colors.gray400} />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setShowPrivacySettings(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: theme.spacing.md,
              paddingHorizontal: theme.spacing.sm,
              borderRadius: theme.borderRadius.lg,
              backgroundColor: theme.colors.gray50,
            }}
          >
            <Ionicons name="shield-outline" size={20} color={theme.colors.gray500} />
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.navy,
                marginLeft: theme.spacing.md,
                flex: 1,
              }}
            >
              Gizlilik
            </Text>
            <Ionicons name="chevron-forward" size={16} color={theme.colors.gray400} />
          </TouchableOpacity>
        </View>
      </Card>

      {/* Sign Out Button */}
      <Button
        title="Çıkış Yap"
        variant="outline"
        onPress={handleSignOut}
        style={{
          borderColor: theme.colors.red,
          borderWidth: 2,
          marginBottom: theme.spacing.xl,
        }}
        textStyle={{ color: theme.colors.red }}
        icon={<Ionicons name="log-out-outline" size={20} color={theme.colors.red} />}
      />
    </ScrollView>
  );

  const renderHistoryTab = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Header Card */}
      <Card variant="default" style={{ marginBottom: theme.spacing.lg }}>
        <View style={{ alignItems: 'center', marginBottom: theme.spacing.md }}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: theme.colors.burgundyLight,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: theme.spacing.md,
            }}
          >
            <Ionicons name="images" size={30} color={theme.colors.burgundy} />
          </View>
          
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.serif,
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.navy,
              textAlign: 'center',
              marginBottom: theme.spacing.sm,
            }}
          >
            Geçmiş Görseller
          </Text>
          
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.base,
              color: theme.colors.gray600,
              textAlign: 'center',
              marginBottom: theme.spacing.md,
            }}
          >
            Oluşturduğunuz tüm tarihi görselleri burada görebilirsiniz
          </Text>
          
          <View
            style={{
              backgroundColor: theme.colors.tealLight,
              paddingHorizontal: theme.spacing.lg,
              paddingVertical: theme.spacing.sm,
              borderRadius: theme.borderRadius.full,
            }}
          >
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.teal,
              }}
            >
              {historyImages.length} Görsel Oluşturuldu
            </Text>
          </View>
        </View>
      </Card>

      {isLoadingHistory ? (
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
      ) : historyImages.length === 0 ? (
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
            Henüz Görsel Oluşturmadınız
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
            İlk tarihi görselinizi oluşturmak için ana sayfaya gidin ve fotoğrafınızı yükleyin.
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
          {historyImages.map((item, index) => (
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
                  onPress={() => handleShareImage(item)}
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
                  onPress={() => handleDownloadImage(item)}
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
                  }}
                >
                  {item.date}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );

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
            <Image
              source={require('../../assets/ico.png')}
              style={{
                width: 45,
                height: 45,
                resizeMode: 'contain',
              }}
            />
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
            Profil
          </Text>
        </View>

        {/* Tab Navigation */}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: theme.colors.white,
            borderRadius: theme.borderRadius.lg,
            padding: 4,
            ...theme.shadows.sm,
          }}
        >
          <TouchableOpacity
            onPress={() => setActiveTab('profile')}
            style={{
              flex: 1,
              paddingVertical: theme.spacing.md,
              paddingHorizontal: theme.spacing.md,
              borderRadius: theme.borderRadius.md,
              backgroundColor: activeTab === 'profile' ? theme.colors.teal : 'transparent',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Ionicons 
              name="person" 
              size={16} 
              color={activeTab === 'profile' ? theme.colors.white : theme.colors.gray600}
              style={{ marginRight: theme.spacing.xs }}
            />
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.semibold,
                color: activeTab === 'profile' ? theme.colors.white : theme.colors.gray600,
              }}
            >
              Profil
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setActiveTab('history')}
            style={{
              flex: 1,
              paddingVertical: theme.spacing.md,
              paddingHorizontal: theme.spacing.md,
              borderRadius: theme.borderRadius.md,
              backgroundColor: activeTab === 'history' ? theme.colors.teal : 'transparent',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Ionicons 
              name="images" 
              size={16} 
              color={activeTab === 'history' ? theme.colors.white : theme.colors.gray600}
              style={{ marginRight: theme.spacing.xs }}
            />
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.semibold,
                color: activeTab === 'history' ? theme.colors.white : theme.colors.gray600,
              }}
            >
              Geçmiş
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Content */}
      <View style={{ flex: 1, padding: theme.spacing.md }}>
        {activeTab === 'profile' ? renderProfileTab() : renderHistoryTab()}
      </View>

      {/* Era Selector Modal */}
      <Modal
        visible={showEraSelector}
        onClose={() => setShowEraSelector(false)}
        title="Favori Tarihi Dönem Seçin"
        contentStyle={{ padding: 0 }}
      >
        <View style={{ paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.md }}>
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.gray600,
              textAlign: 'center',
              marginBottom: theme.spacing.lg,
              lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.sm,
            }}
          >
            En çok ilgilendiğiniz tarihi dönemi seçin. Bu seçim size daha uygun içerikler önermemize yardımcı olacak.
          </Text>
        </View>
        
        <ScrollView 
          style={{ maxHeight: 350 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: theme.spacing.md }}
        >
          {historicalEras.map((era) => (
            <TouchableOpacity
              key={era.id}
              onPress={() => setSelectedEra(era.name)}
              style={{
                padding: theme.spacing.md,
                borderRadius: theme.borderRadius.lg,
                borderWidth: 2,
                borderColor: selectedEra === era.name ? theme.colors.burgundy : theme.colors.gray200,
                backgroundColor: selectedEra === era.name ? theme.colors.burgundyLight : theme.colors.white,
                marginBottom: theme.spacing.sm,
                flexDirection: 'row',
                alignItems: 'center',
                ...theme.shadows.sm,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: selectedEra === era.name ? theme.colors.burgundy : theme.colors.gray200,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: theme.spacing.md,
                }}
              >
                <Ionicons 
                  name="time" 
                  size={20} 
                  color={selectedEra === era.name ? theme.colors.white : theme.colors.gray500} 
                />
              </View>
              
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: theme.typography.fontFamily.serif,
                    fontSize: theme.typography.fontSize.base,
                    fontWeight: theme.typography.fontWeight.bold,
                    color: selectedEra === era.name ? theme.colors.burgundy : theme.colors.navy,
                    marginBottom: theme.spacing.xs,
                  }}
                >
                  {era.name}
                </Text>
                <Text
                  style={{
                    fontFamily: theme.typography.fontFamily.sans,
                    fontSize: theme.typography.fontSize.sm,
                    color: selectedEra === era.name ? theme.colors.burgundy : theme.colors.gray600,
                  }}
                >
                  {era.description}
                </Text>
              </View>
              
              {selectedEra === era.name && (
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: theme.colors.burgundy,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name="checkmark" size={14} color={theme.colors.white} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <View style={{ 
          flexDirection: 'row', 
          gap: theme.spacing.sm, 
          marginTop: theme.spacing.lg,
          paddingHorizontal: theme.spacing.lg,
          paddingBottom: theme.spacing.lg,
        }}>
          <Button
            title="İptal"
            variant="outline"
            onPress={() => setShowEraSelector(false)}
            style={{ flex: 1 }}
            textStyle={{ color: theme.colors.gray600 }}
          />
          <Button
            title="Seç ve Kaydet"
            onPress={() => {
              const selectedEraData = historicalEras.find(era => era.name === selectedEra);
              if (selectedEraData) {
                handleEraSelect(selectedEraData);
              }
            }}
            style={{ flex: 1 }}
            icon={<Ionicons name="checkmark" size={18} color={theme.colors.white} />}
            iconPosition="right"
          />
        </View>
      </Modal>

      {/* Profile Edit Modal */}
      <Modal
        visible={showProfileEdit}
        onClose={() => setShowProfileEdit(false)}
        title="Profil Bilgilerini Düzenle"
        contentStyle={{ padding: 0 }}
      >
        <View style={{ 
          paddingHorizontal: width < 375 ? theme.spacing.lg : theme.spacing.xl, 
          paddingTop: theme.spacing.md 
        }}>
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: width < 375 ? theme.typography.fontSize.xs : theme.typography.fontSize.sm,
              color: theme.colors.gray600,
              textAlign: 'center',
              marginBottom: theme.spacing.lg,
            }}
          >
            Profil bilgilerinizi güncelleyin
          </Text>
        </View>
        
        <View style={{ 
          paddingHorizontal: width < 375 ? theme.spacing.lg : theme.spacing.xl, 
          gap: width < 375 ? theme.spacing.sm : theme.spacing.md 
        }}>
          <View style={{
            backgroundColor: theme.colors.white,
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing.lg,
            borderWidth: 1,
            borderColor: theme.colors.gray200,
            ...theme.shadows.sm,
          }}>
            <Input
              label="Ad"
              value={editProfile.firstName}
              onChangeText={(text) => setEditProfile(prev => ({ ...prev, firstName: text }))}
              placeholder="Adınızı girin"
              leftIcon={<Ionicons name="person-outline" size={20} color={theme.colors.gray500} />}
            />
          </View>
          
          <View style={{
            backgroundColor: theme.colors.white,
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing.lg,
            borderWidth: 1,
            borderColor: theme.colors.gray200,
            ...theme.shadows.sm,
          }}>
            <Input
              label="Soyad"
              value={editProfile.lastName}
              onChangeText={(text) => setEditProfile(prev => ({ ...prev, lastName: text }))}
              placeholder="Soyadınızı girin"
              leftIcon={<Ionicons name="person-outline" size={20} color={theme.colors.gray500} />}
            />
          </View>
          
          <View style={{
            backgroundColor: theme.colors.white,
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing.lg,
            borderWidth: 1,
            borderColor: theme.colors.gray200,
            ...theme.shadows.sm,
          }}>
            <Input
              label="E-posta"
              value={editProfile.email}
              onChangeText={(text) => setEditProfile(prev => ({ ...prev, email: text }))}
              placeholder="E-posta adresinizi girin"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Ionicons name="mail-outline" size={20} color={theme.colors.gray500} />}
            />
          </View>
        </View>
        
        <View style={{ 
          flexDirection: 'row', 
          gap: width < 375 ? theme.spacing.xs : theme.spacing.sm, 
          marginTop: theme.spacing.lg,
          paddingHorizontal: width < 375 ? theme.spacing.lg : theme.spacing.xl,
          paddingBottom: width < 375 ? theme.spacing.lg : theme.spacing.xl,
        }}>
          <Button
            title="İptal"
            variant="outline"
            onPress={() => setShowProfileEdit(false)}
            style={{ flex: 1 }}
          />
          <Button
            title="Kaydet"
            onPress={handleProfileUpdate}
            style={{ flex: 1 }}
            icon={<Ionicons name="checkmark" size={width < 375 ? 16 : 18} color={theme.colors.white} />}
            iconPosition="right"
          />
        </View>
      </Modal>

      {/* Notification Settings Modal */}
      <Modal
        visible={showNotificationSettings}
        onClose={() => setShowNotificationSettings(false)}
        title="Bildirim Ayarları"
        contentStyle={{ padding: 0 }}
      >
        <View style={{ 
          paddingHorizontal: width < 375 ? theme.spacing.lg : theme.spacing.xl, 
          paddingTop: theme.spacing.md 
        }}>
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: width < 375 ? theme.typography.fontSize.xs : theme.typography.fontSize.sm,
              color: theme.colors.gray600,
              textAlign: 'center',
              marginBottom: theme.spacing.lg,
            }}
          >
            Hangi bildirimleri almak istediğinizi seçin
          </Text>
        </View>
        
        <View style={{ 
          paddingHorizontal: width < 375 ? theme.spacing.lg : theme.spacing.xl, 
          gap: width < 375 ? theme.spacing.sm : theme.spacing.md 
        }}>
          {Object.entries(notificationSettings).map(([key, value]) => (
            <View
              key={key}
              style={{
                backgroundColor: theme.colors.white,
                borderRadius: theme.borderRadius.lg,
                padding: theme.spacing.lg,
                borderWidth: 1,
                borderColor: value ? theme.colors.burgundy : theme.colors.gray200,
                ...theme.shadows.sm,
              }}
            >
              <TouchableOpacity
                onPress={() => handleNotificationToggle(key)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: value ? theme.colors.burgundy : theme.colors.gray100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: theme.spacing.md,
                    }}
                  >
                    <Ionicons 
                      name={
                        key === 'pushNotifications' ? 'notifications-outline' :
                        key === 'emailNotifications' ? 'mail-outline' :
                        key === 'newImageNotifications' ? 'image-outline' :
                        'calendar-outline'
                      } 
                      size={20} 
                      color={value ? theme.colors.white : theme.colors.gray500} 
                    />
                  </View>
                  
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: theme.typography.fontFamily.sans,
                        fontSize: theme.typography.fontSize.base,
                        fontWeight: theme.typography.fontWeight.semibold,
                        color: value ? theme.colors.burgundy : theme.colors.navy,
                        marginBottom: theme.spacing.xs,
                      }}
                    >
                      {key === 'pushNotifications' && 'Push Bildirimleri'}
                      {key === 'emailNotifications' && 'E-posta Bildirimleri'}
                      {key === 'newImageNotifications' && 'Yeni Görsel Bildirimleri'}
                      {key === 'weeklyDigest' && 'Haftalık Özet'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: theme.typography.fontFamily.sans,
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.gray600,
                        lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.sm,
                      }}
                    >
                      {key === 'pushNotifications' && 'Uygulama içi bildirimler al'}
                      {key === 'emailNotifications' && 'E-posta ile bildirimler al'}
                      {key === 'newImageNotifications' && 'Yeni görsel oluşturulduğunda bildirim al'}
                      {key === 'weeklyDigest' && 'Haftalık aktivite özeti al'}
                    </Text>
                  </View>
                </View>
                
                <View
                  style={{
                    width: 52,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: value ? theme.colors.burgundy : theme.colors.gray300,
                    justifyContent: 'center',
                    alignItems: value ? 'flex-end' : 'flex-start',
                    paddingHorizontal: 3,
                    marginLeft: theme.spacing.md,
                  }}
                >
                  <View
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      backgroundColor: theme.colors.white,
                      ...theme.shadows.md,
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        
        <View style={{ 
          flexDirection: 'row', 
          gap: width < 375 ? theme.spacing.xs : theme.spacing.sm, 
          marginTop: theme.spacing.lg,
          paddingHorizontal: width < 375 ? theme.spacing.lg : theme.spacing.xl,
          paddingBottom: width < 375 ? theme.spacing.lg : theme.spacing.xl,
        }}>
          <Button
            title="İptal"
            variant="outline"
            onPress={() => setShowNotificationSettings(false)}
            style={{ flex: 1 }}
          />
          <Button
            title="Kaydet"
            onPress={handleNotificationSave}
            style={{ flex: 1 }}
            icon={<Ionicons name="checkmark" size={width < 375 ? 16 : 18} color={theme.colors.white} />}
            iconPosition="right"
          />
        </View>
      </Modal>

      {/* Privacy Settings Modal */}
      <Modal
        visible={showPrivacySettings}
        onClose={() => setShowPrivacySettings(false)}
        title="Gizlilik Ayarları"
        contentStyle={{ padding: 0 }}
      >
        <View style={{ 
          paddingHorizontal: width < 375 ? theme.spacing.lg : theme.spacing.xl, 
          paddingTop: theme.spacing.md 
        }}>
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: width < 375 ? theme.typography.fontSize.xs : theme.typography.fontSize.sm,
              color: theme.colors.gray600,
              textAlign: 'center',
              marginBottom: theme.spacing.lg,
            }}
          >
            Gizlilik tercihlerinizi ayarlayın
          </Text>
        </View>
        
        <View style={{ 
          paddingHorizontal: width < 375 ? theme.spacing.lg : theme.spacing.xl, 
          gap: width < 375 ? theme.spacing.sm : theme.spacing.md 
        }}>
          <View style={{
            backgroundColor: theme.colors.white,
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing.lg,
            borderWidth: 1,
            borderColor: theme.colors.gray200,
            ...theme.shadows.sm,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.md }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: theme.colors.tealLight,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: theme.spacing.md,
                }}
              >
                <Ionicons name="eye-outline" size={20} color={theme.colors.teal} />
              </View>
              <Text
                style={{
                  fontFamily: theme.typography.fontFamily.sans,
                  fontSize: theme.typography.fontSize.base,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.navy,
                }}
              >
                Profil Görünürlüğü
              </Text>
            </View>
            
            <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
              {['public', 'private'].map((visibility) => (
                <TouchableOpacity
                  key={visibility}
                  onPress={() => setPrivacySettings(prev => ({ ...prev, profileVisibility: visibility }))}
                  style={{
                    flex: 1,
                    paddingVertical: theme.spacing.md,
                    paddingHorizontal: theme.spacing.lg,
                    borderRadius: theme.borderRadius.lg,
                    borderWidth: 2,
                    borderColor: privacySettings.profileVisibility === visibility ? theme.colors.burgundy : theme.colors.gray200,
                    backgroundColor: privacySettings.profileVisibility === visibility ? theme.colors.burgundyLight : theme.colors.gray50,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                >
                  <Ionicons 
                    name={visibility === 'public' ? 'globe-outline' : 'lock-closed-outline'} 
                    size={16} 
                    color={privacySettings.profileVisibility === visibility ? theme.colors.burgundy : theme.colors.gray500}
                    style={{ marginRight: theme.spacing.xs }}
                  />
                  <Text
                    style={{
                      fontFamily: theme.typography.fontFamily.sans,
                      fontSize: theme.typography.fontSize.sm,
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: privacySettings.profileVisibility === visibility ? theme.colors.burgundy : theme.colors.gray600,
                    }}
                  >
                    {visibility === 'public' ? 'Herkese Açık' : 'Özel'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {Object.entries(privacySettings).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
            <View
              key={key}
              style={{
                backgroundColor: theme.colors.white,
                borderRadius: theme.borderRadius.lg,
                padding: theme.spacing.lg,
                borderWidth: 1,
                borderColor: value ? theme.colors.burgundy : theme.colors.gray200,
                ...theme.shadows.sm,
              }}
            >
              <TouchableOpacity
                onPress={() => handlePrivacyToggle(key)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: value ? theme.colors.burgundy : theme.colors.gray100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: theme.spacing.md,
                    }}
                  >
                    <Ionicons 
                      name={
                        key === 'showEmail' ? 'mail-outline' :
                        key === 'allowMessages' ? 'chatbubble-outline' :
                        'analytics-outline'
                      } 
                      size={20} 
                      color={value ? theme.colors.white : theme.colors.gray500} 
                    />
                  </View>
                  
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: theme.typography.fontFamily.sans,
                        fontSize: theme.typography.fontSize.base,
                        fontWeight: theme.typography.fontWeight.semibold,
                        color: value ? theme.colors.burgundy : theme.colors.navy,
                        marginBottom: theme.spacing.xs,
                      }}
                    >
                      {key === 'showEmail' && 'E-posta Göster'}
                      {key === 'allowMessages' && 'Mesajlara İzin Ver'}
                      {key === 'dataSharing' && 'Veri Paylaşımı'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: theme.typography.fontFamily.sans,
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.gray600,
                        lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.sm,
                      }}
                    >
                      {key === 'showEmail' && 'Profilinizde e-posta adresinizi göster'}
                      {key === 'allowMessages' && 'Diğer kullanıcılar size mesaj gönderebilir'}
                      {key === 'dataSharing' && 'Anonim veri paylaşımına izin ver'}
                    </Text>
                  </View>
                </View>
                
                <View
                  style={{
                    width: 52,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: value ? theme.colors.burgundy : theme.colors.gray300,
                    justifyContent: 'center',
                    alignItems: value ? 'flex-end' : 'flex-start',
                    paddingHorizontal: 3,
                    marginLeft: theme.spacing.md,
                  }}
                >
                  <View
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      backgroundColor: theme.colors.white,
                      ...theme.shadows.md,
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        
        <View style={{ 
          flexDirection: 'row', 
          gap: width < 375 ? theme.spacing.xs : theme.spacing.sm, 
          marginTop: theme.spacing.lg,
          paddingHorizontal: width < 375 ? theme.spacing.lg : theme.spacing.xl,
          paddingBottom: width < 375 ? theme.spacing.lg : theme.spacing.xl,
        }}>
          <Button
            title="İptal"
            variant="outline"
            onPress={() => setShowPrivacySettings(false)}
            style={{ flex: 1 }}
          />
          <Button
            title="Kaydet"
            onPress={handlePrivacySave}
            style={{ flex: 1 }}
            icon={<Ionicons name="checkmark" size={width < 375 ? 16 : 18} color={theme.colors.white} />}
            iconPosition="right"
          />
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;
