const express = require('express'); 
const signuproute = require('./routes/signup');
const loginroute = require('./routes/login');
const userroute = require('./routes/user');
const formsroute = require('./routes/forms');
const logoutroute = require('./services/logout');


const bodyParser = require('body-parser');
const cors = require('cors');
const createAdminAccount = require("./scripts/admin");
const redirectCalls = require('./twilio/redirectCalls');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());

createAdminAccount();

app.use("/user", signuproute);
app.use("/auth", loginroute);
app.use("/api", userroute);
app.use("/api", logoutroute);
app.use("/issue", formsroute);
app.use("/twilio", redirectCalls);


app.listen(PORT, () => { 
    console.log(`listening to port: ${PORT}`);
});
