// kaydol: yeni hhesap oluştur
export const register = (req, res) => {
  res.status(200).json({
    message: "Kullanıcı kaydı başarılı",
  });
};

// giriş yap
export const login = (req, res) => {
  res.status(200).json({
    message: "Giriş başarılı",
  });
};

// çıkış yap
export const logout = (req, res) => {
  res.status(200).json({
    message: "Çıkış yapıldı",
  });
};
