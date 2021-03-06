var _dayOfWeek, _dayOfYear, _daysInGregorianMonth, _principleTerm, _sectionalTerm, baseChineseDate, baseChineseMonth, baseChineseYear, baseDate, baseIndex, baseMonth, baseYear, bigLeapMonthYears, chineseDate, chineseMonth, chineseMonths, chineseYear, computeChineseFields, computeSolarTerms, dayOfWeek, dayOfYear, daysInChineseMonth, daysInGregorianMonth, getCNcalendar, gregorianDate, gregorianMonth, gregorianYear, isGregorianLeap, isGregorianLeapYear, nextChineseMonth, principleTerm, principleTermMap, principleTermYear, sectionalTerm, sectionalTermMap, sectionalTermYear, setGregorian;

gregorianYear = 0;

gregorianMonth = 0;

gregorianDate = 0;

isGregorianLeap = false;

dayOfYear = 0;

dayOfWeek = 0;

chineseYear = 0;

chineseMonth = 0;

chineseDate = 0;

sectionalTerm = 0;

principleTerm = 0;

daysInGregorianMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

isGregorianLeapYear = function(year) {
  var isLeap;
  isLeap = false;
  if (year % 4 === 0) {
    isLeap = true;
  }
  if (year % 100 === 0) {
    isLeap = false;
  }
  if (year % 400 === 0) {
    isLeap = true;
  }
  return isLeap;
};

_daysInGregorianMonth = function(year, month) {
  var days;
  days = daysInGregorianMonth[month - 1];
  if (month === 2 && isGregorianLeapYear(year)) {
    days = days + 1;
  }
  return days;
};

_dayOfYear = function(year, month, day) {
  var count, i, j, ref;
  count = 0;
  for (i = j = 1, ref = month; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
    count = count + _daysInGregorianMonth(year, i);
  }
  return count + day;
};

_dayOfWeek = function(year, month, day) {
  var commonYear, leapYear, weak;
  weak = 1;
  year = (year - 1) % 400 + 1;
  leapYear = parseInt((year - 1) / 4);
  leapYear = parseInt(leapYear - (year - 1) / 100);
  leapYear = parseInt(leapYear + (year - 1) / 400);
  commonYear = year - 1 - leapYear;
  weak = weak + commonYear;
  weak = weak + 2 * leapYear;
  weak = weak + _dayOfYear(year, month, day);
  return (weak - 1) % 7 + 1;
};

setGregorian = function(year, month, day) {
  gregorianYear = year;
  gregorianMonth = month;
  gregorianDate = day;
  isGregorianLeap = isGregorianLeapYear(year);
  dayOfYear = _dayOfYear(year, month, day);
  dayOfWeek = _dayOfWeek(year, month, day);
  chineseYear = 0;
  chineseMonth = 0;
  chineseDate = 0;
  sectionalTerm = 0;
  return principleTerm = 0;
};

