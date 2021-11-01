let id;
let isEditing;

// Create or edit depending on button id
$("form").on("submit", (e) => {
  e.preventDefault();
  
  const todos = JSON.parse(localStorage.getItem("todos"));
  const todo = $("#add-todo").val();

  checkStatus(id, todo, todos);
});

checkStatus = (id, todo, todos) => {
  isEditing = $("button").attr("id") === "edit";

  if (todos === null) todos = [];

  if (isEditing) {
    editTodo(id, todo, todos);
  } else {
    if (todo !== "") {
      addTodo(todo, todos);
    }
  }
};

// Helper method for creating the UI.
const addCard = (todo, id) => {
  const div = $(".items");

  let todoCard =
    '<div class="card card-body m-5"><h5 class="card-title">' +
    todo +
    `</h5> <div class="d-flex"><a href="#" class="btn btn-secondary edit-link fw-bold edit" data-id="${id}">Edit</a>` +
    `<a href="#" class="btn btn-danger fw-bold delete-link delete" data-id="${id}">Delete</a></div> </div>`;

  div.append(todoCard);
};

addTodo = (todo, todos) => {
  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));

  addCard(todo);

  $("#add-todo").val("");
  $("#add").text("Add Todo").blur();
};

editTodo = (id, todo, todos) => {
  todos[id] = todo;
  localStorage.setItem("todos", JSON.stringify(todos));

  // Changes the edit back to add, clears the input.
  $("#add-todo").val("");
  $("#edit").attr("id", "add");
  $("#add").text("Add Todo").blur();
  $(`[data-id=${id}]`).closest(".card").find(".card-title").text(todo);
  $("#edit-form").attr("id", "add-form");
};

// Read
$(window).on("load", () => {
  const storage = JSON.parse(localStorage.getItem("todos"));

  storage?.map((todo, i) => addCard(todo, i));
});

// Set Edit Mode
// Anonymous arrow functions don't work,
// needs to be a regular function
$(document).on("click", ".edit", function () {
  const card = $(this).closest(".card");

  const title = card.children("h5").text();

  id = $(".edit").attr("data-id");

  $("#add-todo").val(title);
  $("#add").text("Edit Todo").attr("id", "edit");

  $("#add-form").attr("id", "edit-form");
});

// Delete
$(document).on("click", ".delete", function (e) {
  const storage = JSON.parse(localStorage.getItem("todos"));

  const card = $(this).closest(".card");
  const title = card.children("h5").text();

  const index = storage.indexOf(title);

  storage.splice(index, 1);

  localStorage.setItem("todos", JSON.stringify(storage));

  card.remove();
});

// Clear all todos
$("#clear").on("click", () => {
  localStorage.removeItem("todos");
  const card = $(".card");

  card.remove();

  $("#add-todo").val("");
  $("#clear").blur();
});
