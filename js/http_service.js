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

function setTextValue(property, value) {
    let element = document.querySelector(property);
    element.textContent= value;
    element.innerHTML = element.innerHTML.replace(new RegExp('\r?\n','g'), ' ');
}

const getUrl = "http://localhost:3000/EmployeePayrollDB/1";
makePromisecall("GET",getUrl, true)
            .then(responseText => {
                data = responseText;
                setTextValue('#get_services',"Get user data at "+showTime()+": "+ data)
                console.log("Get user data at "+showTime()+": ", data)
            })
            .catch(error => {
                setTextValue('#get_services',"GET ERROR Status: "+JSON.stringify(error));
                console.log("GET ERROR Status: "+JSON.stringify(error));
            })
console.log("MADE AJAX GET CALL TO SERVER AT "+showTime()+"!");

const deleteUrl = "http://localhost:3000/EmployeePayrollDB/2";
makePromisecall("DELETE",deleteUrl, false)
                .then(responseText => {
                    data = responseText;
                    setTextValue('#delete_services', "User deleted at "+showTime()+": "+ data)
                    console.log("User deleted at "+showTime()+": ", data)
                })
                .catch(error => {
                    setTextValue('#delete_services', "DELETE ERROR Status: "+JSON.stringify(error));
                    console.log("Delete Error Status: "+JSON.stringify(error));
                });
console.log("MADE AJAX DELETE CALL TO SERVER AT "+showTime()+"!");

const postUrl = "http://localhost:3000/EmployeePayrollDB/";
const empData = {
    "id": 2,
    "_name": "Bill Gates",
    "_gender": "male",
    "_department": [
      "Engineering"
    ],
    "_salary": "500000",
    "_startDate": "29 Oct 2019",
    "_note": "Terrific Engineer",
    "_profilePic": "../assets/profile-images/Ellipse -1.png"
  };

function userAdded(data) {
    data = JSON.parse(data)
    console.log("User added at "+showTime()+": ", data)
}
makePromisecall("POST",postUrl, true,empData)
                .then(responseText => {
                    data = responseText
                    setTextValue('#post_services',"User added at "+showTime()+": "+ data)
                    console.log("User added at "+showTime()+": ", data)
                })
                .catch(error => {
                    setTextValue('#post_services',"DELETE ERROR Status: "+JSON.stringify(error))
                    console.log("DELETE ERROR Status: "+JSON.stringify(error));
                });
console.log("MADE AJAX POST CALL TO SERVER AT "+showTime()+"!");