chineseMonths = [0x00, 0x04, 0xad, 0x08, 0x5a, 0x01, 0xd5, 0x54, 0xb4, 0x09, 0x64, 0x05, 0x59, 0x45, 0x95, 0x0a, 0xa6, 0x04, 0x55, 0x24, 0xad, 0x08, 0x5a, 0x62, 0xda, 0x04, 0xb4, 0x05, 0xb4, 0x55, 0x52, 0x0d, 0x94, 0x0a, 0x4a, 0x2a, 0x56, 0x02, 0x6d, 0x71, 0x6d, 0x01, 0xda, 0x02, 0xd2, 0x52, 0xa9, 0x05, 0x49, 0x0d, 0x2a, 0x45, 0x2b, 0x09, 0x56, 0x01, 0xb5, 0x20, 0x6d, 0x01, 0x59, 0x69, 0xd4, 0x0a, 0xa8, 0x05, 0xa9, 0x56, 0xa5, 0x04, 0x2b, 0x09, 0x9e, 0x38, 0xb6, 0x08, 0xec, 0x74, 0x6c, 0x05, 0xd4, 0x0a, 0xe4, 0x6a, 0x52, 0x05, 0x95, 0x0a, 0x5a, 0x42, 0x5b, 0x04, 0xb6, 0x04, 0xb4, 0x22, 0x6a, 0x05, 0x52, 0x75, 0xc9, 0x0a, 0x52, 0x05, 0x35, 0x55, 0x4d, 0x0a, 0x5a, 0x02, 0x5d, 0x31, 0xb5, 0x02, 0x6a, 0x8a, 0x68, 0x05, 0xa9, 0x0a, 0x8a, 0x6a, 0x2a, 0x05, 0x2d, 0x09, 0xaa, 0x48, 0x5a, 0x01, 0xb5, 0x09, 0xb0, 0x39, 0x64, 0x05, 0x25, 0x75, 0x95, 0x0a, 0x96, 0x04, 0x4d, 0x54, 0xad, 0x04, 0xda, 0x04, 0xd4, 0x44, 0xb4, 0x05, 0x54, 0x85, 0x52, 0x0d, 0x92, 0x0a, 0x56, 0x6a, 0x56, 0x02, 0x6d, 0x02, 0x6a, 0x41, 0xda, 0x02, 0xb2, 0xa1, 0xa9, 0x05, 0x49, 0x0d, 0x0a, 0x6d, 0x2a, 0x09, 0x56, 0x01, 0xad, 0x50, 0x6d, 0x01, 0xd9, 0x02, 0xd1, 0x3a, 0xa8, 0x05, 0x29, 0x85, 0xa5, 0x0c, 0x2a, 0x09, 0x96, 0x54, 0xb6, 0x08, 0x6c, 0x09, 0x64, 0x45, 0xd4, 0x0a, 0xa4, 0x05, 0x51, 0x25, 0x95, 0x0a, 0x2a, 0x72, 0x5b, 0x04, 0xb6, 0x04, 0xac, 0x52, 0x6a, 0x05, 0xd2, 0x0a, 0xa2, 0x4a, 0x4a, 0x05, 0x55, 0x94, 0x2d, 0x0a, 0x5a, 0x02, 0x75, 0x61, 0xb5, 0x02, 0x6a, 0x03, 0x61, 0x45, 0xa9, 0x0a, 0x4a, 0x05, 0x25, 0x25, 0x2d, 0x09, 0x9a, 0x68, 0xda, 0x08, 0xb4, 0x09, 0xa8, 0x59, 0x54, 0x03, 0xa5, 0x0a, 0x91, 0x3a, 0x96, 0x04, 0xad, 0xb0, 0xad, 0x04, 0xda, 0x04, 0xf4, 0x62, 0xb4, 0x05, 0x54, 0x0b, 0x44, 0x5d, 0x52, 0x0a, 0x95, 0x04, 0x55, 0x22, 0x6d, 0x02, 0x5a, 0x71, 0xda, 0x02, 0xaa, 0x05, 0xb2, 0x55, 0x49, 0x0b, 0x4a, 0x0a, 0x2d, 0x39, 0x36, 0x01, 0x6d, 0x80, 0x6d, 0x01, 0xd9, 0x02, 0xe9, 0x6a, 0xa8, 0x05, 0x29, 0x0b, 0x9a, 0x4c, 0xaa, 0x08, 0xb6, 0x08, 0xb4, 0x38, 0x6c, 0x09, 0x54, 0x75, 0xd4, 0x0a, 0xa4, 0x05, 0x45, 0x55, 0x95, 0x0a, 0x9a, 0x04, 0x55, 0x44, 0xb5, 0x04, 0x6a, 0x82, 0x6a, 0x05, 0xd2, 0x0a, 0x92, 0x6a, 0x4a, 0x05, 0x55, 0x0a, 0x2a, 0x4a, 0x5a, 0x02, 0xb5, 0x02, 0xb2, 0x31, 0x69, 0x03, 0x31, 0x73, 0xa9, 0x0a, 0x4a, 0x05, 0x2d, 0x55, 0x2d, 0x09, 0x5a, 0x01, 0xd5, 0x48, 0xb4, 0x09, 0x68, 0x89, 0x54, 0x0b, 0xa4, 0x0a, 0xa5, 0x6a, 0x95, 0x04, 0xad, 0x08, 0x6a, 0x44, 0xda, 0x04, 0x74, 0x05, 0xb0, 0x25, 0x54, 0x03];

