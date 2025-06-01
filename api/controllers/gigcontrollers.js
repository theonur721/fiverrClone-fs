import error from "../utils/error.js";
import Gig from "../models/gigmodel.js";
import cloudinary from "../utils/cloudinary.js";
import { promises as fs } from "fs"; // temp dosyaları silmek için

// 🔍 FİLTRELEME FONKSİYONU
const buildFilters = (query) => {
  const filters = {};

  if (query.userId) {
    filters.user = query.userId;
  }

  if (query.category) {
    filters.category = query.category;
  }

  if (query.min || query.max) {
    filters.price = {};
    if (query.min) filters.price.$gte = query.min;
    if (query.max) filters.price.$lte = query.max;
  }

  if (query.search) {
    filters.title = {
      $regex: query.search,
      $options: "i",
    };
  }

  return filters;
};

// 📥 TÜM HİZMETLERİ GETİR
export const getAllGigs = async (req, res, next) => {
  const filters = buildFilters(req.query);

  try {
    const gigs = await Gig.find(filters).populate({
      path: "user",
      select: "username photo",
    });

    if (gigs.length === 0) return next(error(404, "No gigs found"));

    res.status(200).json({
      message: "✅ Tüm hizmetler başarıyla getirildi",
      results: gigs.length,
      gigs,
    });
  } catch (err) {
    next(error(500, "GetAllGigs - Sunucu hatası"));
  }
};

// 📥 TEK BİR HİZMETİ GETİR
export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id).populate("user");

    if (!gig) return next(error(404, "Gig not found"));

    res.status(200).json({
      message: "✅ Hizmet bulundu",
      gig,
    });
  } catch (err) {
    next(error(500, "GetGig - Sunucu hatası"));
  }
};

// 🆕 GİG OLUŞTUR
export const createGig = async (req, res, next) => {
  if (!req.isSeller) return next(error(403, "Only sellers can create a gig"));

  try {
    const coverFile = req?.files?.cover?.[0];
    const imageFiles = req?.files?.images || [];

    if (!coverFile || imageFiles.length === 0) {
      return next(error(400, "Cover ve en az 1 görsel zorunlu"));
    }

    // 🔹 COVER yükle ve temp dosyayı sil
    const coverUpload = await cloudinary.uploader.upload(coverFile.path);
    await fs.unlink(coverFile.path);

    // 🔹 Diğer görselleri yükle
    const uploadedImages = [];
    for (const file of imageFiles) {
      const result = await cloudinary.uploader.upload(file.path);
      uploadedImages.push(result.secure_url);
      await fs.unlink(file.path);
    }

    // 🔹 Özellikleri string'ten array'e çevir
    const featuresArray = req.body.features?.split(",").map((f) => f.trim());

    // 🔹 Yeni hizmet oluştur
    const newGig = await Gig.create({
      user: req.userId,
      title: req.body.title,
      shortTitle: req.body.shortTitle,
      desc: req.body.desc,
      shortDesc: req.body.shortDesc,
      features: featuresArray,
      revisionNumber: req.body.revisionNumber,
      deliveryTime: req.body.deliveryTime,
      price: req.body.price,
      category: req.body.category,
      cover: coverUpload.secure_url,
      images: uploadedImages,
    });
    console.log("Yeni gig oluşturuldu:", newGig);

    res.status(201).json({
      message: "✅ Gig başarıyla oluşturuldu",
      gig: newGig,
    });
  } catch (err) {
    console.error("Gig oluşturma hatası:", err);
    next(error(500, "Sunucu hatası, gig oluşturulamadı"));
  }
};

// ❌ GİG SİL
export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) return next(error(404, "Gig not found"));

    if (gig.user.toString() !== req.userId) {
      return next(error(403, "Sadece kendi gig’ini silebilirsin"));
    }

    await Gig.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "✅ Gig silindi",
    });
  } catch (err) {
    next(error(500, "DeleteGig - Sunucu hatası"));
  }
};
