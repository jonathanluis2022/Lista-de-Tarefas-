const inputElement = document.querySelector(".new-task-input"); //input
const addTaskButton = document.querySelector(".new-task-button");//button

const tasksContainer = document.querySelector(".tasks-container"); //div que vai os itens 

const validateInput = () => inputElement.value.trim().length > 0; //para ser valido (true) , menor que zero sem espaco (trim)

const handleAddTask = () => {
  const inputIsValid = validateInput();


  if (!inputIsValid) {
    return inputElement.classList.add("error"); //si for diferente de valido vai dar erro
  }

  const taskItemContainer = document.createElement("div"); //criado uma div
  taskItemContainer.classList.add("task-item"); //class para a div


  const taskContent = document.createElement("p"); //criou um paragrafo
  taskContent.innerText = inputElement.value; //exibir o valor do paragrafo

  taskContent.addEventListener("click", () => handleClick(taskContent));


  const deleteItem = document.createElement("i"); //criado o i
  deleteItem.classList.add("far"); //que é a lixeirinha 
  deleteItem.classList.add("fa-trash-alt");

  deleteItem.addEventListener("click", () => handleDeleteClick(taskItemContainer, taskContent));

  // colocou o P e o I dentro da div
  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);

  //colocou a Div dentro do container que vai os itens
  tasksContainer.appendChild(taskItemContainer);

  inputElement.value = ""; //depois de enviar os itens , limpar o input

  updateLocalStorage();
};

const handleClick = (taskContent) => { // parametro para pegar os filhos dele
  const tasks = tasksContainer.childNodes; // filhos do Container

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
    //filhos   o mesmo    que esse 
    if (currentTaskIsBeingClicked) {
      task.firstChild.classList.toggle("completed"); // (toggle) marca desmarca !
    }
  }

  updateLocalStorage();
};

// funçao para deletar o item 
const handleDeleteClick = (taskItemContainer, taskContent) => {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent); //si for o mesmo conteudo q estamos clicando vai remover 

    if (currentTaskIsBeingClicked) {
      taskItemContainer.remove();
    }
  }

  updateLocalStorage();
};

const handleInputChange = () => {
  const inputIsValid = validateInput();

  if (inputIsValid) {
    return inputElement.classList.remove("error");
  }
};

const updateLocalStorage = () => {
  const tasks = tasksContainer.childNodes;

  const localStorageTasks = [...tasks].map((task) => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains("completed");

    return { description: content.innerText, isCompleted };
  });

  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

  if (!tasksFromLocalStorage) return;

  for (const task of tasksFromLocalStorage) {
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskContent = document.createElement("p");
    taskContent.innerText = task.description;

    if (task.isCompleted) {
      taskContent.classList.add("completed");
    }

    taskContent.addEventListener("click", () => handleClick(taskContent));

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt");

    deleteItem.addEventListener("click", () =>
      handleDeleteClick(taskItemContainer, taskContent)
    );

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(taskItemContainer);
  }
};

refreshTasksUsingLocalStorage();

addTaskButton.addEventListener("click", () => handleAddTask());

inputElement.addEventListener("change", () => handleInputChange());