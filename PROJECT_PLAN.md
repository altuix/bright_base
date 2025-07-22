# BrightBase CTV Navigasyon Sistemi Projesi

## Proje Özeti

BrightBase, 2020 ve sonrası Samsung ve LG TV'leri hedefleyen modern bir Connected TV (CTV) uygulamasıdır. Bu proje, mevcut Norigin Spatial Navigation kütüphanesinin sınırlamalarını aşarak özel bir navigasyon sistemi geliştirmeyi amaçlamaktadır. Sistem, DOM tabanlı uzamsal hesaplamalar ve React entegrasyonu ile yüksek performanslı, ölçeklenebilir bir navigasyon deneyimi sunacaktır. Ayrıca, veri akışı ve API entegrasyonu ile içerik yönetimi de projenin önemli bir parçasıdır.

## Hedef Platformlar

- **Samsung Tizen TV (2020+)**
- **LG webOS TV (2020+)**
- **Android TV (10.0+)**

## Proje Yapısı

```
bright_base/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/
│   │   ├── ContentGrid/
│   │   │   ├── ContentGrid.tsx
│   │   │   ├── ContentItem.tsx
│   │   │   └── index.ts
│   │   ├── MainMenu/
│   │   │   ├── MainMenu.tsx
│   │   │   ├── MenuItem.tsx
│   │   │   └── index.ts
│   │   ├── DetailPanel/
│   │   │   ├── DetailPanel.tsx
│   │   │   └── index.ts
│   │   ├── Player/
│   │   │   ├── VideoPlayer.tsx
│   │   │   ├── PlayerControls.tsx
│   │   │   └── index.ts
│   │   └── common/
│   │       ├── FocusableItem.tsx
│   │       ├── FocusGroup.tsx
│   │       ├── VirtualizedGrid.tsx
│   │       └── FocusAnimation.tsx
│   ├── context/
│   │   ├── FocusContext.tsx
│   │   └── ContentContext.tsx
│   ├── hooks/
│   │   ├── useFocus.ts
│   │   ├── useVirtualization.ts
│   │   ├── useKeyboardNavigation.ts
│   │   └── useContentData.ts
│   ├── layouts/
│   │   ├── MainLayout.tsx
│   │   └── PlayerLayout.tsx
│   ├── services/
│   │   ├── navigation/
│   │   │   ├── FocusManager.ts
│   │   │   ├── SpatialCalculator.ts
│   │   │   └── EventManager.ts
│   │   └── api/
│   │       ├── ApiClient.ts
│   │       ├── ContentService.ts
│   │       └── CacheManager.ts
│   ├── store/
│   │   ├── slices/
│   │   │   ├── contentSlice.ts
│   │   │   └── uiSlice.ts
│   │   └── store.ts
│   ├── utils/
│   │   ├── dom.ts
│   │   ├── constants.ts
│   │   ├── performance.ts
│   │   └── dataTransformers.ts
│   ├── App.tsx
│   └── index.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## Teknoloji Yığını

### package.json

```json
{
  "name": "bright_base",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-router-dom": "^6.3.0",
    "rxjs": "^7.5.5",
    "styled-components": "^5.3.5",
    "typescript": "^4.7.4",
    "@reduxjs/toolkit": "^1.8.3",
    "react-redux": "^8.0.2",
    "axios": "^0.27.2",
    "swr": "^1.3.0",
    "lodash": "^4.17.21",
    "react-window": "^1.8.7",
    "react-window-infinite-loader": "^1.0.8"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.3.0",
    "@testing-library/user-event": "^14.2.1",
    "@types/jest": "^28.1.4",
    "@types/node": "^18.0.3",
    "@types/react": "^18.0.15",
    "@types/react-dom": "^18.0.6",
    "@types/styled-components": "^5.1.25",
    "@types/lodash": "^4.14.182",
    "@types/react-window": "^1.8.5",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4",
    "msw": "^0.44.2"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint src/**/*.{ts,tsx}",
    "format": "prettier --write src/**/*.{ts,tsx}",
    "analyze": "source-map-explorer 'build/static/js/*.js'"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all",
      "tizen >= 5.5",
      "webos >= 5.0"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

## Navigasyon Sistemi Mimarisi

### 1. Çekirdek Navigasyon Servisi

#### FocusManager.ts
- Odak yönetimi için merkezi sınıf
- Yön tuşlarına göre bir sonraki odaklanacak elementi hesaplama
- Odak hafızası yönetimi
- Gruplar arası geçiş mantığı
- Hızlı geçiş (PageUp, PageDown, Home, End) desteği

#### SpatialCalculator.ts
- Elementler arası uzamsal ilişkileri hesaplama
- Bir yönde en yakın elementi bulma algoritmaları
- Viewport içinde olup olmadığını kontrol etme

#### EventManager.ts
- Klavye olaylarını dinleme ve yönetme
- Özel olaylar (odak değişimi, grup geçişi vb.) için event dispatching

### 2. React Entegrasyonu

#### FocusContext.tsx
- Navigasyon durumunu tutan React Context
- Odaklanabilir öğelerin kaydı
- Odak hafızası için durum yönetimi

#### useFocus.ts
- Bileşenlerin odak sistemine kaydolması için hook
- Odak durumunu kontrol etme ve değiştirme metodları

#### useKeyboardNavigation.ts
- Klavye olaylarını dinleme ve FocusManager'a iletme
- Yön tuşları ve özel tuşlar için olay işleyicileri

### 3. Bileşen Katmanı

#### FocusableItem.tsx
- Odaklanabilir herhangi bir UI öğesi için temel bileşen
- Odak durumu ve stil yönetimi
- Enter tuşu ve diğer etkileşimler için olay işleyicileri

#### FocusGroup.tsx
- Bir grup odaklanabilir öğeyi yönetme
- Grup içi ve gruplar arası navigasyon mantığı
- Odak hafızası entegrasyonu

#### VirtualizedGrid.tsx
- Büyük içerik listeleri için sanallaştırma
- Sadece görünür öğeleri render etme
- Scroll pozisyonu ve odak yönetimi

#### FocusAnimation.tsx
- Odak değişimlerinde animasyon efektleri
- Performans optimizasyonları (requestAnimationFrame, will-change)

## Özellik Listesi ve Durum

| Özellik | Durum | Öncelik | Açıklama |
|---------|-------|---------|----------|
| **Navigasyon Bileşenleri** |
| Ana Menü | ✅ Mevcut | Yüksek | Sol tarafta dikey bir menü, kategoriler için |
| İçerik Izgarası | ✅ Mevcut | Yüksek | Ana içerik alanı, satır ve sütunlar halinde düzenlenmiş |
| Detay Paneli | 🔄 Geliştirilecek | Orta | Seçilen içerik için detaylar |
| Oynatıcı | 🔄 Geliştirilecek | Orta | Video oynatıcı ve kontrolleri |
| **Navigasyon Özellikleri** |
| Yön Tabanlı Navigasyon | ✅ Mevcut | Yüksek | Ok tuşlarıyla kolay gezinme |
| Odak Göstergesi | ✅ Mevcut | Yüksek | Kullanıcının nerede olduğunu açıkça gösterme |
| Odak Hafızası | 🔄 Geliştirilecek | Yüksek | Her bölüm için son odaklanan öğeyi hatırlama |
| Grup Navigasyonu | ✅ Mevcut | Yüksek | Gruplar arası geçiş (menü → içerik → detaylar) |
| Hızlı Geçiş | 🔄 Geliştirilecek | Orta | Uzun listelerde hızlı ilerleme |
| **Performans Özellikleri** |
| Sanallaştırma | 🔄 Geliştirilecek | Yüksek | Büyük listeler için sadece görünen öğeleri render etme |
| Lazy Loading | 🔄 Geliştirilecek | Orta | İçeriği ihtiyaç duyuldukça yükleme |
| Animasyon Optimizasyonu | 🔄 Geliştirilecek | Düşük | Akıcı geçişler için hafif animasyonlar |

## Veri Akışı ve API Entegrasyonu

### 1. Veri Yönetimi Mimarisi

#### Redux Store
- Merkezi durum yönetimi için Redux Toolkit kullanımı
- İçerik verileri için contentSlice
- UI durumu için uiSlice (yükleme durumları, hatalar vb.)
- Performans için normalizasyon ve seçiciler

#### API Servisleri
- ApiClient.ts: Temel HTTP istemcisi (Axios tabanlı)
- ContentService.ts: İçerik API'leri için servis katmanı
- CacheManager.ts: Önbellek yönetimi ve veri kalıcılığı

#### Veri Akışı Optimizasyonları
- SWR kütüphanesi ile veri önbelleğe alma ve yeniden doğrulama
- Sayfalama ve sonsuz kaydırma için özel hooks
- Düşük bant genişliği için veri sıkıştırma ve optimizasyon

### 2. Bileşen-Veri Entegrasyonu

#### ContentContext
- İçerik verilerini bileşenlere dağıtmak için context API
- İçerik yükleme durumları ve hata yönetimi
- Kategori ve içerik filtreleme mantığı

#### useContentData Hook
- İçerik verilerini bileşenlere bağlamak için özel hook
- Sayfalama, filtreleme ve sıralama işlevleri
- Veri dönüşümleri ve formatlama

#### Veri Akışı Şeması
```
API → ApiClient → ContentService → Redux Store → ContentContext → Bileşenler
```

### 3. TV Platformu Veri Optimizasyonları

- Düşük bant genişliği için görüntü optimizasyonu
- Önbelleğe alma stratejileri (disk ve bellek)
- Çevrimdışı mod desteği
- Düşük performanslı cihazlar için veri kısıtlama

## Uygulama Planı

### Aşama 1: Temel Navigasyon Sistemi (2 Hafta)
- FocusManager sınıfını oluştur
- FocusContext ve Provider'ı oluştur
- Temel FocusableItem bileşenini oluştur
- Grup navigasyonu için FocusGroup bileşenini oluştur

### Aşama 2: Veri Yönetimi Altyapısı (2 Hafta)
- Redux store kurulumu ve temel slice'lar
- API servisleri ve istemci oluşturma
- Veri önbelleğe alma ve yeniden doğrulama mekanizmaları
- İçerik veri modellerini tanımlama

### Aşama 3: Odak Hafızası ve Gelişmiş Navigasyon (2 Hafta)
- Odak hafızası için mekanizma ekle
- Gruplar arası geçiş mantığını geliştir
- Hızlı geçiş tuşlarını (PageUp, PageDown, Home, End) ekle

### Aşama 4: Performans Optimizasyonları (3 Hafta)
- Sanallaştırma (Virtualization) için VirtualizedGrid bileşenini ekle
- Lazy loading mekanizması ekle
- Animasyon optimizasyonları ekle
- Veri yükleme ve render performansını optimize et

### Aşama 5: Özel Bileşenler ve Entegrasyon (2 Hafta)
- Detay paneli navigasyonu ekle
- Video oynatıcı kontrolleri ekle
- Tüm sistemi ana uygulamaya entegre et

### Aşama 6: Test ve Optimizasyon (2 Hafta)
- Gerçek TV cihazlarında test et
- Performans optimizasyonları yap
- Hata düzeltmeleri
- Düşük bant genişliği ve yüksek gecikme senaryolarını test et

## TV Platformu Özel Gereksinimleri

### Samsung Tizen TV
- Tizen 5.5+ için uyumluluk
- Tizen Studio ile test ve dağıtım
- Tizen TV Web API entegrasyonu

### LG webOS TV
- webOS 5.0+ için uyumluluk
- webOS TV CLI ile test ve dağıtım
- webOS TV API entegrasyonu

### Genel TV Gereksinimleri
- Düşük RAM kullanımı (max 200MB)
- Hızlı başlangıç süresi (<3 saniye)
- Minimum 60fps animasyon performansı
- Uzaktan kumanda uyumluluğu
- Düşük gecikme süresi (<100ms) odak değişimlerinde

## Veri Modelleri ve İçerik Yapısı

### İçerik Tipleri
- **Video İçeriği**: Filmler, diziler, canlı yayınlar
- **Kategori**: İçerik grupları (Filmler, Diziler, Spor vb.)
- **Koleksiyon**: Özel içerik grupları (Trend, Yeni Eklenenler vb.)
- **Kullanıcı**: Profil bilgileri, izleme geçmişi, favoriler

### Veri Şemaları
```typescript
// Temel içerik modeli
interface Content {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  backdropUrl: string;
  type: 'movie' | 'series' | 'live';
  genres: string[];
  releaseDate: string;
  duration: number;
}

// Video içeriği
interface VideoContent extends Content {
  videoUrl: string;
  trailerUrl: string;
  episodes?: Episode[];
  seasons?: number;
  rating: number;
  cast: Person[];
}

// Koleksiyon
interface Collection {
  id: string;
  title: string;
  type: string;
  items: Content[];
  layout: 'grid' | 'carousel' | 'featured';
}

// Sayfa yapısı
interface Page {
  id: string;
  title: string;
  collections: Collection[];
}
```

### Bileşen-Veri İlişkisi
- **ContentGrid**: Collection verilerini gösterir, layout tipine göre render eder
- **ContentItem**: Tekil Content öğelerini gösterir
- **DetailPanel**: Seçilen VideoContent detaylarını gösterir
- **MainMenu**: Sayfalar ve kategoriler arasında gezinme sağlar

## Sonuç

Bu proje planı, BrightBase CTV uygulaması için özel bir navigasyon sistemi ve veri yönetim mimarisi geliştirmeyi amaçlamaktadır. DOM tabanlı uzamsal hesaplamalar ve React entegrasyonu ile yüksek performanslı, ölçeklenebilir bir navigasyon deneyimi sunacaktır. Ayrıca, verimli veri akışı ve API entegrasyonu ile büyük içerik koleksiyonlarını sorunsuz bir şekilde yönetecektir. Sistem, 2020 ve sonrası Samsung ve LG TV'lerde sorunsuz çalışacak şekilde tasarlanmıştır.
