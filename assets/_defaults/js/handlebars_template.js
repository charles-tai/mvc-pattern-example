window.HandlebarsTemplate = (function() {
  function HandlebarsTemplate() {};

  HandlebarsTemplate.validate = function(selector, options) {
    if(typeof selector !== 'string' || typeof options !== 'object') {
      throw new Error('Wrong number of arguments or wrong argument type');
      return false;
    }

    if(typeof selector === 'object') {
      if(!options.template || !options.context) {
        throw new Error('template and context option is required');
        return false;
      }
    }

    return true;
  }

  HandlebarsTemplate.compileWithContext = function(options) {
    var source = $(options.template).html();
    var hbs = Handlebars.compile(source);

    return hbs(options.context);
  }

  HandlebarsTemplate.render = function(selector, options) {
    if(this.validate(selector, options)) {
      $(selector).html(this.compileWithContext(options));
    }
  }

  return HandlebarsTemplate;
})();
