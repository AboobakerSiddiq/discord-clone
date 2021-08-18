require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Pusher = require("pusher");
const chatRoutes = require("./routes/conversations.js");
//DB CONNECTION

const pusher = new Pusher({
  appId: "1250987",
  key: "d2929c2ae735191a3e08",
  secret: "80e5cd942168b40ef43b",
  cluster: "ap2",
  useTLS: true,
});

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.once("open", () => {
  console.log("DB CONNECTED");

  const changeStream = mongoose.connection.collection("conversations").watch()

  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      pusher.trigger("channels", "newChannel", {
        'change': change,
      });
    } else if (change.operationType === "update") {
      pusher.trigger("conversation", "newMessage", {
        'change': change,
      });
    } 
  });

});

//MIDDLEWARE
app.use(express.json());
app.use(cors());

//api
app.use("/api", chatRoutes);

//PORTS
const port = process.env.PORT || 8000;

//app-listening
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
