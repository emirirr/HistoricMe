# Logo Yerleştirme Kılavuzu

## 📁 Assets Klasörü Yapısı

```
assets/
├── icon.png              # 1024x1024 px - Ana uygulama ikonu
├── adaptive-icon.png     # 1024x1024 px - Android adaptive ikonu  
├── splash.png            # 1284x2778 px - Splash screen görseli
├── favicon.png           # 48x48 px - Web favicon
└── logo/                 # Logo dosyaları (opsiyonel)
    ├── logo-full.png     # Tam logo
    ├── logo-icon.png     # Sadece ikon
    └── logo-text.png     # Sadece yazı
```

## 🎨 Logo Önerileri

### Renk Paleti
- **Ana Renk**: # (Teal)
- **Vurgu Rengi**: #75281F (Burgundy)  
- **Arka Plan**: #F0D9B6 (Cream)

### Logo Tasarım Önerileri
1. **Basit ve Tanınabilir** - Küçük boyutlarda net görünebilmeli
2. **Minimal Tasarım** - Karmaşık detaylardan kaçının
3. **Renk Uyumu** - Verilen renk paletini kullanın
4. **Tarihsel Temalı** - Taç, elmas veya tarihsel semboller

## 📱 Gerekli Boyutlar

### App Icons
- **icon.png**: 1024x1024 px (Ana ikon)
- **adaptive-icon.png**: 1024x1024 px (Android için)

### Splash Screen  
- **splash.png**: 1284x2778 px (iPhone 12 Pro Max boyutu)

### Web
- **favicon.png**: 48x48 px

## 🚀 Kullanım

1. Logo dosyalarınızı `assets/` klasörüne kopyalayın
2. `app.json` dosyasında gerekirse yolları güncelleyin
3. Expo otomatik olarak farklı platformlar için optimize edecektir

## 💡 İpucu

Logo tasarımında:
- Siyah-beyaz versiyonu da hazırlayın
- Farklı boyutlarda test edin
- Mobil cihazlarda nasıl göründüğünü kontrol edin
