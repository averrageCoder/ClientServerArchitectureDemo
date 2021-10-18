let EmployeePayrllDataList;

window. addEventListener( 'DOMContentLoaded', (event) => {
    EmployeePayrllDataList = getDataFromLocalStorage();
    document.querySelector('.emp-count').textContent = EmployeePayrllDataList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});

function getDataFromLocalStorage() {
    return localStorage.getItem('EmployeePayrllDataList') ? JSON.parse(localStorage.getItem('EmployeePayrllDataList')) : [];
}

const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                        "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    let employeeData = EmployeePayrllDataList;
    if(employeeData.length==0) return;
    let innerHtml = `${headerHtml}`;
    for(const empPayrollData of employeeData) {
        innerHtml += `
        <tr>
            <td><img class="profile" alt="" src="${empPayrollData._profilePic}">
            </td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>
                ${getDeptHTML(empPayrollData._department)}
            </td>
            <td>${empPayrollData._salary}</td>
            <td>${stringifyDate(empPayrollData._startDate)}</td>
            <td>
                <img id="${empPayrollData.id}" onclick="remove(this)" alt="delete" 
                src="../assets/icons/delete-black-18dp.svg">
                <img id="${empPayrollData.id}" alt="edit" onclick="update(this)" 
                src="../assets/icons/create-black-18dp.svg">
            </td>
        </tr>
        `;
    }
    document. querySelector('#display').innerHTML = innerHtml;
}

const createEmployeePayrollJSON = () => {
    let employeeData = [ {
        _name: "Narayan M",
        _gender: 'Male',
        _department: [
            'Engineering',
            'Finance'
        ],
        _salary: '500000',
        _startDate: '12 Oct 2021',
        _note: '',
        _profilePic: "../assets/profile-images/Ellipse -2.png"
    },
    {
        _name: "Narayan M",
        _gender: 'Male',
        _department: [
            'Engineering',
            'Finance'
        ],
        _salary: '500000',
        _startDate: '12 Oct 2021',
        _note: '',
        _profilePic: "../assets/profile-images/Ellipse -2.png"
    }
    ];
    return employeeData;
};

const getDeptHTML = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}

const update = (node) => {
    let employeeData = EmployeePayrllDataList.find(empData => empData.id == node.id)
    if(!employeeData) return;
    localStorage.setItem('editEmp', JSON.stringify(employeeData));
    window.location.replace(site_properties.addEmployeePayrollData);
}

const remove = (node) => {
    let employeeData = EmployeePayrllDataList.find(empData => empData.id == node.id);
    console.log(node.id);
    if(!employeeData) return;
    const index = EmployeePayrllDataList
                    .map(empData => empData.id)
                    .indexOf(employeeData.id);
    EmployeePayrllDataList.splice(index, 1);
    localStorage.setItem('EmployeePayrllDataList',JSON.stringify(EmployeePayrllDataList));
    document.querySelector('.emp-count').textContent = EmployeePayrllDataList.length;
    createInnerHtml();
}