baseYear = 1901;

baseMonth = 1;

baseDate = 1;

baseIndex = 0;

baseChineseYear = 4598 - 1;

baseChineseMonth = 11;

baseChineseDate = 11;

computeChineseFields = function() {
  var daysDiff, i, j, k, lastDate, nextMonth, ref, ref1, ref2, ref3, startDate, startMonth, startYear;
  if (gregorianYear < 1901 || gregorianYear > 2100) {
    return 1;
  }
  startYear = baseYear;
  startMonth = baseMonth;
  startDate = baseDate;
  chineseYear = baseChineseYear;
  chineseMonth = baseChineseMonth;
  chineseDate = baseChineseDate;
  if (gregorianYear >= 2000) {
    startYear = baseYear + 99;
    startMonth = 1;
    startDate = 1;
    chineseYear = baseChineseYear + 99;
    chineseMonth = 11;
    chineseDate = 25;
  }
  daysDiff = 0;
  for (i = j = ref = startYear, ref1 = gregorianYear; ref <= ref1 ? j < ref1 : j > ref1; i = ref <= ref1 ? ++j : --j) {
    daysDiff += 365;
    if (isGregorianLeapYear(i)) {
      daysDiff += 1;
    }
  }
  for (i = k = ref2 = startMonth, ref3 = gregorianMonth; ref2 <= ref3 ? k < ref3 : k > ref3; i = ref2 <= ref3 ? ++k : --k) {
    daysDiff += _daysInGregorianMonth(gregorianYear, i);
  }
  daysDiff += gregorianDate - startDate;
  chineseDate += daysDiff;
  lastDate = daysInChineseMonth(chineseYear, chineseMonth);
  nextMonth = nextChineseMonth(chineseYear, chineseMonth);
  while (chineseDate > lastDate) {
    if (Math.abs(nextMonth) < Math.abs(chineseMonth)) {
      chineseYear++;
    }
    chineseMonth = nextMonth;
    chineseDate -= lastDate;
    lastDate = daysInChineseMonth(chineseYear, chineseMonth);
    nextMonth = nextChineseMonth(chineseYear, chineseMonth);
  }
  return 0;
};

bigLeapMonthYears = [6, 14, 19, 25, 33, 36, 38, 41, 44, 52, 55, 79, 117, 136, 147, 150, 155, 158, 185, 193];

daysInChineseMonth = function(year, month) {
  var d, i, index, j, l, ref, v;
  index = year - baseChineseYear + baseIndex;
  v = 0;
  l = 0;
  d = 30;
  if (month >= 1 && month <= 8) {
    v = chineseMonths[2 * index];
    l = month - 1;
    if (((v >> l) & 0x01) === 1) {
      d = 29;
    }
  } else if (month >= 9 && month <= 12) {
    v = chineseMonths[2 * index + 1];
    l = month - 9;
    if (((v >> l) & 0x01) === 1) {
      d = 29;
    }
  } else {
    v = chineseMonths[2 * index + 1];
    v = (v >> 4) & 0x0F;
    if (v !== Math.abs(month)) {
      d = 0;
    } else {
      d = 29;
      for (i = j = 0, ref = bigLeapMonthYears.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        if (bigLeapMonthYears[i] === index) {
          d = 30;
          break;
        }
      }
    }
  }
  return d;
};

nextChineseMonth = function(year, month) {
  var index, n, v;
  n = Math.abs(month) + 1;
  if (month > 0) {
    index = year - baseChineseYear + baseIndex;
    v = chineseMonths[2 * index + 1];
    v = (v >> 4) & 0x0F;
    if (v === month) {
      n = -month;
    }
  }
  if (n === 13) {
    n = 1;
  }
  return n;
};

