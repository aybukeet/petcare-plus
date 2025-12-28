exports.showForm = (req, res) => {
    res.render("pages/contact", { title: "İletişim" });
};

exports.submitForm = (req, res) => {
    // Burada normalde mail gönderme işlemi yapılır (Nodemailer vb.)
    // Şimdilik sadece başarılı mesajı dönüyoruz.
    console.log("İletişim Formu:", req.body);

    res.render("pages/success", {
        title: "Mesajınız Alındı",
        message: "Mesajınız bize ulaştı. En kısa sürede size dönüş yapacağız. Teşekkürler!",
        redirectUrl: "/"
    });
};
