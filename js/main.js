const table = document.getElementById('usersTable')
const tbody = document.querySelector('#usersTable tbody')
const form = document.getElementById('usersForm')
const nameField = form.getElementById('name')
const lastNameField = form.getElementById('lastName')
const emailField = form.getElementById('email')
const submitField = form.getElementById('submit')

form.addEventListener('submit', addUser);

function addUser(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());
  let row = `
  <tr>
    <td>3</td>
    <td>${data.name}</td>
    <td>${data.lastName}</td>
    <td>${data.email}</td>
    <td>
      <button type="button" class="btn btn-success" onclick="editUser(this)" >edit</button>
      <button type="button" class="btn btn-danger" onclick="removeUser(this)" >remove</button>
    </td>
  </tr>`;
  tbody.appendChild(row)
}

function removeUser(btn) {
  let row = btn.parentNode.parentNode;
  const cols = row.getElementsByTagName('td');
  nameField.value() = cols[1].innerText
  lastNameField.value() = cols[2].innerText
  emailField.value() = cols[3].innerText
}
function editUser(btn) {
  let row = btn.parentNode.parentNode;
  tbody
}