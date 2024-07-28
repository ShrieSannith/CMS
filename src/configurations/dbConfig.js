const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://user1:user1@cms.r2k2apx.mongodb.net/?retryWrites=true&w=majority&appName=CMS");
mongoose.connection.on("connected", () => {
    console.log("Connected");
}
)
mongoose.connection.on("error", (err) => {
    console.log(`${err}`);
}
)

module.exports = mongoose;
