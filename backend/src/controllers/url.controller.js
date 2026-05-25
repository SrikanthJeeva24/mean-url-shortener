const Url = require("../models/url.model");
const { nanoid } = require("nanoid");
const validator = require("validator");
const ApiResponse = require("../dto/api.response");

// Base URL for generating short links
const BASE_URL = `http://localhost:${process.env.PORT}`;

const getAllURls = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });

    // return res.json({
    //   message: "Url Retrieved",
    //   data: urls,
    // });

    return res.json(new ApiResponse(true, "URL Retrieved", urls));
  } catch (error) {
    console.log("Create Error:", error);

    return res.status(500).json(new ApiResponse(false, "Server Error"));
  }
};
/*
|--------------------------------------------------------------------------
| Create Short URL
|--------------------------------------------------------------------------
|
| 1. Validate Input
| 2. Validate URL Format
| 3. Check Existing URL
| 4. Generate Short Code
| 5. Save to Mongo
| 6. Return Response
|
*/

const createShortURL = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    // Validate Input
    if (!originalUrl) {
      return res.status(400).json(new ApiResponse(false, "URL Required"));
    }

    // Validate URL
    const isValid = validator.isURL(originalUrl, {
      require_protocol: true,
    });

    if (!isValid) {
      return res.status(400).json(new ApiResponse(false, "Invalid URL"));
    }

    // Check Existing URL
    const existing = await Url.findOne({
      originalUrl,
    });

    if (existing) {
      return res.status(200).json(
        new ApiResponse(true, "Invalid URL", {
          shortUrl: `${BASE_URL}/${existing.shortCode}`,
        }),
      );
    }

    // Generate Short Code
    const shortCode = nanoid(6);

    // Save To Database
    const url = await Url.create({
      originalUrl,

      shortCode,
    });

    // Success Response
    return res.status(201).json(
      new ApiResponse(true, "Short URL Created", {
        originalUrl: url.originalUrl,

        shortCode: url.shortCode,

        shortUrl: `${BASE_URL}/${url.shortCode}`,
      }),
    );
  } catch (error) {
    console.log("Create Error:", error);

    return res.status(500).json(new ApiResponse(false, "Server Error"));
  }
};

/*
|--------------------------------------------------------------------------
| Redirect URL
|--------------------------------------------------------------------------
|
| 1. Get Short Code
| 2. Find URL
| 3. Increase Click Count
| 4. Redirect
|
*/

const redirectURL = async (req, res) => {
  try {
    const { shortCode } = req.params;

    // Find URL
    const url = await Url.findOne({
      shortCode,
    });

    // Not Found
    if (!url) {
      return res.status(404).json(new ApiResponse(false, "URL Not Found"));
    }

    // Increase Click Count
    await Url.updateOne(
      {
        shortCode,
      },

      {
        $inc: {
          clicks: 1,
        },
      },
    );

    // Redirect
    return res.redirect(url.originalUrl);
  } catch (error) {
    console.log("Redirect Error:", error);

    return res.status(500).json(new ApiResponse("Server Error"));
  }
};

module.exports = {
  createShortURL,

  redirectURL,
  getAllURls,
};
