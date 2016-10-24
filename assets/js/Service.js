App.Service = function () {
  var getPlan = function () {

  }
  var getWinePairing = function (pairing_id) {
      if (!pairing_id) {
        return
      }
      var url = '/api/product_pairings/' + pairing_id;
      console.log('url', url);
      console.log('getting wine pairing...')
      return $.getJSON(url, function (response) {
          // TODO: Separate into Service that prepares the data
          console.log('response', response);
          var wine = response['product_pairings'][0]['paired_product']['producible']['wine'];
          var {name, year, description, fun_facts, bottle_image_url} = wine;
          var varietals_name = wine.varietals[0].name;
          console.log('wine', wine);
          return {
              name,
              varietals_name,
              year,
              description,
              fun_facts,
              bottle_image_url
          }
      }).error(function(error) {
          return error;
      })
  }
  return {
    getPlan,
    getWinePairing
  }
}
