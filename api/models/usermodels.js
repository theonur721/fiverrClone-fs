import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
      unique: [
        true,
        "There is a user with this name, please choose a different nickname",
      ],
    },

    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: [
        true,
        "There is a user with this email, please choose a different one",
      ],
    },

    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Password must be at least 8 characters long"],
    },

    photo: {
      type: String,
      default: "https://picsum.photos/200",
    },

    country: {
      type: String,
      required: [true, "Please enter a country"],
    },

    phone: {
      type: Number,
    },

    description: {
      type: String,
    },

    isSeller: {
      type: Boolean,
      default: false,
    },
  },
  // ayarlar
  // timestamps sayesinde oluşturlan belgelere createdAt & updatedAt eklenir
  { timestamps: true }
);

export default model("User", userSchema);
