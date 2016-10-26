App.WineView = function () {
  const DOM = {
    modal: $('#wine-modal')
  }
  var wineTemplate = Handlebars.compile($('#wine-template').html());
  return {
    getDOM: function () {
      return DOM;
    },
    render: function (state) {
      var wineHTML = wineTemplate(state);
      $("#wine-description").html(wineHTML);
    }
  }
}
