require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "public")));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(session({
    secret: process.env.SESSION_SECRET || "default_secret_key",
    resave: false,
    saveUninitialized: false
}));


const statsMiddleware = require("./middleware/statsMiddleware");
const csrfMiddleware = require("./middleware/csrfMiddleware");
const messageMiddleware = require("./middleware/messageMiddleware");

app.use(statsMiddleware);
app.use(csrfMiddleware);
app.use(messageMiddleware);

app.use((req, res, next) => {
    res.locals.user = req.session.user;

    if (req.session.user) {
        const Notifications = require("./model/notificationModel");
        Notifications.getUnreadCount(req.session.user.id, (err, count) => {
            res.locals.unreadCount = count || 0;
            next();
        });
    } else {
        res.locals.unreadCount = 0;
        next();
    }
});


const indexRoute = require("./routes/index");
const adoptRoute = require("./routes/adopt");
const lostRoute = require("./routes/lost");
const galleryRoute = require("./routes/gallery");
const announcementRoute = require("./routes/announcements");
const authRoute = require("./routes/auth");
const adminRoute = require("./routes/admin");
const userRoute = require("./routes/user");
const careRoute = require("./routes/care");
const adminAdoptRoute = require("./routes/adminAdopt");
const adminLostRoute = require("./routes/adminLost");
const adminGalleryRoute = require("./routes/adminGallery");
const sitemapRoute = require("./routes/sitemap");

app.use("/", indexRoute);
app.use("/sitemap", sitemapRoute);
app.use("/adopt", adoptRoute);
app.use("/lost", lostRoute);
app.use("/gallery", galleryRoute);
app.use("/announcements", announcementRoute);
app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/care", careRoute);
app.use("/admin/adopt", adminAdoptRoute);
app.use("/admin/lost", adminLostRoute);
app.use("/admin/gallery", adminGalleryRoute);


const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server çalışıyor: http://localhost:" + PORT);
});



