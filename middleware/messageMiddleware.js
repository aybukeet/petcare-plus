module.exports = (req, res, next) => {
    // Session'dan mesajı al ve locals'a taşı
    res.locals.message = req.session.message || null;

    // Mesajı bir kez gösterdikten sonra session'dan temizle (flash mantığı)
    delete req.session.message;

    next();
};
