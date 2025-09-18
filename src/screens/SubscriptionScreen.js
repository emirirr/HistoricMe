import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card } from '../components/ui';
import { completeLightTheme as theme } from '../styles/theme';

const { width } = Dimensions.get('window');

const SubscriptionScreen = ({ 
  onSubscriptionSuccess, 
  onBack,
  currentSubscription = null 
}) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Abonelik planları
  const subscriptionPlans = [
    {
      id: 'monthly',
      name: 'Aylık',
      price: '₺29.99',
      period: '/ay',
      description: 'Sınırsız AI fotoğraf oluştur',
      features: [
        'Sınırsız kullanım',
        'Yüksek kalite',
        'Hızlı işleme',
        'Paylaşım',
        'Öncelikli destek',
        'Reklamsız deneyim'
      ],
      popular: false
    },
    {
      id: 'yearly',
      name: 'Yıllık',
      price: '₺299.99',
      period: '/yıl',
      originalPrice: '₺359.88',
      description: 'Sınırsız AI fotoğraf oluştur',
      features: [
        'Sınırsız kullanım',
        'Yüksek kalite',
        'Hızlı işleme',
        'Paylaşım',
        'Öncelikli destek',
        'Reklamsız deneyim',
        '%17 indirim'
      ],
      popular: true
    },
    {
      id: 'lifetime',
      name: 'Yaşam Boyu',
      price: '₺599.99',
      period: 'tek seferlik',
      description: 'Sınırsız AI fotoğraf oluştur',
      features: [
        'Sınırsız kullanım',
        'Yüksek kalite',
        'Hızlı işleme',
        'Paylaşım',
        'Öncelikli destek',
        'Reklamsız deneyim',
        'Yaşam boyu erişim',
        'Tüm gelecek güncellemeler'
      ],
      popular: false
    }
  ];

  const handleSubscription = async () => {
    if (!selectedPlan) {
      Alert.alert('Hata', 'Lütfen bir abonelik planı seçin.');
      return;
    }

    setIsProcessing(true);

    // Simüle edilmiş abonelik işlemi
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        'Abonelik Başarılı!',
        `${selectedPlan.name} aboneliğiniz başarıyla aktif edildi. Artık sınırsız AI fotoğraflarınızı oluşturabilirsiniz.`,
        [
          {
            text: 'Tamam',
            onPress: () => onSubscriptionSuccess(selectedPlan)
          }
        ]
      );
    }, 2000);
  };

  const handleCancelSubscription = () => {
    Alert.alert(
      'Aboneliği İptal Et',
      'Aboneliğinizi iptal etmek istediğinizden emin misiniz? Mevcut dönem sonuna kadar kullanmaya devam edebilirsiniz.',
      [
        { text: 'Hayır', style: 'cancel' },
        {
          text: 'Evet, İptal Et',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Abonelik İptal Edildi', 'Aboneliğiniz iptal edildi. Mevcut dönem sonuna kadar kullanmaya devam edebilirsiniz.');
          }
        }
      ]
    );
  };

  const renderSubscriptionPlan = (plan) => (
    <TouchableOpacity
      key={plan.id}
      onPress={() => setSelectedPlan(plan)}
      style={{
        padding: theme.spacing.xl,
        marginBottom: theme.spacing.lg,
        borderRadius: theme.borderRadius.xl,
        borderWidth: 2,
        borderColor: selectedPlan?.id === plan.id ? theme.colors.teal : theme.colors.gray200,
        backgroundColor: selectedPlan?.id === plan.id ? `${theme.colors.teal}10` : theme.colors.white,
        ...theme.shadows.lg,
        position: 'relative',
      }}
    >
      {plan.popular && (
        <View
          style={{
            position: 'absolute',
            top: -15,
            left: 0,
            right: 0,
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.gold,
              paddingHorizontal: theme.spacing.lg,
              paddingVertical: theme.spacing.sm,
              borderRadius: theme.borderRadius.full,
              ...theme.shadows.md,
            }}
          >
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.white,
              }}
            >
              EN POPÜLER
            </Text>
          </View>
        </View>
      )}

      <View style={{ alignItems: 'center', marginBottom: theme.spacing.lg }}>
        <Text
          style={{
            fontFamily: theme.typography.fontFamily.serif,
            fontSize: theme.typography.fontSize['2xl'],
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.navy,
            marginBottom: theme.spacing.sm,
          }}
        >
          {plan.name}
        </Text>
        
        <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: theme.spacing.sm }}>
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.serif,
              fontSize: theme.typography.fontSize['4xl'],
              fontWeight: theme.typography.fontWeight.black,
              color: theme.colors.teal,
            }}
          >
            {plan.price}
          </Text>
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.lg,
              color: theme.colors.gray600,
              marginLeft: 4,
            }}
          >
            {plan.period}
          </Text>
        </View>

        {plan.originalPrice && (
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.base,
              color: theme.colors.gray500,
              textDecorationLine: 'line-through',
            }}
          >
            {plan.originalPrice}
          </Text>
        )}

        <Text
          style={{
            fontFamily: theme.typography.fontFamily.sans,
            fontSize: theme.typography.fontSize.base,
            color: theme.colors.gray600,
            textAlign: 'center',
            marginTop: theme.spacing.sm,
          }}
        >
          {plan.description}
        </Text>
      </View>

      <View>
        {plan.features.map((feature, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.sm }}>
            <Ionicons name="checkmark-circle" size={18} color={theme.colors.green} />
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.navyDark,
                marginLeft: theme.spacing.md,
              }}
            >
              {feature}
            </Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
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
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.md }}>
          <TouchableOpacity
            onPress={onBack}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: theme.spacing.md,
            }}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
          </TouchableOpacity>
          
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.serif,
              fontSize: theme.typography.fontSize['2xl'],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.white,
              flex: 1,
            }}
          >
            Abonelik
          </Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: theme.spacing.lg }}
        showsVerticalScrollIndicator={false}
      >
        {/* Mevcut Abonelik */}
        {currentSubscription && (
          <Card
            variant="white"
            style={{ marginBottom: theme.spacing.xl }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.md }}>
              <Ionicons name="checkmark-circle" size={24} color={theme.colors.green} />
              <Text
                style={{
                  fontFamily: theme.typography.fontFamily.serif,
                  fontSize: theme.typography.fontSize.lg,
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.navy,
                  marginLeft: theme.spacing.sm,
                }}
              >
                Aktif Abonelik
              </Text>
            </View>
            
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.gray600,
                marginBottom: theme.spacing.md,
              }}
            >
              {currentSubscription.name} - {currentSubscription.price}{currentSubscription.period}
            </Text>
            
            <Button
              title="Aboneliği İptal Et"
              variant="outline"
              size="md"
              onPress={handleCancelSubscription}
              style={{ borderColor: theme.colors.red }}
            />
          </Card>
        )}

        {/* Abonelik Planları */}
        <Card
          variant="white"
          style={{ marginBottom: theme.spacing.xl }}
        >
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.serif,
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.navy,
              marginBottom: theme.spacing.lg,
              textAlign: 'center',
            }}
          >
            Abonelik Planları
          </Text>
          
          {subscriptionPlans.map(renderSubscriptionPlan)}
        </Card>

        {/* Abonelik Butonu */}
        <Button
          title={isProcessing ? "İşleniyor..." : selectedPlan ? `₺${selectedPlan.price} Abone Ol` : "Plan Seçin"}
          variant="primary"
          size="lg"
          onPress={handleSubscription}
          disabled={!selectedPlan || isProcessing}
          icon={
            <Ionicons
              name="star"
              size={24}
              color={theme.colors.white}
            />
          }
          iconPosition="left"
          style={{ marginBottom: theme.spacing.lg }}
        />

        {/* Avantajlar */}
        <Card
          variant="white"
          style={{ marginBottom: theme.spacing.lg }}
        >
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.serif,
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.navy,
              marginBottom: theme.spacing.md,
              textAlign: 'center',
            }}
          >
            Abonelik Avantajları
          </Text>
          
          {[
            'Sınırsız AI fotoğraf oluşturma',
            'Yüksek kaliteli çıktılar',
            'Hızlı işleme süreleri',
            'Reklamsız deneyim',
            'Öncelikli müşteri desteği',
            'Yeni özelliklerden ilk haberdar olma'
          ].map((advantage, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.sm }}>
              <Ionicons name="star" size={16} color={theme.colors.gold} />
              <Text
                style={{
                  fontFamily: theme.typography.fontFamily.sans,
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.navyDark,
                  marginLeft: theme.spacing.sm,
                }}
              >
                {advantage}
              </Text>
            </View>
          ))}
        </Card>

        {/* Güvenlik Bilgisi */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: theme.spacing.lg,
          }}
        >
          <Ionicons name="shield-checkmark" size={20} color={theme.colors.green} />
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.gray600,
              marginLeft: theme.spacing.sm,
            }}
          >
            Güvenli ödeme - SSL şifreleme
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SubscriptionScreen;
