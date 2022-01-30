import { range } from "ramda";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekday); // https://day.js.org/docs/en/plugin/weekday
dayjs.extend(weekOfYear); // https://day.js.org/docs/en/plugin/week-year

export const daysOfWeek = [
  "SUN",
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT"
];



export function getYearDropdownOptions(currentYear) {
  let minYear = currentYear - 4;
  let maxYear = currentYear + 5;
  return range(minYear, maxYear + 1).map((y) => ({ label: `${y}`, value: y }));
}
// Basically does the same thing as the getMonthDropdownOptions() function below.


export function getMonthDropdownOptions() {
  return range(1, 13).map((m) => ({
    value: m,
    label: dayjs()
      .month(m - 1)
      .format("MMMM")
  }));
}
// Returns this array
// [
//   { value: 1, label: 'January' },
//   { value: 2, label: 'February' },
//   { value: 3, label: 'March' },
//   { value: 4, label: 'April' },
//   { value: 5, label: 'May' },
//   { value: 6, label: 'June' },
//   { value: 7, label: 'July' },
//   { value: 8, label: 'August' },
//   { value: 9, label: 'September' },
//   { value: 10, label: 'October' },
//   { value: 11, label: 'November' },
//   { value: 12, label: 'December' }
// ]



// This function takes in a year and a month and an argument in that order. It then returns the number of days in the given month as a number.
export function getNumberOfDaysInMonth(year, month) {
  return dayjs(`${year}-${month}-01`).daysInMonth();
}



export function createDaysForCurrentMonth(year, month) {
  return [...Array(getNumberOfDaysInMonth(year, month))].map((_, index) => {
    return {
      dateString: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
      dayOfMonth: index + 1,
      isCurrentMonth: true
    };
  });
}
// The [...Array(getNumberOfDaysInMonth(year, month))] creates an array with the length of the return value of getNumberOfDaysInMonth(). 
// It then uses the map function to iterate through the array, returning an object for each day. For each day, an object is created containing the date in string format, the day of the month and if it is a day in the current month.



export function createDaysForPreviousMonth(year, month, currentMonthDays) {
  const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].dateString);
  const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");

  const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday;

  const previousMonthLastMondayDayOfMonth = dayjs( 
    currentMonthDays[0].dateString
  )
    .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
    .date();

  return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((_, index) => {
    return {
      dateString: dayjs(
        `${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastMondayDayOfMonth + index}`
      ).format("YYYY-MM-DD"),
      dayOfMonth: previousMonthLastMondayDayOfMonth + index,
      isCurrentMonth: false,
      isPreviousMonth: true
    };
  });
}
// This function does the same thing as createDaysForCurrentMonth(year, month) but it does it for the previous month and only for the days that would carry over onto the current months calandar. 
// For example, if the first day of the current month starts on a Wednesday, there would be 4 weekdays before Wednesday that belong to the previous month. 
// This function returns an array the length of how many "carry over" weekdays from the previous month are required. The array is filled with objects that each have the date in string format, the day of the month and if it is a day in the current month (which is false since it is the previous month). It also has a new property that is if it is the previous month (which is true). 

// The way this works is the following:
// Line 1: Take the first object from the array in currentMonthDays and take its date in string formath which is held in the dateString property (e.g., dateString: '2020-01-29'). Pass this string into the function getWeekday() (the function is written below). This returns the day of the week that the first day of the CURRENT month falls on. (Remember that this function deals with the PREVIOUS month, not the CURRENT month) if the form of a NUMBER where 0 is Sunday and 6 is Saturday.


// Line 2: You take the date of the first day of the current month and subtract one month. This will return an object that refers to the first day of the previous month (this is not entirely true. Read the bait warning below). The object is a dayjs object which is a wrapper around the Date object.

    // dayjs(`${year}-${month}-${day}`) returns an object that contains information about the given date, including language, date, year, month, day, weekday, hour, minute, second, milisecond
    // There is a massive bait in this line. Basically, when you give dayjs() a date without any specific time, it will return the PREVIOUS day at 0:00. This is because the new day starts at 0:00 but all the day, month and year data is assigned to the PREVIOUS day until one milisecond passes. Hence, when you give "dayjs(`${year}-${month}-01`)" you are actually getting back the dayjs object of the PREVIOUS day at 0:00. Because we are doing this for the first day of the month, we are actually getting back the final day of the PREVIOUS month. 
    // Since we also subtract one month using hte subtract() method, we are actually going back TWO months instead of just one.
    // This issue is later resolved in line 12 by adding +1 to the previousMonth variable so we go forward a month to account for the extra month we jumped back. 
    // Note that if we actually try to display the date using the date() method on the dayjs() object, it will give the right date.


// Line 3: This takes the number of the first day of the current month. Because Sunday is 0 and Satuday is 6, this number also shows how many weekdays prior to the current first day of the month exists, e.g., if the first day is a Monday, the number is 1, meaning there is 1 weekday before the first day of the month, which is Sunday. Hence, the variable is called "visibleNumberOfDaysFromPreviousMonth" because in a calendar, thats how many previous days should be carried on and displayed in the first week. 


