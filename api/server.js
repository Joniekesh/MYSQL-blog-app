import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/post.js";
import userRoute from "./routes/user.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`SERVER running in ${process.env.NODE_ENV} MODE on PORT ${PORT}`);
});
