const stringifyDate = (date) => {
    const options = {year: 'numeric', month: 'short', day: 'numeric'};
    const newDate = !date ? "undefined" : new Date(date).toLocaleString('en-GB',options);
    return newDate;
}

function checkName(name) {
    let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
    if(!nameRegex.test(name)) {
        throw 'Name is incorrect';
    }
}

function checkStartDate(startDate) {
    var today = new Date();
    if(today < startDate) throw "Start date is in future!"
    const one_month_ago = new Date(today.setDate(today.getDate()-30));
    today = new Date();
    if(startDate < one_month_ago) {
        throw 'Start date is beyond 30days!';
    }
}