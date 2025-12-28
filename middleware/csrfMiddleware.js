const crypto = require("crypto");

module.exports = (req, res, next) => {
    // 1. Generate token if not exists in session
    if (!req.session.csrfToken) {
        req.session.csrfToken = crypto.randomBytes(24).toString("hex");
    }

    // 2. Expose token to views
    res.locals.csrfToken = req.session.csrfToken;

    // 3. Validation for POST, PUT, DELETE, PATCH
    const protectedMethods = ["POST", "PUT", "DELETE", "PATCH"];
    if (protectedMethods.includes(req.method)) {
        const clientToken = req.body._csrf || req.headers["x-csrf-token"];




        if (!clientToken || clientToken !== req.session.csrfToken) {
            req.session.message = { type: "error", text: "Güvenlik doğrulaması başarısız (CSRF). Lütfen formu tekrar gönderin." };
            // Avoid "Cannot GET /back" error by redirecting to a known safe path if referer is missing or problematic
            const referer = req.get('Referer');
            if (referer) {
                return res.redirect(referer);
            }
            return res.redirect("/");
        }
    }

    next();
};
