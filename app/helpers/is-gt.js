import Ember from "ember";

export default Ember.Helper.helper(function(params) {
  var value1 = params[0],
    value2 = params[1],
    options = params[2] || '';

  var escaped = value1 > value2 ? options : '';
  return new Ember.Handlebars.SafeString(escaped);
});
