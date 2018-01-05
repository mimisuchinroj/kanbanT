// Declare my columns which will be empty arrays
// that will take a task object
// use switch

var toDoList = [
  {
    title: 'demo01',
    desc: 'desc01',
    assignee: 'mimi01',
    id: 1,
    type: 'todo'
  }
];

// create an unique id
var uniqueIdCounter = 0;

var inProgressList = [
  {
    title: 'demo02',
    desc: 'desc02',
    assignee: 'mimi02',
    id: 2,
    type: 'inprogress'
  }
];
var completedList = [
  {
    title: 'demo03',
    desc: 'desc03',
    assignee: 'mimi03',
    id: 3,
    type: 'completed'
  }
];
var acceptedList = [
  {
    title: 'demo04',
    desc: 'desc04',
    assignee: 'mimi04',
    id: 4,
    type: 'accepted'
  }
];
var archiveList = [
  {
    title: 'demo05',
    desc: 'desc05',
    assignee: 'mimi05',
    id: 5,
    type: 'archive'
  }
];

var toDoColumn = document.getElementById('todo');
var inProgressColumn = document.getElementById('inprogress');
var completedColumn = document.getElementById('completed');
var acceptedColumn = document.getElementById('accepted');
var archiveColumn = document.getElementById('archive');
var formContainer = document.getElementById('formcontainer');

// add/delete the to do list 
// we want to render it
// for loop can be replaced by map for efficiency
// gets called every time the columns are redrawn
function renderColumns(){
  toDoColumn.innerHTML ='<h3>To do</h3>';
  inProgressColumn.innerHTML ='<h3>In progress</h3>';
  acceptedColumn.innerHTML = '<h3>Accepted</h3>';
  completedColumn.innerHTML = '<h3>Completed</h3>';
  archiveColumn.innerHTML = '<h3>Archive</h3>';
  //todo
  for(var i = 0; i < toDoList.length; i++){  
     
     var newToDoCard = createCardElement(toDoList[i].title, 
                                         toDoList[i].desc, 
                                         toDoList[i].assignee, 
                                         toDoList[i].id, 
                                         toDoList[i].type);
     toDoColumn.appendChild(newToDoCard);
     
  }
  //inprogress
  for(var j = 0; j < inProgressList.length; j++){  
     
     var newProgressCard = createCardElement(inProgressList[j].title, 
                                         inProgressList[j].desc, 
                                         inProgressList[j].assignee, 
                                         inProgressList[j].id, 
                                         inProgressList[j].type);
     inProgressColumn.appendChild(newProgressCard);
     
 }
  //accepted
  for(var k = 0; k < acceptedList.length; k++){  
     
     var newAcceptedCard = createCardElement(acceptedList[k].title, 
                                         acceptedList[k].desc, 
                                         acceptedList[k].assignee, 
                                         acceptedList[k].id, 
                                         acceptedList[k].type);
     acceptedColumn.appendChild(newAcceptedCard);
     
 }
 //completed
  for(var m = 0; m < acceptedList.length; m++){  
     
     var newCompletedCard = createCardElement(completedList[m].title, 
                                         completedList[m].desc, 
                                         completedList[m].assignee, 
                                         completedList[m].id, 
                                         completedList[m].type);
     completedColumn.appendChild(newCompletedCard);
     
 }
  //archive
  for(var n = 0; n < archiveList.length; n++){  
     
     var newArchiveCard = createCardElement(archiveList[n].title, 
                                         archiveList[n].desc, 
                                         archiveList[n].assignee, 
                                         archiveList[n].id, 
                                         archiveList[n].type);
     archiveColumn.appendChild(newArchiveCard);
     
 }
  
}


renderColumns();

//
//1/4/18 create a new function to replace 
// the duplicate codes
function createCardElement(title, desc, assignee, id, type){
   var card = document.createElement('div');
  card.className = 'card';
   
  var cardTitle = document.createElement('p');
  cardTitle.innerHTML = title;

  var cardDesc = document.createElement('p');
  cardDesc.innerHTML = desc;

  var cardAssignee = document.createElement('p');
  cardAssignee.innerHTML = assignee;
  
  
  var cardId = document.createElement('p');
  // cardID value generated from newTaskObject
  cardId.innerHTML = id;
  
  card.id = id;
  
  
  // delete 
  // create a form so that we can submit the button to delete
  // or the button to reset
  // this form contains one button and one input
  var deleteTaskForm = document.createElement('form');
  deleteTaskForm.onsubmit = deleteCard;
 
  var deleteTaskIdInput = document.createElement('input');
  deleteTaskIdInput.value = id;
  deleteTaskIdInput.name = 'id';
  deleteTaskIdInput.type = 'hidden';
  
  
  var deleteTaskTypeInput = document.createElement('input');
  deleteTaskTypeInput.value = type;
  deleteTaskTypeInput.name = 'type';
  deleteTaskTypeInput.type = 'hidden';
  
  
  var deleteTaskButton = document.createElement('button');
  deleteTaskButton.innerHTML = 'x';
  deleteTaskButton.type = 'submit';
  deleteTaskButton.className = 'deleteTaskButton';
  
  
  // 1/4/18 define move form => similar to deleteCard 
  var moveTaskForm = document.createElement('form'); 
  moveTaskForm.onsubmit = moveCard; 
  
  // create a button & input as hidden
  var moveTaskIdInput = document.createElement('input');
  moveTaskIdInput.value = id;
  moveTaskIdInput.name = 'id';
  moveTaskIdInput.type = 'hidden';
  
  var moveTaskTypeInput = document.createElement('input');
  moveTaskTypeInput.value = type;
  moveTaskTypeInput.name = 'type';
  moveTaskTypeInput.type = 'hidden';
  
  var moveTaskButton = document.createElement('button');
  moveTaskButton.type = 'submit';
  moveTaskButton.innerHTML = '→';
  moveTaskButton.className = 'moveTaskButton';
  
  moveTaskForm.appendChild(moveTaskIdInput);
  moveTaskForm.appendChild(moveTaskTypeInput);
  moveTaskForm.appendChild(moveTaskButton);
  
  
  
  
  

  
  deleteTaskForm.appendChild(deleteTaskIdInput);
  deleteTaskForm.appendChild(deleteTaskTypeInput);
  deleteTaskForm.appendChild(deleteTaskButton);
  
  
  card.appendChild(cardTitle);
  card.appendChild(cardDesc);
  card.appendChild(cardAssignee);
  card.appendChild(cardId);
  
  card.appendChild(deleteTaskForm);
  
  // condition on archive
   if(type != 'archive'){ 
     card.appendChild(moveTaskForm); 
   } 

   return card;
}

