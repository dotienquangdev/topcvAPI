const mongoose = require("mongoose");
//Thông báo (ví dụ: được mời phỏng vấn, được nhận việc, ...)
const notificationsSchema = new mongoose.Schema({
  user_id: String,
  content: String,
  is_read: Boolean,
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

const Notifications = mongoose.model(
  "Notifications",
  notificationsSchema,
  "notifications"
);

module.exports = Notifications;
