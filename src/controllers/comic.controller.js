const { Comic } = require("../models/comic.model");

class ComicController {
  static async getAll(req, res) {
    try {
      const comics = await Comic.find();
      res.status(200).json(comics);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  static async create(req, res) {
    try {
      const newComic = new Comic(req.body);
      await newComic.save();
      res.status(201).json(newComic);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  static async getById(req, res) {
    try {
      const comic = await Comic.findById(req.params.id);
      if (!comic) {
        return res.status(404).json({ message: "Comic not found" });
      }
      res.status(200).json(comic);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  static async update(req, res) {
    try {
      const updatedComic = await Comic.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedComic) {
        return res.status(404).json({ message: "Comic not found" });
      }
      res.status(200).json(updatedComic);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  static async delete(req, res) {
    try {
      const deletedComic = await Comic.findByIdAndDelete(req.params.id);
      if (!deletedComic) {
        return res.status(404).json({ message: "Comic not found" });
      }
      res.status(200).json({ message: "Comic deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}

module.exports = ComicController;
