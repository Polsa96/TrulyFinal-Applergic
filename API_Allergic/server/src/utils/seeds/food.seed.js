const mongoose = require("mongoose");

const mongoDb ="mongodb+srv://root:root@cluster0.i4g3x.mongodb.net/Allergic-app?retryWrites=true&w=majority";
const FoodSchema = require("../../api/food/Food.model");
const Food = [
  {
    name: "Cola Cao",
    img: "https://res.cloudinary.com/dua6dm8ik/image/upload/v1644232479/alergenos/pack-colacao_s3rixh.png",
    allergen: [],
    traces: [],
    barcode: "",
  },
  {
    name: "Nestle Jungly",
    img: "https://res.cloudinary.com/dua6dm8ik/image/upload/v1644232474/alergenos/tableta-nestle-jungly_r1nukk.jpg",
    allergen: [],
    traces: [],
    barcode: "",
  },
  {
    name: "Doritos Chilli",
    img: "https://res.cloudinary.com/dua6dm8ik/image/upload/v1644232428/alergenos/doritos-chilli-bolsita-44gr_tgykhh.jpg",
    allergen: [],
    traces: [],
    barcode: "",
  },
  {
    name: "Twix",
    img: "https://res.cloudinary.com/dua6dm8ik/image/upload/v1644232426/alergenos/twix_cgs47f.jpg",
    allergen: [],
    traces: [],
    barcode: "",
  },
  {
    name: "Chiquilin",
    img: "https://res.cloudinary.com/dua6dm8ik/image/upload/v1644232424/alergenos/chiquilin_yc9vmj.jpg",
    allergen: [],
    traces: [],
    barcode: "",
  },
  {
    name: "Chili con carne Carretilla",
    img: "https://res.cloudinary.com/dua6dm8ik/image/upload/v1644232421/alergenos/chili_con_carne_xye560.jpg",
    allergen: [],
    traces: [],
    barcode: "",
  },
  {
    name: "Atún claro Isabel",
    img: "https://res.cloudinary.com/dua6dm8ik/image/upload/v1644232418/alergenos/atun_caxoyy.jpg",
    allergen: [],
    traces: [],
    barcode: "",
  },

  {
    name: "Rufles Jamón",
    img: "https://res.cloudinary.com/dua6dm8ik/image/upload/v1644232416/alergenos/rufles_jabtwu.jpg",
    allergen: [],
    traces: [],
    barcode: "",
  },
  {
    name: "Caldo Pollo Gallina Blanca",
    img: "https://res.cloudinary.com/dua6dm8ik/image/upload/v1644232413/alergenos/caldo_x533sa.jpg",
    allergen: [],
    traces: [],
    barcode: "",
  },
  {
    name: "vino cuatro rayas",
    img: "https://res.cloudinary.com/dua6dm8ik/image/upload/v1644232411/alergenos/vino_lb6owd.jpg",
    allergen: [],
    traces: [],
    barcode: "",
  },
  {
    name: "aceitunas rioverde con pepinillo",
    img: "https://res.cloudinary.com/dua6dm8ik/image/upload/v1644232409/alergenos/aceitunas_aamv5j.jpg",
    allergen: [],
    traces: [],
    barcode: "",
  },
  {
    name: "Jamón cocido El Pozo",
    img: "https://res.cloudinary.com/dua6dm8ik/image/upload/v1644232407/alergenos/jamon_cocido_sgzg13.jpg",
    allergen: [],
    traces: [],
    barcode: "",
  },
  {
    name: "Revuelto setas Findus",
    img: "https://res.cloudinary.com/dua6dm8ik/image/upload/v1644232405/alergenos/revueltosetas_k2lorc.jpg",
    allergen: [],
    traces: [],
    barcode: "",
  },
  {
    name: "Empanada Pollo Mendoza",
    img: "https://res.cloudinary.com/dua6dm8ik/image/upload/v1644232403/alergenos/empanada_en5rpr.jpg",
    allergen: [],
    traces: [],
    barcode: "",
  },
  {
    name: "albóndigas de pollo Carretilla",
    img: "https://res.cloudinary.com/dua6dm8ik/image/upload/v1644232400/alergenos/alb%C3%B3ndigas_ilz9vz.jpg",
    allergen: [],
    traces: [],
    barcode: "",
  },
];
const foodDocuments = Food.map((Food) => new FoodSchema(Food));


//ARREGLADO EL ALLERGEN

mongoose
  .connect(mongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allFood = await FoodSchema.find();
    if (allFood.length) {
      await FoodSchema.collection.drop();
    }
  })
  .catch((err) => console.log(`Error deleting Foods: ${err}`))
  .then(async () => {
    await FoodSchema.insertMany(foodDocuments);
    console.log("Foods successfully created");
  })
  .catch((err) => console.log(`Error creating Foods: ${err}`))
  .finally(() => mongoose.disconnect());
