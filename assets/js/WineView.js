App.WineView = function () {
  var wineTemplate = Handlebars.compile($('#wine-template').html());
  return {
    render: function (state) {
      var wineHTML = wineTemplate(state);
      $("#wine-description").html(wineHTML);
    }
  }
}
