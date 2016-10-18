
// Model
var Model = function () {
  var state = {};
  var setState = (newState) => {
    var mergedState = _.extend(state, newState);
    // Notify all views that it has changed
    // trigger re-render
    render(mergedState);
  };
  var getState = () => {
    return state;
  }
  return {
    getState: getState,
    setState: setState
  }
}

var recipesModel = new Model();
var navigationModel = new Model();

var changePlan = function (event, plan) {
    event.preventDefault();
    var obj = {};
    navigationModel.setState({ plan });
    var date = navigationModel.getState().date;
    // change state
    getPlan(plan, date)
}

var changeDate = function (event, selected) {
    event.preventDefault();
    recipesModel.setState({ date });
    var date = selected.value;
    var plan = navigationModel.getState().plan;
    // change date
    getPlan(plan, date)
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
    console.log('state.plan_type', state.plan_type);
    var plan_type = constants[state.plan_type];
    var date = getDate(state.date);
    var recipesTemplate = Handlebars.compile($('#recipes-template').html());
    var navigationTemplate = Handlebars.compile($('#navigation-template').html());
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
    Handlebars.registerHelper("active", function(selected) {
      return selected === navigationModel.getState().plan ? 'active' : null;
    });
    var recipesHTML = recipesTemplate({ plan_type, recipes, date });
    console.log('navigationModel.getState()', navigationModel.getState())
    var navigationHTML = navigationTemplate(navigationModel.getState());
    $("#recipes").html(recipesHTML);
    $("#navigation").html(navigationHTML);
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

var init = function () {
  navigationModel.setState({plan: 'two_person', date: '2016_03_21'});
  recipesModel.setState({ recipes: []});
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
