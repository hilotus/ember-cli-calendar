import Ember from "ember";

export default Ember.Helper.helper(function(params) {
  var index = params[0], month = params[1];
  var escaped = index + 1 === month ? 'sel' : '';
  return new Ember.Handlebars.SafeString(escaped);
});
