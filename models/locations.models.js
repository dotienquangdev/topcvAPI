const mongoose = require("mongoose");
//Địa điểm làm việc
const locationsSchema = new mongoose.Schema({
  name: String,
  slug: String,
  status: {
    type: String,
    default: "active",
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  created_at: Date,
  updated_at: Date,
});

const Locations = mongoose.model("Locations", locationsSchema, "locations");

module.exports = Locations;
