const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write(
      `<html lang="en">
    <head>
      <title>Wellcome Page</title>
    </head>
    <body>
            <h1>Wellcome to my homepage</h1>
      <form action="/create-user" method="POST">
        <div><label>Username</label></div>
          <input type="text", name="message">
          <button type='submit'>
              Send
          </button>
      </input>
      </form>
    </body>
  </html>`
    );
    return res.end();
  }

  if (url === "/user") {
    res.write(`
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Wellcome Page</title>
      </head>
      <body>
        <ul>
          <li>1user</li>
          <li>2user</li>
          <li>3user</li>
          <li>4user</li>
        </ul>
      </body>
    </html>
`);
    return res.end();
  }
  if (url === "/create-user") {
    const username = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      username.push(chunk);
    });
    req.on("end", () => {
      const parsedMessage = Buffer.concat(username).toString();
      const message = parsedMessage.split("=")[1];
      fs.writeFile("username.txt", message, (err) => {
        console.log(message);
        res.writeHead(302, { Location: "/user" });
        return res.end();
      });
    });
  }
};

module.exports = requestHandler;
