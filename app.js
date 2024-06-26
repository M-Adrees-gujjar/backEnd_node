const express = require("express");
const cors = require("cors");
const path = require("path");
const route = require("./src/routes/index.route");
require("dotenv").config();
const {
  handle_like,
  handle_commit,
  handle_friend,
  allCommit,
} = require("../02_Back_end/src/controllers/socket.controller");
const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  res.send("App is Working");
});

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { default: mongoose } = require("mongoose");
// const io = new Server(server);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with your React app's URL
    methods: ["GET", "POST"],
  },
});
app.use(express.static(path.join(__dirname, "../images")));
app.use(express.static(path.join(__dirname, "../Front_end/css")));
app.use(express.static(path.join(__dirname, "../Front_end/js")));
app.use(express.static(path.join(__dirname, "../Front_end/images")));
app.use(express.static(path.join(__dirname, "../Front_end/html")));

app.use(route);

io.on("connection", (socket) => {
  console.log("a user connected");
  handle_like(socket, io);
  handle_commit(socket, io);
  handle_friend(socket, io);
  allCommit(socket, io);
});

server.listen(PORT, (error) => {
  if (!error) {
    mongoose
      .connect(process.env.MONGODB_URL)
      .then((res) => {
        console.log("MongoDB is Connected....");
      })
      .catch((error) => {
        console.log("Error while Connected MongoDB....");
      });
    console.log(`App is listening on http://localhost:${PORT}`);
  } else {
    console.log("Error, server can't start", error);
  }
});
