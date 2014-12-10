var filteredData = [];
var currentWeeklyViewDate;
var monthsOfTheYear = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
var daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var currentView = "list";
var activeList = "data";
var accountsAdded = [];
var dueSort = 0;
var prioritySort = 0;

$(document).ready(function() {
  showListTab();
});

function showListTab()
{
  clearArrows('dueArrow');
  clearArrows('priorityArrow');
  prioritySort = 0;
  dueSort = 0;
  $('#nav-list').removeClass('not-selected-tab');
  $('#nav-list').addClass('selected-tab');
  $('#nav-week').addClass('not-selected-tab');
  $('#nav-week').removeClass('selected-tab');
  $('#tbl-day').hide();
  $('#tbl-list').show();
  copyDataToFiltered();
  renderApropriateTable();
  changeViewToList();
}

function changeViewToList(){
  currentView = "list";
  inititateSearchOnViewChange();
}

function changeViewToWeek(){
  currentView = "week";
  inititateSearchOnViewChange();
}

function changeListToData(){
  activeList = "data";
  inititateSearchOnViewChange();
}

function changeListToCreative(){
  activeList = "creativeWriting";
  inititateSearchOnViewChange();
}

function changeListToThree(){
  activeList = "listThree";
  inititateSearchOnViewChange();
}

function changeListToAll(){
  activeList = "all";
  inititateSearchOnViewChange();
}

function resetToCurrentList(){
  if (activeList === "all") {
    copyDataToFiltered();
    $(creativeWritingList).each(function(index, task) {filteredData.push(task);});
    $(listThree).each(function(index, task) {filteredData.push(task);});
  }else if(activeList === "data"){
    filteredData = [];
    $(data).each(function(index, task) {filteredData.push(task);});
  }else if(activeList === "creativeWriting"){
    filteredData = [];
    $(creativeWritingList).each(function(index, task) {filteredData.push(task);});
  }else if(activeList === "listThree"){
    filteredData = [];
    $(listThree).each(function(index, task) {filteredData.push(task);});
  }else{
    copyDataToFiltered();
    $(creativeWritingList).each(function(index, task) {filteredData.push(task);});
    $(listThree).each(function(index, task) {filteredData.push(task);});
  }
}

function renderApropriateTable(){
  if (currentView === "list") {
    renderListTable();
  }else{
    renderWeeklyTable();
  }
}

function copyDataToFiltered(){
  filteredData = [];
  $(data).each(function(index, task) {
    filteredData.push(task);
  });
}

function renderListTable()
{
  $('#weekly-header-bar').html('');
  $('#tbl-list tbody').html('');
  $(filteredData).each(function(index, task) {
    var tr = $('<tr>');
    if (task.completed === false) {
//      $(tr).append("<td><input type='checkbox' align='center' onclick='confirmDeletion(this, "+task.id+")'></td> ");
      $(tr).append("<td><input type='checkbox' align='center' onclick='completeTask("+task.id+")'></td> ");
      $(tr).append('<td>'+task.name+'</td>');
      $(tr).append('<td>'+getReadableDate(task.due)+'</td>');
      $(tr).append('<td>'+task.priority+'</td>');
      $('#tbl-list tbody').append(tr);
    }
  });
}

<!-- If we want the confirmation dialogue for checking off tasks, uncomment this code and the line commented out above -->
//function confirmDeletion(self, id){
//    if($(self).prop("checked")){
//        $("#checkDeletion").dialog({
//            modal: true,
//            resizable: false,
//            height: 140,
//            buttons: {
//                "Yes": function() {
//                    $( this ).dialog( "close" );
//                    completeTask(id);
//                },
//                Cancel: function() {
//                    $( this ).dialog( "close" );
//                    $(self).prop("checked", false);
//                }
//            }
//        });
//    }
//}

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
  $("#dropdown-nav").toggle();
  copyDataToFiltered();
  $(creativeWritingList).each(function(index, task) {
    filteredData.push(task);
  });
  $(listThree).each(function(index, task) {
    filteredData.push(task);
  });
  //renderApropriateTable();
  changeListToAll();
}

