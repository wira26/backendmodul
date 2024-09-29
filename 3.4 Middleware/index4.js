import express from "express";
import bodyParser from "body-parser";
import { dirname} from "path"
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var BandName = "";

app.use(bodyParser.urlencoded({extended: true}));

function BandNameGenerator (req, res, next) {
  console.log(req.body);
  BandName = req.body['street'] + req.body['pet'];
  next();
}

app.use(BandNameGenerator);

app.get("/", (req,res) => {
  res.sendFile(__dirname + "/public/index.html")
})

app.post("/submit", (req, res) => {
  res.send(`<h1> Your band name is <h2> ${BandName} hehehe </h2></h1>`)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
