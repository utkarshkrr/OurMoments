import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  secretCode: { type: String, required: true }, // NEW
  id: { type: String }
});

export default mongoose.model("User", userSchema);
