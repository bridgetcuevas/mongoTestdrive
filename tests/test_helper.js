const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongoTestdrive_tests');
mongoose.connection
   .once('open', () => console.log('good to go!'))
   .on('error', (error) => {
     console.warn('warning!', error);
   })