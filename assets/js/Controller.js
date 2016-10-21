App.Controller = (RecipesModel, NavModel, RecipesView, NavView, WineView, ModalModel) => {
    var getPlan = function (plan_type, date) {
        var base = '/api/recipes/';
        var url = base + plan_type + '/' + date;
        $.getJSON(url, (response) => {
            var plan = response[plan_type + '_plan'];
            var recipes = plan.recipes;
            RecipesModel.setState({
              plan_type: plan.plan.description,
              date: plan.delivery.date,
              recipes: recipes
            });
        });
    }
    var getWinePairing = function (pairing_id) {
        var url = '/api/product_pairings/' + pairing_id;
        $.getJSON(url, function (response) {
            var wine = response['product_pairings'][0]['paired_product']['producible']['wine'];
            var {name, year, description, fun_facts, bottle_image_url} = wine;
            var varietals_name = wine.varietals[0].name;
            console.log('wine', wine);
            ModalModel.setState({
              name,
              varietals_name,
              year,
              description,
              fun_facts,
              bottle_image_url
            })
        });
    }
    var setPlan = function (event) {
        if (event) event.preventDefault();
        var plan = $(this).data("value");
        var date = NavModel.getState().date;
        NavModel.setState({ plan });
        getPlan(plan, date);
    }
    var setDate = function (event, selected) {
        if (event) event.preventDefault();
        var date = $( "#setDate option:selected" ).val()
        var plan = NavModel.getState().plan;
        RecipesModel.setState({ date });
        getPlan(plan, date);
    }

    return {
      init: function () {
          RecipesModel.register(RecipesView);
          // TODO: Consolidate
          NavModel.register(NavView);
          NavModel.register(this);
          ModalModel.register(WineView);
          NavModel.setState({plan: 'two_person', date: '2016_03_21'});
          RecipesModel.setState({ recipes: [] });
          getPlan('two_person','2016_03_21');
      },
      render: function () {
          // Make sure that all views are rendered BEFORE we attach event handlers
          // Make better IDs for selectors
          $("#setPlan a").on("click", setPlan);
          $("#setDate").on("change", setDate);
          $('#wine-modal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget)
            var pairing_id = button.data('pairing-id')
            getWinePairing(pairing_id);
          })
      }
    }
}
