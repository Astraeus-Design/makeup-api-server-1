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

const getSomeMakeup = async () => {
  await axios
    .get(
      'https://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyeshadow'
    )
    .then((jsonData) => {
      //console.dir(jsonData.data);
      const organicData = jsonData.data.filter(
        (item) => parseFloat(item.price) > 8.0
      );
      return organicData;
    })
    .catch((err) => console.error(err));
};


module.exports = { getAllMakeup, getSomeMakeup };
