const User = require("../model/userModel");

// LOGIN FORM
exports.loginForm = (req, res) => {
    res.render("auth/login", { title: "Giriş Yap" });
};

// LOGIN İŞLEMİ
exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, user) => {
        if (err) {
            req.session.message = { type: "error", text: "Veritabanı bağlantı hatası" };
            return res.redirect("/auth/login");
        }

        if (!user || user.password !== password) {
            req.session.message = { type: "error", text: "E-posta veya şifre hatalı" };
            return res.redirect("/auth/login");
        }

        // SESSION'A USER KOY
        req.session.user = {
            id: user.id,
            email: user.email,
            role: user.role,   // admin / user
            avatar: user.avatar || "avatar1.png"
        };

        // ROLE GÖRE YÖNLENDİR
        if (user.role === "admin") {
            res.redirect("/admin/dashboard");
        } else {
            res.redirect("/");
        }
    });
};

// LOGOUT
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/auth/login");
    });
};

// REGISTER FORM
exports.registerForm = (req, res) => {
    res.render("auth/register", { title: "Kayıt Ol" });
};

// REGISTER İŞLEMİ
exports.register = (req, res) => {
    const { email, password, avatar } = req.body;
    // Basit Validasyon
    if (!email || !password) {
        req.session.message = { type: "error", text: "Lütfen tüm alanları doldurun" };
        return res.redirect("/auth/register");
    }

    if (!email.includes("@")) {
        req.session.message = { type: "error", text: "Geçerli bir e-posta adresi girin" };
        return res.redirect("/auth/register");
    }

    if (password.length < 5) {
        req.session.message = { type: "error", text: "Şifre en az 5 karakter olmalıdır" };
        return res.redirect("/auth/register");
    }

    User.findByEmail(email, (err, existingUser) => {
        if (existingUser) {
            req.session.message = { type: "error", text: "Bu e-posta zaten kayıtlı" };
            return res.redirect("/auth/register");
        }

        const newUser = {
            email,
            password,
            role: "user",
            avatar: avatar || "avatar1.png"
        };

        User.create(newUser, (err) => {
            if (err) {
                req.session.message = { type: "error", text: "Kayıt sırasında bir hata oluştu" };
                return res.redirect("/auth/register");
            }

            req.session.message = { type: "success", text: "Başarıyla kayıt oldunuz! Giriş yapabilirsiniz." };
            res.redirect("/auth/login");
        });
    });
};

// SAYFA
exports.forgotPage = (req, res) => {
    res.render("auth/forgotPassword", {
        message: null,
        title: "Şifremi Unuttum"
    });
};

// FORM POST
exports.forgotPassword = (req, res) => {
    const { email } = req.body;

    User.findByEmail(email, (err, user) => {
        if (err) return res.send("DB Hatası");

        if (!user) {
            return res.render("auth/forgotPassword", {
                message: "Bu e-posta adresi kayıtlı değil ❌",
                title: "Şifremi Unuttum"
            });
        }

        // GERÇEK PROJEDE: mail gönderilir
        return res.render("auth/forgotPassword", {
            message: "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi 📧 (demo)",
            title: "Şifremi Unuttum"
        });
    });
};
