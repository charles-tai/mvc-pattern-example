App.NavView = () => {
  var render = function (state) {
    var navigationTemplate = Handlebars.compile($('#navigation-template').html());
    // TODO: is this global?
    Handlebars.registerHelper("selected", function(selected) {
      return selected === state.plan ? 'active' : null;
    });
    var navigationHTML = navigationTemplate(state);
    $("#navigation").html(navigationHTML);
  }
  return {
    render
  }
}
