# 🎯 Fiver FS Projesi

Bu proje, **satıcı-alıcı etkileşimli bir platform** örneği olarak geliştirilmiştir.  
Kullanıcılar hesap açabilir, satıcılar gig oluşturabilir ve giglere yorum / değerlendirme yapabilirler.

---

## 🚀 Kullanılan Kütüphaneler

### Backend

- **express** → routing için
- **mongoose** → MongoDB veritabanı için
- **nodemon** → otomatik restart için
- **bcrypt** → şifreleme için
- **cookie-parser** → kullanıcı auth & jwt token bilgilerini cookie üzerinden almak için
- **jsonwebtoken** → JWT token oluşturma & doğrulama
- **dotenv** → ortam değişkenleri
- **morgan** → istek loglama
- **cors** → CORS hataları ve veri paylaşımı
- **multer** → frontend’den backend’e dosya yükleme
- **cloudinary** → görseller için bulut depolama

### Frontend

- **react**
- **react-icons** → ikonlar
- **react-router-dom** → sayfalama
- **react-toastify** → bildirimler
- **moment** → tarih & zaman formatlama
- **axios** → API istekleri
- **react-query** → API istekleri için kolay state yönetimi
- **tailwindcss** → stillendirme
- **context API** → global state yönetimi
- **splide** → fotoğraf slider

---

## ⚡ Özellikler

- Login / Register / Logout işlemleri
- Giriş yapmadan uygulama inceleme
- Kayıt olurken satıcı toggle → **phone** ve **description** alanı zorunlu
- **Sadece satıcı hesaplar** gig oluşturabilir
- Kullanıcı kendi gigine yorum veya değerlendirme yapamaz
- Giglere:
  - ⭐ Yorum yapma
  - ⭐ Yıldız verme
  - 🗑️ Yorumu silme
- Gig eklerken:
  - **1 adet cover**
  - **Birden fazla image**
- Gigler kategorilere göre listelenebilir
- Gig ismine göre arama yapılabilir

---

## 📝 Notlar

- `require` yerine **import modeli** tercih edildi
- Hata middleware’i yapıldı → kod tekrarları önlendi
- Toggle için [uiverse](https://uiverse.io) kullanıldı (ekstra yükleme gerektirmez)
- State yönetimi → **Context API**
- Dosya gönderim / erişim → **multer** + **cloudinary**

---

## 📸 Ekran Görüntüleri & GIF

<p align="center">
  <img src="./screenshots/screen.gif" alt="Uygulama Tanıtım" width="600"/>
</p>

### Register Screen

<p align="center">
  <img src="./screenshots/register_screen.png" alt="Register Screen" width="400"/>
</p>

### Add Gig Screen

<p align="center">
  <img src="./screenshots/add_gig.png" alt="Add Gig Screen" width="400"/>
</p>
