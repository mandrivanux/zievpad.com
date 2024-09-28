function toggleSidebar() {
  var sidebar = document.getElementById("sidebar");
  var toggleBtn = document.querySelector(".toggle-btn");
  if (sidebar.style.width === "300px") {
    sidebar.style.width = "0";
    toggleBtn.classList.remove("sidebar-opened");
  } else {
    sidebar.style.width = "300px";
    toggleBtn.classList.add("sidebar-opened");
  }
}
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  var buttons = document.querySelectorAll(".buttonzr");
  buttons.forEach((button) => {
    button.classList.toggle("dark-mode");
  });
}
function hideAllContent() {
  var contents = document.getElementsByClassName("content");
  for (var i = 0; i < contents.length; i++) {
    contents[i].style.display = "none";
  }
}
function showAll() {
  hideAllContent();
  document.getElementById("allContent").style.display = "block";
  setActiveButton("allBtn");
}
function setActiveButton(buttonId) {
  var buttons = document.querySelectorAll(".all, .font, .para, .clip");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("activesTop");
  }
  document.getElementById(buttonId).classList.add("activesTop");
}









// Array untuk menyimpan data sel tabel
var cellData = [];

// Generate table based on user input
document
  .getElementById("generate-button")
  .addEventListener("click", function () {
    var rows = parseInt(document.getElementById("rows").value);
    var columns = parseInt(document.getElementById("columns").value);

    // Generate header row
    var headerRow = document.getElementById("header-row");
    headerRow.innerHTML = "";
    for (var i = 1; i <= columns; i++) {
      var th = document.createElement("th");
      th.textContent = "" + i;
      headerRow.appendChild(th);
    }

    // Generate table body
    var tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
    for (var i = 1; i <= rows; i++) {
      var tr = document.createElement("tr");
      for (var j = 1; j <= columns; j++) {
        var td = document.createElement("td");
        td.contentEditable = true;
        // Cek apakah ada data yang tersimpan untuk sel tertentu
        var dataIndex = (i - 1) * columns + j - 1;
        if (cellData[dataIndex]) {
          td.textContent = cellData[dataIndex];
        } else {
          td.textContent = "" + ((i - 1) * columns + j);
        }
        tr.appendChild(td);
      }
      tableBody.appendChild(tr);
    }
  });

// Function to load CSV file into the table
document.getElementById("load-button").addEventListener("click", function () {
  var fileInput = document.getElementById("file-input");
  var file = fileInput.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var content = e.target.result;
      var rows = content
        .trim()
        .split("\n")
        .map(function (row) {
          return row.split(",");
        });
      var headerRow = document.getElementById("header-row");
      headerRow.innerHTML = "";
      var headerColumns = rows[0];
      headerColumns.forEach(function (column) {
        var th = document.createElement("th");
        th.textContent = column.trim();
        headerRow.appendChild(th);
      });

      var tableBody = document.getElementById("table-body");
      tableBody.innerHTML = "";
      var dataRows = rows.slice(1);
      dataRows.forEach(function (row) {
        var tr = document.createElement("tr");
        row.forEach(function (cell) {
          var td = document.createElement("td");
          td.contentEditable = true;
          td.textContent = cell.trim();
          tr.appendChild(td);
        });
        tableBody.appendChild(tr);
      });
    };
    reader.readAsText(file);
  }
});

// Function to save table as CSV file
document.getElementById("save-button").addEventListener("click", function () {
  var csvContent = "data:text/csv;charset=utf-8,";

  document.querySelectorAll("#excel-table tbody tr").forEach(function (row) {
    var rowData = [];
    row.querySelectorAll("td").forEach(function (cell) {
      rowData.push(cell.innerText);
    });
    csvContent += rowData.join(",") + "\r\n";
  });

  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "excel_table.csv");
  document.body.appendChild(link);
  link.click();
});

// Variable to track whether text is selected
var isTextSelected = false;

// Function to check if text is selected
document.addEventListener("mouseup", function () {
  var selectedText = window.getSelection().toString();
  isTextSelected = selectedText !== "";
});

// Function to align text in selected cells to center
document
  .getElementById("align-center-button")
  .addEventListener("click", function () {
    if (isTextSelected) {
      document.execCommand("justifyCenter");
    } else {
      document.querySelectorAll("#excel-table td").forEach(function (cell) {
        cell.style.textAlign = "center";
      });
    }
  });

