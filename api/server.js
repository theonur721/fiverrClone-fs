import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authrouter from "./routes/authroutes.js";

dotenv.config();

// express'i oluştur
const app = express();

// mongoose ile veritabanı ile bağlantı kur
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("🍀 veritabanı ile bağlantı kuruldu"))
  .catch((err) => console.log("🍁 veritabanı ile bağlantı kurulamadı", err));

// kontrol route
app.route("health").get((req, res) => {
  res.json("server çalışıyor");
});

// routleri tanımla
app.use("/api/auth", authrouter);

// portu tanıt
app.listen(process.env.PORT, (req, res) => {
  console.log(`🏁 APİ ${process.env.PORT} portunu dinlemeye başladı`);
});
