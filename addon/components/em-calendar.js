import Ember from 'ember';
import Calendar from 'ember-cli-calendar/lib/calendar';
import generateDates from 'ember-cli-calendar/utils/generate-dates';

export default Ember.Component.extend({
  classNameBindings: ['cssClass', ':em-cal'],
  className: 'default',

  cssClass: Ember.computed('className', {
    get: function() {
      return "em-" + this.className + "-cal";
    },
    set: function(k, v) {
      if (v === void 0) {
        this.set('className', 'default');
      } else {
        this.set('className', v);
      }
      return "em-" + this.className + "-cal";
    }
  }),

  __cache: {},
  weekOptions: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  monthOptions: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  model: [],

  init: function() {
    var model, today;
    this._super();
    model = this.get('model');
    if (!Ember.isArray(this.model) || this.model.length !== 3) {
      throw new Ember.Error("Calendar's model must be an array of length 3.");
    }
    this.set('year', model[0]);
    this.set('month', model[1]);
    this.set('date', model[2]);
    today = new Date();
    this.set('currentYear', today.getFullYear());
    this.set('currentMonth', today.getMonth() + 1);
    return this.set('currentDate', today.getDate());
  },

  monthName: Ember.computed('month', function() {
    return this.monthNames[this.month - 1];
  }),

  weekDates: Ember.computed('year', 'month', function() {
    var dates;
    dates = this.get("__cache." + this.year + "-" + this.month);
    if (dates) {
      return dates;
    }
    dates = generateDates(this.year, this.month);
    this.set("__cache." + this.year + "-" + this.month, dates);
    return dates;
  }),

  selectedDay: Ember.computed('year', 'month', 'date', function() {
    return [this.year, this.month, this.date];
  }),

  today: Ember.computed('currentYear', 'currentMonth', 'currentDate', function() {
    return [this.currentYear, this.currentMonth, this.currentDate];
  }),

  cnCalendar: Ember.computed('year', 'month', 'date', function() {
    return Calendar.generate(this.year, this.month, this.date);
  }),

  actions: {
    selectMonth: function(month) {
      return this.set('month', month + 1);
    },

    selectDate: function(date) {
      this.set('year', date.get('gregorianYear'));
      this.set('month', date.get('gregorianMonth'));
      this.set('date', date.get('gregorianDate'));
      return this.set('model', [this.year, this.month, this.date]);
    }
  }
});
