const fs = require('fs');

const changeEntityLocation = () => {
  fs.readFile("./dist/index.js", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace("src/entity/**/*.ts", "dist/entity/**/*.js");

    fs.writeFile("./dist/index.js", result, "utf8", function (err) {
      if (err) return console.log(err);
    });
  });
};

changeEntityLocation();