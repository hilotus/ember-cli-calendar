`import Ember from 'ember'`
`import Calendar from 'ember-cli-calendar/lib/calendar'`
`import generateDates from 'ember-cli-calendar/utils/generate-dates'`

EMCalendar = Ember.Component.extend
  classNameBindings: ['cssClass', ':em-cal']

  className: 'default'
  cssClass: Ember.computed 'className',
    get: ->
      "em-#{@className}-cal"
    set: (k, v) ->
      if v is undefined
        @set 'className', 'default'
      else
        @set 'className', v
      "em-#{@className}-cal"

  __cache: {}
  weekOptions: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
  monthOptions: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  model: []

  init: ->
    @_super()

    model = @get('model')
    throw new Ember.Error "Calendar's model must be an array of length 3." if !Ember.isArray(@model) || @model.length isnt 3

    @set 'year', model[0]
    @set 'month', model[1]
    @set 'date', model[2]

    today = new Date()
    @set 'currentYear', today.getFullYear()
    @set 'currentMonth', today.getMonth() + 1
    @set 'currentDate', today.getDate()

  monthName: Ember.computed 'month', ->
    @monthNames[@month - 1]

  weekDates: Ember.computed 'year', 'month', ->
    dates = @get("__cache.#{@year}-#{@month}")
    return dates if dates

    dates = generateDates @year, @month
    @set "__cache.#{@year}-#{@month}", dates
    dates

  selectedDay: Ember.computed 'year', 'month', 'date', ->
    [@year, @month, @date]

  today: Ember.computed 'currentYear', 'currentMonth', 'currentDate', ->
    [@currentYear, @currentMonth, @currentDate]

  # Chinese Date
  cnCalendar: Ember.computed 'year', 'month', 'date', ->
    Calendar.generate @year, @month, @date

  actions:
    selectMonth: (month) ->
      @set 'month', month + 1

    selectDate: (date) ->
      @set 'year', date.get('gregorianYear')
      @set 'month', date.get('gregorianMonth')
      @set 'date', date.get('gregorianDate')
      @set 'model', [@year, @month, @date]

`export default EMCalendar`
