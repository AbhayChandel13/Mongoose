const async = require("hbs/lib/async");
const mongoose = require("mongoose");
const validator = require("validator");

mongoose
  .connect("mongodb://localhost:27017/MyChannel")
  .then(() => console.log("connection successful...."))
  .catch((err) => console.log(err));

//Schema
//A Mongoose schema defines the stucture of the document,
//default values, validators ,etc.,

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, //validators
    trim: true,
  },
  ctype: String,
  videos: Number,
  author: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  active: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

//A Mongoose model is a wrapper on the Mongoose Schema.
//A Mongoose schema defines the structure of the document,
//default values, validators , etc. ,whereas a Mongoose model
//provides  an interfaxe to the database for creating,
//querying , updating, deleting records, etc.

//collection creation:
const Playlist = new mongoose.model("Playlist", playlistSchema);

//create document or insert:

const createDocument = async () => {
  try {
    // const jsPlaylist = new Playlist({
    //   name: "javascript",
    //   ctype: "Front End",
    //   videos: 90,
    //   author: "Abhay",
    //   active: true,
    // });

    // const mongodbPlaylist = new Playlist({
    //   name: "MongoDB",
    //   ctype: "Database",
    //   videos: 10,
    //   author: "Abhay",
    //   active: true,
    // });

    // const mongoosePlaylist = new Playlist({
    //   name: "Mongoose",
    //   ctype: "Database",
    //   videos: 15,
    //   author: "Abhay",
    //   active: true,
    // });

    const handlebarsPlaylist = new Playlist({
      name: "handleBars",
      ctype: "Back End",
      videos: 10,
      author: "Abhay",
      email: "Abhay@gmail.com",
      active: true,
    });

    const result = await Playlist.insertMany([
      // jsPlaylist,
      // expressPlaylist,
      // mongoosePlaylist,
      // mongodbPlaylist,
      handlebarsPlaylist,
    ]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

createDocument();

// const getDocument = async () => {
//   const result = await Playlist.find({ ctype: "Front End" }).select({
//     name: 1,
//   });
//   console.log(result);
// };

// getDocument();
