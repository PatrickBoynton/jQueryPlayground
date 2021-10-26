let id;
let isEditing;
// Helper method for creating the UI.
const addCard = (todo, id) => {
  const div = $(".items");

  let todoCard =
    '<div class="card card-body m-5"><h5 class="card-title">' +
    todo +
    `</h5> <div class="d-flex"><a href="#" class="btn btn-secondary edit-link fw-bold edit" data-id="${id}">Edit</a>` +
    `<a href="#" class="btn btn-danger fw-bold delete-link delete" data-id="${id}">Delete</a></div> </div>`;

  if (isEditing) {
    div.replaceWith(`${todoCard}`);
  } else {
    div.append(todoCard);
  }
};

// Create or edit depending on button id
$("form").on("submit", (e) => {
  e.preventDefault();
  let todos = JSON.parse(localStorage.getItem("todos"));
  let todo = $("#add-todo").val();

  const button = $("button");

  isEditing = button.attr("id") === "edit";

  if (todos === null) todos = [];

  if (isEditing) {
    todos[id] = todo;

    localStorage.setItem("todos", JSON.stringify(todos));

    addCard(todo);

    $("#add-todo").val("");
    $("#edit").attr("id", "add");
    $("#add").text("Add Todo").blur();
  } else {
    if (todo !== "") {
      todos.push(todo);

      localStorage.setItem("todos", JSON.stringify(todos));

      addCard(todo);

      $("#add-todo").val("");
      $("#add").text("Add Todo").blur();
    }
  }
});

// Read
$(window).on("load", () => {
  const storage = JSON.parse(localStorage.getItem("todos"));

  storage?.map((todo, i) => addCard(todo, i));
});

// Set Edit Mode
$(document).on("click", ".edit", function (e) {
  const card = $(this).closest(".card");
  const title = card.children("h5").text();
  id = $(this).attr("data-id");
  $("#add-todo").val(title);
  $("#add").text("Edit Todo").attr("id", "edit");
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
