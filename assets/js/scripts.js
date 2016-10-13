
// Controller/Presentation Logic
var init = function () {
    $.getJSON('/api/recipes/two_person/2016_03_21', function (response) {
      var recipes = response['two_person_plan'].recipes;
      var template = Handlebars.compile($('#recipes-template').html());
      Handlebars.registerPartial('recipe', $('#recipe-template').html());
      Handlebars.registerHelper('each', function(recipes, options) {
        var ret = "";
        for (var i=0; i < recipes.length; i++) {
          var recipe = recipes[i].recipe;
          ret = ret + options.fn(recipe);
        }
        return ret;
      });
      var recipesHTML = template({recipes: recipes});
      $("#container").html(recipesHTML);
    })
}

document.addEventListener('DOMContentLoaded', init);


// Handlebars.registerHelper('if', function(conditional, options) {
//   if(conditional) {
//     return options.fn(this);
//   } else {
//     return options.inverse(this);
//   }
// });
