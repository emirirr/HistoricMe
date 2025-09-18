import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Input } from '../components/ui';
import { theme } from '../styles/theme';

const { width } = Dimensions.get('window');

const PaymentScreen = ({ 
  onPaymentSuccess, 
  onBack, 
  selectedPlan = null,
  isSubscription = false 
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Ödeme yöntemleri
  const paymentMethods = [
    {
      id: 'credit',
      name: 'Kredi Kartı',
      icon: 'card',
      description: 'Visa, Mastercard, American Express',
      color: theme.colors.teal
    },
    {
      id: 'mobile',
      name: 'Mobil Ödeme',
      icon: 'phone-portrait',
      description: 'Turkcell, Vodafone, Türk Telekom',
      color: theme.colors.burgundy
    },
    {
      id: 'bank',
      name: 'Banka Kartı',
      icon: 'business',
      description: 'Banka kartı ile ödeme',
      color: theme.colors.gold
    },
    {
      id: 'wallet',
      name: 'Dijital Cüzdan',
      icon: 'wallet',
      description: 'PayPal, Apple Pay, Google Pay',
      color: theme.colors.navy
    }
  ];

  // Fiyatlandırma planları
  const pricingPlans = [
    {
      id: 'single',
      name: 'Tek Kullanım',
      price: '₺9.99',
      description: '1 adet AI fotoğraf oluştur',
      features: ['Yüksek kalite', 'Hızlı işleme', 'Paylaşım'],
      popular: false
    },
    {
      id: 'pack5',
      name: '5\'li Paket',
      price: '₺39.99',
      originalPrice: '₺49.95',
      description: '5 adet AI fotoğraf oluştur',
      features: ['%20 indirim', 'Yüksek kalite', 'Hızlı işleme', 'Paylaşım'],
      popular: true
    },
    {
      id: 'pack10',
      name: '10\'lu Paket',
      price: '₺69.99',
      originalPrice: '₺99.90',
      description: '10 adet AI fotoğraf oluştur',
      features: ['%30 indirim', 'Yüksek kalite', 'Hızlı işleme', 'Paylaşım', 'Öncelikli destek'],
      popular: false
    },
    {
      id: 'unlimited',
      name: 'Sınırsız',
      price: '₺29.99',
      period: '/ay',
      description: 'Sınırsız AI fotoğraf oluştur',
      features: ['Sınırsız kullanım', 'Yüksek kalite', 'Hızlı işleme', 'Paylaşım', 'Öncelikli destek', 'Reklamsız'],
      popular: false,
      isSubscription: true
    }
  ];

  const handlePayment = async () => {
    if (!cardNumber || !expiryDate || !cvv || !cardName) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    setIsProcessing(true);

    // Simüle edilmiş ödeme işlemi
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        'Ödeme Başarılı!',
        'Ödemeniz başarıyla alındı. Artık AI fotoğraflarınızı oluşturabilirsiniz.',
        [
          {
            text: 'Tamam',
            onPress: () => onPaymentSuccess(selectedPlan)
          }
        ]
      );
    }, 2000);
  };

  const renderPaymentMethod = (method) => (
    <TouchableOpacity
      key={method.id}
      onPress={() => setSelectedPaymentMethod(method.id)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.md,
        marginBottom: theme.spacing.sm,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 2,
        borderColor: selectedPaymentMethod === method.id ? method.color : theme.colors.gray200,
        backgroundColor: selectedPaymentMethod === method.id ? `${method.color}10` : theme.colors.white,
        ...theme.shadows.sm,
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: method.color,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: theme.spacing.md,
        }}
      >
        <Ionicons name={method.icon} size={24} color={theme.colors.white} />
      </View>
      
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: theme.typography.fontFamily.sans,
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.navy,
            marginBottom: 4,
          }}
        >
          {method.name}
        </Text>
        <Text
          style={{
            fontFamily: theme.typography.fontFamily.sans,
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.gray600,
          }}
        >
          {method.description}
        </Text>
      </View>

      {selectedPaymentMethod === method.id && (
        <Ionicons name="checkmark-circle" size={24} color={method.color} />
      )}
    </TouchableOpacity>
  );

  const renderPricingPlan = (plan) => (
    <TouchableOpacity
      key={plan.id}
      onPress={() => setSelectedPlan(plan)}
      style={{
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.md,
        borderRadius: theme.borderRadius.xl,
        borderWidth: 2,
        borderColor: selectedPlan?.id === plan.id ? theme.colors.teal : theme.colors.gray200,
        backgroundColor: selectedPlan?.id === plan.id ? `${theme.colors.teal}10` : theme.colors.white,
        ...theme.shadows.md,
        position: 'relative',
      }}
    >
      {plan.popular && (
        <View
          style={{
            position: 'absolute',
            top: -10,
            left: 0,
            right: 0,
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.gold,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.xs,
              borderRadius: theme.borderRadius.full,
            }}
          >
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.xs,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.white,
              }}
            >
              EN POPÜLER
            </Text>
          </View>
        </View>
      )}

      <View style={{ alignItems: 'center', marginBottom: theme.spacing.md }}>
        <Text
          style={{
            fontFamily: theme.typography.fontFamily.serif,
            fontSize: theme.typography.fontSize['2xl'],
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.navy,
            marginBottom: theme.spacing.xs,
          }}
        >
          {plan.name}
        </Text>
        
        <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: theme.spacing.sm }}>
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.serif,
              fontSize: theme.typography.fontSize['3xl'],
              fontWeight: theme.typography.fontWeight.black,
              color: theme.colors.teal,
            }}
          >
            {plan.price}
          </Text>
          {plan.period && (
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.gray600,
                marginLeft: 4,
              }}
            >
              {plan.period}
            </Text>
          )}
        </View>

        {plan.originalPrice && (
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.sm,
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
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.gray600,
            textAlign: 'center',
            marginTop: theme.spacing.xs,
          }}
        >
          {plan.description}
        </Text>
      </View>

      <View>
        {plan.features.map((feature, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.xs }}>
            <Ionicons name="checkmark-circle" size={16} color={theme.colors.green} />
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.navyDark,
                marginLeft: theme.spacing.sm,
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
            Ödeme
          </Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: theme.spacing.lg }}
        showsVerticalScrollIndicator={false}
      >
        {/* Fiyatlandırma Planları */}
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
            Paket Seçin
          </Text>
          
          {pricingPlans.map(renderPricingPlan)}
        </Card>

        {/* Ödeme Yöntemleri */}
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
            }}
          >
            Ödeme Yöntemi
          </Text>
          
          {paymentMethods.map(renderPaymentMethod)}
        </Card>

        {/* Kredi Kartı Bilgileri */}
        {selectedPaymentMethod === 'credit' && (
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
              }}
            >
              Kart Bilgileri
            </Text>
            
            <Input
              placeholder="Kart Numarası"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
              maxLength={19}
              style={{ marginBottom: theme.spacing.md }}
            />
            
            <Input
              placeholder="Kart Üzerindeki İsim"
              value={cardName}
              onChangeText={setCardName}
              style={{ marginBottom: theme.spacing.md }}
            />
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Input
                placeholder="MM/YY"
                value={expiryDate}
                onChangeText={setExpiryDate}
                keyboardType="numeric"
                maxLength={5}
                style={{ flex: 1, marginRight: theme.spacing.sm }}
              />
              
              <Input
                placeholder="CVV"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                maxLength={3}
                style={{ flex: 1, marginLeft: theme.spacing.sm }}
              />
            </View>
          </Card>
        )}

        {/* Ödeme Butonu */}
        <Button
          title={isProcessing ? "İşleniyor..." : `₺${selectedPlan?.price || '0'} Öde`}
          variant="primary"
          size="lg"
          onPress={handlePayment}
          disabled={!selectedPlan || isProcessing}
          icon={
            <Ionicons
              name="card"
              size={24}
              color={theme.colors.white}
            />
          }
          iconPosition="left"
          style={{ marginBottom: theme.spacing.lg }}
        />

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

export default PaymentScreen;