sectionalTermMap = [[7, 6, 6, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 5, 5, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 4, 5, 5], [5, 4, 5, 5, 5, 4, 4, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 3, 4, 4, 4, 3, 3, 4, 4, 3, 3, 3], [6, 6, 6, 7, 6, 6, 6, 6, 5, 6, 6, 6, 5, 5, 6, 6, 5, 5, 5, 6, 5, 5, 5, 5, 4, 5, 5, 5, 5], [5, 5, 6, 6, 5, 5, 5, 6, 5, 5, 5, 5, 4, 5, 5, 5, 4, 4, 5, 5, 4, 4, 4, 5, 4, 4, 4, 4, 5], [6, 6, 6, 7, 6, 6, 6, 6, 5, 6, 6, 6, 5, 5, 6, 6, 5, 5, 5, 6, 5, 5, 5, 5, 4, 5, 5, 5, 5], [6, 6, 7, 7, 6, 6, 6, 7, 6, 6, 6, 6, 5, 6, 6, 6, 5, 5, 6, 6, 5, 5, 5, 6, 5, 5, 5, 5, 4, 5, 5, 5, 5], [7, 8, 8, 8, 7, 7, 8, 8, 7, 7, 7, 8, 7, 7, 7, 7, 6, 7, 7, 7, 6, 6, 7, 7, 6, 6, 6, 7, 7], [8, 8, 8, 9, 8, 8, 8, 8, 7, 8, 8, 8, 7, 7, 8, 8, 7, 7, 7, 8, 7, 7, 7, 7, 6, 7, 7, 7, 6, 6, 7, 7, 7], [8, 8, 8, 9, 8, 8, 8, 8, 7, 8, 8, 8, 7, 7, 8, 8, 7, 7, 7, 8, 7, 7, 7, 7, 6, 7, 7, 7, 7], [9, 9, 9, 9, 8, 9, 9, 9, 8, 8, 9, 9, 8, 8, 8, 9, 8, 8, 8, 8, 7, 8, 8, 8, 7, 7, 8, 8, 8], [8, 8, 8, 8, 7, 8, 8, 8, 7, 7, 8, 8, 7, 7, 7, 8, 7, 7, 7, 7, 6, 7, 7, 7, 6, 6, 7, 7, 7], [7, 8, 8, 8, 7, 7, 8, 8, 7, 7, 7, 8, 7, 7, 7, 7, 6, 7, 7, 7, 6, 6, 7, 7, 6, 6, 6, 7, 7]];

sectionalTermYear = [[13, 49, 85, 117, 149, 185, 201, 250, 250], [13, 45, 81, 117, 149, 185, 201, 250, 250], [13, 48, 84, 112, 148, 184, 200, 201, 250], [13, 45, 76, 108, 140, 172, 200, 201, 250], [13, 44, 72, 104, 132, 168, 200, 201, 250], [5, 33, 68, 96, 124, 152, 188, 200, 201], [29, 57, 85, 120, 148, 176, 200, 201, 250], [13, 48, 76, 104, 132, 168, 196, 200, 201], [25, 60, 88, 120, 148, 184, 200, 201, 250], [16, 44, 76, 108, 144, 172, 200, 201, 250], [28, 60, 92, 124, 160, 192, 200, 201, 250], [17, 53, 85, 124, 156, 188, 200, 201, 250]];

