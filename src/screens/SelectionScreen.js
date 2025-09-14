import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card } from '../components/ui';
import { theme } from '../styles/theme';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

const historicalFigures = {
  leaders: [
    {
      id: 'napoleon',
      name: 'Napolyon Bonaparte',
      title: 'Fransız İmparatoru',
      era: '1769-1821',
      image: '👑',
      description: 'Fransa İmparatoru ve büyük askeri deha',
      popularity: 95,
    },
    {
      id: 'washington',
      name: 'George Washington',
      title: 'ABD\'nin İlk Başkanı',
      era: '1732-1799',
      image: '🇺🇸',
      description: 'Amerika Birleşik Devletleri\'nin kurucusu',
      popularity: 92,
    },
    {
      id: 'caesar',
      name: 'Julius Caesar',
      title: 'Roma İmparatoru',
      era: 'MÖ 100-44',
      image: '🏛️',
      description: 'Roma Cumhuriyeti\'nin son diktatörü',
      popularity: 98,
    },
    {
      id: 'alexander',
      name: 'Büyük İskender',
      title: 'Makedon Kralı',
      era: 'MÖ 356-323',
      image: '⚔️',
      description: 'Dünyayı fetheden genç komutan',
      popularity: 96,
    },
  ],
  scientists: [
    {
      id: 'einstein',
      name: 'Albert Einstein',
      title: 'Fizikçi',
      era: '1879-1955',
      image: '🧠',
      description: 'Görelilik teorisinin yaratıcısı',
      popularity: 99,
    },
    {
      id: 'curie',
      name: 'Marie Curie',
      title: 'Fizikçi & Kimyager',
      era: '1867-1934',
      image: '🔬',
      description: 'Nobel ödülü kazanan ilk kadın',
      popularity: 94,
    },
    {
      id: 'newton',
      name: 'Isaac Newton',
      title: 'Matematikçi & Fizikçi',
      era: '1643-1727',
      image: '🍎',
      description: 'Yerçekimi yasasını keşfeden bilim insanı',
      popularity: 97,
    },
    {
      id: 'darwin',
      name: 'Charles Darwin',
      title: 'Doğa Bilimci',
      era: '1809-1882',
      image: '🐒',
      description: 'Evrim teorisinin babası',
      popularity: 93,
    },
  ],
  artists: [
    {
      id: 'leonardo',
      name: 'Leonardo da Vinci',
      title: 'Rönesans Sanatçısı',
      era: '1452-1519',
      image: '🎨',
      description: 'Mona Lisa\'nın yaratıcısı',
      popularity: 100,
    },
    {
      id: 'van_gogh',
      name: 'Vincent van Gogh',
      title: 'Post-Emprasyonist',
      era: '1853-1890',
      image: '🌻',
      description: 'Yıldızlı Gece\'nin ressamı',
      popularity: 96,
    },
    {
      id: 'michelangelo',
      name: 'Michelangelo',
      title: 'Heykeltıraş & Ressam',
      era: '1475-1564',
      image: '⛪',
      description: 'Sistine Şapeli\'nin yaratıcısı',
      popularity: 98,
    },
    {
      id: 'picasso',
      name: 'Pablo Picasso',
      title: 'Kübist Sanatçı',
      era: '1881-1973',
      image: '🎭',
      description: 'Modern sanatın öncüsü',
      popularity: 95,
    },
  ],
};

