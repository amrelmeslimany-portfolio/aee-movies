const express = require("express");
const { isValidObjectId } = require("mongoose");
const router = express.Router();
const Movie = require("../models/Movie");
const { notLoggedinGuard } = require("../middlewares/loggedGuard");
const { GET_RANDOM } = require("../helpers/global");
const jwt = require("../helpers/jwt");
const User = require("../models/User");

// Get Home Page Movies
router.get("/", async (req, res) => {
  const type = req.query.type || "movies";
  const limit = 8;

  if (type != "movies")
    return res.status(400).send("قريب إن شاء الله, واحده واحده لسا ببرمجه");

  try {
    let items = {
      topWatchs: [],
      topRating: [],
      newMovies: [],
    };
    const topWatchs = await Movie.aggregate([
      {
        $project: {
          movieImg: 1,
          movieRating: 1,
          movieQuality: 1,
          movieTitle: 1,
        },
      },
      {
        $sample: {
          size: 8,
        },
      },
    ]);
    const topRating = await Movie.find(
      { movieRating: { $gte: 6 } },
      { movieThumbnail: 1, movieRating: 1, movieTitle: 1 }
    ).limit(limit);
    const newMovies = await Movie.find(
      { movieLanguage: "الانجليزية" },
      { movieThumbnail: 1, movieTitle: 1 }
    ).limit(limit);
    if (topWatchs.length == 0 && newMovies.length == 0 && topRating.length == 0)
      throw "مفيش حاليا, بس قريب يعني";

    items = { ...items, topRating, topWatchs, newMovies };
    return res.status(200).json(items);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

// Get Filter movies
router.get("/search", async (req, res) => {
  const search = req.query.q.trim();
  const countries = req.query.countries;

  if (!search && !countries)
    res.status(400).send("!بعد اذنك بس ممكن تعمل بحث الاول");

  try {
    const regex = new RegExp(search, "i");
    const items = await Movie.find(
      {
        $and: [
          search ? { movieTitle: { $regex: regex } } : {},
          countries ? { movieCountry: { $in: countries.split(",") } } : {},
        ],
      },
      { movieThumbnail: 1, movieTitle: 1, movieCountry: 1, movieRating: 1 }
    ).sort({ movieRating: -1 });

    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});
// Get Filter movies
router.get("/genres", async (req, res) => {
  try {
    const items = await Movie.distinct("movieCountry");
    if (items.length == 0) throw "مفيش بلاد";
    res.status(200).json(items);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get categoried movies
router.get("/category/:category", async (req, res) => {
  const category = req.params.category;
  const type = req.query.type;
  const page = Number(req.query.page);
  const size = 9;
  const skip = page * size;

  if (skip >= 85) res.status(200).json({ items: [], isMore: false });

  try {
    if (!category) throw { message: "ممكن تختار التصنيف ؟" };
    if (!type) throw { message: "ممكن تختار النوع ؟" };

    let result = {
      items: [],
      isMore: true,
    };
    let movies = null;
    let optionsMongodb = {
      movieImg: 1,
      movieRating: 1,
      movieQuality: 1,
      movieTitle: 1,
    };

    if (type == "movies") {
      switch (category) {
        case "top-watching":
          movies = await Movie.find({}, optionsMongodb).skip(skip).limit(size);
          break;
        case "top-rating":
          movies = await Movie.find(
            { movieRating: { $gte: 7 } },
            optionsMongodb
          )
            .sort({ movieRating: -1, _id: 1 })
            .skip(skip)
            .limit(size);
          break;
        case "english":
          movies = await Movie.find(
            { movieLanguage: "الانجليزية" },
            optionsMongodb
          )
            .skip(skip)
            .limit(size);
          break;
        default:
          throw { message: "مفيش افلام من التصنيف دا" };
      }
    } else throw { message: "مفيش غير افلام بس حاليا" };

    // Check items and return result
    if (movies.length == 0 && page == 0) throw { message: "مفيش افلام حاليا" };

    if (movies.length < size) {
      result = {
        isMore: false,
        items: movies,
      };
    } else {
      result = {
        isMore: true,
        items: movies,
      };
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get specific item
router.get("/details/:id", async (req, res) => {
  const movieID = req.params.id || null;

  if (!movieID || !isValidObjectId(movieID))
    return res.status(400).send("ارجع للصفحة الرئيسية تاني جرب");

  try {
    const item = await Movie.findById(movieID);
    if (!item) throw { message: "ممكن تختار فيلم تاني عشان دا مش موجود" };

    if (req.cookies?.token) {
      const { id } = jwt.varifyToken(req.cookies?.token);
      await User.findByIdAndUpdate(id, {
        $addToSet: { visited: movieID },
      });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get One movie of every movies type
router.get("/one-movie", notLoggedinGuard, async (req, res) => {
  const { favourites, visited } = req.user;

  if (!favourites.length && !visited.length)
    return res.status(404).json({ message: "القائمة فارغة" });

  try {
    let items = {
      visitedBefore: { isMore: false, item: [] },
      favourite: { isMore: false, item: [] },
    };

    if (favourites.length) {
      const favourite = await Movie.findById(
        favourites[GET_RANDOM(favourites)]
      ).select({ movieImg: 1, movieTitle: 1, movieRating: 1 });

      if (favourites.length > 1) {
        items = { ...items, favourite: { isMore: true, item: [favourite] } };
      } else if (favourites.length == 1) {
        items = { ...items, favourite: { isMore: false, item: [favourite] } };
      }
    }

    if (visited.length) {
      const visitedItem = await Movie.findById(
        visited[GET_RANDOM(visited)]
      ).select({ movieImg: 1, movieTitle: 1 });

      if (visited.length > 1) {
        items = {
          ...items,
          visitedBefore: { isMore: true, item: [visitedItem] },
        };
      } else if (visited.length == 1) {
        items = {
          ...items,
          visitedBefore: { isMore: false, item: [visitedItem] },
        };
      }
    }

    if (items.visitedBefore.length == 0 && items.favourite.length == 0)
      throw { message: "مفيش فيلم من كل نوع" };

    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
