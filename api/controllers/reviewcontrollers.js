import error from "../utils/error.js";
import Review from "../models/reviewmodel.js";
import Gig from "../models/gigmodel.js";

// CREATE REVIEW
export const createReview = async (req, res, next) => {
  // (1) kullanıcı satıcıysa işlemi iptal et
  if (req.isSeller) return next(error(403, "sellers cannot create reviews"));

  try {
    // (2) kullanıcının daha önce attığı yorumları al
    // a kullanıcısının b hizmetine attığı yorum diye aranmalı yoksa her hizmete olan gelir
    const oldReview = await Review.findOne({
      user: req.userId,
      gigId: req.body.gigId,
    });
    // (3) eski bir yorum varsa işlemi iptal et
    if (oldReview)
      return next(error(403, "you already created a review for this gig"));
    // (4) yorum belgesi oluştur - yorumu veritabanına kaydet
    const newReview = new Review({
      user: req.userId,
      gigId: req.body.gigId,
      desc: req.body.desc,
      star: req.body.star,
    });

    newReview.save();
    // (5) gig belgesini güncelle
    // toplam yorum sayısını arttır
    // toplam yıldız sayısnı  atılan yorumun yıldızı kadar arttır
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: {
        starCount: req.body.star,
        reviewCount: 1,
      },
    });

    // client'a cevap gönder
    res.status(201).json({
      message: "review created successfully✅",
      data: newReview,
    });
  } catch (err) {
    console.log(err);
    return next(error(500, err));
  }
};

// GET REVIEWS
export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId }).populate({
      path: "user",
      select: "username country photo",
    });

    res.status(200).json({
      message: "reviews fetched successfully✅",
      reviews,
    });
  } catch (err) {
    console.log(err);
    return next(error(500, err.message));
  }
};

// DELETE REVIEW
export const deleteReview = async (req, res, next) => {
  try {
    // yorum bilgilerini al
    const review = await Review.findById(req.params.id);

    console.log("silmeye çalışan:", req.userId);
    console.log("yorum sahibi:", review.user);
    // (2) yorumun sahibi değilse işlemi iptal et
    if (req.userId != review.user) {
      return next(error(403, "you can only delete your own reviews"));
    }
    // (3) yorumun sahibi ise yorumu sil
    await Review.deleteOne({ _id: req.params.id });
    // (4) gig belgesini güncelle
    await Gig.findByIdAndUpdate(review.gigId, {
      $inc: {
        starCount: -review.star,
        reviewCount: -1,
      },
    });
    // (5) client'a cevap gönder
    res.status(200).json({
      message: "review deleted successfully✅",
    });
  } catch (err) {
    console.log(err);
    return next(error(500, err.message));
  }
};