// Function to align text in selected cells to left
document
  .getElementById("align-left-button")
  .addEventListener("click", function () {
    if (isTextSelected) {
      document.execCommand("justifyLeft");
    } else {
      document.querySelectorAll("#excel-table td").forEach(function (cell) {
        cell.style.textAlign = "left";
      });
    }
  });

// Function to align text in selected cells to right
document
  .getElementById("align-right-button")
  .addEventListener("click", function () {
    if (isTextSelected) {
      document.execCommand("justifyRight");
    } else {
      document.querySelectorAll("#excel-table td").forEach(function (cell) {
        cell.style.textAlign = "right";
      });
    }
  });

// Function to save cell data when edited
document.addEventListener("input", function (e) {
  var target = e.target;
  if (target.tagName === "TD") {
    var rowIndex = target.parentElement.rowIndex - 1; // Subtract 1 for header row
    var cellIndex = target.cellIndex;
    var dataIndex =
      rowIndex * document.getElementById("columns").value + cellIndex;
    cellData[dataIndex] = target.innerText;
  }
});
// Function to clear all text in table
document.getElementById("clear-button").addEventListener("click", function () {
  document.querySelectorAll("#excel-table td").forEach(function (cell) {
    cell.innerText = "";
  });
  cellData = [];
});

// Function to toggle selected text style
function toggleSelectedTextStyle(style) {
  document.execCommand(style);
}
// Button to toggle bold text
document.getElementById("bold-button").addEventListener("click", function () {
  toggleSelectedTextStyle("bold");
});
// Button to toggle italic text
document.getElementById("italic-button").addEventListener("click", function () {
  toggleSelectedTextStyle("italic");
});
// Button to toggle underline text
document
  .getElementById("underline-button")
  .addEventListener("click", function () {
    toggleSelectedTextStyle("underline");
  });
// Function to set text color of selected text
function setTextColor(color) {
  document.execCommand("foreColor", false, color);
}
// Button to set text color
document
  .getElementById("text-color-button")
  .addEventListener("change", function () {
    var color = this.value;
    setTextColor(color);
  });
// Function to toggle superscript text
document
  .getElementById("superscript-button")
  .addEventListener("click", function () {
    toggleSelectedTextStyle("superscript");
  });

// Function to toggle subscript text
document
  .getElementById("subscript-button")
  .addEventListener("click", function () {
    toggleSelectedTextStyle("subscript");
  });

// Function to toggle selected text style
function toggleSelectedTextStyle(style) {
  // Check if the selected text already has the style
  var isAlreadyStyled = document.queryCommandState(style);

  // If the selected text already has the style, remove it
  // Otherwise, apply the style
  if (isAlreadyStyled) {
    document.execCommand(style, false, null);
  } else {
    // If the style is subscript, check if superscript is applied and remove it
    if (style === "subscript" && document.queryCommandState("superscript")) {
      document.execCommand("superscript", false, null);
    }
    // If the style is superscript, check if subscript is applied and remove it
    else if (
      style === "superscript" &&
      document.queryCommandState("subscript")
    ) {
      document.execCommand("subscript", false, null);
    }
    // Apply the style
    document.execCommand(style);
  }
}
// Function to toggle superscript text
document
  .getElementById("superscript-button")
  .addEventListener("click", function () {
    toggleSelectedTextStyle("superscript");
  });

// Function to toggle subscript text
document
  .getElementById("subscript-button")
  .addEventListener("click", function () {
    toggleSelectedTextStyle("subscript");
  });
// Button to convert selected text to uppercase
document
  .getElementById("uppercase-button")
  .addEventListener("click", function () {
    toggleSelectedTextCase("uppercase");
  });

// Button to convert selected text to lowercase
document
  .getElementById("lowercase-button")
  .addEventListener("click", function () {
    toggleSelectedTextCase("lowercase");
  });

// Function to toggle selected text case
function toggleSelectedTextCase(caseType) {
  // Get selected text
  var selectedText = window.getSelection().toString();

  // Check if text is selected
  if (selectedText !== "") {
    var modifiedText = "";
    // Convert text case based on caseType
    if (caseType === "uppercase") {
      modifiedText = selectedText.toUpperCase();
    } else if (caseType === "lowercase") {
      modifiedText = selectedText.toLowerCase();
    }
    // Replace selected text with modified text
    document.execCommand("insertText", false, modifiedText);
  }
}
// Button to perform Undo operation
document.getElementById("undo-button").addEventListener("click", function () {
  document.execCommand("undo");
});

// Button to perform Redo operation
document.getElementById("redo-button").addEventListener("click", function () {
  document.execCommand("redo");
});