// Line 4: previousMonthLastMondayDayOfMonth should hold the date of the last month which the final Sunday of that month falls on. E.g., in March 2021 (which has 31 days), the last Sunday of the month falls on the 28th of the month. Hence, if the current month is April, the previous month's (March) last Sunday will fall on the 28th of that month so previousMonthLastMondayDayOfMonth will hold the integer 28.

    // This should say previousMonthLastSundayDayOfMonth not LastMonday. Not sure why it's like that.

// Line 5: we return the dayjs object of the date 1 day behind the first day of the month at 0:00, given by "currentMonthDays[0].dateString". 
// Line 7: we then subtract the number of visible days from that date, giving us the dayjs object of the date 1 day behind the date of the last Sunday of the previous month.
// Line 8: we then use the date() method on this dayjs object which gives us the correct date since the date() method pushes the date forward on a dayjs object if it is at 0:00.


// At this point, we have 4 variables.
// firstDayOfTheMonthWeekday holds the weekday the first day of the month falls on in integer form, where 0 is Sunday and 6 is Saturday.
// previousMonth holds a dayjs object that refers to the last day of the month 2 months behind the current month at 0:00. The intention was to get the first day of the month one month behind the current month but due to dayjs's weird system, it doesn't. 
// visibleNumberOfDaysFromPreviousMonth is the number of weekdays that preceeds the weekday of the first day of the current month (e.g., if the first day was Thursday, there would be 4 days preceeding it starting from Sunday).
// previousMonthLastMondayDayOfMonth holds the date the last Sunday of the previous month falls on.


// Line 9: This return statement is similar to how "createDaysForCurrentMonth()" works. However, you only have object for the "carry over" weekdays from the previous month that cut into the first week that the first day of your month falls on. Hence, you create an array the size of "visibleNumberOfDaysFromPreviousMonth". 


// Line 12: we take the current year and the previous month and take the date of the last Sunday of the previous month. We then make our own object that contains the date of that day as a string and put it as a property of our object. Since we iterate through our array, our "index" variable starts off at 0 so the first date will be the date of the last Sunday of the previous month. As our map() function iterates through the array, we will slowly add +1 to the date giving us a new object in the array for every date between the last Sunday of the previous month and the actual last day of the previous month (since the array only has so much length and is the length of visibleNumberOfDaysFromPreviousMonth).

    // The issue with the dayjs() bait seems to only be for months. Even if you try the 0:00 on the last day of the previous year and use the year() method, it will still register as the current year. E.g., a dayjs object with the date 2020-11-30T13:00:00.000Z is still considered 2021 but the month is considered 0 for some reason so we will always +1 to the month if we want the current month but are on 0:00. 

// Line 14: this just gives us the date corresponding to the object. Same thing as the ${previousMonthLastMondayDayOfMonth + index} in line 12. 



export function createDaysForNextMonth(year, month, currentMonthDays) {
  const lastDayOfTheMonthWeekday = getWeekday(
    `${year}-${month}-${currentMonthDays.length}`
  );
  const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");
  const visibleNumberOfDaysFromNextMonth = 6 - lastDayOfTheMonthWeekday;

  return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
    return {
      dateString: dayjs(
        `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
      ).format("YYYY-MM-DD"),
      dayOfMonth: index + 1,
      isCurrentMonth: false,
      isNextMonth: true
    };
  });
}
// This function returns an array of object. the number of objects is the number of weekdays of the next month that fill out the last week of the current month, with each object corresponding to a particular weekday.
// Line 1: gets the weekday of the final day of the month using the weekday function written below.
// Line 2: passes in the current year and month and also takes the length of the array that holds the objects for each day of the month since the length is the total amount of days and the last one will be the final date.
// Line 4: gets the dayjs object of the first day of the next month
    // Becuase dayjs is weird, it'll give you the date of the last day of the current month at 0:00
// Line 5: you take the last day of the month's weekday, where Sunday is 0 and Satuday is 6, and subract it from 6. If the last day was a Monday, you would subtract 1 from 6, giving you 5 more weekdays of the next month to display.
// Line 6: creating an array with a length of the weekdays of the next month to display. 
// Line 9: taking the next months year and its month + 1 (due to the weird way months are handled by dayjs) as well as the index starting from 0+1 (because its a new month so we start at 0).


// sunday === 0, saturday === 6
export function getWeekday(dateString) {
  return dayjs(dateString).weekday();
}
// This function needs the "dayjs.extend(weekday);" at the top of the file which in turn needs the "import weekday from "dayjs/plugin/weekday";".
// It returns the day of the week (e.g., Monday) a particular date falls on. It takes an argumant of a date in the format of "YYYY-MM-DD" (e.g., '2020-01-30'). 
// It returns a NUMBER where 0 is Sunday and 6 is Saturday


export function isWeekendDay(dateString) {
  return [6, 0].includes(getWeekday(dateString));
}
// This function tells you if the given date string is a weekend day or not in the form of a boolean. True if its a weekend, false if not.

