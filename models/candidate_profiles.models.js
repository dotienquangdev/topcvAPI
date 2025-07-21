const mongoose = require("mongoose");

const candidateProfilesSchema = new mongoose.Schema({
  user_id: String,
  headline: String,
  summary: String,
  dob: Date,
  address: String,
  gender: String,
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

const CandidateProfiles = mongoose.model(
  "CandidateProfiles",
  candidateProfilesSchema,
  "candidate_profiles" // optional: nếu bạn muốn fix tên collection
);

module.exports = CandidateProfiles;
