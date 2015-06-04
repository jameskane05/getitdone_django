/**
 * Created by jameskane on 5/28/15.
 */

// Chris' func to get at the LI containing all the task info
function getTaskRow(spanElt) {
    return spanElt.parentNode.parentNode;
}

// func to run when tasks are completed
var taskDone = function () {
    var taskRow = $(getTaskRow(this));
    $.post('/getitdone_django/complete', {'id': taskRow.attr('data-task-id')})
        .done(function(data) {
            $('#done ul').append(taskRow);
                /* this will refer to the obj on which .click is called,
                   a glyphicon span element whose parent node li contains
                   the entire newTask obj  */
            $('.glyphicon-ok', '#done').remove();  //remove any elements with class glyphicon-ok
            var repeatIcon = $('<div class="col-sm-3 glyphicon glyphicon-repeat"></div>');
            $('.infoDiv', taskRow.attr('data-task-id', data.id)).append(repeatIcon.click(taskRepeat));
        });
    };

// func that puts the task back on the #list
var taskRepeat = function () {
    var taskRow = $(getTaskRow(this));
    $.post('/getitdone_django/repeat', {'id': taskRow.attr('data-task-id')})
        .done(function(data) {
            // var elem = data.id; -- found this here, why did I do this?
            $('#list ul').append(taskRow);
            $('.glyphicon-repeat', '#list').remove();
            var doneIcon = $('<div class="col-sm-3 glyphicon glyphicon-ok"></div>');
            $('.infoDiv', taskRow.attr('data-task-id', data.id)).append(doneIcon.click(taskDone));
        });
};

// func that removes tasks
var taskDelete = function () {
    var taskRow = $(getTaskRow(this));
    $.post('/getitdone_django/delete', { 'id': taskRow.attr('data-task-id') })
        .done(function(data) {
            $(taskRow).remove();
        });
};

// main func for registering new tasks
var regTask = function (task) {
    //glyphicon HTML and .click callback funcs
    $.post('getitdone_django/new_task', {'title': task})
        .done(function(data) {
            var deleteIcon = $('<div class="col-sm-4 glyphicon glyphicon-trash"></div>').click(taskDelete);
            var doneIcon = $('<div class="col-sm-4 glyphicon glyphicon-ok"></div>').click(taskDone);

            var currDate = new Date($.now());  //get current date and determine month (in English)
            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            var n = month[currDate.getMonth()];

            var date = $('<div class="col-sm-4 date">' + n + ' '
                + currDate.getDate() + ', ' + currDate.getFullYear() + '</div>');

            //build up new task HTML w/ icons appended
            var newTask = $('<li data-task-id="' + data.id + '" class="row"></li>');
            var taskDiv = $('<div class="col-lg-6 taskDiv">' + task + '</div>');
            var infoDiv = $('<div class="col-lg-6 infoDiv"></div>');
            infoDiv.append(date, deleteIcon, doneIcon);
            newTask.append(taskDiv, infoDiv);

            $('#list ul').append(newTask);
        });
    };

$(document).ready(function() {	// waits for whole page to load

    $('.glyphicon-ok').click(taskDone);
    $('.glyphicon-trash').click(taskDelete);
    $('.glyphicon-repeat').click(taskRepeat);

    $('#taskForm').submit(
        function() {
            var task = $('#taskEntry').val();  // store the user submitted value
            if (task != '') {regTask(task);}  // if the task value isn't empty, run regTask() w/ that value
            $('#taskEntry').val('');  // set the form value back to empty
            return false;  // don't return to the server
    });
});

/*          EXTRA CODE TO DETERMINE AND FORMAT EXACT TIME THROUGH JAVASCRIPT
*
*
            //determine AM or PM, store as strings
            var amPm;
            if (currDate.getHours() >= 12) amPm = " p.m.";
            else amPm = " a.m.";

            //if single digit minutes, display w/ 0 in front of the single digit
            if (currDate.getMinutes() < 10) var minutes = "0" + currDate.getMinutes();
            else minutes = currDate.getMinutes();

            //mod getHours() by 12 - if noon, display as "12:00", not "0:00"
            var hours = currDate.getHours();
            if (hours == 12) hours = "12";
            else hours = currDate.getHours() % 12;

            //format current time and date, wrap as jQuery obj
            var time = $('<div class="col-sm-3 time">' + hours + ':' + minutes + amPm + '</div>');
*
* */