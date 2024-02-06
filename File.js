import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  cFile: {
    type: String,
  },
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  size: {
    type: Number,
  },

  uploadTime: {
    type: String,
  },
});

const File = mongoose.model("File", FileSchema);

export default File;

