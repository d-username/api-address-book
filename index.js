const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const contacts = require("./data/contacts");
const meetings = require("./data/meetings");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

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
  const meetingsPerId = meetings.filter(
    (item) => Number(item.contactId) === Number(req.params.id)
  );
  res.json({ meetings: meetingsPerId });
});

app.post("/contacts", (req, res) => {
  const contactData = { ...req.body, id: contacts.length + 1 };
  contacts.push(contactData);
  res.json({ contact: contactData });
});

app.put("/contacts/:id", (req, res) => {
  const contact = contacts.find((item) => item.id === Number(req.params.id));

  contact.firstName = req.body.firstName;
  contact.lastName = req.body.lastName;
  contact.street = req.body.street;
  contact.city = req.body.city;
  contact.type = req.body.type;
  contact.email = req.body.email;
  contact.linkedin = req.body.linkedin;
  contact.twitter = req.body.twitter;

  res.json({ contact: contact });
});

app.delete("/contacts/:id", (req, res) => {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id === req.params.id) {
      contacts.splice(i, 1);
      break;
    }
  }
  res.json({ contactId: req.params.id });
});

//Start up our server
const port = 3030;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
