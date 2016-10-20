App.WineView = () => {
  var render = function (state) {
    console.log('state', state);
    var wineTemplate = Handlebars.compile($('#wine-template').html());
    var wineHTML = wineTemplate(state);
    $("#wine-description").html(wineHTML);
  }
  return {
    render
  }
}
