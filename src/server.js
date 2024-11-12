const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const path = require("path");

const PORT = 11121;

app.use(express.static(path.join(__dirname, "public")));

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

app.get("/policy", (req, res) => {
  return res.render("policy");
});

app.get("/service", (req, res) => {
  return res.render("service");
});

app.get("/f/:slug", (req, res) => {
  const slug = req.params.slug;
  return res.render("home", { slug });
});

app.get("/f/:page/:slug", (req, res) => {
  const slug = req.params.slug;
  const page = req.params.page;
  if (!page) {
    return res.render("home", { slug });
  } else {
    switch (page) {
      case "yoga":
        return res.render("yoga", { slug });
      default:
        return res.render("home", { slug });
    }
  }
});

app.listen(PORT, () => console.log(`App is running with port ${PORT}`));
