let formData = [];
let currentEditIndex = -1; // Variable to track the index of the row being edited

function submitForm() {
  const stuId = $("#stuId").val();
  const firstName = $("#firstName").val();
  const lastName = $("#lastName").val();
  const email = $("#email").val();
  const React = $("#React").val();
  const Python = $("#Python").val();
  const Java = $("#Java").val();

  // Check if any field is empty
  if (stuId === "" || firstName === "" || lastName === "" || email === "" || React === "" || Python === "" || Java === "") {
    alert("All fields are required");
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Enter a valid email format!");
    return;
  }

  // Check if the data already exists
  let flag = false;

  for (let i = 0; i < formData.length; i++) {
    if (formData[i].email === email || formData[i].stuId === stuId) {
      flag = true;
      break; // Exit the loop once a match is found
    }
  }

  if (flag) {
    alert("Data already exists");
    return;
  }

  const data = {
    stuId,
    firstName,
    lastName,
    email,
    React,
    Python,
    Java
  };

  formData.push(data);

  console.log(formData);
  updateTable();
}

// Function to update the table
function updateTable() {
  var bodyData = "";
  for (var i = 0; i < formData.length; i++) {
    bodyData += "<tr><td>" + formData[i].stuId + "</td>";
    bodyData += "<td>" + formData[i].firstName + "</td>";
    bodyData += "<td>" + formData[i].lastName + "</td>";
    bodyData += "<td>" + formData[i].email + "</td>";
    bodyData += "<td>" + formData[i].React + "</td>";
    bodyData += "<td>" + formData[i].Python + "</td>";
    bodyData += "<td>" + formData[i].Java + "</td>";
    bodyData += "<td>" +
      "<button class='btn btn-warning btn-sm' onclick='editRow(" + i + ")'>Edit</button> " +
      "<button class='btn btn-danger btn-sm' onclick='deleteRow(" + i + ")'>Delete</button> " +
      "<button class='btn btn-info btn-sm' onclick='viewRow(" + i + ")'>View</button>" +
      "</td></tr>";
  }

  $("#loadData").html(bodyData);
}

function editRow(index) {
  currentEditIndex = index;
  const student = formData[index];
  // Populate the modal with existing data
  $("#stuId").val(student.stuId);
  $("#firstName").val(student.firstName);
  $("#lastName").val(student.lastName);
  $("#email").val(student.email);
  $("#React").val(student.React);
  $("#Python").val(student.Python);
  $("#Java").val(student.Java);

  // Change the modal title to indicate editing
  $("#exampleModalLabel").text("Edit Student");

  // Change the Add Student button to Save Changes
  $("#submitBtn").text("Save Changes");

  // Open the modal for editing
  $("#exampleModal").modal("show");
}

// Function to delete a row
function deleteRow(index) {
  // Remove the student entry from the array
  formData.splice(index, 1);
  // Update the table
  updateTable();
}

function viewRow(index) {
  const student = formData[index];
  // Create a modal for viewing the data
  var modalContent = "<div><strong>Student Id:</strong> " + student.stuId + "</div>";
  modalContent += "<div><strong>Name:</strong> " + student.firstName + "</div>";
  modalContent += "<div><strong>Surname:</strong> " + student.lastName + "</div>";
  modalContent += "<div><strong>Email:</strong> " + student.email + "</div>";
  modalContent += "<div><strong>React:</strong> " + student.React + "</div>";
  modalContent += "<div><strong>Python:</strong> " + student.Python + "</div>";
  modalContent += "<div><strong>Java:</strong> " + student.Java + "</div>";

  // Set the modal content
  $("#viewModal .modal-body").html(modalContent);

  // Show the modal
  $("#viewModal").modal("show");
}

function submitForm() {
  const stuId = $("#stuId").val();
  const firstName = $("#firstName").val();
  const lastName = $("#lastName").val();
  const email = $("#email").val();
  const React = $("#React").val();
  const Python = $("#Python").val();
  const Java = $("#Java").val();

  // Check if any field is empty
  if (stuId === "" || firstName === "" || lastName === "" || email === "" || React === "" || Python === "" || Java === "") {
    alert("All fields are required");
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Enter a valid email format!");
    return;
  }

  // Check if the data already exists
  let flag = false;

  for (let i = 0; i < formData.length; i++) {
    if (i !== currentEditIndex && (formData[i].email === email || formData[i].stuId === stuId)) {
      flag = true;
      break; // Exit the loop once a match is found
    }
  }

  if (flag) {
    alert("Data already exists");
    return;
  }

  const data = {
    stuId,
    firstName,
    lastName,
    email,
    React,
    Python,
    Java
  };

  if (currentEditIndex !== -1) {
    // If editing, replace the existing data
    formData[currentEditIndex] = data;
    currentEditIndex = -1; // Reset the edit index
  } else {
    // If not editing, add new data
    formData.push(data);
  }

  // Reset the modal title and button text
  $("#exampleModalLabel").text("Add Student");
  $("#submitBtn").text("Add Student");

  // Clear the form inputs
  $("#stuId, #firstName, #lastName, #email, #React, #Python, #Java").val("");

  // Close the modal
  $("#exampleModal").modal("hide");

  updateTable();
}
// Function to close the view modal
function closeViewModal() {
  $("#viewModal").modal("hide");
}
