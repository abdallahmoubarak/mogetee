import mongoose from "mongoose";

async function dbConnection() {
  if (mongoose.connections[0].readyState) return;

  await mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    async () => {
      console.log("connected");

      // Uncomment this if you want to prefill the products with the order field
      // await productsPreFiller();
    }
  );
}

export default dbConnection;
