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
  return {
    resetState: () => {
      publish({});
    },
    getState: () => {
      return state;
    },
    setState: (newState) => {
      var mergedState = _.extend(state, newState);
      // Notify all subscribed views that state has changed
      publish(mergedState);
    },
    register: function(...args) {
        args.forEach((view) => {
            subscribers.push(view);
        });
    }
  }
}
