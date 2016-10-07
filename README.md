# Take Home Test

## Instructions

Using the HTML, CSS, and mocked API that has been provided for you, your job is to write javascript that drives the view layer of a Blue Apron menu page according to the spec below.

## Setup:

### Install [http-server](https://www.npmjs.com/package/http-server)

```
$ npm install http-server -g
```

### Start [http-server](https://www.npmjs.com/package/http-server)

```
$ http-server [path]
```

### Point your browser to:

```
localhost:8080
```

### Included:

* [Mockjax](https://github.com/jakerella/jquery-mockjax) API
  * Endpoints can be found at the [bottom of the ReadMe](#api)
  * Endpoints can be used the same way you would for a production API
    * JSON response can be found in `/assets/_defaults/js/mocks` or using your inspector console.
* [Bootstrap](http://getbootstrap.com/css/)
* [Bootstrap Modal](http://getbootstrap.com/javascript/#modals)
  * Not required. Use it only if it will save you time.
* [HandleBars](http://handlebarsjs.com/)
  * Not required. Use it only if it will save you time.

### Notes:

* Use `scripts.js`, `styles.css` or create your own files. Refrain from modifying anything in the `_defaults` folder.
* Example markup and HandleBars templates can be found here:
  * Navigation - `examples/navigation.html`
  * Recipe - `examples/recipe.html` (includes template example)
  * Two person plan layout - `examples/two-person-plan.html`
  * Family plan layout - `examples/family-plan.html`
  * Wine modal - `examples/wine-modal.html` (includes template example)

## Spec:

* Display all the recipes using the default settings.
  * Default week is `2016-03-21`.
  * Default recipe type is `two_person_plan`.
* Use the `JSON` to display the recipe image, title, and subtitle.
  * If the recipe is a vegetarian dish it should display the vegetarian icon.
* Using the tab navigation a user should be able to toggle between viewing "Two Person Plan" recipes and "Family Plan" recipes.
* Using the dropdown a user should be able to view recipes from different weeks.
* If the recipe has a wine pairing a user should be able to click the "View Wine Pairing" button to view a modal showing the *matching* wine pairing information.
  * Use the `JSON` to display the wine image, title (which includes the wine's name, varietals name, and year), and a fun fact.

### Write a short paragraph explaining the following:

* Any technical and/or design decisions you made.
* Any interesting challenges you faced.
  * Be sure to explain how you arrived to your implemented solution and how well you think it solved the problem.
* Anything you may have left out or would have done differently if you had more time.

### Additional Notes:

* Developer should assume additional recipe weeks and wines pairings will be regularly added.
* It's up to the developer to decided how they want to design the application and these features, there is no preferred way.
* Please refrain from using any javascript framework (or library that serves a similar purpose). 
 * examples: Ember, Angular, React, Backbone, etc.
* You are free to use any library, templating engine, etc. *as long as it doesn't implement one of the features in the spec for you*.
  * **If you use any additional third-party code, make sure to explicity explain why you chose to include it, why you felt it was necessary, and why it is the right tool for the job.**

## Extra Credit:

* Add an enhancement that would give a user the ability to bookmark the page, reload the browser, etc. in a manner where the application would resume in that user's current state.

## API

### Recipes:

**Two Person Plan**

```
/api/recipes/two_person/:YYYY_MM_DD
```

**Family Plan**

```
/api/recipes/family/:YYYY_MM_DD
```

### Product Pairings:

**Wine Pairings**

```
/api/product_pairings/:wine_pairing_id
```