function showMyList(){
  $("#dropdown-nav").toggle();
  copyDataToFiltered();
  //renderApropriateTable();
  changeListToData();
}

function showCWList(){
  $("#dropdown-nav").toggle();
  filteredData = [];
  $(creativeWritingList).each(function(index, task) {
    filteredData.push(task);
  });
  //renderApropriateTable();
  changeListToCreative();
}

function showListThree(){
  $("#dropdown-nav").toggle();
  filteredData = [];
  $(listThree).each(function(index, task) {
    filteredData.push(task);
  });
  //renderApropriateTable();
  changeListToThree();
}

function showCompleted(){
  $("#dropdown-nav").toggle();
  filteredData = [];
  $(data).each(function(index, task) {
    if (task.completed == true) {
      filteredData.push(task);
    }
  });
  $(creativeWritingList).each(function(index, task) {
    if (task.completed == true) {
      filteredData.push(task);
    }
  });
  $(listThree).each(function(index, task) {
    if (task.completed == true) {
      filteredData.push(task);
    }
  });
  renderCompletedTable();
}

function renderCompletedTable()
{
  $('#weekly-header-bar').html('');
  $('#tbl-list tbody').html('');
  $(filteredData).each(function(index, task) {
    var tr = $('<tr>');
    if (task.completed === true) {
      $(tr).append("<td><input type='checkbox' align='center' onclick='uncompleteTask("+task.id+")' checked></td> ");
      $(tr).append('<td><strike>'+task.name+'</strike></td>');
      $(tr).append('<td><strike>'+getReadableDate(task.due)+'</strike></td>');
      $(tr).append('<td><strike>'+task.priority+'</strike></td>');
      $('#tbl-list tbody').append(tr);
    }
  });
}

function uncompleteTask(id){
  
  for (i=0;i<filteredData.length;i++) {
    var task = filteredData[i];
    if (task.id === id) {
      task.completed = false;
      break;
    }
  }
  renderCompletedTable();
}

function inititateSearchOnViewChange() {
  var input = $("#searchBar").val();
  searchData(input);
}

