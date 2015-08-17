import Ember from "ember";

var arraysEqual = function(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export default Ember.Helper.helper(function(params) {
  var checked,
    value1 = params[0],
    value2 = params[1],
    options = params[2] || '';

  if (Ember.isArray(value1) && Ember.isArray(value2)) {
    checked = arraysEqual(value1, value2);
  } else {
    checked = value1 === value2;
  }

  if (!options) {
    options = '';
  }

  var escaped = checked ? options : '';
  return new Ember.Handlebars.SafeString(escaped);
});
