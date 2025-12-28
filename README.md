# 🐾 PetCare Plus

PetCare Plus; kayıp hayvanların bulunmasına yardımcı olan, sahiplendirme süreçlerini yöneten ve kullanıcıların evcil hayvanları için bakım kayıtları tutabildiği **Full Stack Web Projesidir**.

---

## 🚀 Proje Özeti

Bu proje, **Node.js + Express + MySQL + EJS** kullanılarak geliştirilmiştir.  
Ziyaretçi, kullanıcı ve admin rollerine göre farklı yetkilendirme ve ekranlar içerir.

---

## 👥 Kullanıcı Rolleri

### 🔹 Ziyaretçi (Guest)
- Ana sayfa
- Sahiplendirme ilanları
- Kayıp hayvan ilanları
- Duyurular & Galeri
- Giriş / Kayıt

### 🔹 Kullanıcı (User)
- Kayıp hayvan ilanı ekleme / düzenleme / silme
- Kendi kayıp ilanlarını görüntüleme
- Bakım günlüğü oluşturma
- Sahiplendirme talepleri
- Profil işlemleri

### 🔹 Admin
- Admin Dashboard
- Sahiplendirme yönetimi
- Kayıp ilan yönetimi
- Duyuru yönetimi
- Galeri yönetimi
- Kullanıcı yönetimi

---

## 🧩 Modüller

- 🔐 Kullanıcı Giriş / Kayıt (Session tabanlı)
- 📢 Duyuru – Haber Modülü
- 🐶 Sahiplendirme Modülü
- 🚨 Kayıp Hayvan Bildirim Sistemi
- 📓 Bakım Günlüğü
- 🖼️ Resim Galerisi
- 🛠️ Admin Panel
- 🧭 Site Map
- 👁️ Ziyaretçi & Online Kullanıcı Sayacı

---

## 🛠️ Kullanılan Teknolojiler

- **Frontend:** HTML, CSS (Tailwind CSS), EJS
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** express-session
- **ORM:** mysql2
- **Diğer:** dotenv, slugify

---

## ⚙️ Kurulum

```bash
git clone https://github.com/aybukeet/petcare-plus.git
cd petcare-plus
npm install
