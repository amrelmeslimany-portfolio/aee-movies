const express = require("express");
const cors = require("cors");
const moviesRoutes = require("./routes/movies");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const listsRouter = require("./routes/lists");
const communityRouter = require("./routes/community");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 4545;
const app = express();

// DB
require("./configs/db");

// Allow JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// Cors
const allowlist = ["http://localhost:3000", "https://aee-movies.netlify.app"];

app.use(
  cors({
    origin: allowlist,
    credentials: true,
  })
);

// Routes
app.use("/api/movies/", moviesRoutes);
app.use("/api/auth/", authRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/lists/", listsRouter);
app.use("/api/community/", communityRouter);

// Server
app.listen(port, () => {
  console.log(`Server runing on: http://127.0.0.1:${port}`);
});
