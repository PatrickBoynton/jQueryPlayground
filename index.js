// Helper method for creating the UI.
const addCard = (todo) => {
  const div = $(".items");

  let todoCard =
    '<div class="card card-body m-5"><h5 class="card-title">' +
    todo +
    '</h5> <div class="d-flex"><a href="#" class="card-link edit-link fw-bold">Edit</a>' +
    '<a href="#" class="card-link fw-bold delete-link delete">Delete</a></div> </div>';

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

  addCard(todos);
});

// Read
$(window).on("load", () => {
  const storage = JSON.parse(localStorage.getItem("todos"));

  storage?.map((t) => addCard(t));
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
