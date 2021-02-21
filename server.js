const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const port = process.env.PORT;
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
  mailchimp.setConfig({
    apiKey: process.env.API_KEY,
    server: process.env.SERVER,
  });
});

app.post("/", function (req, res) {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const email = req.body.email;
  const listId = process.env.LIST_ID;

  const newSubscriber = {
    firstName: fName,
    lastName: lName,
    email: email,
  };

  async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: newSubscriber.email,
      status: "subscribed",
      merge_fields: {
        FNAME: newSubscriber.firstName,
        LNAME: newSubscriber.lastName,
      },
    });
    res.sendFile(__dirname + "/success.html");
  }
  run().catch(function (e) {
    res.sendFile(__dirname + "/failure.html");
  });
});

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
