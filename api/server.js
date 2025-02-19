import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authrouter from "./routes/authroutes.js";
import morgan from "morgan";

dotenv.config();

// express'i oluştur
const app = express();

// mongoose ile veritabanı ile bağlantı kur
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("🍀 veritabanı ile bağlantı kuruldu"))
  .catch((err) => console.log("🍁 veritabanı ile bağlantı kurulamadı", err));

// body/query alanındaki json içeriğinin işlenmesini sağlar
app.use(express.json());

// api isteklerini gösteren morgan middlewaresi
app.use(morgan("dev"));

// kontrol route
app.route("health").get((req, res) => {
  res.json("server çalışıyor");
});

// routleri tanımla
app.use("/api/auth", authrouter);

// hatalı yönetimi için
// - controllerden yapılan yönlendirmeler için bu middleware çalışacak
app.use((err, req, res, next) => {
  console.log("😡 HATA MEYDANA GELDİ 😡");
  console.log(err);

  const errStatus = err.status || 500;
  const errMessage = err.message || "Üzgünüz bir şeyler ters gitti";

  return res.status(errStatus).json({
    message: errMessage,
  });
});

// portu tanıt
app.listen(process.env.PORT, (req, res) => {
  console.log(`🏁 APİ ${process.env.PORT} portunu dinlemeye başladı`);
});
