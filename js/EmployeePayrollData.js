class EmployeePayrllData {
    id;

    get name() {return this._name; }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if(nameRegex.test(name)) {
            this._name = name;
        }
        else {
            throw 'Name is incorrect';
        }
    }

    get salary() {return this._salary; }
    set salary(salary) {
        let salaryRegex = RegExp('^[0-9.]+$')
        if(salaryRegex.test(salary)) this._salary = salary;
        else 
            throw 'Salary is incorrect';
    }

    get gender() {return this._gender; }
    set gender(gender) {
        // let genderRegex = RegExp('^[MFmf]{1}$')
        // if(genderRegex.test(gender)) this._gender = gender;
        // else 
        //     throw 'gender is incorrect';
        this._gender = gender;
    }

    get note() {return this._note; }
    set note(note) {
        this._note = note;
    }

    get department() {return this._department; }
    set department(department) {
        this._department = department;
    }

    get profilePic() {return this._profilePic; }
    set profilePic(profilePic) {
        this._profilePic = profilePic;
    }

    get startDate() {return this._startDate; }
    set startDate(startDate) {
        var today = new Date();
        if(today < startDate) throw "Start date is in future!"
        const one_month_ago = new Date(today.setDate(today.getDate()-30));
        today = new Date();
        if(startDate < one_month_ago) {
            throw 'Start date is beyond 30days!';
        }
        this._startDate = startDate;
    }

    toString() {
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        const empDate = !this.startDate ? "not defined" : 
                        this.startDate.toLocaleDateString("en-US", options);
        return "id=" + this.id + ", name: "+this.name + ", salary: " + this.salary
        + ", gender: "+this.gender+", department: "+this.department+", startDate: "+empDate
        +", note: "+this.note+", profilePic: "+this.profilePic;
    }
}