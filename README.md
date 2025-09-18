# HistoricMe - AI-Powered Historical Photo Blending App

HistoricMe, kullanıcıların fotoğraflarını tarihin büyük figürleriyle yan yana gösteren, yapay zekâ destekli eğlenceli ve kültürel bir mobil uygulamadır.

## 🎯 Uygulama Özellikleri

### 🚀 Temel Özellikler
1. **Splash Screen + Onboarding** - Uygulama tanıtımı ve kullanıcı rehberi
2. **Giriş Sistemi** - Google/Apple ile veya misafir modu
3. **Fotoğraf Yükleme** - Kamera veya galeri, yüz algılama
4. **Tarih Figürü Seçimi** - Liderler, bilim insanları, sanatçılar, krallar/kraliçeler
5. **AI Görsel Üretimi** - 3 farklı stil: fotoğraf stüdyosu, tablo, gerçekçi sahne
6. **Sonuç Ekranı** - Ön izleme, paylaş, indir, HistoricMe filigranı

### ✨ Gelişmiş Özellikler
7. **Dark Mode** - Gece/gündüz teması desteği
8. **Haptic Feedback** - Dokunsal geri bildirim sistemi
9. **Sound Effects** - Başarı, hata ve etkileşim sesleri
10. **Friend System** - Arkadaş ekleme, takip etme sistemi
11. **Comment System** - Görsellere yorum yapma ve beğenme
12. **Advanced AI** - Stil transferi, renk paletleri, gelişmiş filtreler
13. **Gamification** - Seviye sistemi, rozetler, günlük görevler
14. **Animations** - Lottie animasyonları ve mikro-etkileşimler
15. **Analytics** - Kullanıcı analitikleri ve performans metrikleri
16. **Accessibility** - Erişilebilirlik özellikleri ve destek

## 🎨 Tasarım Sistemi

### Renk Paleti
- **Bordo**: `#7B1E1E` - Butonlar, vurgu alanları
- **Lacivert**: `#1E2A78` - Arka plan, kartlar
- **Altın Sarısı**: `#D4AF37` - İkonlar, premium vurgular
- **Bej/Krem**: `#F5F0E6` - Genel arka plan
- **Siyah**: `#000000` - Yazılar, kontrast

### Tipografi
- **Başlıklar**: Serif (Playfair Display) - Klasik his
- **İçerikler**: Sans-serif (Inter) - Modern okunabilirlik

### UI Bileşenleri
- **Primary Button**: Bordo arka plan, altın sarısı hover
- **Secondary Button**: Lacivert arka plan, krem yazı
- **Input Field**: Bej arka plan, bordo border
- **Card Component**: Lacivert veya bej, altın sarısı ikon header
- **Navbar**: Lacivert zemin, altın sarısı aktif ikon

## 🛠 Teknoloji Stack

### Core Technologies
- **React Native** - Mobil uygulama framework'ü
- **Expo** - Geliştirme ve build platformu
- **NativeWind** - TailwindCSS benzeri styling
- **React Navigation** - Sayfa geçişleri

### Media & Camera
- **Expo Image Picker** - Fotoğraf seçimi
- **Expo Camera** - Kamera erişimi
- **Expo Face Detector** - Yüz algılama
- **Expo Media Library** - Medya kütüphanesi

### UI & Effects
- **Expo Linear Gradient** - Gradient efektleri
- **Expo Blur** - Bulanıklık efektleri
- **Lottie React Native** - Animasyonlar
- **React Native Reanimated** - Gelişmiş animasyonlar

### User Experience
- **Expo Haptics** - Dokunsal geri bildirim
- **Expo AV** - Ses efektleri
- **AsyncStorage** - Yerel veri saklama

### Authentication & Analytics
- **Clerk** - Kimlik doğrulama
- **Custom Analytics** - Kullanıcı analitikleri
- **Accessibility Services** - Erişilebilirlik desteği

## 📱 Ekran Yapısı

### 1. Splash Screen
- Lacivert zemin
- Ortada altın sarısı HistoricMe logosu
- Animasyonlu yükleme göstergesi

### 2. Onboarding
- 3 sayfalık tanıtım
- Swipe navigation
- Her sayfa için farklı özellik açıklaması

### 3. Login
- Google/Apple ile giriş
- E-posta/şifre girişi
- Misafir modu seçeneği

### 4. Upload
- Kamera veya galeri seçimi
- Yüz algılama
- Fotoğraf önizleme

