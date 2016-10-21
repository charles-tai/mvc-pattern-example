App.NavView = () => {

  var navigationTemplate = Handlebars.compile($('#navigation-template').html());


  return {
    render: function (state) {
      // TODO: is this global?
      Handlebars.registerHelper("selected", function(selected) {
        return selected === state.plan ? 'active' : null;
      });

      var navigationHTML = navigationTemplate(state);
      $("#navigation").html(navigationHTML);
    }
  }
}
