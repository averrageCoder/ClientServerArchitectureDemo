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

function showTime() {
    const date = new Date();
    return date.getHours()+"H: "+date.getMinutes()+"M: "+date.getSeconds()+"S";
}

function makePromisecall(methodType, url, async=true, data=null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
            //console.log(methodType+" state changed called at"+showTime()+". Ready state: "+xhr.readyState+" ,status: "+xhr.status);
            if(xhr.readyState == 4) {
                if(xhr.status === 200 || xhr.status === 201) {
                    resolve(xhr.responseText);
                }
                else if(xhr.status >= 400) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                    console.log("Handle 400 client error or 500 server error!");
                }
            }
        }
        xhr.onerror = function() {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        }
        xhr.open(methodType, url, async);
        if(data) {
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.send(JSON.stringify(data));
        }
        else {
            xhr.send();
        }
        console.log(methodType+" request sent to server at "+showTime()+"!");
    });
}