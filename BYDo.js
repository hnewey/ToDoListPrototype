var filteredData = [];
var currentWeeklyViewDate;
var monthsOfTheYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

$(document).ready(function() {
  showListTab();
});

function showListTab()
{
  $('#tbl-day').hide();
  $('#tbl-list').show();
  copyDataToFiltered();
  renderListTable();
}

function copyDataToFiltered(){
  filteredData = [];
  $(data).each(function(index, task) {
    filteredData.push(task);
  });
}

function renderApropriateTable(){
  //Some Logic Will Go Here
  renderListTable();
}

function renderListTable()
{
  $('#weekly-header-bar').html('');
  $('#tbl-list tbody').html('');
  $(filteredData).each(function(index, task) {
    var tr = $('<tr>');
    if (task.completed === false) {
      $(tr).append("<td><input type='checkbox' align='center' onclick='completeTask("+task.id+")'></td> ");
      $(tr).append('<td>'+task.name+'</td>');
      $(tr).append('<td>'+getReadableDate(task.due)+'</td>');
      $(tr).append('<td>'+task.priority+'</td>');
      $('#tbl-list tbody').append(tr);
    }
  });
}

function completeTask(id){
  
  for (i=0;i<filteredData.length;i++) {
    var task = filteredData[i];
    if (task.id === id) {
      task.completed = true;
      break;
    }
  }
  renderListTable();
}

function completeTaskWeek(id){
  
  for (i=0;i<filteredData.length;i++) {
    var task = filteredData[i];
    if (task.id === id) {
      task.completed = true;
      break;
    }
  }
  renderWeeklyTable();
}

function showAllLists(){
  copyDataToFiltered();
  $(creativeWritingList).each(function(index, task) {
    filteredData.push(task);
  });
  $(listThree).each(function(index, task) {
    filteredData.push(task);
  });
  renderApropriateTable();
}

function resetToCurrentList(){
  showAllLists();
}

function searchData(input){
  //I still need to come up with a way to specify a list before searching so it doesnt always use this one
  resetToCurrentList();
  
  if (input === '' || input === ' ' || input == null || input == '   Search Tasks / Quick Add') {
    renderListTable();
    return;
  }
  
  input = input.toLowerCase();
  var temFilter = [];
  for (i=0;i<filteredData.length;i++) {
    var task = filteredData[i];
    if (task.name.toLowerCase().indexOf(input) > -1) {
      temFilter.push(filteredData[i]);
    }
  }
  filteredData = temFilter;
  
  //At the moment I am unsure how we should determine if we are searching on list view or week view.
  //Maybe make a seperate search bar for each List and Week view and include which bar is being searched
  //from as an arguement to this function so I know which to render in.
  renderApropriateTable()
}

function getReadableDate(date)
{
  return (date.getMonth() + 1) + '/' + date.getDate() + ' ' + zeroPad(2, date.getHours()) + ':' + zeroPad(2, date.getMinutes());
}

function zeroPad(length, val)
{
  while (val.toString().length < length)
  {
    val = '0' + val.toString();
  }

  return val;
}

