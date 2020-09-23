const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    contentMd: { type: String, default: "" },
    contentHtml: { type: String, default: "" },
    logo: { type: String, default: "" },
    qq: { type: String, default: "" },
    e_mail: { type: String, default: "" },
    github: { type: String, default: "" },
    comments: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("About", schema);
