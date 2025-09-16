import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';

const Navbar = ({ currentScreen, onNavigate, user }) => {
  const navItems = [
    {
      id: 'Upload',
      title: 'Ana Sayfa',
      icon: 'home-outline',
      activeIcon: 'home',
    },
    {
      id: 'Discover',
      title: 'Keşfet',
      icon: 'compass-outline',
      activeIcon: 'compass',
    },
    {
      id: 'Profile',
      title: 'Profil',
      icon: 'person-outline',
      activeIcon: 'person',
    },
  ];

  return (
    <View
      style={{
        backgroundColor: theme.colors.white,
        borderTopWidth: 1,
        borderTopColor: theme.colors.gray200,
        paddingBottom: 15,
        paddingTop: 8,
        ...theme.shadows.sm,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingHorizontal: theme.spacing.md,
          gap: theme.spacing.sm,
        }}
      >
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => onNavigate(item.id)}
              style={{
                alignItems: 'center',
                paddingVertical: theme.spacing.sm,
                paddingHorizontal: theme.spacing.sm,
                borderRadius: theme.borderRadius.md,
                backgroundColor: isActive ? theme.colors.burgundy : 'transparent',
                minWidth: 70,
                flex: 1,
                maxWidth: 100,
              }}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: theme.spacing.xs,
                }}
              >
                <Ionicons
                  name={isActive ? item.activeIcon : item.icon}
                  size={24}
                  color={isActive ? theme.colors.white : theme.colors.gray600}
                />
              </View>
              <Text
                style={{
                  fontFamily: theme.typography.fontFamily.sans,
                  fontSize: 10,
                  fontWeight: isActive ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.medium,
                  color: isActive ? theme.colors.white : theme.colors.gray600,
                  textAlign: 'center',
                }}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Navbar;
