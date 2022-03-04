const mongoose = require('mongoose');

const Person = mongoose.model('Person', {
  name: String,
  salary: Number,
  approved: Boolean,
  isWorking: Boolean,
  dateBirthday: String,
});

module.exports = Person;
