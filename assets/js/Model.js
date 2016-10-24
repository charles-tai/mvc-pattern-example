App.Model = function () {
  var state = {};
  var subscribers = [];
  var publish = (state) => {
    if (subscribers.length) {
      subscribers.forEach((view) => {
        view.render(state);
      })
    }
  }
  var setState = (newState) => {
    // Shallow
    var mergedState = _.extend(state, newState);
    // Notify all views that it has set
    // TODO: Check if new state is different from old, if it is the same then no need to re-render
    // trigger re-render
    publish(mergedState);
  };
  var getState = () => {
    return state;
  }
  var resetState = () => {
    publish({});
  }
  var register = (view) => {
    // TODO: make sure a view can only subscribe once
    subscribers.push(view);
  }
  return {
    resetState,
    getState,
    setState,
    register
  }
}
