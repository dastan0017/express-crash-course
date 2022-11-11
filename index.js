const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");
const members = require("./Members");

const app = express();

// init middleware
// app.use(logger);

// Handlebars middleware
app.engine("handlebars", exphbs.engine({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.set("views", "./views");

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Homepage route
app.get("/", (req, res) =>
	res.render("index", {
		title: "WAKANDA FOREVER",
		members,
	})
);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Members api route
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log("App is running on port " + PORT);
});
