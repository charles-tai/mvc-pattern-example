App.RecipesView = (RecipesModel) => {
    // TODO: Find out if this is global
    // Register recipe partial so that it is available when we compile the recipes template
    Handlebars.registerPartial('recipe', $('#recipe-template').html());
    Handlebars.registerHelper('each', function(recipes, options) {
      var row = [];
      var recipeList = [];
      for (var i = 0; i < recipes.length; i++) {
        row.push(recipes[i]);
        if ((i+1)%3===0){
            recipeList.push(row);
            var row = [];
        }
      }
      var ret = "";
      for (var j = 0; j < recipeList.length; j++) {
        var row = '<div class="flex row">';
        for (var k = 0; k < recipeList[j].length; k++) {
            var recipe = recipeList[j][k].recipe;
            row += options.fn(recipe);
        }
        row += '</div>';
        ret += row;
      }
      return ret;
    });
    var recipesTemplate = Handlebars.compile($('#recipes-template').html());

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

    return {
      render: function (state) {
          var { recipes, plan_type, date } = RecipesModel.getState();
          if (!recipes || recipes.length < 1) {
            return null;
          }
          var plan_type = constants[plan_type];
          var date = getDate(date);
          var recipesHTML = recipesTemplate({ plan_type, recipes, date });
          $("#recipes").html(recipesHTML);
      }
    }
}
