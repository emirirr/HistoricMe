# HistoricMe - AI-Powered Historical Photo Blending App

HistoricMe, kullanıcıların fotoğraflarını tarihin büyük figürleriyle yan yana gösteren, yapay zekâ destekli eğlenceli ve kültürel bir mobil uygulamadır.

## 🎯 Uygulama Özellikleri

### MVP Özellikleri
1. **Splash Screen + Onboarding** - Uygulama tanıtımı ve kullanıcı rehberi
2. **Giriş Sistemi** - Google/Apple ile veya misafir modu
3. **Fotoğraf Yükleme** - Kamera veya galeri, yüz algılama
4. **Tarih Figürü Seçimi** - Liderler, bilim insanları, sanatçılar, krallar/kraliçeler
5. **AI Görsel Üretimi** - 3 farklı stil: fotoğraf stüdyosu, tablo, gerçekçi sahne
6. **Sonuç Ekranı** - Ön izleme, paylaş, indir, HistoricMe filigranı

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

- **React Native** - Mobil uygulama framework'ü
- **Expo** - Geliştirme ve build platformu
- **NativeWind** - TailwindCSS benzeri styling
- **React Navigation** - Sayfa geçişleri
- **Expo Image Picker** - Fotoğraf seçimi
- **Expo Camera** - Kamera erişimi
- **Expo Face Detector** - Yüz algılama
- **Expo Linear Gradient** - Gradient efektleri
- **Expo Blur** - Bulanıklık efektleri
- **Expo Haptics** - Dokunsal geri bildirim

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
│   └── ui/                 # UI bileşenleri
│       ├── Button.js
│       ├── Input.js
│       ├── Card.js
│       ├── Modal.js
│       ├── LoadingSpinner.js
│       ├── Icon.js
│       └── index.js
├── screens/                # Uygulama ekranları
│   ├── SplashScreen.js
│   ├── OnboardingScreen.js
│   ├── LoginScreen.js
│   ├── UploadScreen.js
│   ├── SelectionScreen.js
│   ├── ResultScreen.js
│   └── index.js
├── navigation/             # Navigasyon
│   └── AppNavigator.js
└── styles/                 # Stil dosyaları
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

## 🔮 Gelecek Özellikler

- [ ] Daha fazla tarihi figür
- [ ] Video formatında sonuçlar
- [ ] Sosyal medya entegrasyonu
- [ ] Kullanıcı profilleri
- [ ] Premium abonelik sistemi
- [ ] Topluluk galerisi
- [ ] AR (Artırılmış Gerçeklik) özellikleri

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
