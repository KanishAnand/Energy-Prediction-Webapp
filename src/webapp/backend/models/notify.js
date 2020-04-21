const axios = require("axios");
const User = require("./user");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: "",
  },
});

// sends notification to all the users
const notify = () => {
  let date = new Date(Date.now());
  date =
    date.getFullYear().toString() +
    "-" +
    date.getMonth().toString() +
    "-" +
    date.getDate().toString();
  axios
    .post("http://localhost:4000/model/predict", {
      fromDate: date,
      fromTime: "00:00",
      toDate: date,
      toTime: "23:59",
    })
    .then((data) => {
      User.find({ notification: true })
        .then((users) => {
          let total = 0;
          for (let i in data.data) {
            total += data.data[i]["yhat"];
          }
          let to = "";
          for (let i = 0; i < users.length; i++) {
            if (i) {
              to += ", ";
            }
            to += users[i]["email"];
          }
          if (to === "") {
            return "No user interested in notification!!";
          }
          let mailOptions = {
            from: "",
            to: to,
            subject: "today's expected energy consumption",
            text:
              "Dear User,\n Today's energy consumption is expected to be about " +
              total.toString() +
              "\n\nThank You\nEnergy Prediction Team\n",
            attachments: [
              {
                filename: "logo.png",
                path: "./images/logo.png",
                cid: "logo",
              },
            ],
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                <meta charset="utf-8" />
                <body>
                <p>
                <img src="cid:logo" width="10%" height="15%" style="border-radius: 50%"/>
                </p>
                <p>
                Dear User,
                </p>
                <p>
                Today's energy consumption is expected to be about ${total.toString()} kWh.
                </p>
                <br />
                <p>
                Thank You
                </p>
                <p>
                Energy Prediction Team
                </p>
                </body>
                </html>`,
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              return error.message;
            } else {
              return info.response;
            }
          });
        })
        .catch((err) => {
          return err.message;
        });
    })
    .catch((err) => {
      return err.message;
    });
};

// send notification at a fixed time
const cron = require("node-cron");
const task = cron.schedule("0 0 8 * * *", () => {
  notify();
});

module.exports = task;
