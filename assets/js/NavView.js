App.NavView = () => {
  var navigationTemplate = Handlebars.compile($('#navigation-template').html());
  Handlebars.registerHelper("selected", function(a, b) {
    return a === b ? 'active' : null;
  });

  return {
    getDOM: () => {
      return {
          setPlan: $("#navigation #setPlan a"),
          setDate: $("#setDate"),
          selectedOption: $( "#setDate option:selected" )
      }
    },
    render: (state) => {
      var navigationHTML = navigationTemplate(state);
      $("#navigation").html(navigationHTML);
    }
  }
}
