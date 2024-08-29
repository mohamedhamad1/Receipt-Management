const mongoose = require("mongoose");
mongoose
    .connect(process.env.DB_URI)
    .then(() => { console.log('connected to DB successfuly'); })
    .catch((err) => { console.log('error connecting to DB', err) })
