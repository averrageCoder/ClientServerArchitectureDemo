let isUpdate = false;
let empPayrollObj = {};

window.addEventListener('DOMContentLoaded',(event) => {
    const name = document.querySelector('#name');
    name.addEventListener('input', function() {
        if(name.value.length == 0) {
            setTextValue('.name-error','');
            return
        }
        try {
            checkName(name.value);
            setTextValue('.name-error','');
        }
        catch(e) {
            setTextValue('.name-error',e);
        }
    });

    let object = document.querySelectorAll('.startDate');
    for(var obj of object) {
        obj.addEventListener("change", validateStartDate);
    }

    const salary = document.querySelector('#salary');
    const salary_output = document.querySelector('.salary-output');
    salary_output.textContent = salary.value;
    salary.addEventListener('input',function() {
        salary_output.textContent = salary.value;
    });

    document.querySelector("#cancelButton").href = site_properties.homepage;
    checkForUpdate();
});

function validateStartDate() {
    const day = document.querySelector('#day').value;
    const month = parseInt(document.querySelector('#month').value) -1;
    const year = document.querySelector('#year').value;

    const start_date = new Date(year,month,day);
    try {
        checkStartDate(start_date);
        setTextValue('.startdate-error','');
    }
    catch (e) {
        setTextValue('.startdate-error',e);
    }
}

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        if(site_properties.useLocalStorage.match("true")) {
            setEmployeePayrollObject();
            createAndUpdateStorage();
            resetForm();
            window.location.replace(site_properties.homepage);
        }
        else {
            createOrUpdateEmployeePayroll();
        }
    }
    catch(e) {
        alert(e);
    }
}

function setEmployeePayrollObject() {
    if(!isUpdate && site_properties.useLocalStorage.match("true")) {
        empPayrollObj.id = createNewEmployeeID();
    }
    empPayrollObj._name = getInputValueId('#name');
    empPayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
    empPayrollObj._gender = getSelectedValues('[name=gender]').pop();
    empPayrollObj._department = getSelectedValues('[name=department]');
    empPayrollObj._salary = getInputValueId('#salary');
    empPayrollObj._note = getInputValueId('#notes');
    let date = getInputValueId('#year')+"-"+getInputValueId('#month')+"-"+getInputValueId('#day');
    empPayrollObj._startDate = new Date(date);
}

function createNewEmployeeData() {
    let employeeData = new EmployeePayrllData();
    try {
        employeeData.name = getInputValueId('#name');
    }
    catch(e) {
        setTextValue('.name-error',e);
        throw e;
    }

    employeeData.profilePic = getSelectedValues('[name=profile]').pop();
    employeeData.gender = getSelectedValues('[name=gender]').pop();
    employeeData.department = getSelectedValues('[name=department]');
    employeeData.salary = getInputValueId('#salary');
    employeeData.note = getInputValueId('#notes');
    let date = getInputValueId('#year')+"-"+getInputValueId('#month')+"-"+getInputValueId('#day');
    try {
        employeeData.startDate = new Date(date);
    }
    catch(e) {
        setTextValue('.startdate-error',e);
        throw e;
    }
    //alert(employeeData.toString());
    return employeeData;
}

function getSelectedValues(propertyValue) {
    let allItems = document.querySelectorAll(propertyValue);
    let selectedItems = new Array();
    allItems.forEach(element => {
        if(element.checked) selectedItems.push(element.value);
    });
    return selectedItems;
}

function getInputValueId(id) {
    return document.querySelector(id).value;
}


//uc4
function createAndUpdateStorage() {
    let EmployeePayrllDataList = JSON.parse(localStorage.getItem('EmployeePayrllDataList'));
    if(EmployeePayrllDataList != undefined) {
        let empPayrollData = EmployeePayrllDataList
                            .find(empData => empData.id == empPayrollObj.id);
        if(!empPayrollData) EmployeePayrllDataList.push(empPayrollObj);
        else {
            const index = EmployeePayrllDataList
                         .map(empData => empData.id)
                         .indexOf(empPayrollData.id);
            EmployeePayrllDataList.splice(index, 1, empPayrollObj);
        }
    }
    else {
        EmployeePayrllDataList = [empPayrollObj];
    }
    localStorage.setItem("EmployeePayrllDataList", JSON.stringify(EmployeePayrllDataList));
}

function createOrUpdateEmployeePayroll() {
    let postURL = site_properties.server_url;
    let methodCall = "POST";
    if(!isUpdate) {
        methodCall = "PUT";
        postURL = postURL + empPayrollObj.id.toString();
    }
    makePromisecall(methodCall,postUrl, true,empPayrollObj)
                .then(responseText => {
                    resetForm();
                    window.location.replace(site_properties.homepage);
                })
                .catch(error => {
                    throw error;
                });
}

function createNewEmployeeID() {
    let empID = localStorage.getItem('empID');
    empID = !empID ? 1: (parseInt(empID)+1).toString();
    localStorage.setItem('empID', empID);
    return empID;
}

function resetForm() {
    setValue('#name','');
    unSelectValues('[name=profile]');
    unSelectValues('[name=gender]');
    unSelectValues('[name=department]');
    setValue('#salary','');
    const salary = document.querySelector('#salary');
    salary.dispatchEvent(new Event('input'));
    setValue('#notes','');
    setValue('#day','01');
    setValue('#month','01');
    setValue('#year','2021');
}

const unSelectValues = (property) => {
    let allItems = document.querySelectorAll(property);
    allItems.forEach(element => {
        element.checked = false;
    });
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setTextValue = (property, value) => {
    const text_error = document.querySelector(property);
    text_error.textContent = value;
}

//curd operations
function checkForUpdate() {
    const employeePayrollJSON = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJSON ? true:false;
    if(!isUpdate) return;
    empPayrollObj = JSON.parse(employeePayrollJSON);
    setForm();
}

function setForm() {
    setValue('#name',empPayrollObj._name);
    setSelectValues('[name=profile]',empPayrollObj._profilePic);
    setSelectValues('[name=gender]',empPayrollObj._gender);
    setSelectValues('[name=department]',empPayrollObj._department);
    setValue('#salary',empPayrollObj._salary);
    const salary = document.querySelector('#salary');
    salary.dispatchEvent(new Event('input'));
    setValue('#notes',empPayrollObj._note);
    let date = new Date(empPayrollObj._startDate);
    setValue('#day',("0" + date.getDate()).slice(-2));
    setValue('#month',("0" + (date.getMonth() + 1)).slice(-2));
    setValue('#year',date.getFullYear());
}

function setSelectValues(property, value) {
    let allItems = document.querySelectorAll(property);
    allItems.forEach(item => {
        if(Array.isArray(value)){
            if(value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if(item.value== value) {
            item.checked = true;
        }
    });
}