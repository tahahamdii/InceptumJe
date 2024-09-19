import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import User from "./models/user.js"
import cors from "cors";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import bcrypt from "bcryptjs";
import { ROLES } from "./models/role.js";
import memberRoutes from "./routes/user.js";
import rhMembersRoutes from "./routes/RH/Members.js";
import sgMeetingsRoutes from "./routes/SG/Meetings.js";
import profileRoute from "./routes/profile.js"

mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server Running on Port: http://localhost:${PORT}`);
  initialCreateRH();
});

export const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("New client connected" + socket.id);
  socket.on("initial_data", async (id) => {
    const user = await User.findOne({ _id: id }).populate("notification");
    socket.emit("get_data", user?.notification);
    if (user) {
      user.socketId = socket.id;
      await user.save();
    }
  });

  socket.on("check_all_notifications", async (id) => {
    const user = await User.findOne({ _id: id }).populate("notification");

    user.notification.map(async (notif) => {
      notif.read = true;
      await notif.save();
    });

    await user.save(); // await User.create(user)

    socket.emit("change_data");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});


app.use("/members", memberRoutes);
app.use('/profile', profileRoute);
app.use("/rh/members", rhMembersRoutes);
app.use("/sg/meetings", sgMeetingsRoutes);
// app.use("/sg", sgRoutes);
// app.use("/tres", tresRoutes);


const CONNECTION_URL = "mongodb+srv://root:root@cluster0.nk0en.mongodb.net/erpDB?retryWrites=true&w=majority";

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("useFindAndModify", false);

const initialCreateRH = async () => {
  try {
    await User.estimatedDocumentCount(async (err, count) => {
      try {
        if (!err && count === 0) {
          await new User({
            firstname: "Salma",
            lastname: "Damak",
            email: "salma.damak@esprit.tn",
            password: await bcrypt.hash("rhInceptum2021", 12),
            phone: "52532874",
            role: ROLES[2],
          }).save((err) => {
            if (err) {
              console.log("error", err);
            }

            console.log("RH is created");
          });
        }
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
