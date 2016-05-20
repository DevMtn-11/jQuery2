$(document).ready(function() {

  /* START DEFINITIONS */
  var listo = [];
  if(localStorage.appStorage) {
    listo = JSON.parse(localStorage.getItem('appStorage'));
    for(var i = 0; i < listo.length; i++) {
      var html =
        '<a href="#finish" class="" id="item">' +
          '<li class="list-group-item">' +
            '<h3>' + listo[i].task + '</h3>' +
            '<span class="arrow pull-right">' +
              '<i class="glyphicon glyphicon-arrow-right">' +
            '</span>' +
          '</li>' +
        '</a>';
      if(listo[i].id === 'new') {
        $('#newList').append(html);
      }
      else if(listo[i].id === 'inProgress') {
        $('#currentList').append(html);
      }
      else if(listo[i].id === 'archived') {
        $('#archivedList').append(html);
      }
    }
  }

  var Task = function(task) {
    this.task = task;
    this.id = 'new';
  };

  var advanceTask = function(task) {
    var modified = task.innerText.toLowerCase().trim();
    for(var i = 0; i < listo.length; i++) {
      if(listo[i].task === modified) {
        if(listo[i].id === 'new') {
          listo[i].id = 'inProgress';
        }
        else if (listo[i].id === 'inProgress') {
          listo[i].id = 'archived';
        }
        else {
          listo.splice(i, 1);
        }
        break;
      }
    }
    task.remove();
    var x = JSON.stringify(listo);
    localStorage.setItem('appStorage', x);
  };

  var addTask = function(task) {
    if(task) {
      task = new Task(task);
      listo.push(task);
      var x = JSON.stringify(listo);
      localStorage.setItem('appStorage', x);

      $('#newItemInput').val('');

		  $('#newList').append(
        '<a href="#finish" class="" id="item">' +
        '<li class="list-group-item">' +
        '<h3>' + task.task + '</h3>' +
        '<span class="arrow pull-right">' +
        '<i class="glyphicon glyphicon-arrow-right">' +
        '</span>' +
        '</li>' +
        '</a>'
      );
  	}
  	$('#newTaskForm').slideToggle('fast', 'linear');
  };
  /* END DEFINITIONS */

  /*-----------------------------------------------*/

  /* START ON LOAD */
  $('#newTaskForm').hide();
  /* END ON LOAD */

  /*-----------------------------------------------*/

  /* START EVENT LISTENERS */
  $('#saveNewItem').on('click', function(e) {
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
  });

  // Opens form
  $('#add-todo').on('click', function() {
    $('#newTaskForm').fadeToggle('fast', 'linear');
  });
  // Closes form
  $('#cancel').on('click', function(e) {
    e.preventDefault();
    $('#newTaskForm').fadeToggle('fast', 'linear');
  });

  $(document).on('click', '#item', function(e) {
  	e.preventDefault();
    var task = this;
    advanceTask(task);
    this.id = 'inProgress';
    $('#currentList').append(this.outerHTML);
  });

  $(document).on('click', '#inProgress', function (e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
    task.id = "archived";
    $('#archivedList').append(this.outerHTML);
  });

  $(document).on('click', '#archived', function (e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
  });
  /* END EVENT LISTENERS */

});
