const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/ai", require("./routes/aiRoutes"));

app.listen(PORT, () => {
    console.log(`Server is running from port: ${PORT}`);
});
