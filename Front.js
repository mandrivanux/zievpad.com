function updateLineNumbers() {
  const editor = document.getElementById("editor");
  const lineNumbers = document.getElementById("lineNumbers");

  const lines = editor.value.split("\n");
  const lineCount = lines.length;

  let lineNumbersContent = "";
  for (let i = 1; i <= lineCount; i++) {
    lineNumbersContent += i + "<br>";
  }
  lineNumbers.innerHTML = lineNumbersContent;
  const lineHeight = 20;
  editor.style.height = `${lineHeight * lineCount}px`;
}
function runCode() {
  var code = document.getElementById("editor").value;
  var outputFrame =
    document.getElementById("iframeOutput").contentWindow.document;
  outputFrame.open();
  outputFrame.write(code);
  outputFrame.close();
}

function insertHtmlSnippet() {
  var htmlSnippet = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Made on ZievPad</title>
    <style>
        
    </style>
</head>
<body>
    <scrip t>      
    </scrip t>    
</body>
</html>`;
  var textarea = document.getElementById("editor");
  textarea.value = htmlSnippet;
}

function clearAll() {
  var editor = document.getElementById("editor");
  editor.value = "";
}
function copyCode() {
  var editor = document.getElementById("editor");
  navigator.clipboard.writeText(editor.value).then(function () {
    alert("Code copied to clipboard!");
  });
}
document
  .getElementById("feedbackButton")
  .addEventListener("click", function () {
    document.getElementById("feedbackForm").classList.toggle("hidden");
  });
document
  .getElementById("submitFeedback")
  .addEventListener("click", function () {
    const emailBody = "Give feedback to ZievPad";
    window.location.href = `mailto:smartfrendriva@gmail.com?subject=Feedback&body=${encodeURIComponent(
      emailBody
    )}`;
  });
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  var buttons = document.querySelectorAll(".buttonzr");
  buttons.forEach((button) => {
    button.classList.toggle("dark-mode");
  });
}
function toggleSidebar() {
  var sidebar = document.getElementById("sidebar");
  var toggleBtn = document.querySelector(".toggle-btn");

  if (sidebar.style.width === "600px") {
    sidebar.style.width = "0";
    toggleBtn.classList.remove("sidebar-opened");
  } else {
    sidebar.style.width = "600px";
    toggleBtn.classList.add("sidebar-opened");
  }
}
function saveText() {
  var textToSave = document.getElementById("editor").value;
  var blob = new Blob([textToSave], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "ZPindex.html");
}

function saveAs(blob, fileName) {
  var link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdownMenu = document.querySelector(".dropdown-menu");

dropdownToggle.addEventListener("click", () => {
  dropdownMenu.classList.toggle("active");
});

function toggleOriginalTheme() {
  document.body.classList.remove(
    "zievpad-theme",
    "pixel-theme",
    "hacker-theme",
    "violet-theme"
  );
  document.body.classList.add("original-theme");
}

function toggleZievpadTheme() {
  document.body.classList.remove(
    "original-theme",
    "pixel-theme",
    "hacker-theme",
    "violet-theme"
  );
  document.body.classList.add("zievpad-theme");
}

function togglePixelTheme() {
  document.body.classList.remove(
    "original-theme",
    "zievpad-theme",
    "hacker-theme",
    "violet-theme",
    "circus-theme"
  );
  document.body.classList.add("pixel-theme");
}

function toggleHackerTheme() {
  document.body.classList.remove(
    "original-theme",
    "zievpad-theme",
    "pixel-theme",
    "violet-theme",
    "circus-theme"
  );
  document.body.classList.add("hacker-theme");
}

function toggleVioletTheme() {
  document.body.classList.remove(
    "original-theme",
    "zievpad-theme",
    "pixel-theme",
    "hacker-theme",
    "circus-theme"
  );
  document.body.classList.add("violet-theme");
}

function toggleCircusTheme() {
  document.body.classList.remove(
    "original-theme",
    "zievpad-theme",
    "pixel-theme",
    "hacker-theme",
    "violet-theme"
  );
  document.body.classList.add("circus-theme");
}

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

function showSnippet() {
  hidesnippetContent();
  document.getElementById("snippetContent").style.display = "block";
  setActiveButton("snippetBtn");
}
function hidesnippetContent() {
  var contents = document.getElementsByClassName("content");
  for (var i = 0; i < contents.length; i++) {
    contents[i].style.display = "none";
  }
}
function showThemes() {
  hidethemesContent();
  document.getElementById("themesContent").style.display = "block";
  setActiveButton("themesBtn");
}
function hidethemesContent() {
  var contents = document.getElementsByClassName("content");
  for (var i = 0; i < contents.length; i++) {
    contents[i].style.display = "none";
  }
}
function setActiveButton(buttonId) {
  var buttons = document.querySelectorAll(".themes, .snippet");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("activesTop");
  }
  document.getElementById(buttonId).classList.add("activesTop");
}
