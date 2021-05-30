const form = document.getElementById('usersForm');
const table = document.querySelector('#usersTable tbody');
let users = [];
let counter = 1;
let selectedUserId = null;	//	Specifies whether a new user is added or a specific user is updated

//	Add onsubmit event to the form
form.addEventListener('submit', handleUserForm);

//==========================================================	working with form
function handleUserForm(event) {
	event.preventDefault();

	//	Read the values added to the form
	const data = readFormData(event.target);

	if (selectedUserId == null) {
		addUser(data);
	} else {
		updateUser(data);
	}
}

//==========================================================	Read Data From Form
function readFormData(form) {
	let data = Object.fromEntries(new FormData(form).entries());
	if (selectedUserId == null) data.id = counter++;
	return data;
}

//==========================================================	Add New User
function addUser(data) {
	//	Add new user to Users Array
	users = [...users, data];

	//	Rebuild the Users-List
	renderUsersList();
}

//==========================================================	Edit An Existing User
function editUser(btn) {
	//	find user and id
	selectedUserId = btn.closest('tr').getAttribute('user-id');
	let user = users.find(user => user.id == selectedUserId);

	//	add values to form
	[form.name.value, form.lastName.value, form.email.value] = [user.name, user.lastName, user.email];

	//	change submit button
	form.querySelector('#submit').classList.replace('btn-primary', 'btn-warning');
	form.querySelector('#submit').innerHTML = 'Update';

	//	Add cancel button to edit form
	let cancel = '<button type="button" class="btn btn-sm btn-link ms-1" onclick="resetForm()" id="cancel">Cancel</button>';
	form.querySelector('#submit').insertAdjacentHTML('afterend', cancel);
}

//==========================================================	Put Changed User Data To Array(DB)
function updateUser(data) {
	//	Put new data to user
	let user = users.find(user => user.id == selectedUserId);
	[user.name, user.lastName, user.email] = [data.name, data.lastName, data.email];

	//	Rebuild the Users-List
	renderUsersList();
}

//==========================================================	Remove User
function removeUser(btn) {
	selectedUserId = btn.closest('tr').getAttribute('user-id');
	users = users.filter(user => user.id != selectedUserId);
	renderUsersList();
}

//==========================================================	Build User From Users-List
function renderUsersList() {
	resetForm();
	table.innerHTML = '';
	for (let user of users) {
		let row = document.createElement('tr');
		row.setAttribute('user-id', user.id);
		row.insertCell(0).innerHTML = user.id;
		row.insertCell(1).innerHTML = user.name;
		row.insertCell(2).innerHTML = user.lastName;
		row.insertCell(3).innerHTML = user.email;
		row.insertCell(4).innerHTML = `<button type="button" class="btn btn-sm btn-success me-1" onclick="editUser(this)">Edit</button><button type="button" class="btn btn-sm btn-danger" onclick="removeUser(this)">Remove</button>`;
		table.append(row);
	}
}

//==========================================================	Reset Form
function resetForm() {
	form.reset();
	let submit = form.querySelector('#submit');
	if (submit.innerHTML === 'Update') {
		submit.innerHTML = 'Add User';
		submit.classList.replace('btn-warning', 'btn-primary');
		form.querySelector('#cancel').remove();
	}
	selectedUserId = null;
}
