var fs = require('fs');
var path = require('path');

function RandomPicker(list) {
  this.list = list;
}

RandomPicker.prototype.random = function() {
  return this.list[~~(Math.random() * this.list.length)];
};

var randomWordPicker;
async function randomWord() {
  return new Promise((resolve, reject) => {
    if (randomWordPicker)
      return process.nextTick(() => resolve(randomWordPicker.random()))

    fs.readFile(path.join(__dirname, 'words'), 'utf8', (err, data) => {
      if (err)
        return reject(err);

      var words = data.split('\n');
      randomWordPicker = new RandomPicker(words);
      resolve(randomWordPicker.random());
    });
  });
}

module.exports = {
  RandomPicker,
  randomWordPicker,
  randomWord,
}
