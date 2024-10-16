const { Comic } = require("../models/comic.model");

class ComicController {
  static async getList(req, res) {
    try {
      const {
        author,
        year,
        price,
        condition,
        name,
        sortBy = "name",
        order = "asc",
        page = 1,
        limit = 12,
      } = req.query;
      const filter = {};

      if (author) filter.author = new RegExp(author, "i");
      if (year) filter.year = parseInt(year);
      if (price) filter.price = parseFloat(price);
      if (condition) filter.condition = condition;
      if (name) filter.name = new RegExp(name, "i");

      const sortOptions = {};
      sortOptions[sortBy] = order === "desc" ? -1 : 1;
      const pageNumber = parseInt(page) || 1;
      const pageSize = parseInt(limit) || 12;
      const skip = (pageNumber - 1) * pageSize;

      const comics = await Comic.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(pageSize);

      const total = await Comic.countDocuments(filter);

      res.json({
        totalComics: total,
        totalPages: Math.ceil(total / pageSize),
        currentPage: pageNumber,
        data: comics,
      });
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
