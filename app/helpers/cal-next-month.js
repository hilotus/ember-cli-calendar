import Ember from "ember";

export default Ember.Helper.helper(function(params) {
  var checkd, day = params[0], today = params[1];
  if (day[0] > today[0]) {
    checkd = true;
  } else {
    checkd = day[1] > today[1];
  }

  var escaped = checkd ? 'cal-next-month' : '';
  return new Ember.Handlebars.SafeString(escaped);
});
