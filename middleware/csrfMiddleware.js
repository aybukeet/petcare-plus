const crypto = require("crypto");

module.exports = (req, res, next) => {
    if (!req.session.csrfToken) {
        req.session.csrfToken = crypto.randomBytes(24).toString("hex");
    }

    res.locals.csrfToken = req.session.csrfToken;

    const protectedMethods = ["POST", "PUT", "DELETE", "PATCH"];
    if (protectedMethods.includes(req.method)) {
        const clientToken = req.body._csrf || req.headers["x-csrf-token"];




        if (!clientToken || clientToken !== req.session.csrfToken) {
            req.session.message = { type: "error", text: "Güvenlik doğrulaması başarısız (CSRF). Lütfen formu tekrar gönderin." };
            const referer = req.get('Referer');
            if (referer) {
                return res.redirect(referer);
            }
            return res.redirect("/");
        }
    }

    next();
};
