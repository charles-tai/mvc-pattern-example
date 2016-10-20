App.Model = function () {
  var state = {};
  var observers = [];
  var setState = (newState) => {
    // Shallow
    var mergedState = _.extend(state, newState);
    // Notify all views that it has set
    // TODO: Check if new state is different from old, if it is the same then no need to re-render 
    // trigger re-render
    if (observers.length) {
      observers.forEach((view) => {
        view.render(mergedState);
      })
    }
  };
  var getState = () => {
    return state;
  }
  var register = (view) => {
    // TODO: Add remove all, so you can't register twice, or check if it is already registered
    observers.push(view);
  }
  return {
    getState,
    setState,
    register
  }
}
