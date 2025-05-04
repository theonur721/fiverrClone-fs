import bcrypt from "bcrypt";
import User from "../models/usermodels.js";
import error from "../utils/error.js";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";

// KAYDOL: yeni hhesap oluştur ********************************
export const register = async (req, res, next) => {
  try {
    // şifreyi hashle ve saltla
    const hashedPassword = bcrypt.hashSync(req.body.password, 12);

    // gloabal değişken
    let photo;
    // foto buluta yükle
    await cloudinary.uploader.upload(req.file.path, (err, res) => {
      // hata olursa ele al
      if (err) {
        console.log("hata oluştu");
        return console.log(err);
      }

      //hata olmazsa yüklenen fotoyu global değişkene aktar
      photo = res.secure_url;
    });

    // kullanıcı bilgisine buluttaki fotoyu aktarma
    req.body.photo = photo;

    // veritabanına kaydedilecek kullanıcıyı oluştur - ve kaydet
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // kullanıcı nesnesinin şifresiz halini oluştur
    newUser.password = null;

    // cliente cevap gönder
    res.status(200).json({
      message: "Kullanıcı kaydı başarılı",
      user: newUser,
    });
  } catch (err) {
    next(error(400, "Hesap oluşturulurken bir hata meydana geldi"));
  }
};

// GİRİŞ YAP ************************************************
export const login = async (req, res, next) => {
  try {
    // (1) ismine göre kullanıcıyı ara
    const user = await User.findOne({ username: req.body.username });

    // (2) kullanıcı bulunmazsa hata gönder
    if (!user) {
      return next(error(404, "Giriş bilgileriniz yanlış"));
    }

    // (3) kullanıcı bulunursa şifre doğrumu kontrol et
    // - veritabanındaki hashlenmiş şifre ile istekteki şifreyi karşılaştır
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    // (4) şifre yanlışsa hata gönder
    if (!isCorrect) {
      return next(error(401, "Giriş bilgileriniz yanlış"));
    }

    // (5) şifre doğruysa jwt token oluştur
    const token = jwt.sign(
      { id: user._id, isSeller: user.isSeller },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );

    // şifre alanını kaldır
    user.password = null;

    // (6) tokeni cliente gönder
    res.cookie("token", token).status(200).json({
      message: "Hesaba giriş başarılı",
      user,
      token,
    });
  } catch (err) {
    next(error(401, "Geçersiz giriş"));
  }
};

// ÇIKIŞ YAP ************************************************
export const logout = (req, res, next) => {
  res.clearCookie("token").status(200).json({
    message: "Kullanıcı Hesabından çıkış yapıldı",
  });
};
