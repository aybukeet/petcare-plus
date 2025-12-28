exports.isUser = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/auth/login");
    }

    if (req.session.user.role !== "user") {
        return res.status(403).send("Bu sayfaya erişim yetkiniz yok.");
    }

    next();
};
