/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-calendar',

  included: function(app) {
    this._super.included(app);

    // calendar css
    app.import(app.bowerDirectory + '/coreweb-css/css/calendar-theme.css');
  }
};
