import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10; // Default to 10 if not set in env
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
userSchema.post("save", function (doc) {
  console.log(`User ${doc.username} with email ${doc.email} has been saved.`);
  console.log(`Welcome, ${doc.username}! 🙋‍♂️`);
});

const User = mongoose.model("User", userSchema);
export default User;
