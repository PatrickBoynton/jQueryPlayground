// Helper method for creating the UI.
const addCard = (todo) => {
  const div = $(".items");
  let todoTitle = todo.title;

  let todoCard =
    '<div class="card card-body m-5"><h5 class="card-title" id="title">' +
    todoTitle +
    '</h5> <div class="d-flex"><a href="#" class="card-link edit-link fw-bold" id="edit">Edit</a>' +
    '<a href="#" class="card-link fw-bold delete-link" id="delete">Delete</a></div> </div>';

  div.append(todoCard);
};

// Create
$("#add").on("click", () => {
  let todos = JSON.parse(localStorage.getItem("todos"));

  let todo = {id: Math.random() * 1000, title: $("#add-todo").val() };

  if (todos === null) todos = [];

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));

  addCard(storage);
});

// Read
$(window).on("load", () => {
  const storage = JSON.parse(localStorage.getItem("todos"));

  storage?.map((t) => addCard(t));
});

// Change to edit mode.
$(document).on("click", "#edit", (e) => {
  const title = $("#title").text();
  const input = $("#add-todo");
  const button = $("button");

  input.val(title);

  button.attr("id", "edit-todo");

  button.text("Edit Todo");
});

// Edit the todo.
$(document).on("click", "#edit-todo", (e) => {
  e.preventDefault();

  const inputTitle = $("input").val();
  const title = $("#title").text();

  if (inputTitle === title) {
    const todo = localStorage.setItem(
      "todos",
      JSON.stringify({ title: inputTitle })
    );

    addCard(todo);
    location.reload;
  }
});

// Delete
$(document).on("click", "#delete", (e) => {
  const h5 = $("#title");
  const div = $(".items");

  let index = JSON.parse(localStorage.getItem("todos")).findIndex(
    (x) => x.title === h5.text()
  );

  localStorage.removeItem("todos", index);

  div.remove();
});
