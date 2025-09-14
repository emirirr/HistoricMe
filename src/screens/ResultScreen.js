import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, Dimensions, Share, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import { Button, Card, LoadingSpinner } from '../components/ui';
import { theme } from '../styles/theme';

const { width, height } = Dimensions.get('window');

const ResultScreen = ({ userPhoto, selectedFigure, onNewPhoto }) => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [finalImage, setFinalImage] = useState(null);

  const styles = [
    {
      id: 'studio',
      name: 'Fotoğraf Stüdyosu',
      description: 'Klasik portre stili',
      icon: 'camera',
      color: theme.colors.burgundy,
    },
    {
      id: 'painting',
      name: 'Tablo Stili',
      description: 'Sanat eseri görünümü',
      icon: 'brush',
      color: theme.colors.teal,
    },
    {
      id: 'realistic',
      name: 'Gerçekçi Sahne',
      description: 'Tarihsel dönem atmosferi',
      icon: 'landscape',
      color: theme.colors.burgundy,
    },
  ];

  React.useEffect(() => {
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setGeneratedImages([
        { id: '1', uri: userPhoto?.uri, style: 'original' },
        { id: '2', uri: userPhoto?.uri, style: 'studio' },
        { id: '3', uri: userPhoto?.uri, style: 'painting' },
      ]);
    }, 3000);
  }, [userPhoto]);

  const handleStyleSelect = (style) => {
    setSelectedStyle(style);
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setFinalImage({
        uri: userPhoto?.uri, // In real app, this would be the AI-generated image
        style: style.id,
        figure: selectedFigure,
      });
      setIsGenerating(false);
    }, 2000);
  };

  const handleDownload = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('İzin Gerekli', 'Fotoğrafı indirmek için galeri erişim izni gerekiyor.');
        return;
      }

      // In a real app, you would save the actual generated image
      const asset = await MediaLibrary.createAssetAsync(userPhoto.uri);
      await MediaLibrary.createAlbumAsync('HistoricMe', asset, false);
      
      Alert.alert('Başarılı', 'Fotoğraf galerinize kaydedildi!');
    } catch (error) {
      Alert.alert('Hata', 'Fotoğraf kaydedilirken bir hata oluştu.');
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `HistoricMe ile ${selectedFigure.name} ile yan yana görünüyorum! 🏛️✨`,
        url: userPhoto?.uri, // In real app, this would be the generated image
      });
    } catch (error) {
      Alert.alert('Hata', 'Paylaşım yapılırken bir hata oluştu.');
    }
  };

  const renderProcessingScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LoadingSpinner
        text="AI fotoğrafınızı işliyor..."
        color={theme.colors.burgundy}
      />
      
      <Card
        variant="cream"
        style={{
          marginTop: theme.spacing.xl,
          marginHorizontal: theme.spacing.xl,
          alignItems: 'center',
        }}
      >
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
          {selectedFigure.name} ile hazırlanıyor
        </Text>
        <Text
          style={{
            fontFamily: theme.typography.fontFamily.sans,
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.gray600,
            textAlign: 'center',
          }}
        >
          Bu işlem birkaç dakika sürebilir
        </Text>
      </Card>
    </View>
  );

  const renderStyleSelection = () => (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: theme.spacing.lg }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={{ alignItems: 'center', marginBottom: theme.spacing.xl }}>
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
          Stil Seçin
        </Text>
        <Text
          style={{
            fontFamily: theme.typography.fontFamily.sans,
            fontSize: theme.typography.fontSize.base,
            color: theme.colors.gray600,
            textAlign: 'center',
          }}
        >
          Hangi stilde görünmek istiyorsunuz?
        </Text>
      </View>

      {/* Style Options */}
      {styles.map((style) => (
        <TouchableOpacity
          key={style.id}
          onPress={() => handleStyleSelect(style)}
          style={{ marginBottom: theme.spacing.lg }}
        >
          <Card
            variant="default"
            style={{
              borderWidth: 2,
              borderColor: theme.colors.gray200,
              ...theme.shadows.md,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: style.color,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: theme.spacing.lg,
                }}
              >
                <Ionicons
                  name={style.icon}
                  size={30}
                  color={theme.colors.white}
                />
              </View>
              
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: theme.typography.fontFamily.serif,
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.navy,
                    marginBottom: theme.spacing.xs,
                  }}
                >
                  {style.name}
                </Text>
                <Text
                  style={{
                    fontFamily: theme.typography.fontFamily.sans,
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.gray600,
                  }}
                >
                  {style.description}
                </Text>
              </View>
              
              <Ionicons
                name="chevron-forward"
                size={24}
                color={theme.colors.gray400}
              />
            </View>
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderFinalResult = () => (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: theme.spacing.lg }}
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
          Harika! Tamamlandı
        </Text>
        
        <Text
          style={{
            fontFamily: theme.typography.fontFamily.sans,
            fontSize: theme.typography.fontSize.base,
            color: theme.colors.gray600,
            textAlign: 'center',
          }}
        >
          {selectedFigure.name} ile {selectedStyle?.name.toLowerCase()} stili
        </Text>
      </View>

      {/* Final Image */}
      <View
        style={{
          alignItems: 'center',
          marginBottom: theme.spacing.xl,
        }}
      >
        <View
          style={{
            width: width * 0.8,
            height: width * 0.8,
            borderRadius: theme.borderRadius['2xl'],
            overflow: 'hidden',
            ...theme.shadows.lg,
            borderWidth: 4,
            borderColor: theme.colors.burgundy,
          }}
        >
          <Image
            source={{ uri: finalImage?.uri }}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
          />
          
          {/* HistoricMe Watermark */}
          <View
            style={{
              position: 'absolute',
              bottom: theme.spacing.md,
              right: theme.spacing.md,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: theme.spacing.xs,
              borderRadius: theme.borderRadius.md,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Ionicons
              name="diamond"
              size={16}
              color={theme.colors.burgundy}
            />
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.white,
                marginLeft: theme.spacing.xs,
                fontWeight: theme.typography.fontWeight.semibold,
              }}
            >
              HistoricMe
            </Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={{ marginBottom: theme.spacing.xl }}>
        <Button
          title="İndir"
          variant="primary"
          size="lg"
          onPress={handleDownload}
          icon={
            <Ionicons
              name="download"
              size={24}
              color={theme.colors.white}
            />
          }
          iconPosition="left"
          style={{ marginBottom: theme.spacing.md }}
        />
        
        <Button
          title="Paylaş"
          variant="secondary"
          size="lg"
          onPress={handleShare}
          icon={
            <Ionicons
              name="share"
              size={24}
              color={theme.colors.cream}
            />
          }
          iconPosition="left"
          style={{ marginBottom: theme.spacing.md }}
        />
        
        <Button
          title="Yeni Fotoğraf"
          variant="outline"
          size="md"
          onPress={onNewPhoto}
          icon={
            <Ionicons
              name="camera"
              size={20}
              color={theme.colors.burgundy}
            />
          }
          iconPosition="left"
        />
      </View>

      {/* Info Card */}
      <Card
        variant="cream"
        style={{
          alignItems: 'center',
          backgroundColor: theme.colors.creamLight,
        }}
        title="HistoricMe Hakkında"
        icon={
          <Ionicons
            name="information-circle"
            size={24}
            color={theme.colors.navy}
          />
        }
      >
        <Text
          style={{
            fontFamily: theme.typography.fontFamily.sans,
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.navyDark,
            textAlign: 'center',
            lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.sm,
          }}
        >
          Bu görsel AI teknolojisi kullanılarak oluşturulmuştur. 
          Tarihi figürlerin görüntüleri eğitim amaçlı kullanılmıştır.
        </Text>
      </Card>
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
          Sonuç
        </Text>
      </LinearGradient>

      {isProcessing ? (
        renderProcessingScreen()
      ) : isGenerating ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <LoadingSpinner
            text={`${selectedStyle?.name} stili uygulanıyor...`}
            color={theme.colors.burgundy}
          />
        </View>
      ) : finalImage ? (
        renderFinalResult()
      ) : (
        renderStyleSelection()
      )}
    </View>
  );
};

export default ResultScreen;