const SelectionScreen = ({ onFigureSelected }) => {
  const [selectedCategory, setSelectedCategory] = useState('leaders');
  const [selectedFigure, setSelectedFigure] = useState(null);

  const categories = [
    { id: 'leaders', name: 'Liderler', icon: 'diamond', color: theme.colors.burgundy },
    { id: 'scientists', name: 'Bilim İnsanları', icon: 'flask', color: theme.colors.teal },
    { id: 'artists', name: 'Sanatçılar', icon: 'brush', color: theme.colors.burgundy },
  ];

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedFigure(null);
  };

  const handleFigureSelect = (figure) => {
    setSelectedFigure(figure);
  };

  const handleContinue = () => {
    if (selectedFigure) {
      onFigureSelected(selectedFigure);
    }
  };

  const renderCategoryTabs = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginBottom: theme.spacing.lg }}
      contentContainerStyle={{ paddingHorizontal: theme.spacing.md }}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          onPress={() => handleCategorySelect(category.id)}
          style={{
            marginRight: theme.spacing.md,
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.md,
            borderRadius: theme.borderRadius.full,
            backgroundColor: selectedCategory === category.id ? category.color : theme.colors.white,
            borderWidth: 2,
            borderColor: selectedCategory === category.id ? category.color : theme.colors.gray200,
            flexDirection: 'row',
            alignItems: 'center',
            ...theme.shadows.sm,
          }}
        >
          <Ionicons
            name={category.icon}
            size={20}
            color={selectedCategory === category.id ? theme.colors.white : category.color}
            style={{ marginRight: theme.spacing.sm }}
          />
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.semibold,
              color: selectedCategory === category.id ? theme.colors.white : category.color,
            }}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderFigureCard = (figure) => (
    <TouchableOpacity
      key={figure.id}
      onPress={() => handleFigureSelect(figure)}
      style={{
        width: cardWidth,
        marginBottom: theme.spacing.md,
        marginHorizontal: 5,
      }}
    >
      <Card
        variant={selectedFigure?.id === figure.id ? 'navy' : 'default'}
        style={{
          height: 280,
          borderWidth: selectedFigure?.id === figure.id ? 3 : 1,
          borderColor: selectedFigure?.id === figure.id ? theme.colors.gold : theme.colors.gray200,
          ...theme.shadows.md,
        }}
      >
        <View style={{ alignItems: 'center', flex: 1 }}>
          {/* Emoji */}
          <Text
            style={{
              fontSize: 60,
              marginBottom: theme.spacing.md,
            }}
          >
            {figure.image}
          </Text>

          {/* Name */}
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.serif,
              fontSize: theme.typography.fontSize.base,
              fontWeight: theme.typography.fontWeight.bold,
              color: selectedFigure?.id === figure.id ? theme.colors.white : theme.colors.navy,
              textAlign: 'center',
              marginBottom: theme.spacing.xs,
            }}
          >
            {figure.name}
          </Text>

          {/* Title */}
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.sm,
              color: selectedFigure?.id === figure.id ? theme.colors.cream : theme.colors.gray600,
              textAlign: 'center',
              marginBottom: theme.spacing.xs,
            }}
          >
            {figure.title}
          </Text>

          {/* Era */}
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.xs,
              color: selectedFigure?.id === figure.id ? theme.colors.creamLight : theme.colors.gray500,
              textAlign: 'center',
              marginBottom: theme.spacing.sm,
            }}
          >
            {figure.era}
          </Text>

          {/* Popularity */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: theme.spacing.sm,
            }}
          >
            <Ionicons
              name="star"
              size={12}
              color={selectedFigure?.id === figure.id ? theme.colors.gold : theme.colors.gold}
            />
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.xs,
                color: selectedFigure?.id === figure.id ? theme.colors.gold : theme.colors.gray500,
                marginLeft: 4,
              }}
            >
              {figure.popularity}% Popüler
            </Text>
          </View>

          {/* Description */}
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.xs,
              color: selectedFigure?.id === figure.id ? theme.colors.cream : theme.colors.gray600,
              textAlign: 'center',
              lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.xs,
            }}
          >
            {figure.description}
          </Text>
        </View>
      </Card>
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
        }}
      >
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
          Tarih Figürü Seç
        </Text>
        <Text
          style={{
            fontFamily: theme.typography.fontFamily.sans,
            fontSize: theme.typography.fontSize.base,
            color: theme.colors.cream,
            textAlign: 'center',
            opacity: 0.9,
          }}
        >
          Hangi tarihi figürle yan yana görünmek istiyorsun?
        </Text>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: theme.spacing.md }}
        showsVerticalScrollIndicator={false}
      >
        {/* Category Tabs */}
        {renderCategoryTabs()}

        {/* Figures Grid */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingHorizontal: theme.spacing.sm,
          }}
        >
          {historicalFigures[selectedCategory]?.map(renderFigureCard)}
        </View>

        {/* Selected Figure Details */}
        {selectedFigure && (
          <Card
            variant="gold"
            style={{
              marginTop: theme.spacing.lg,
              marginHorizontal: theme.spacing.sm,
              ...theme.shadows.lg,
            }}
            title="Seçilen Figür"
            icon={
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={theme.colors.black}
              />
            }
          >
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.serif,
                fontSize: theme.typography.fontSize.lg,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.black,
                textAlign: 'center',
                marginBottom: theme.spacing.sm,
              }}
            >
              {selectedFigure.name}
            </Text>
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.black,
                textAlign: 'center',
                opacity: 0.8,
              }}
            >
              {selectedFigure.title} • {selectedFigure.era}
            </Text>
          </Card>
        )}
      </ScrollView>

      {/* Continue Button */}
      {selectedFigure && (
        <View
          style={{
            padding: theme.spacing.lg,
            backgroundColor: theme.colors.white,
            borderTopWidth: 1,
            borderTopColor: theme.colors.gray200,
          }}
        >
          <Button
            title="Devam Et"
            variant="primary"
            size="lg"
            onPress={handleContinue}
            icon={
              <Ionicons
                name="arrow-forward"
                size={24}
                color={theme.colors.white}
              />
            }
            iconPosition="right"
          />
        </View>
      )}
    </View>
  );
};

export default SelectionScreen;
