import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg. Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "1234",
  port : 5432
})
db.connect()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries" );
  let countries = [];
  result.rows.forEach(country => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  //Write your code here.
  const countries = await checkVisisted()
  res.render("index.ejs", {countries: countries, total: countries.length});
});

app.post("/add", async(req, res) => {
  const input = req.body["country"];
  try {
    const result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE % || $1 || % ", 
    [input.toLowerCase()]);
    const data = result.rows[0];
    const country_code = data.country_code;
    try {
      await db.query("INSERT INTO visited_countries (country_code) values ($1)", [country_code,]);
      res.redirect("/");
    
    } catch (error) {
      console.log(error);
      const countries = await checkVisisted()
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has alredy added, please try again "
      })
      
    }
  } catch (error) {
    console.log(error)
    const countries = await checkVisisted();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "country name does not exit please try again."
    });
  } 
  
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
