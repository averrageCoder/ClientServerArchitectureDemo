{
    const IS_ABSENT = 0;
    let empCheck = Math.floor(Math.random() * 10) % 2
    if(empCheck == IS_ABSENT) {
        console.log('UC1- Employee is Absent');
    }
    else
        console.log('UC1- Employee is Present');
}

const IS_PART_TIME = 1;
const IS_FULL_TIME = 2;
const PART_TIME_HOURS = 4;
const FULL_TIME_HOURS = 8;
const WAGE_PER_HOUR =  20;
const NUM_OF_WORKING_HOURS = 20;
const MAX_HRS_IN_A_MONTH = 160;

function getEmployeeHrs(empcheck) {
    switch(empcheck) {
        case IS_PART_TIME:
            return PART_TIME_HOURS;
            break;
        case IS_FULL_TIME:
            return  FULL_TIME_HOURS;
            break;
        default:
            return  0;
    }
}

function calcDailyWage(empHrs) {
    return empHrs * WAGE_PER_HOUR;
}

let totalHrs = 0;
let totalDays = 0;
let empDailyWageArr = new Array();
let empDailyWageMap = new Map();
let empDailyHrsMap = new Map();
let empDailyHrsAndWageArray = new Array();

while(totalHrs < MAX_HRS_IN_A_MONTH && totalDays < NUM_OF_WORKING_HOURS) {
    totalDays++;
    let empCheck = Math.floor(Math.random() * 10) & 3;
    let empHrs = getEmployeeHrs(empCheck);
    totalHrs += empHrs;
    empDailyWageArr.push(calcDailyWage(empHrs));
    empDailyHrsMap.set(totalDays, empHrs)
    empDailyWageMap.set(totalDays, calcDailyWage(empHrs))
    empDailyHrsAndWageArray.push({
        dayNum: totalDays,
        dailyHours: empHrs,
        dailyWage: calcDailyWage(empHrs),
        toString() {
            return '\nDay: '+this.dayNum+' => Working Hours: '+this.dailyHours +
                    ' And daily wage: '+this.dailyWage;
        }
    })
}

let employeeWage =  calcDailyWage(totalHrs);
console.log("Total days: ",totalDays," Total hours: ",totalHrs," Employee wage: ", employeeWage);

let totalEmployeeWage = 0;
function sum(dailyWage) {
    totalEmployeeWage+=dailyWage;
}
empDailyWageArr.forEach(sum);
console.log("Total days: ",totalDays," Total hours: ",totalHrs," Employee wage: ", totalEmployeeWage);

function totalWages(totalWage, dailyWage) {
    return totalWage + dailyWage;
}

//uc8
console.log("UC8- Employee Wage Map: ", empDailyWageMap)
console.log("UC8- Employee wage with totalHrs: ", Array.from(empDailyWageMap.values()).reduce(totalWages, 0));

//uc7b
let dailyCnt = 0;
function mapWithDailyWage(dailyWage) {
    dailyCnt++;
    return dailyCnt + " = " + dailyWage;
}

//let mapDayWithWageArr = empDailyWageArr.map(mapWithDailyWage);
let mapDayWithWageArr = empDailyWageArr.map((dailyWage) => {
    dailyCnt++;
    return dailyCnt + " = " + dailyWage;
});
console.log("7B Daily Wage Map");
console.log(mapDayWithWageArr);

//uc7c
function fullTimeWage(dailyWage) {
    return dailyWage.includes(160);
}

//let fullTimeWageArr = mapDayWithWageArr.filter(fullTimeWage);
let fullTimeWageArr = mapDayWithWageArr.filter((dailyWage) => {
    return dailyWage.includes(160);
});
console.log("7C Full time Wage Array: ", fullTimeWageArr);

//uc7d
function findFullTimeWage(dailyWage) {
    return dailyWage.includes("160");
}
//console.log("First full time wage was earned on Day: ", mapDayWithWageArr.find(findFullTimeWage));
console.log("7D First full time wage was earned on Day: ", mapDayWithWageArr.find((dailyWage) => {
    return dailyWage.includes("160");
}));

