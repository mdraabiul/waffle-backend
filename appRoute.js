import { Router } from "express";
import User from "./User.js";
import File from "./File.js";
import jwt from "jsonwebtoken";

const router = Router();

// register route --------------------------------------------

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) return res.status(403).json("user exist already!");
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json("user register sucsess!");
  } catch (error) {
    return res.status(403).json(error.message);
  }
});

// register route --------------------------------------------

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(403).json("user does not exist!");
    if (user.password !== password)
      return res.status(403).json("password is wrong!");

    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json(token);
  } catch (error) {
    res.status(403).json(error.message);
  }
});

// File upload --------------------------------------------

router.post("/upload", async (req, res) => {
  const { userId, cFile, name, type, size, uploadTime } = req.body;
  try {
    const user = await User.findById(userId);
    if (user) {
      const existingFile = await File.find({ userId, name });
      if (existingFile.length > 0) {
        return res.status(403).json("File with the same name already exists");
      }

      const newFile = new File({
        userId,
        cFile,
        name,
        type,
        size,
        uploadTime,
      });
      await newFile.save();
      res.status(200).json({ message: "File uploaded successfully.", newFile });
    } else {
      return res.status(404).json({ message: "User does not exist" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/upload/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);

    if (user) {
      const files = await File.find({ userId });
      if (files) {
        return res.status(200).json(files);
      }
      if (!files) {
        res.status(200).json(false);
      }
    } else {
      return res.status(404).json({ message: "User does not exist" });
    }
  } catch (error) {
    res.status(403).json(error);
  }
});

router.post("/upload/delete", async (req, res) => {
  const { userId, fileId } = req.body;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const deletedFile = await File.findByIdAndDelete(fileId);

    if (deletedFile) {
      const remainingFiles = await File.find({ userId });
      return res.status(200).json(remainingFiles);
    } else {
      return res.status(500).json({ message: "Error deleting the file" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
