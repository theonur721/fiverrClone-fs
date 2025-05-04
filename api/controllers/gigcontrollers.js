import error from "../utils/error.js";
import Gig from "../models/gigmodel.js";
// TÜM HİZMETLERİ AL
// (1) Filtreleme fonksiyonu
const buildFilters = (query) => {
  // -(1) filtreleme nesnesi oluşturma
  const filters = {};

  // -(2) eğerki query.userId gibi sorgulama varsa filters nesnesine user ekler query.userId ye eşitler
  if (query.userId) {
    filters.user = query.userId;
  }

  if (query.category) {
    filters.category = query.category;
  }

  if (query.min || query.max) {
    filters.price = {};
    // eğerki query.min veya query.max varsa price nesnesine min ve max ekler
    if (query.min) {
      filters.price.$gte = query.min;
    }
    if (query.max) {
      filters.price.$lte = query.max;
    }
  }

  if (query.search) {
    filters.title = {
      // -(2) title alanında arama yapar kelimenin tutması yeter
      $regex: query.search,
      $options: "i", // büyük küçük harf duyarsız
    };
  }

  // -(3)  //fonksiyonun çağrıldığı yere nesneyi döndür
  return filters;

  // -(4) fonksiyonun çağrıldığı yere nesneyi döndür
};
// TÜM HİZMETLERİ AL
export const getAllGigs = async (req, res, next) => {
  // -(5) filtreleme fonksiyonunu çağır
  const filters = buildFilters(req.query);
  try {
    // (1) tüm hizmetleri veritabanından al
    // populate ile hizmet sahibi kullanıcının bilgilerini de al resim foto vs
    // -(6) find metodunu filtrelemeye göre çalıştırır
    const gigs = await Gig.find(filters).populate({
      path: "user",
      select: "username photo",
    });

    // (2) eğer hizmet yoksa hata gönder
    if (gigs.length === 0) return next(error(404, "No gigs found"));

    res.status(200).json({
      message: "Success ✅ All gigs",
      results: gigs.length,
      gigs,
    });
  } catch (error) {
    next(error(500, "GetAllGigs - Something went wrong"));
  }
};

//
// HİZMETİ AL
export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id).populate("user");
    // TODO:::: password gönderilmemeli

    res.status(200).json({
      message: "Success ✅ Single gig",
      gig,
    });
  } catch (error) {
    mext(error(500, "GetGig - Something went wrong"));
  }
};

// GİG OLUŞTUR
export const createGig = async (req, res, next) => {
  // isteği atan kullanıcının hatası seller değilse hata gönder

  if (!req.isSeller) return next(error(423, "Only sellers can create a gig"));

  try {
    // (2) yeni hizmet oluştur
    const savedGig = await Gig.create({ ...req.body, user: req.userId });

    // (3) clienta başareılı cevap gönder
    res.status(201).json({
      message: "Success ✅ Created gig",
      gig: savedGig,
    });
  } catch (err) {
    next(error(400, err.message));
  }
};

// HİZMETİ SİL
export const deleteGig = async (req, res, next) => {
  try {
    //hizmet detaylarını al
    const gig = await Gig.findById(req.params.id);

    // hizmeti oluşturan silenle aynı mı? değilse hata ver
    if (gig.user != req.userId) {
      return next(error(403, "You can only delete your own gigs"));
    }

    // hizmeti sil
    await Gig.findByIdAndDelete(req.params.id);

    // cliente cevap gönder
    res.status(200).json({
      message: "Success ✅ Deleted gig",
    });
  } catch (error) {
    next(error(500, "DeleteGig - Something went wrong"));
  }
};