//uc7e
function isAllFullTime(dailyWage) {
    return dailyWage.includes("160");
}
//console.log("Are all days full time?",mapDayWithWageArr.every(isAllFullTime));
console.log("7E Are all days full time?",mapDayWithWageArr.every((dailyWage) => {
    return dailyWage.includes("160");
}));

//uc7f
function isAllPartTime(dailyWage) {
    return dailyWage.includes("80");
}
//console.log("Are any days part time?",mapDayWithWageArr.some(isAllPartTime));
console.log("7F Are any days part time?",mapDayWithWageArr.some((dailyWage) => {
    return dailyWage.includes("80");
}));

//uc7g 
function totalDaysWorked(numOfDays, dailyWage) {
    if(dailyWage > 0) numOfDays++;
    return numOfDays;
}
//console.log('Number of days worked: ',empDailyWageArr.reduce(totalDaysWorked, 0));
console.log('7G Number of days worked: ',empDailyWageArr.reduce((numOfDays, dailyWage) => {
    if(dailyWage > 0) numOfDays++;
    return numOfDays;
}, 0));

//uc9
const findTotal = (totalVal, dailyVal) => {
    return totalVal + dailyVal;
}

let totalHours = Array.from(empDailyHrsMap.values())
                .filter(dailyhrs => dailyhrs > 0)
                .reduce(findTotal, 0);
let totalSalary = empDailyWageArr
                .filter(dailyWage => dailyWage > 0)
                .reduce(findTotal, 0);

console.log(`Total Hours: ${totalHours}, total Salary: ${totalSalary}`);

let nonWorkingDays = new Array();
let partWorkingDays = new Array();
let fullWorkingDays = new Array();

empDailyHrsMap.forEach((value, key, map) => {
    if(value==PART_TIME_HOURS) partWorkingDays.push(key);
    else if(value==FULL_TIME_HOURS) fullWorkingDays.push(key);
    else nonWorkingDays.push(key);
});

console.log("Full working days: "+ fullWorkingDays);
console.log("Part working days: "+ partWorkingDays);
console.log("Non working days: "+ nonWorkingDays);

//uc10
console.log("UC10- Showing daily hours and wage: "+empDailyHrsAndWageArray);

//uc11
totalSalary = empDailyHrsAndWageArray
                .filter(empDailyHrsAndWage => empDailyHrsAndWage.dailyWage > 0) 
                .reduce((totalWage, dailyHrsAndWage) => totalWage+= dailyHrsAndWage.dailyWage, 0);

totalHours = empDailyHrsAndWageArray
                .filter(empDailyHrsAndWage => empDailyHrsAndWage.dailyHours > 0) 
                .reduce((totalHours, dailyHrsAndWage) => totalHours+= dailyHrsAndWage.dailyHours, 0);

console.log(`UC11- Total Hours: ${totalHours}, total Salary: ${totalSalary}`);

console.log("UC11B Logging full working days: ");
empDailyHrsAndWageArray.filter(dailyHrsAndWage => dailyHrsAndWage.dailyHours == 8)
                       .forEach(dailyHrsAndWage => process.stdout.write(dailyHrsAndWage.toString()));

partWorkingDays = empDailyHrsAndWageArray
                  .filter(dailyHrsAndWage => dailyHrsAndWage.dailyHours == 4)
                  .map(dailyHrsAndWage => dailyHrsAndWage.toString());

console.log("\nUC11C- Part Working days string "+partWorkingDays);

nonWorkingDays = empDailyHrsAndWageArray
                  .filter(dailyHrsAndWage => dailyHrsAndWage.dailyHours == 0)
                  .map(dailyHrsAndWage => dailyHrsAndWage.dayNum);

console.log("UC11D- Non Working days string "+nonWorkingDays);