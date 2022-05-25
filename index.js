const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const contacts = require("./data/contacts");
const meetings = require("./data/meetings");

app.use(morgan("dev"));
app.use(cors());

//requests for all the routes are below.
app.get("/", (req, res) => {
  res.json("Hello!");
});

app.get("/contacts", (req, res) => {
  res.json({ contacts: contacts });
});

app.get("/contacts/:id", (req, res) => {
  const contact = contacts.find((item) => item.id === Number(req.params.id));
  res.json({ contact: contact });
});

app.get("/meetings", (req, res) => {
  res.json({ meetings: meetings });
});

app.get("/contacts/:id/meetings", (req, res) => {
  //   console.log("params-ID", req.params.id);
  const meetingsPerId = meetings.filter(
    (item) => Number(item.contactId) === Number(req.params.id)
  );
  res.json({ meetings: meetingsPerId });
});

//Start up our server
const port = 3030;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
