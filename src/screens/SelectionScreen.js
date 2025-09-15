import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card } from '../components/ui';
import { theme } from '../styles/theme';

const { width } = Dimensions.get('window');
const cardWidth = (width - 80) / 2;

const historicalFigures = {
  leaders: [
    {
      id: 'napoleon',
      name: 'Napolyon Bonaparte',
      title: 'Fransız İmparatoru',
      era: '1769-1821',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg',
      description: 'Fransa İmparatoru ve büyük askeri deha',
      popularity: 95,
    },
    {
      id: 'washington',
      name: 'George Washington',
      title: 'ABD\'nin İlk Başkanı',
      era: '1732-1799',
      image: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg',
      description: 'Amerika Birleşik Devletleri\'nin kurucusu',
      popularity: 92,
    },
     {
       id: 'caesar',
       name: 'Julius Caesar',
       title: 'Roma İmparatoru',
       era: 'MÖ 100-44',
       image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=face',
       description: 'Roma Cumhuriyeti\'nin son diktatörü',
       popularity: 98,
     },
     {
       id: 'alexander',
       name: 'Büyük İskender',
       title: 'Makedon Kralı',
       era: 'MÖ 356-323',
       image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=face',
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
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg',
      description: 'Görelilik teorisinin yaratıcısı',
      popularity: 99,
    },
    {
      id: 'curie',
      name: 'Marie Curie',
      title: 'Fizikçi & Kimyager',
      era: '1867-1934',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Marie_Curie_c1920.jpg',
      description: 'Nobel ödülü kazanan ilk kadın',
      popularity: 94,
    },
    {
      id: 'newton',
      name: 'Isaac Newton',
      title: 'Matematikçi & Fizikçi',
      era: '1643-1727',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Portrait_of_Sir_Isaac_Newton%2C_1689.jpg',
      description: 'Yerçekimi yasasını keşfeden bilim insanı',
      popularity: 97,
    },
    {
      id: 'darwin',
      name: 'Charles Darwin',
      title: 'Doğa Bilimci',
      era: '1809-1882',
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Charles_Darwin_seated_crop.jpg',
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
      image: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Leonardo_self.jpg',
      description: 'Mona Lisa\'nın yaratıcısı',
      popularity: 100,
    },
    {
      id: 'van_gogh',
      name: 'Vincent van Gogh',
      title: 'Post-Emprasyonist',
      era: '1853-1890',
      image: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg',
      description: 'Yıldızlı Gece\'nin ressamı',
      popularity: 96,
    },
     {
       id: 'michelangelo',
       name: 'Michelangelo',
       title: 'Heykeltıraş & Ressam',
       era: '1475-1564',
       image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Busto_del_Duomo_di_Firenze_-_Giuliano_da_Sangallo_-_Michelangelo.jpg/800px-Busto_del_Duomo_di_Firenze_-_Giuliano_da_Sangallo_-_Michelangelo.jpg',
       description: 'Sistine Şapeli\'nin yaratıcısı',
       popularity: 98,
     },
     {
       id: 'picasso',
       name: 'Pablo Picasso',
       title: 'Kübist Sanatçı',
       era: '1881-1973',
       image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Pablo_picasso_1.jpg/800px-Pablo_picasso_1.jpg',
       description: 'Modern sanatın öncüsü',
       popularity: 95,
     },
  ],
   ottoman: [
     {
       id: 'mehmed_fatih',
       name: 'Fatih Sultan Mehmed',
       title: 'Osmanlı Padişahı',
       era: '1432-1481',
       image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQZIwsfKNUKw1DbQc8JZZ7wfGbe-a0nNWABHZ-lzaLRQxLo6LMQtDH6VhZSdoj6qrE1ofB7nc5XjYazi75gQcOC3Sl9VC-q1fbqSe5ttojk',
       description: 'İstanbul\'u fetheden büyük padişah',
       popularity: 100,
     },
     {
       id: 'suleiman',
       name: 'Kanuni Sultan Süleyman',
       title: 'Osmanlı Padişahı',
       era: '1494-1566',
       image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSYfBLEoJKxk_vHYABiw9Dp_tBorjjBXxpUJm3oJuxBCGIPTLiGCxOrBxBOEeJQmjLHCp6CVj3BSs5jgQ5uXtf64grWK7Y5_-YhH2tEaNdgRg',
       description: 'Osmanlı\'nın en güçlü padişahı',
       popularity: 99,
     },
     {
       id: 'selim_yavuz',
       name: 'Yavuz Sultan Selim',
       title: 'Osmanlı Padişahı',
       era: '1470-1520',
       image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Yavuz_Sultan_Selim_Han_%28cropped%29.jpg/250px-Yavuz_Sultan_Selim_Han_%28cropped%29.jpg',
       description: 'Halifeliği Osmanlı\'ya getiren padişah',
       popularity: 97,
     },
     {
       id: 'abdulhamid',
       name: 'II. Abdülhamid',
       title: 'Osmanlı Padişahı',
       era: '1842-1918',
       image: 'https://turkmaarifansiklopedisi.org.tr/uploads/matter/original/abdulhamid-ii-1676e6972ae64f.webp',
       description: 'Son büyük Osmanlı padişahı',
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
    { id: 'ottoman', name: 'Osmanlı Padişahları', icon: 'crown', color: theme.colors.gold },
  ];

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedFigure(null);
  };

  const handleFigureSelect = (figure) => {
    setSelectedFigure(figure);
  };

  const handleContinue = () => {
    if (selectedFigure && selectedFigure.name) {
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
           {category.id === 'ottoman' ? (
             <Image
               source={require('../../assets/Osmanli_armasi.svg.png')}
               style={{
                 width: 20,
                 height: 20,
                 marginRight: theme.spacing.sm,
                 resizeMode: 'contain',
               }}
              
             />
           ) : (
             <Ionicons
               name={category.icon}
               size={20}
               color={selectedCategory === category.id ? theme.colors.white : category.color}
               style={{ marginRight: theme.spacing.sm }}
             />
           )}
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
        marginHorizontal: theme.spacing.xs,
      }}
    >
      <Card
        variant={selectedFigure?.id === figure.id ? 'navy' : 'default'}
        style={{
          height: 320,
          borderWidth: selectedFigure?.id === figure.id ? 3 : 1,
          borderColor: selectedFigure?.id === figure.id ? theme.colors.gold : theme.colors.gray200,
          ...theme.shadows.md,
        }}
      >
        <View style={{ alignItems: 'center', flex: 1 }}>
          {/* Historical Figure Image */}
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              overflow: 'hidden',
              marginBottom: theme.spacing.md,
              borderWidth: 3,
              borderColor: selectedFigure?.id === figure.id ? theme.colors.gold : theme.colors.gray200,
              ...theme.shadows.sm,
            }}
          >
            {figure.image ? (
              <Image
                source={{ uri: figure.image }}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                }}
                onError={() => console.log('Image failed to load:', figure.name)}
                defaultSource={require('../../assets/ico.png')}
              />
            ) : (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: selectedFigure?.id === figure.id ? theme.colors.gold : theme.colors.gray200,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons
                  name="person"
                  size={40}
                  color={selectedFigure?.id === figure.id ? theme.colors.white : theme.colors.gray500}
                />
              </View>
            )}
          </View>

          {/* Name */}
          <View
            style={{
              backgroundColor: '#FFFFFF',
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
              borderRadius: theme.borderRadius.md,
              marginBottom: theme.spacing.sm,
              borderWidth: 2,
              borderColor: theme.colors.teal,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.serif,
                fontSize: theme.typography.fontSize.lg,
                fontWeight: theme.typography.fontWeight.bold,
                color: '#000000',
                textAlign: 'center',
              }}
            >
              {figure.name}
            </Text>
          </View>

          {/* Title */}
          <View
            style={{
              backgroundColor: '#FFFFFF',
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.xs,
              borderRadius: theme.borderRadius.md,
              marginBottom: theme.spacing.sm,
              borderWidth: 1,
              borderColor: theme.colors.gray300,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 3,
            }}
          >
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.base,
                fontWeight: theme.typography.fontWeight.semibold,
                color: '#333333',
                textAlign: 'center',
              }}
            >
              {figure.title}
            </Text>
          </View>

          {/* Era */}
          <View
            style={{
              backgroundColor: '#F8F9FA',
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: theme.spacing.xs / 2,
              borderRadius: theme.borderRadius.sm,
              marginBottom: theme.spacing.sm,
            }}
          >
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.xs,
                color: '#666666',
                textAlign: 'center',
                fontWeight: theme.typography.fontWeight.medium,
              }}
            >
              {figure.era}
            </Text>
          </View>

          {/* Popularity */}
          <View
            style={{
              backgroundColor: '#FFF3CD',
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: theme.spacing.xs / 2,
              borderRadius: theme.borderRadius.sm,
              marginBottom: theme.spacing.sm,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons
              name="star"
              size={14}
              color="#856404"
            />
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.xs,
                color: '#856404',
                marginLeft: 4,
                fontWeight: theme.typography.fontWeight.medium,
              }}
            >
              {figure.popularity}% Popüler
            </Text>
          </View>

          {/* Description */}
          <View
            style={{
              backgroundColor: '#E9ECEF',
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: theme.spacing.xs,
              borderRadius: theme.borderRadius.sm,
            }}
          >
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.xs,
                color: '#495057',
                textAlign: 'center',
                lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.xs,
                fontWeight: theme.typography.fontWeight.medium,
              }}
            >
              {figure.description}
            </Text>
          </View>
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
          paddingBottom: 40,
          paddingHorizontal: theme.spacing.xl,
          borderBottomLeftRadius: theme.borderRadius['2xl'],
          borderBottomRightRadius: theme.borderRadius['2xl'],
        }}
      >
        {/* Header with Logo */}
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
            Tarih Figürü Seç
          </Text>
        </View>
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
            paddingHorizontal: theme.spacing.md,
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
              {selectedFigure?.name || 'Bilinmeyen Figür'}
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
              {selectedFigure?.title || 'Bilinmeyen'} • {selectedFigure?.era || 'Bilinmeyen'}
            </Text>
          </Card>
        )}
      </ScrollView>

      {/* Continue Button */}
      {selectedFigure && (
        <View
          style={{
            padding: theme.spacing.lg,
            backgroundColor: theme.colors.cream,
            borderTopWidth: 1,
            borderTopColor: theme.colors.gray200,
            ...theme.shadows.lg,
          }}
        >
          <Button
            title={`${selectedFigure?.name || 'Seçilen Figür'} ile Devam Et`}
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
            style={{
              ...theme.shadows.md,
              borderWidth: 2,
              borderColor: theme.colors.teal,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default SelectionScreen;
