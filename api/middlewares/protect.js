// client tarafından çerezler / header ile gönderilen jwt tokenin
import error from "../utils/error.js";
import jwt from "jsonwebtoken";
// geçerliliğini kontrol edeceğiz ve geçersizse hata gönderilecek
// geçerliyse kullanıcı bilgilerini req nesnesine kaydet
// ( giglerde kullanıcı bilgilerini almak için)

const protect = (req, res, next) => {
  // (1) çerezler/header ile gelen tokene eriş
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  // (2) token yoksa hata gönder
  if (!token) return next(error(423, "Token not found"));

  // (3) token geçerli mi kontrol
  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    // (4) token geçersizse hata gönder
    if (err) return next(error(423, "Token is not valid"));
    // (5) token geçerliyse kullanıcı bilgilerini req nesnesine kaydet
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    // (6) sonraki adıma geç
    next();
  });
};

export default protect;
