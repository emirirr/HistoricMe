import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Button, Card, LoadingSpinner } from '../components/ui';
import { BannerAd } from '../components/ads';
import { completeLightTheme as theme } from '../styles/theme';

const { width, height } = Dimensions.get('window');

const UploadScreen = ({ onPhotoSelected, userCredits = 0, userSubscription = null, onShowPayment, onShowSubscription }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);


  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'İzin Gerekli',
        'Fotoğraf seçmek için galeri erişim izni gerekiyor.',
        [{ text: 'Tamam' }]
      );
      return false;
    }
    return true;
  };

  const handleCameraPress = async () => {
    // Kredi veya abonelik kontrolü
    if (!userSubscription && userCredits <= 0) {
      Alert.alert(
        'Kredi Gerekli',
        'AI fotoğraf oluşturmak için kredi satın almanız veya abone olmanız gerekiyor.',
        [
          { text: 'İptal', style: 'cancel' },
          { text: 'Kredi Satın Al', onPress: () => onShowPayment() },
          { text: 'Abone Ol', onPress: () => onShowSubscription() }
        ]
      );
      return;
    }

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'İzin Gerekli',
        'Kamera kullanmak için kamera erişim izni gerekiyor.',
        [{ text: 'Tamam' }]
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      processImage(result.assets[0]);
    }
  };

  const handleGalleryPress = async () => {
    // Kredi veya abonelik kontrolü
    if (!userSubscription && userCredits <= 0) {
      Alert.alert(
        'Kredi Gerekli',
        'AI fotoğraf oluşturmak için kredi satın almanız veya abone olmanız gerekiyor.',
        [
          { text: 'İptal', style: 'cancel' },
          { text: 'Kredi Satın Al', onPress: () => onShowPayment() },
          { text: 'Abone Ol', onPress: () => onShowSubscription() }
        ]
      );
      return;
    }

    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      processImage(result.assets[0]);
    }
  };

  const processImage = async (imageAsset) => {
    setIsProcessing(true);
    
    try {
      // Simulate face detection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would use face detection API here
      const hasFace = Math.random() > 0.2; // Simulate 80% success rate
      
      if (hasFace) {
        setSelectedImage(imageAsset);
        setFaceDetected(true);
        Alert.alert(
          'Başarılı!',
          'Fotoğrafta yüz tespit edildi. Devam edebilirsiniz.',
          [{ text: 'Tamam' }]
        );
      } else {
        Alert.alert(
          'Yüz Bulunamadı',
          'Lütfen yüzünüzün net görüldüğü bir fotoğraf seçin.',
          [{ text: 'Tamam' }]
        );
      }
    } catch (error) {
      Alert.alert('Hata', 'Fotoğraf işlenirken bir hata oluştu.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleContinue = () => {
    if (selectedImage && faceDetected) {
      onPhotoSelected(selectedImage);
    }
  };

  const handleRetake = () => {
    setSelectedImage(null);
    setFaceDetected(false);
  };

  const renderUploadOptions = () => (
    <ScrollView 
      style={{ flex: 1 }}
      contentContainerStyle={{ 
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: theme.spacing.xl
      }}
      showsVerticalScrollIndicator={false}
    >

      {/* Header */}
      <View style={{ alignItems: 'center', marginBottom: theme.spacing['3xl'] }}>
        {/* Kredi Durumu */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.white,
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.sm,
            borderRadius: theme.borderRadius.full,
            marginBottom: theme.spacing.lg,
            ...theme.shadows.sm,
          }}
        >
          {userSubscription ? (
            <>
              <Ionicons name="star" size={20} color={theme.colors.gold} />
              <Text
                style={{
                  fontFamily: theme.typography.fontFamily.sans,
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.navy,
                  marginLeft: theme.spacing.sm,
                }}
              >
                {userSubscription?.name || 'Premium'} Abone
              </Text>
            </>
          ) : (
            <>
              <Ionicons name="diamond" size={20} color={theme.colors.teal} />
              <Text
                style={{
                  fontFamily: theme.typography.fontFamily.sans,
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.navy,
                  marginLeft: theme.spacing.sm,
                }}
              >
                {userCredits} Kredi
              </Text>
            </>
          )}
        </View>

        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: theme.colors.white,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: theme.spacing.xl,
            ...theme.shadows.lg,
          }}
        >
          <Image
            source={require('../../assets/ico.png')}
            style={{
              width: 75,
              height: 75,
              resizeMode: 'contain',
            }}
          />
        </View>
        
        
        <Text
          style={{
            fontFamily: theme.typography.fontFamily.sans,
            fontSize: theme.typography.fontSize.lg,
            color: theme.colors.gray600,
            textAlign: 'center',
            paddingHorizontal: theme.spacing.lg,
            lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.lg,
          }}
        >
          Yüzünüzün net görüldüğü bir fotoğraf seçin veya çekin
        </Text>
      </View>

      {/* Upload Buttons */}
      <View style={{ width: '100%', paddingHorizontal: theme.spacing.xl }}>
        <Button
          title="Kameradan Çek"
          variant="secondary"
          size="lg"
          onPress={handleCameraPress}
          icon={
            <Ionicons
              name="camera"
              size={24}
              color={theme.colors.cream}
            />
          }
          iconPosition="left"
          style={{ marginBottom: theme.spacing.lg }}
        />
        
        <Button
          title="Galeriden Seç"
          variant="secondary"
          size="lg"
          onPress={handleGalleryPress}
          icon={
            <Ionicons
              name="images"
              size={24}
              color={theme.colors.cream}
            />
          }
          iconPosition="left"
        />

        {/* Ödeme Butonları */}
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          marginTop: theme.spacing.lg,
          gap: theme.spacing.sm 
        }}>
          <Button
            title="Kredi Satın Al"
            variant="outline"
            size="md"
            onPress={() => onShowPayment()}
            icon={
              <Ionicons
                name="diamond"
                size={20}
                color={theme.colors.teal}
              />
            }
            iconPosition="left"
            style={{ 
              flex: 1,
              borderColor: theme.colors.teal,
            }}
          />
          
          <Button
            title="Abone Ol"
            variant="outline"
            size="md"
            onPress={() => onShowSubscription()}
            icon={
              <Ionicons
                name="star"
                size={20}
                color={theme.colors.gold}
              />
            }
            iconPosition="left"
            style={{ 
              flex: 1,
              borderColor: theme.colors.gold,
            }}
          />
        </View>
      </View>

      {/* Tips */}
      <Card
        variant="cream"
        style={{
          marginTop: theme.spacing['2xl'],
          marginHorizontal: theme.spacing.xl,
          backgroundColor: theme.colors.creamLight,
        }}
        title="İpuçları"
        icon={
          <Ionicons
            name="bulb"
            size={24}
            color={theme.colors.navy}
          />
        }
      >
        <View>
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.navyDark,
              lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.sm,
            }}
          >
            • Yüzünüz net ve iyi aydınlatılmış olmalı{'\n'}
            • Gözleriniz açık ve kameraya bakmalı{'\n'}
            • Başka kişiler fotoğrafta olmamalı{'\n'}
            • Kare şeklinde fotoğraf çekmeniz önerilir
          </Text>
        </View>
      </Card>

      {/* Banner Ad */}
      <BannerAd 
        size="standard"
        style={{ marginHorizontal: theme.spacing.xl }}
        onPress={() => console.log('Banner ad clicked')}
      />
    </ScrollView>
  );

  const renderImagePreview = () => (
    <ScrollView 
      style={{ flex: 1 }}
      contentContainerStyle={{ 
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: theme.spacing.xl
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Success Header */}
      <View style={{ alignItems: 'center', marginBottom: theme.spacing.xl }}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: theme.colors.success,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: theme.spacing.lg,
          }}
        >
          <Ionicons
            name="checkmark"
            size={40}
            color={theme.colors.white}
          />
        </View>
        
        <Text
          style={{
            fontFamily: theme.typography.fontFamily.serif,
            fontSize: theme.typography.fontSize['2xl'],
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.navy,
            textAlign: 'center',
            marginBottom: theme.spacing.sm,
          }}
        >
          Fotoğraf Hazır!
        </Text>
        
        <Text
          style={{
            fontFamily: theme.typography.fontFamily.sans,
            fontSize: theme.typography.fontSize.base,
            color: theme.colors.gray600,
            textAlign: 'center',
          }}
        >
          Yüzünüz başarıyla tespit edildi
        </Text>
      </View>

      {/* Image Preview */}
      <View
        style={{
          width: width * 0.7,
          height: width * 0.7,
          borderRadius: theme.borderRadius['2xl'],
          overflow: 'hidden',
          marginBottom: theme.spacing.xl,
          ...theme.shadows.lg,
        }}
      >
        <Image
          source={{ uri: selectedImage?.uri }}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
        />
        
        {/* Face Detection Overlay */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderWidth: 3,
            borderColor: theme.colors.success,
            borderRadius: theme.borderRadius['2xl'],
          }}
        />
      </View>

      {/* Action Buttons */}
      <View style={{ width: '100%', paddingHorizontal: theme.spacing.xl }}>
        <Button
          title="Devam Et"
          variant="secondary"
          size="lg"
          onPress={handleContinue}
          icon={
            <Ionicons
              name="arrow-forward"
              size={24}
              color={theme.colors.cream}
            />
          }
          iconPosition="right"
          style={{ marginBottom: theme.spacing.md }}
        />
        
        <Button
          title="Yeniden Seç"
          variant="outline"
          size="md"
          onPress={handleRetake}
          icon={
            <Ionicons
              name="refresh"
              size={20}
              color={theme.colors.burgundy}
            />
          }
          iconPosition="left"
        />
      </View>
    </ScrollView>
  );

  if (isProcessing) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.cream }}>
        <LoadingSpinner
          overlay
          text="Fotoğraf işleniyor ve yüz aranıyor..."
          color={theme.colors.burgundy}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.cream }}>
      <LinearGradient
        colors={[theme.colors.teal, theme.colors.tealLight]}
        style={{
          paddingTop: 60,
          paddingBottom: 40,
          paddingHorizontal: theme.spacing.xl,
          borderBottomLeftRadius: theme.borderRadius['2xl'],
          borderBottomRightRadius: theme.borderRadius['2xl'],
        }}
      >
        <Text
          style={{
            fontFamily: theme.typography.fontFamily.serif,
            fontSize: theme.typography.fontSize['2xl'],
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.white,
            textAlign: 'center',
          }}
        >
          Fotoğraf Yükleme
        </Text>
      </LinearGradient>

      {selectedImage && faceDetected ? renderImagePreview() : renderUploadOptions()}
    </View>
  );
};

export default UploadScreen;