principleTermMap = [[21, 21, 21, 21, 21, 20, 21, 21, 21, 20, 20, 21, 21, 20, 20, 20, 20, 20, 20, 20, 20, 19, 20, 20, 20, 19, 19, 20], [20, 19, 19, 20, 20, 19, 19, 19, 19, 19, 19, 19, 19, 18, 19, 19, 19, 18, 18, 19, 19, 18, 18, 18, 18, 18, 18, 18], [21, 21, 21, 22, 21, 21, 21, 21, 20, 21, 21, 21, 20, 20, 21, 21, 20, 20, 20, 21, 20, 20, 20, 20, 19, 20, 20, 20, 20], [20, 21, 21, 21, 20, 20, 21, 21, 20, 20, 20, 21, 20, 20, 20, 20, 19, 20, 20, 20, 19, 19, 20, 20, 19, 19, 19, 20, 20], [21, 22, 22, 22, 21, 21, 22, 22, 21, 21, 21, 22, 21, 21, 21, 21, 20, 21, 21, 21, 20, 20, 21, 21, 20, 20, 20, 21, 21], [22, 22, 22, 22, 21, 22, 22, 22, 21, 21, 22, 22, 21, 21, 21, 22, 21, 21, 21, 21, 20, 21, 21, 21, 20, 20, 21, 21, 21], [23, 23, 24, 24, 23, 23, 23, 24, 23, 23, 23, 23, 22, 23, 23, 23, 22, 22, 23, 23, 22, 22, 22, 23, 22, 22, 22, 22, 23], [23, 24, 24, 24, 23, 23, 24, 24, 23, 23, 23, 24, 23, 23, 23, 23, 22, 23, 23, 23, 22, 22, 23, 23, 22, 22, 22, 23, 23], [23, 24, 24, 24, 23, 23, 24, 24, 23, 23, 23, 24, 23, 23, 23, 23, 22, 23, 23, 23, 22, 22, 23, 23, 22, 22, 22, 23, 23], [24, 24, 24, 24, 23, 24, 24, 24, 23, 23, 24, 24, 23, 23, 23, 24, 23, 23, 23, 23, 22, 23, 23, 23, 22, 22, 23, 23, 23], [23, 23, 23, 23, 22, 23, 23, 23, 22, 22, 23, 23, 22, 22, 22, 23, 22, 22, 22, 22, 21, 22, 22, 22, 21, 21, 22, 22, 22], [22, 22, 23, 23, 22, 22, 22, 23, 22, 22, 22, 22, 21, 22, 22, 22, 21, 21, 22, 22, 21, 21, 21, 22, 21, 21, 21, 21, 22]];

principleTermYear = [[13, 45, 81, 113, 149, 185, 201], [21, 57, 93, 125, 161, 193, 201], [21, 56, 88, 120, 152, 188, 200, 201], [21, 49, 81, 116, 144, 176, 200, 201], [17, 49, 77, 112, 140, 168, 200, 201], [28, 60, 88, 116, 148, 180, 200, 201], [25, 53, 84, 112, 144, 172, 200, 201], [29, 57, 89, 120, 148, 180, 200, 201], [17, 45, 73, 108, 140, 168, 200, 201], [28, 60, 92, 124, 160, 192, 200, 201], [16, 44, 80, 112, 148, 180, 200, 201], [17, 53, 88, 120, 156, 188, 200, 201]];

computeSolarTerms = function() {
  if (gregorianYear < 1901 || gregorianYear > 2100) {
    return 1;
  }
  sectionalTerm = _sectionalTerm(gregorianYear, gregorianMonth);
  principleTerm = _principleTerm(gregorianYear, gregorianMonth);
  return 0;
};

_sectionalTerm = function(year, month) {
  var index, ry, term;
  if (year < 1901 || year > 2100) {
    return 0;
  }
  index = 0;
  ry = year - baseYear + 1;
  while (ry >= sectionalTermYear[month - 1][index]) {
    index = index + 1;
  }
  term = sectionalTermMap[month - 1][4 * index + ry % 4];
  if (ry === 121 && month === 4) {
    term = 5;
  }
  if (ry === 132 && month === 4) {
    term = 5;
  }
  if (ry === 194 && month === 6) {
    term = 6;
  }
  return term;
};

_principleTerm = function(year, month) {
  var index, ry, term;
  if (year < 1901 || year > 2100) {
    return 0;
  }
  index = 0;
  ry = year - baseYear + 1;
  while (ry >= principleTermYear[month - 1][index]) {
    index = index + 1;
  }
  term = principleTermMap[month - 1][4 * index + ry % 4];
  if (ry === 171 && month === 3) {
    term = 21;
  }
  if (ry === 181 && month === 5) {
    term = 21;
  }
  return term;
};

getCNcalendar = function(year, month, day) {
  setGregorian(year, month, day);
  computeChineseFields();
  computeSolarTerms();
  return {
    gregorianYear: gregorianYear,
    gregorianMonth: gregorianMonth,
    gregorianDate: gregorianDate,
    isGregorianLeap: isGregorianLeap,
    dayOfYear: dayOfWeek,
    dayOfWeek: dayOfWeek,
    chineseYear: chineseYear,
    chineseMonth: chineseMonth,
    chineseDate: chineseDate,
    sectionalTerm: sectionalTerm,
    principleTerm: principleTerm
  };
};

export default getCNcalendar;
