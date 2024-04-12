/* Your Code Here */

function createEmployeeRecord(data) {
    // Creates a new employee record object from an array of data.
    return {
        firstName: data[0], // The first name of the employee
        familyName: data[1], // The family name (last name) of the employee
        title: data[2], // The job title of the employee
        payPerHour: data[3], // The pay rate of the employee in dollars per hour
        timeInEvents: [], // An array to track time in events for the employee
        timeOutEvents: [] // An array to track time out events for the employee
    }
}

function createEmployeeRecords(data) {
    // Creates an array of employee record objects from an array of arrays of data.
    return data.map(rec => createEmployeeRecord(rec));
}

function createTimeInEvent(str) {
    // Adds a time in event to an employee's record.
    // The argument `str` is a string in the format "YYYY-MM-DD HHMM".
    let [inDate, inHour] = str.split(' ');
    this.timeInEvents.push({
        type: 'TimeIn', // The event type, which is "TimeIn"
        date: inDate, // The date of the time in event
        hour: parseInt(inHour, 10) // The hour of the time in event, parsed as an integer
    });
    return this;
}

function createTimeOutEvent(str) {
    // Adds a time out event to an employee's record.
    // The argument `str` is a string in the format "YYYY-MM-DD HHMM".
    let [outDate, outHour] = str.split(' ');
    this.timeOutEvents.push({
        type: 'TimeOut', // The event type, which is "TimeOut"
        date: outDate, // The date of the time out event
        hour: parseInt(outHour, 10) // The hour of the time out event, parsed as an integer
    });
    return this;
}

function hoursWorkedOnDate(str) {
    // Calculates the hours worked by an employee on a given date.
    // The argument `str` is a string representing the date in the format "YYYY-MM-DD".
    let date = str.split(' ')[0];
    let inTime = this.timeInEvents.find(day => day.date === date);
    let outTime = this.timeOutEvents.find(day => day.date === date);
    // Calculate the difference in hours worked and divide by 100 since time is stored as integers like 0900 for 9:00am.
    return (outTime.hour - inTime.hour) / 100;
}

function wagesEarnedOnDate(str) {
    // Calculates the wages earned by an employee on a given date.
    // The argument `str` is a string representing the date in the format "YYYY-MM-DD".
    return hoursWorkedOnDate.call(this, str) * this.payPerHour;
}

function findEmployeeByFirstName(data, name) {
    // Finds an employee by their first name in an array of employee records.
    // The argument `data` is an array of employee records and `name` is the first name to search for.
    return data.find(employee => employee.firstName === name);
}

function calculatePayroll(data) {
    // Calculates the total payroll for an array of employee records.
    // The argument `data` is an array of employee records.
    return data.reduce((sum, employee) => {
        // Calculate the total wages for each employee and add it to the sum.
        return sum += allWagesFor.call(employee);
    }, 0);
}

/*`
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
