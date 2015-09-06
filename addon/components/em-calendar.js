import Ember from 'ember';
import Calendar from 'ember-cli-calendar/lib/calendar';
import generateDates from 'ember-cli-calendar/utils/generate-dates';

export default Ember.Component.extend({
  classNameBindings: ['cssClass', ':em-cal'],
  className: 'default',

  cssClass: Ember.computed('className', {
    get: function () {
      return "em-" + this.className + "-cal";
    },

    set: function (k, v) {
      this.set('className', v);
      return "em-" + this.className + "-cal";
    }
  }),

  __cache: {},
  weekOptions: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  monthOptions: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

  /*
    [year, month, date]
    [2014, 10, 10]
  */
  today: Ember.computed(function () {
    var t = new Date();
    return [t.getFullYear(), t.getMonth() + 1, t.getDate()];
  }),

  selected: [],

  model: Ember.computed('selected', {
    get: function () {
      return this.get('selected');
    },

    set: function (key, value) {
      value = value || this.get('today');
      this.set('selected', value);
      return value;
    }
  }),

  year: Ember.computed('model', function () {
    return this.get('model')[0];
  }),

  month: Ember.computed('model', function () {
    return this.get('model')[1];
  }),

  date: Ember.computed('model', function () {
    return this.get('model')[2];
  }),

  monthName: Ember.computed('month', function () {
    var monthNames = this.get('monthNames');
    return monthNames[this.get('month') - 1];
  }),

  weekDates: Ember.computed('year', 'month', function () {
    var dates;
    dates = this.get("__cache." + this.get('year') + "-" + this.get('month'));
    if (dates) {
      return dates;
    }
    dates = generateDates(this.get('year'), this.get('month'));
    this.set("__cache." + this.get('year') + "-" + this.get('month'), dates);
    return dates;
  }),

  cnCalendar: Ember.computed('year', 'month', 'date', function () {
    return Calendar.generate(this.get('year'), this.get('month'), this.get('date'));
  }),

  actions: {
    selectMonth: function(month) {
      var _sel = this.get('selected');
      this.set('selected', [_sel[0], window.parseInt(month) + 1, _sel[2]]);
    },

    selectDate: function(date) {
      var _year = window.parseInt(date.get('gregorianYear')),
        _month = window.parseInt(date.get('gregorianMonth')),
        _date = window.parseInt(date.get('gregorianDate'));

      this.set('selected', [_year, _month, _date]);
    }
  }
});