//BELOW SHOULD PROBABLY MORE SIMPLE THROUGH JQUERY -- THIS WAS OLD CODE I HAD THAT WORKS
//sorting algorithm ASC
function sortByKeyAsc(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; 
		var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
//sorting algorithm DESC
function sortByKeyDesc(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; 
		var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}

//Sorting by Due Date
function sortDue() {
  jsonFile.listName = sortByKeyAsc(jsonFile.listName, 'due');
  //Update tables with sorted info using DOM  
  createDynamicList(jsonFile);
}

//Sorting by Priority
function sortPriority() {
  jsonFile.listName = sortByKeyDesc(jsonFile.listName, 'priority');
  //Update tables with sorted info using DOM
  createDynamicList(jsonFile);
}

function weekView() {

  currentWeeklyViewDate = new Date();
  currentWeeklyViewDate.setHours(0);
  currentWeeklyViewDate.setMinutes(00);
  currentWeeklyViewMonth = currentWeeklyViewDate.getMonth();

  renderWeeklyTable();
}

function nextWeekView() {
  currentWeeklyViewDate.setDate(currentWeeklyViewDate.getDate() + 7);
  renderWeeklyTable();
}

function lastWeekView() {
  currentWeeklyViewDate.setDate(currentWeeklyViewDate.getDate() - 7);
  renderWeeklyTable();
}

function renderWeeklyTable() {
  var weekViewHtml = '';
  $('#weekly-header-bar').html('');

  var lastDateOfWeek = new Date(currentWeeklyViewDate.getFullYear(), currentWeeklyViewDate.getMonth(), currentWeeklyViewDate.getDate(), 23, 59, 0);
  lastDateOfWeek.setDate(currentWeeklyViewDate.getDate() + 6);

  var mm = monthsOfTheYear[currentWeeklyViewDate.getMonth()]; //January is 0!
  var lastDayMm = monthsOfTheYear[lastDateOfWeek.getMonth()];
  var yyyy = currentWeeklyViewDate.getFullYear();
  var lastDayYyyy = lastDateOfWeek.getFullYear();
  
  //Sets correct dates in the weekly view header bar
  weekViewHtml += '<p id="weekly-header-paragraph">';
  weekViewHtml += '<button id="left-arrow-weekly-bar" onclick="lastWeekView()">Last Week</button>';
  weekViewHtml += mm + ' ' + currentWeeklyViewDate.getDate() + ", " + yyyy + ' - ' + lastDayMm + ' ' + lastDateOfWeek.getDate() + ', ' + lastDayYyyy;
  weekViewHtml += '<button id="right-arrow-weekly-bar" onclick="nextWeekView()">Next Week</button>';
  weekViewHtml += '</p>';

  $('#weekly-header-bar').html(weekViewHtml);
  
  weeklyTasks = new Map();

  $('#tbl-list tbody').html('');

  //Finds all tasks within the current week of the weekly view and adds them to a map of (day of month, task)
  $(filteredData).each(function(index, task) {
    taskDueDate = task.due;
    
    if (currentWeeklyViewDate <= taskDueDate && taskDueDate <= lastDateOfWeek) {
      if (weeklyTasks.has(taskDueDate.getDate())) {
        weeklyTasks.get(taskDueDate.getDate()).push(task);
      }
      else {
        weeklyTasks.set(taskDueDate.getDate(), [task]);
      }
    }
  });
  
  //Sorting the keys
  keys = [];
  for (var key of weeklyTasks.keys()) {
    keys.push(key);
  }

  keys.sort(sortNumber);

  //Adding the tasks of the week to the DOM
  for (var key of keys) {
    var tasksArr = weeklyTasks.get(key);

    var firstTime = true;
    for (var task of tasksArr) {
      if (task.completed === false) {
	if (firstTime) {
          $('#tbl-list tbody').append('<tr><td id="date-row" colspan="4">' + daysOfTheWeek[task.due.getDay()] + ', ' + monthsOfTheYear[task.due.getMonth()] + ' ' + task.due.getDate() + '</td></tr>');
          firstTime = false;
        }

      var tr = $('<tr>');
      $(tr).append("<td><input type='checkbox' align='center' onclick='completeTaskWeek("+task.id+")'></td> ");
      $(tr).append('<td>'+task.name+'</td>');
      $(tr).append('<td>'+getReadableDate(task.due)+'</td>');
      $(tr).append('<td>'+task.priority+'</td>');
      $('#tbl-list tbody').append(tr);
      }
    }
  }

}

function sortNumber(a,b) {
    return a - b;
}

function imageOverlay() {
  el = document.getElementById("imageOverlay");
  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}

function uploadImageData() {
  
  data.push(
    {
    "id": curID,
    "name": "Mariah Torres Wedding",
    "due": new Date("December 13, 2014 18:00:00"),
    "priority": "High",
    "list": "Personal",
    "completed": false
    }
  );
  curID++;
  
  data.push(
    {
    "id": curID,
    "name": "Primary Party",
    "due": new Date("December 20, 2014 18:00:00"),
    "priority": "High",
    "list": "Personal",
    "completed": false
    }
  );
  curID++;
  
  data.push(
    {
    "id": curID,
    "name": "Devin's B-day",
    "due": new Date("December 21, 2014 0:00:00"),
    "priority": "High",
    "list": "Personal",
    "completed": false
    }
  );
  curID++;
  
  data.push(
    {
    "id": curID,
    "name": "Due Date :)",
    "due": new Date("December 29, 2014 18:00:00"),
    "priority": "High",
    "list": "Personal",
    "completed": false
    }
  );
  curID++;
  
  imageOverlay();
  showListTab();
}