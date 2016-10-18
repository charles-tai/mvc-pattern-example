var init = function () {
// Model
var Model = function () {
  var state = {};
  var observers = [];
  var setState = (newState) => {
    console.log('setState', newState);
    var mergedState = _.extend(state, newState);
    // Notify all views that it has changed
    // trigger re-render
    if (observers.length) {
      observers.forEach((render) => {
        render(mergedState);
      })
    }

  };
  var getState = () => {
    return state;
  }
  var registerView = (render) => {
    observers.push(render);
  }
  return {
    getState,
    setState,
    registerView
  }
}

var changePlan = function (event) {
      if (event) event.preventDefault();
      var plan = $(this).data("value");
      navModel.setState({ plan });
      var date = navModel.getState().date;
      // change state
      getPlan(plan, date);
}

var changeDate = function (event, selected) {
    if (event) event.preventDefault();
    console.log('event', event)
    recipesModel.setState({ date });
    var date = selected.value;
    var plan = navModel.getState().plan;
    // change date
    getPlan(plan, date);
}

var constants = {
  "2-Person": "Two Person",
  "Family": "Family"
}

var renderNav = function (state) {
  var navigationTemplate = Handlebars.compile($('#navigation-template').html());
  Handlebars.registerHelper("selected", function(selected) {
    return selected === state.plan ? 'active' : null;
  });

  var navigationHTML = navigationTemplate(state);
  $("#navigation").html(navigationHTML);
  $("#navigation a").on("click", changePlan);
}

var renderRecipes = function (state) {
    if (!state.recipes || state.recipes.length < 1) {
      return null;
    }
    var recipes = state.recipes;
    var plan_type = constants[state.plan_type];
    var date = getDate(state.date);
    var recipesTemplate = Handlebars.compile($('#recipes-template').html());
    // Controller/View
    // Handles rendering (compiling state and event handlers)
    // event handlers
    Handlebars.registerPartial('recipe', $('#recipe-template').html());
    Handlebars.registerHelper('each', function(recipes, options) {
      var ret = "";
      for (var i=0; i < recipes.length; i++) {
        var recipe = recipes[i].recipe;
        ret = ret + options.fn(recipe);
      }
      return ret;
    });
    var recipesHTML = recipesTemplate({ plan_type, recipes, date });
    $("#recipes").html(recipesHTML);
}

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

var getPlan = function (plan_type, date) {
  var base = '/api/recipes/';
  var url = base + plan_type + '/' + date;
  $.getJSON(url, function (response) {
      console.log('response', response);
      var plan = response[plan_type + '_plan'];
      var recipes = plan.recipes;
      recipesModel.setState({
        plan_type: plan.plan.description,
        date: plan.delivery.date,
        recipes: recipes
      });
  });
}


  var recipesModel = new Model();
  recipesModel.registerView(renderRecipes);
  var navModel = new Model();
  navModel.registerView(renderNav);
  navModel.setState({plan: 'two_person', date: '2016_03_21'});
  recipesModel.setState({ recipes: []});
  console.log('getPlan');
  getPlan('two_person','2016_03_21');
}

document.addEventListener('DOMContentLoaded', init);


// Handlebars.registerHelper('if', function(conditional, options) {
//   if(conditional) {
//     return options.fn(this);
//   } else {
//     return options.inverse(this);
//   }
// });
