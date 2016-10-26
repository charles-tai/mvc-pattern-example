App.NavView = () => {
  var navigationTemplate = Handlebars.compile($('#navigation-template').html());
  Handlebars.registerHelper("selected", function(selected, plan) {
    return selected === plan ? 'active' : null;
  });

  return {
    getDOM: function () {
      return {
          setPlan: $("#navigation #setPlan a"),
          setDate: $("#setDate")
      }
    },
    render: function (state) {
      var navigationHTML = navigationTemplate(state);
      $("#navigation").html(navigationHTML);
    }
  }
}
