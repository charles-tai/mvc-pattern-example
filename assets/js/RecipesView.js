App.RecipesView = () => {
  var getOrdinal = function (d) {
    if(d>3 && d<21) return 'th';
    switch (d % 10) {
          case 1:  return "st";
          case 2:  return "nd";
          case 3:  return "rd";
          default: return "th";
      }
  }
  var getDate = function (date) {
    var months = [ "January", "February", "March", "April", "May", "June",
                 "July", "August", "September", "October", "November", "December" ];
    var dateObj = new Date(date);
    var month = months[dateObj.getMonth()];
    var day = dateObj.getUTCDate();
    return month + ' ' + day + getOrdinal(day);
  }
  var constants = {
    "2-Person": "Two Person",
    "Family": "Family"
  }
  var render = function (state) {
      if (!state.recipes || state.recipes.length < 1) {
        return null;
      }
      var recipes = state.recipes;
      var plan_type = constants[state.plan_type];
      var date = getDate(state.date);
      // TODO: Find out if this is global
      // Register recipe partial so that it is available when we compile the recipes template
      Handlebars.registerPartial('recipe', $('#recipe-template').html());
      Handlebars.registerHelper('each', function(recipes, options) {
        var ret = "";
        for (var i=0; i < recipes.length; i++) {
          var recipe = recipes[i].recipe;
          ret = ret + options.fn(recipe);
        }
        return ret;
      });
      var recipesTemplate = Handlebars.compile($('#recipes-template').html());
      var recipesHTML = recipesTemplate({ plan_type, recipes, date });
      $("#recipes").html(recipesHTML);
  }
  return {
    render
  }
}
