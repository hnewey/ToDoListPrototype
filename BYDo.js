var filteredData = [];

$(document).ready(function() {
  filteredData = data;
  renderListTable();
});

function renderListTable()
{
  
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