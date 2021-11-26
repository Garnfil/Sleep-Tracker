
const addButton = document.querySelector('.add-btn');

// Display data in table 
function onDisplayData() {
  let table = document.createElement('table');
  let tableRow = document.createElement('tr');
  table.classList.add('table');
  let header = ["Date", 'Time Sleep', 'Wake up', 'Duration'];
  

  //Get all data from storage
  let get_from_storage = localStorage.getItem('value');
  let sleep_data_object = JSON.parse(get_from_storage);
  
  // if the storage is none then only display head table
  if (sleep_data_object == null || sleep_data_object == undefined) {
    header.forEach(head => {
      let tableHead = document.createElement('th');
      let textNode = document.createTextNode(head);
      tableHead.appendChild(textNode);
      tableRow.appendChild(tableHead);
      table.appendChild(tableRow);
    })
  } else {
    // Display Head Table
    header.forEach(head => {
      let tableHead = document.createElement('th');
      let textNode = document.createTextNode(head);
      tableHead.appendChild(textNode);
      tableRow.appendChild(tableHead);
      table.appendChild(tableRow);
    })
    // Display Cell
    sleep_data_object.forEach(sleep => {
      let rowCell = document.createElement('tr');
      Object.values(sleep).forEach(sleepText => {
        let tableData = document.createElement('td');
        let textNode = document.createTextNode(sleepText);
        tableData.appendChild(textNode);
        rowCell.appendChild(tableData);
        table.appendChild(rowCell);
      })
    
    })
  }
  document.querySelector('.wrapper').appendChild(table);
}



function addSleepData(e) {
  let date = document.querySelector('#date').value;
  let timeSleep = document.querySelector('#time-sleep').value;
  let wakeUp = document.querySelector('#wakeup').value;
  let table = document.querySelector('.table');
  
  if (date == "" && timeSleep == "" && wakeUp == "") {
    alert('The input field is empty Please provide a data');
  } else {
    let asleepHour = parseInt(new Date("01/01/2007 " + timeSleep).getTime());
    let wakeupHour = parseInt(new Date("01/01/2007 " + wakeUp).getTime());
    
    let totalSleepDecimal = (wakeupHour - asleepHour) / 60000 / 60;
    
    if (totalSleepDecimal < 0) {
      totalSleepDecimal = 24 + totalSleepDecimal;
    }
    let duration = totalSleepDecimal;
    
    duration = Math.floor(duration)
    
    // data information from form
    const new_sleep_data = {
      date: date,
      time_sleep: timeSleep,
      wake_up: wakeUp,
      hours: duration + ' hours'
    }
    
    //Get all data from storage
    let get_from_storage = localStorage.getItem('value');
    let sleep_data_object = JSON.parse(get_from_storage);
    
    // add new object to existing datas
    let addData = [];
    
    if (sleep_data_object == null || sleep_data_object == undefined) {
      addData = [new_sleep_data];
    } else {
      addData = [...sleep_data_object, new_sleep_data];
    }
    
    // Set data to storage
    let sleep_data_string = JSON.stringify(addData);
    let set_to_storage = localStorage.setItem('value', sleep_data_string);
    
    // creating new cell to existing table
    let rowCell = document.createElement('tr');
    Object.values(new_sleep_data).forEach(sleepText => {
      let tableData = document.createElement('td');
      let textNode = document.createTextNode(sleepText);
      tableData.appendChild(textNode);
      rowCell.appendChild(tableData);
      table.appendChild(rowCell);
      
      // if the data is successfully send the form will be empty
      date = '';
      timeSleep = '';
      wakeUp = '';
    })
  }
}




// Event Listener for rendering new record
addButton.addEventListener('click', addSleepData);

//function for displaying data
window.addEventListener('load', onDisplayData);
