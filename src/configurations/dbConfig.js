const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://user:user123@cms.arxmh0w.mongodb.net/Agent");
mongoose.connection.on("connected", () => {
    console.log("Connected");
}
)
mongoose.connection.on("error", (err) => {
    console.log(`${err}`);
}
)

module.exports = mongoose;
