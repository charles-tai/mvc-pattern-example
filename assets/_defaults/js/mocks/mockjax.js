$.mockjaxSettings.contentType = "application/json";
$.mockjaxSettings.type = "GET";
$.mockjaxSettings.status = 200;
$.mockjaxSettings.responseTime = [500, 1250];

$.mockjax({
  url: "/api/recipes/two_person/2016_03_21",
  proxy: "assets/_defaults/js/mocks/recipes/two_person/2016-03-21.json"
});

$.mockjax({
  url: "/api/recipes/two_person/2016_03_28",
  proxy: "assets/_defaults/js/mocks/recipes/two_person/2016-03-28.json"
});

$.mockjax({
  url: "/api/recipes/family/2016_03_21",
  proxy: "assets/_defaults/js/mocks/recipes/family/2016-03-21.json"
});

$.mockjax({
  url: "/api/recipes/family/2016_03_28",
  proxy: "assets/_defaults/js/mocks/recipes/family/2016-03-28.json"
});

$.mockjax({
  url: "/api/product_pairings/1567",
  proxy: "assets/_defaults/js/mocks/wines/1567.json"
});

$.mockjax({
  url: "/api/product_pairings/1568",
  proxy: "assets/_defaults/js/mocks/wines/1568.json"
});

$.mockjax({
  url: "/api/product_pairings/1569",
  proxy: "assets/_defaults/js/mocks/wines/1569.json"
});

$.mockjax({
  url: "/api/product_pairings/1570",
  proxy: "assets/_defaults/js/mocks/wines/1570.json"
});

$.mockjax({
  url: "/api/product_pairings/1571",
  proxy: "assets/_defaults/js/mocks/wines/1571.json"
});

$.mockjax({
  url: "/api/product_pairings/1572",
  proxy: "assets/_defaults/js/mocks/wines/1572.json"
});