### 5. Selection
- Kategoriler: Liderler, Bilim İnsanları, Sanatçılar
- Her figür için detaylı bilgi
- Popülerlik skoru

### 6. Result
- 3 stil seçeneği
- AI görsel üretimi
- İndirme ve paylaşım

## 🚀 Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükle
npm install

# Expo CLI ile çalıştır
npx expo start

# iOS için
npx expo start --ios

# Android için
npx expo start --android
```

## 📁 Proje Yapısı

```
src/
├── components/
│   ├── ui/                 # UI bileşenleri
│   │   ├── Button.js
│   │   ├── Input.js
│   │   ├── Card.js
│   │   ├── Modal.js
│   │   ├── LoadingSpinner.js
│   │   ├── Icon.js
│   │   └── index.js
│   ├── animations/         # Animasyon bileşenleri
│   │   ├── LottieAnimation.js
│   │   ├── LoadingAnimations.js
│   │   └── index.js
│   └── ads/               # Reklam bileşenleri
│       ├── BannerAd.js
│       ├── InterstitialAd.js
│       ├── RewardedAd.js
│       └── index.js
├── screens/                # Uygulama ekranları
│   ├── SplashScreen.js
│   ├── LoginScreen.js
│   ├── SignUpScreen.js
│   ├── VerificationScreen.js
│   ├── UserProfileScreen.js
│   ├── UploadScreen.js
│   ├── SelectionScreen.js
│   ├── ResultScreen.js
│   ├── ProfileScreen.js
│   ├── DiscoverScreen.js
│   ├── PaymentScreen.js
│   ├── SubscriptionScreen.js
│   └── index.js
├── navigation/             # Navigasyon
│   └── AppNavigator.js
├── services/              # Servisler
│   ├── HapticService.js
│   ├── SoundService.js
│   ├── GamificationService.js
│   ├── FriendService.js
│   ├── CommentService.js
│   ├── AIService.js
│   ├── AnalyticsService.js
│   ├── AccessibilityService.js
│   └── index.js
├── contexts/              # React Context'ler
│   └── ThemeContext.js
└── styles/                # Stil dosyaları
    └── theme.js
```

## 🎭 Tarihi Figürler

### Liderler
- Napolyon Bonaparte (Fransız İmparatoru)
- George Washington (ABD'nin İlk Başkanı)
- Julius Caesar (Roma İmparatoru)
- Büyük İskender (Makedon Kralı)

### Bilim İnsanları
- Albert Einstein (Fizikçi)
- Marie Curie (Fizikçi & Kimyager)
- Isaac Newton (Matematikçi & Fizikçi)
- Charles Darwin (Doğa Bilimci)

### Sanatçılar
- Leonardo da Vinci (Rönesans Sanatçısı)
- Vincent van Gogh (Post-Emprasyonist)
- Michelangelo (Heykeltıraş & Ressam)
- Pablo Picasso (Kübist Sanatçı)

## 🎮 Gamification Sistemi

### Seviye Sistemi
- **XP Kazanma**: Fotoğraf oluşturma, paylaşım, yorum yapma
- **Seviye Atlama**: Her seviyede yeni özellikler ve rozetler
- **Günlük Görevler**: Her gün yeni görevler ve ödüller

### Rozetler
- **İlk Adımlar**: İlk fotoğraf oluşturma
- **Sosyal Kelebek**: 10 fotoğraf paylaşma
- **Sanatçı**: 50 fotoğraf oluşturma
- **Tarihçi**: Tüm dönemleri deneme
- **Seri Ustası**: 7 gün üst üste giriş

## 🔮 Gelecek Özellikler

- [x] Dark Mode desteği
- [x] Haptic Feedback sistemi
- [x] Sound Effects
- [x] Friend System
- [x] Comment System
- [x] Advanced AI Features
- [x] Gamification
- [x] Animations
- [x] Analytics
- [x] Accessibility
- [ ] Video formatında sonuçlar
- [ ] AR (Artırılmış Gerçeklik) özellikleri
- [ ] AI Chatbot asistanı
- [ ] Çoklu dil desteği
- [ ] Offline mod
- [ ] Cloud sync

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👥 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit yapın (`git commit -m 'Add some AmazingFeature'`)
4. Branch'i push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

---

**HistoricMe** ile tarihin büyük figürleriyle tanışın! 🏛️✨
