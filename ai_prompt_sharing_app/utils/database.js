import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("MongoDB is already connected")
    };

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "Promptify",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    };

};

// promptify
// eCUvGEY2rbv9gKk3