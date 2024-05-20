const express = require("express");
const bodyParser = require("body-parser");
const v1MovieRouter = require("./routes/movieRoutes");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use("/api/v1/movies", v1MovieRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
