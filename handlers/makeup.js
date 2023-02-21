const axios = require('axios');

const getAllMakeup = async (req, res) => {
  await axios
    .get('https://makeup-api.herokuapp.com/api/v1/products.json')
    .then((jsonData) => {
      const makeupData = jsonData.data;
      return res.status(200).send(makeupData); 
    })
    .catch((err) => res.status(501).send('Network makup error (axios)' + err));
};

module.exports = getAllMakeup;