function moveCard(event){
  event.preventDefault();
  console.log(event.target.id.value);
  console.log(event.target.type.value);

  // switch begin
  switch (event.target.type.value) {
  case 'todo':
     var taskToMove = toDoList.find(function(task){
       return task.id == event.target.id.value;       
     });     
     deleteCard(event);
      //change the type
     taskToMove.type ='inprogress'; 
     inProgressList.push(taskToMove);
     break;
  case 'inprogress':
     taskToMove = inProgressList.find(function(task){
       return task.id == event.target.id.value;       
     });     
     deleteCard(event);
      //change the type
     taskToMove.type ='accepted'; 
     acceptedList.push(taskToMove);
       break;
  case 'accepted':
     taskToMove = acceptedList.find(function(task){
       return task.id == event.target.id.value;       
     });     
     deleteCard(event);
      //change the type
     taskToMove.type ='completed'; 
     completedList.push(taskToMove);
      break;
   case 'completed':
     taskToMove = completedList.find(function(task){
       return task.id == event.target.id.value;       
     });     
     deleteCard(event);
      //change the type
     taskToMove.type ='archive'; 
     inProgressList.push(taskToMove);
      break;     
  case 'archive':       
       break;
    default:
      break;
  }
   renderColumns(); 
  
  // switch end
}

//
// create a form function to handle when new task it submit
function handleSubmit(event){
  console.log('handle submit fired');
  event.preventDefault();
  console.log(event.target.title.value);
  console.log(event.target.desc.value);
  console.log(event.target.assignee.value);
  
  // create a unique id
  var newTaskObject = {
    title: event.target.title.value,
    desc: event.target.desc.value,
    assignee: event.target.assignee.value,
    id: 'todo'+uniqueIdCounter,
    type: 'todo'
  };
  
//   uniqueIdCounter++;
  uniqueIdCounter = uniqueIdCounter + 1;
  toDoList.push(newTaskObject);
  renderColumns();
//   console.log(toDoList);
}

// remove needs to know which one needs to 
// so wrap everything
// then redraw again
function deleteCard(event){
    event.preventDefault();
    console.log('deleted this card');
    console.log(event.target.id.value);
    console.log(event.target.type.value);
// removed from array
//     var cardToDelete = document.getElementById(this.value);
//     toDoColumn.removeChild(cardToDelete);
    
  // check to remove the id that past to todo list
//      if(event.target.type.value === 'todo'){
//        // array filter
//        toDoList = toDoList.filter( function(task){
//          // filter create a new array
//          return task.id != event.target.id.value;          
//        });
//        //move away from array
//        // and put the array back to the page
//        renderColumns();
       
//      }
  
  // switch begin
  switch (event.target.type.value) {
  case 'todo':
    toDoList = toDoList.filter(function(task){ 
         return task.id != event.target.id.value
       }); 
       break;
  case 'inprogress':
    inProgressList = inProgressList.filter(function(task){ 
         return task.id != event.target.id.value
       }); 
       break;
  case 'accepted':
       console.log('accepted');
    acceptedList = acceptedList.filter(function(task){ 
         return task.id != event.target.id.value
       }); 
      break;
   case 'completed':
      console.log('completed');
    completedList = completedList.filter(function(task){ 
         return task.id != event.target.id.value
       }); 
      break;
  case 'archive':
       console.log('archive');
       archiveList = archiveList.filter(function(task){ 
         return task.id != event.target.id.value
       }); 
       break;
  }
   renderColumns(); 
  
  // switch end

}
  
// create a form and 3 inputs
var newTaskForm = document.createElement('form');
newTaskForm.onsubmit = handleSubmit;

var titleInput = document.createElement('input');
titleInput.placeholder = 'title';
titleInput.name = 'title';
// html required 
// front end validation
titleInput.required = true;

var descInput = document.createElement('input');
descInput.placeholder = 'description';
descInput.name ='desc';
descInput.required = true;

var assigneeInput = document.createElement('input');
assigneeInput.placeholder = 'assignee';
assigneeInput.name = 'assignee';
assigneeInput.required = true;

var submitButton = document.createElement('button');

// attach all input to the form
submitButton.innerHTML = 'Add Task';
submitButton.type = 'submit';
newTaskForm.appendChild(titleInput);
newTaskForm.appendChild(descInput);
newTaskForm.appendChild(assigneeInput);
newTaskForm.appendChild(submitButton);
formContainer.appendChild(newTaskForm);