function searchData(input){
  resetToCurrentList();
  
  if (input === '' || input === ' ' || input == null || input == '   Search Tasks / Quick Add') {
    renderApropriateTable();
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
  
  renderApropriateTable();
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

//POP UP MENU FOR CREATING A NEW TASK
function createTaskMenu(){
    $("#addTaskForm")[0].reset();
    $('#dateInput').datepicker({ dateFormat: 'MM dd, yy' });
    $('#dateChangeInput').datepicker({ dateFormat: 'MM dd, yy' });
    $("#addTaskMenu").dialog({
        modal: true,
        draggable: true,
        height: 630,
        width: 545,
        resizable: false,
        buttons: {
            "Close": function() {
                $(this).dialog("close");
            },
            "Add": function() {
                var taskID = curID;
                var taskName = $("#nameInput").val();
                var dueTime = $("#dueInput").val() + ":00";
                var dueDate = $("#dateInput").val();
                var taskPriority = $("#priorityInput").val();
                var taskList = $("#categoryInput").val();
                if(taskName.length == 0){
                    taskName = "[Untitled]";
                }
                if(dueTime == ":00"){
                    dueTime = "10:00:00";
                }
                if(dueDate.length == 0){
                    dueDate = "December 10, 2014";
                }
                data.push(
                    {
                        "id": taskID,
                        "name": taskName,
                        "due": new Date(dueDate + " " + dueTime),
                        "priority": taskPriority,
                        "list": taskList,
                        "completed": false
                    }
                );
                curID++;
                copyDataToFiltered();
                renderApropriateTable();
                $(this).dialog("close");
            }
        }
    });
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
  clearArrows('dueArrow');
  clearArrows('priorityArrow');
  prioritySort = 0;
  dueSort = 0;
  $('#nav-week').removeClass('not-selected-tab');
  $('#nav-week').addClass('selected-tab');
  $('#nav-list').addClass('not-selected-tab');
  $('#nav-list').removeClass('selected-tab');
  currentWeeklyViewDate = new Date();
  currentWeeklyViewDate.setHours(0);
  currentWeeklyViewDate.setMinutes(00);
  currentWeeklyViewMonth = currentWeeklyViewDate.getMonth();

  renderWeeklyTable();
  changeViewToWeek();

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
  weekViewHtml += '<div id="weekly-header-paragraph">';
  weekViewHtml += '<a id="left-arrow-weekly-bar" onclick="lastWeekView()"><img id="left-arrow-img" src="img/left-arrow.png"></img></a><p id="weekly-header-date">';
  weekViewHtml += mm + ' ' + currentWeeklyViewDate.getDate() + ", " + yyyy + ' - ' + lastDayMm + ' ' + lastDateOfWeek.getDate() + ', ' + lastDayYyyy;
  weekViewHtml += '</p><a id="right-arrow-weekly-bar" onclick="nextWeekView()"><img id="right-arrow-img" src="img/right-arrow.png"></img></a>';
  weekViewHtml += '</div>';

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
          $(tr).append('<td class="td1">'+task.name+'</td>');
          $(tr).append('<td class="td2">'+getReadableDate(task.due)+'</td>');
          $(tr).append('<td class="td3">'+task.priority+'</td>');
          $('#tbl-list tbody').append(tr);
      }
    }
  }
}

function sortNumber(a,b) {
    return a - b;
}

function importAccount(account) {
  el = document.getElementById("importAccountOverlay");
  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  if (!account || accountsAdded.indexOf(account) !== -1) return;

  $('#accounts-list').prepend('<li><div id="'+account+'"></div>'+account+'</li>');
  accountsAdded.push(account);
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

function sortDue()
{
  clearArrows('dueArrow');
  clearArrows('priorityArrow');
  prioritySort = 0;
  if (dueSort === 0)
    dueSort = 1;
  else
    dueSort = dueSort === 1 ? -1 : 1;

  if (dueSort === 1)
    $('#dueArrow').addClass('arrow-down');
  else
    $('#dueArrow').addClass('arrow-up');

  filteredData.sort(function (a, b) {
    if (a.due == b.due) return 0;
    if (dueSort === 1)
    {
      if(a.due < b.due) return -1;
      if(a.due > b.due) return 1;
    }
    else
    {
      if(a.due < b.due) return 1;
      if(a.due > b.due) return -1;
    }
  });

  renderApropriateTable();
}

function sortPriority()
{
  clearArrows('dueArrow');
  clearArrows('priorityArrow');
  dueSort = 0;
  if (prioritySort === 0)
    prioritySort = 1;
  else
    prioritySort = prioritySort === 1 ? -1 : 1;

  if (prioritySort === 1)
    $('#priorityArrow').addClass('arrow-down');
  else
    $('#priorityArrow').addClass('arrow-up');

  var priorities = ['High', 'Medium', 'Low'];

  filteredData.sort(function (a, b) {
    var aPriority = priorities.indexOf(a.priority);
    var bPriority = priorities.indexOf(b.priority);
    if (aPriority == bPriority) return 0;
    if (prioritySort === 1)
    {
      if(aPriority < bPriority) return -1;
      if(aPriority > bPriority) return 1;
    }
    else
    {
      if(aPriority < bPriority) return 1;
      if(aPriority > bPriority) return -1;
    }
  });

  renderApropriateTable();
}

function clearArrows(id)
{
  $('#' + id).removeClass('arrow-up');
  $('#' + id).removeClass('arrow-down');
}
