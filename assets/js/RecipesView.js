App.RecipesView = (recipesModel) => {
    var recipesTemplate = Handlebars.compile($('#recipes-template').html());
    Handlebars.registerPartial('recipe', $('#recipe-template').html());
    Handlebars.registerHelper('eachRow', function(items, itemsPerRow, options) {
        // formats items into rows, so that it can be displayed
        var row = [];
        var list = [];
        for (var i = 0; i < items.length; i++) {
            row.push(items[i]);
            if ((i+1)%itemsPerRow===0){
                list.push(row);
                var row = [];
            }
        }
        if ((i+1)%itemsPerRow!==0) list.push(row);
        var ret = "";
        for (var j = 0; j < list.length; j++) {
            var row = '<div class="flex row">';
            for (var k = 0; k < list[j].length; k++) {
                var item = list[j][k];
                row += options.fn(item);
            }
            row += '</div>';
            ret += row;
        }
        return ret;
    });

    // Helper functions to display correct date format
    var getOrdinal = function (date) {
      if(date>3 && date<21) return 'th';
      switch (date % 10) {
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
        render: () => {
            var { recipes, plan_type, date} = recipesModel.getState();
            if (!recipes || recipes.length < 1) {
              $("#recipes").html("<div></div>");
              return null;
            }
            // determines itemsPerRow depending on plan type
            var itemsPerRow = plan_type === '2-Person' ? 3 : 2;

            var plan_type = constants[plan_type];
            var date = getDate(date);
            var recipesHTML = recipesTemplate({ plan_type, recipes, date, itemsPerRow  });
            $("#recipes").html(recipesHTML);
      }
    }
}
