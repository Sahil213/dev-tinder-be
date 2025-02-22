const express = require("express");
const app = express();
const port = 3000;
const { adminAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);

// abc
app.get("/ab?c", (req, res) => {
  res.send("Hello Test");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
