const express = require("express");
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 3030;
// Add api routes
app.use(routes);


//if there is no routs are hit, send the index.html in public
app.use(express.static('public'));

// TODO: Find out why this doesn't work
// app.listen(PORT, () => {
//   console.log('🌎  ==> API Server now listening on PORT ${PORT}!');
// });

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});