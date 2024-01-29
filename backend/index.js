const express = require("express");
const app = express();
const mongoose = require("./Services/config");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const PORT = process.env.PORT;
const errorMiddleware = require("./Middlewares/errorMiddleware");
const cors = require("cors");
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authRouter = require("./Routes/authRoutes");
const userRouter = require("./Routes/userRoutes");
const therapyRouter = require("./Routes/therapyRoutes");

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/therapy", therapyRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
