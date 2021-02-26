class View {
    constructor() {
      this.input = document.createElement('input');
      this.addButton = document.createElement('button');
      this.mainBlock = document.querySelector('#app');
      this.taskList = document.createElement('ul');
      this.showButton = document.createElement('button'); 
      this.returnButton = document.createElement('button');          
    }
   
    initRender() {
      this.mainBlock.append(this.input, this.addButton, this.showButton);
      this.addButton.innerHTML = 'ADD';
      this.showButton.innerHTML = 'SHOW';
    }
   
    renderTask(task) {
      this.item = document.createElement('li');
      this.buttonEdit = document.createElement('button');             
      this.spanDelete = document.createElement('span');
      this.item.innerHTML = task; 
      this.buttonEdit.innerHTML = 'Edit';
      this.spanDelete.innerHTML = 'X';
      this.buttonEdit.classList.add('edit');
      this.taskList.appendChild(this.item);
      this.item.append(this.buttonEdit, this.spanDelete);
      this.input.value = '';
    }
   
    showTask() {                                                      
      this.mainBlock.append(this.returnButton, this.taskList);
      this.mainBlock.style.display = 'block';
      this.returnButton.innerHTML = 'RETURN';                        
      this.showButton.remove();
      this.addButton.remove();
      this.input.remove();
    }
   
    returnTasks() {                                                  
      this.returnButton.remove()
      this.initRender();
      this.taskList.remove();
      this.mainBlock.style.display = 'flex';
    }
   
    removeTasks() {
      this.item.remove();
    }
  }
   
   
  class Controller {
    constructor(model, view) {
      this.model = model;
      this.view = view;
      this.returnPage = this.view.returnTasks();
    }
   
    addData = () => {
      let value = this.view.input.value;
      this.model.addTask(value);
      this.view.renderTask(value);
    }
   
    showList = () => {                                                
      this.view.showTask();
    }
   
    returnData = () => {                                              
      this.view.returnTasks();
    }
   
    removeList = () => {
      this.view.removeTasks();
    }
   
    addHandle() {
      this.view.addButton.addEventListener('click', this.addData);
      this.view.showButton.addEventListener('click', this.showList);      
      this.view.returnButton.addEventListener('click', this.returnData);  
      this.view.spanDelete.addEventListener('click', this.removeList);
    }
  }
   
   
  class Model {
    constructor() {
      this.tasks = [];
    }
   
    addTask(value) {
      this.tasks.push(value);
      localStorage.setItem('value', JSON.stringify(this.tasks));
    }
   
  }
   
   
  (function init() {
    const view = new View();
    const model = new Model();
    const controller = new Controller(model, view);
    view.initRender();
    controller.addHandle();
  })();
