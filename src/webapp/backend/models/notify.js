const { spawn } = require("child_process");
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
  try {
    const process = spawn("python3", [
      "./models/model.py",
      "predict",
      date,
      "00:00",
      date,
      "23:59",
    ]);
    process.stdout.on("data", (data) => {
      let output = require("./data.json");
      delete require.cache[require.resolve("./data.json")];
      User.find({ notification: true })
        .then((users) => {
          let total = 0;
          for (let i in output) {
            total += output[i]["yhat"];
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
    });
  } catch (err) {
    return err.message;
  }
};

// send notification at a fixed time
const cron = require("node-cron");
const task = cron.schedule("0 0 8 * * *", () => {
  notify();
});

module.exports = task;
