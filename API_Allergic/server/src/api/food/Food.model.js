const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodSchema = new Schema(
  {
    name: { type: String, required: true  },
    img: { type: String, required: true },
    traces:[{ type: mongoose.Types.ObjectId, ref: 'allergen'}],
    allergen: [{ type: mongoose.Types.ObjectId, ref: 'allergen'}],
    barcode: { type: Number},
    qr:{type:String},
    ingredients:{type: String}
    //arreglada la query//

  },
  {
    timestamps: true,
  }
);

const Food = mongoose.model('Food', foodSchema);


module.exports = Food;