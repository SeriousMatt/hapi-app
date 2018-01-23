// Require mongoose Library
const mongoose = require('mongoose');
// Connect to Mongo running locally
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// Display connected message on connection
// Create schema, create method, run method, save data, find data
db.once('open', () => {
  // we're connected!
  console.log('We are connected to Mongo');
  const kittySchema = mongoose.Schema({
    name: String,
  });
  kittySchema.methods.speak = function () {
    const greeting = this.name
      ? `Meow. My name is ${this.name}`
      : "I don't have a name...";
    console.log(greeting);
  };

  const Kitten = mongoose.model('Kitten', kittySchema);

  const silence = new Kitten({ name: 'Silence' });
  const fluffy = new Kitten({ name: 'fluffy' });
  const noName = new Kitten({});

  fluffy.speak();
  silence.speak();
  noName.speak();

  fluffy.save((err) => {
    if (err) return console.error(err);
    fluffy.speak();
  });

  Kitten.find((err, kittens) => {
    if (err) return console.error(err);
    console.log(kittens);
  });
});
