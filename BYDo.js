var filteredData = [];

$(document).ready(function() {
  showListTab();
});

function showListTab()
{
  $('#tbl-day').hide();
  $('#tbl-list').show();
  filteredData = data;
  renderListTable();
}

function renderListTable()
{
  $('#tbl-list tbody').html('');
  $(filteredData).each(function(index, task) {
    var tr = $('<tr>');
    $(tr).append('<td>'+task.name+'</td>');
    $(tr).append('<td>'+getReadableDate(task.due)+'</td>');
    $(tr).append('<td>'+task.priority+'</td>');
    $('#tbl-list tbody').append(tr);
  });
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