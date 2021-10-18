// Helper method for creating the UI.
const addCard = (todo) => {
  const div = $(".items");

  let todoCard =
    '<div class="card card-body m-5"><h5 class="card-title" id="title">' +
    todo +
    '</h5> <div class="d-flex"><a href="#" class="card-link edit-link fw-bold" id="edit">Edit</a>' +
    '<a href="#" class="card-link fw-bold delete-link" id="delete">Delete</a></div> </div>';

  div.append(todoCard);
};

// Create
$("form").on("submit", (e) => {
  e.preventDefault();
  let todos = JSON.parse(localStorage.getItem("todos"));

  let todo = $("#add-todo").val();

  if (todos === null) todos = [];

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));

  addCard(todo);
});

// Read
$(window).on("load", () => {
  const storage = JSON.parse(localStorage.getItem("todos"));

  storage?.map((t) => addCard(t));
});

// Delete
$(document).on("click", "#delete", (e) => {
  const title = $("#title").text();
  const todos = JSON.parse(localStorage.getItem("todos"));

  console.log(todos.indexOf(title));
});
