/* Your Code Here */

function createEmployeeRecord(data) {
    return {
        firstName: data[0],
        familyName: data[1],
        title: data[2],
        payPerHour: data[3],
        timeInEvents: [],
        timeOutEvents:  []
    }
}

function createEmployeeRecords(data) {
    return data.map(rec => createEmployeeRecord(rec))
}

function createTimeInEvent(str) {
    let [inDate, inHour] = str.split(' ')
    this.timeInEvents.push({
        type: 'TimeIn',
        date: inDate, 
        hour: parseInt(inHour, 10)        
    })  
    return this
}

function createTimeOutEvent(str) {
    let [outDate, outHour] = str.split(' ')
    this.timeOutEvents.push({
        type: 'TimeOut',
        date: outDate,
        hour: parseInt(outHour, 10)
    })
    return this
}

function hoursWorkedOnDate(str) {
    let date = str.split(' ')[0]
    let inTime = this.timeInEvents.find(day => day.date === date)
    let outTime = this.timeOutEvents.find(day => day.date === date)
    return (outTime.hour - inTime.hour) / 100 
}

function wagesEarnedOnDate (str) {
    return hoursWorkedOnDate.call(this, str) * this.payPerHour
}

function findEmployeeByFirstName(data, name) {
    return data.find(employee => employee.firstName === name ? createEmployeeRecord.call(this, name) : undefined)
}

function calculatePayroll(data) {
    return data.reduce((sum, employee) => {
        return sum += allWagesFor.call(employee)
    }, 0)
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
