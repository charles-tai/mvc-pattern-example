App.Controller = (recipesModel, navModel, recipesView, navView, wineView, modalModel) => {
    // APIs for retrieving recipes and wine pairings
    var getPlan = function (plan_type, date) {
        var base = '/api/recipes/';
        var url = base + plan_type + '/' + date;
        $.getJSON(url, (response) => {
            var plan = response[plan_type + '_plan'];
            var recipes = plan.recipes;
            recipesModel.setState({
              plan_type: plan.plan.description,
              date: plan.delivery.date,
              recipes: recipes
            });
        }).error(function(error) {
          console.error('getPlan - ', error);
        });
    }
    var getWinePairing = function (pairing_id) {
        var url = '/api/product_pairings/' + pairing_id;
        $.getJSON(url, function (response) {
            var wine = response['product_pairings'][0]['paired_product']['producible']['wine'];
            var {name, year, description, fun_facts, bottle_image_url} = wine;
            var varietals_name = wine.varietals[0].name;
            modalModel.setState({
              name,
              varietals_name,
              year,
              description,
              fun_facts,
              bottle_image_url
            })
        }).error(function(error) {
          console.error('getWinePairing - ', error);
        });
    }
    // Event handlers for navigation
    var setPlan = function (event) {
        if (event) event.preventDefault();
        var plan = $(this).data("value");
        var date = navModel.getState().date;
        navModel.setState({ plan });
        getPlan(plan, date);
    }
    var setDate = function (event, selected) {
        if (event) event.preventDefault();
        var date = $( "#setDate option:selected" ).val()
        var plan = navModel.getState().plan;
        getPlan(plan, date);
    }
    return {
      init: function () {
          // Subscribe Views to Models
          recipesModel.register(recipesView);
          navModel.register(navView, this);
          modalModel.register(wineView);
          // Set initial states
          navModel.setState({plan: 'two_person', date: '2016_03_21'});
          recipesModel.setState({ recipes: [] });
          getPlan('two_person','2016_03_21');
      },
      render: function () {
          var navDOM = navView.getDOM();
          var wineDOM = wineView.getDOM();

          // Event Handlers
          navDOM.setPlan.on("click", setPlan);
          navDOM.setDate.on("change", setDate);

          wineDOM.modal.on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget)
            var pairing_id = button.data('pairing-id')
            getWinePairing(pairing_id);
          })
          wineDOM.modal.on('hide.bs.modal', function () {
            modalModel.resetState();
          })
      }
    }
}
