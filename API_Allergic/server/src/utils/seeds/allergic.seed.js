const mongoose = require("mongoose");

const mongoDb = "mongodb+srv://root:root@cluster0.i4g3x.mongodb.net/Allergic-app?retryWrites=true&w=majority";
const AllergenSchema = require("../../api/allergen/Allergen.model");
const Allergen=[
{
name:'gluten',
img: 'https://res.cloudinary.com/dua6dm8ik/image/upload/v1644224750/alergenos/gluten_ad973s.png',
},
{
name:'crustaceos',
img: 'https://res.cloudinary.com/dua6dm8ik/image/upload/v1644224745/alergenos/crustaceos_tm2h5i.png'
},
{
name:'huevos',
img: 'https://res.cloudinary.com/dua6dm8ik/image/upload/v1644224752/alergenos/huevos_ogidck.png'
},
{
name:'pescado',
img: 'https://res.cloudinary.com/dua6dm8ik/image/upload/v1644224761/alergenos/pescado_dovieo.png'
},
{
name:'cacahuetes',
img: 'https://res.cloudinary.com/dua6dm8ik/image/upload/v1644224742/alergenos/cacahuetes_hkgeju.png'
},
{
name:'soja',
img: 'https://res.cloudinary.com/dua6dm8ik/image/upload/v1644224764/alergenos/soja_ndmtsx.png'
},
{
name:'lacteos',
img: 'https://res.cloudinary.com/dua6dm8ik/image/upload/v1644224754/alergenos/lacteos_brrllg.png'
},
{
name:'frutos de cascasa',
img: 'https://res.cloudinary.com/dua6dm8ik/image/upload/v1644224747/alergenos/frutoscascara_paufhs.png'
},
{
name:'apio',
img: 'https://res.cloudinary.com/dua6dm8ik/image/upload/v1644224738/alergenos/apio_sdgim2.png'
},
{
name:'mostaza',
img: 'https://res.cloudinary.com/dua6dm8ik/image/upload/v1644224759/alergenos/mostaza_nbbtal.png'
},
{
name:'sésamo',
img: 'https://res.cloudinary.com/dua6dm8ik/image/upload/v1644224763/alergenos/sesamo_rqkbnk.png'
},
{
name:'sulfitos',
img: 'https://res.cloudinary.com/dua6dm8ik/image/upload/v1644224740/alergenos/azufresulfitos_m24pr1.png'
},
{
name:'moluscos',
img: 'https://res.cloudinary.com/dua6dm8ik/image/upload/v1644224756/alergenos/moluscos_uok4f3.png'
},
{
name:'altramuces',
img: 'https://res.cloudinary.com/dua6dm8ik/image/upload/v1644224736/alergenos/altramuces_j8fb2v.png'
},
{
name:'setas',
img: 'https://res.cloudinary.com/dua6dm8ik/image/upload/v1644226432/alergenos/setas_j0r0ha.png'
},
{
name:'cacao',
img: 'https://res.cloudinary.com/dua6dm8ik/image/upload/v1644226442/alergenos/cacao_kiiz0g.png'
}

]

const AllergenDocuments = Allergen.map((Allergen) => new AllergenSchema(Allergen));

mongoose
  .connect(mongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allAllergen = await AllergenSchema.find();
    if (allAllergen.length) {
      await AllergenSchema.collection.drop();
    }
  })
  .catch((err) => console.log(`Error deleting Allergens: ${err}`))
  .then(async () => {
    await AllergenSchema.insertMany(AllergenDocuments);
    console.log("Allergens successfully created");
  })
  .catch((err) => console.log(`Error creating Allergens: ${err}`))
  .finally(() => mongoose.disconnect());
