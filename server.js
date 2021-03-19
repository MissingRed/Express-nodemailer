const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  nodemailer = require("nodemailer"),
  creds = require("./config"),
  cors = require("cors");

app.use(cors());
app.listen(port, () => console.log(`Puerto: ${port}`));
app.use(express.json());

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: creds.USER,
    pass: creds.PASS,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.log(error);
  } else {
    console.log("Cuenta iniciada con exito");
  }
});

app.post("/send", (req, res) => {
  const { name } = req.body;
  const { message } = req.body;

  var mail = {
    from: name,
    to: "rodriguezdaniel048@gmail.com",
    subject: "Probando Backend",
    html: `${message}` + "<br><br>Cordialmente,<br>" + `${name}`,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({ msg: "err" });
    } else {
      res.json({ msg: "suc" });
    }
  });
});
