require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const lokasiRouter = require("./routes/lokasi");
const mobilRouter = require("./routes/mobil");
const refreshTokensRouter = require("./routes/refreshTokens");

// CORS

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(logger("dev"));
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/lokasi", lokasiRouter);
app.use("/mobil", mobilRouter);
app.use("/refresh_tokens", refreshTokensRouter);

module.exports = app;
