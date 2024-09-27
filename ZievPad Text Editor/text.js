const editor = document.getElementById("editor");
const toolbar = document.getElementById("toolbar");
const headingSelect = document.getElementById("heading");
const fontSelect = document.getElementById("font-family");

toolbar.addEventListener("click", (e) => {
  const target = e.target;
  if (target.tagName === "BUTTON") {
    const command = target.id;
    if (command === "uppercase") {
      transformText((text) => text.toUpperCase());
    } else if (command === "lowercase") {
      transformText((text) => text.toLowerCase());
    } else if (command === "capitalize") {
      capitalizeAfterPeriod();
    } else if (command === "bold") {
      document.execCommand("bold", false, null);
    } else if (command === "italic") {
      document.execCommand("italic", false, null);
    } else if (command === "underline") {
      document.execCommand("underline", false, null);
    } else if (command === "change-bg") {
      const colorPicker = document.getElementById("color-picker");
      colorPicker.click();
      colorPicker.addEventListener("input", (e) => {
        const newColor = e.target.value;
        editor.style.backgroundColor = newColor;
      });
    } else if (command === "left") {
      document.execCommand("justifyLeft", false, null);
    } else if (command === "center") {
      document.execCommand("justifyCenter", false, null);
    } else if (command === "right") {
      document.execCommand("justifyRight", false, null);
    } else if (command === "list-bullet") {
      document.execCommand("insertUnorderedList", false, null);
    } else if (command === "list-number") {
      document.execCommand("insertOrderedList", false, null);
    } else if (command === "subscript") {
      document.execCommand("subscript", false, null);
    } else if (command === "superscript") {
      document.execCommand("superscript", false, null);
    } else if (command === "clear-all") {
      editor.innerHTML = "";
    } else if (command === "copy-all") {
      document.execCommand("selectAll", false, null);
      document.execCommand("copy", false, null);
    } else if (command === "undo") {
      document.execCommand("undo", false, null);
    } else if (command === "redo") {
      document.execCommand("redo", false, null);
    } else if (command === "cut") {
      document.execCommand("cut", false, null);
    } else if (command === "insert-link") {
      const linkUrl = prompt("Enter link URL:");
      const linkText = prompt("Enter link text:");
      if (linkUrl && linkText) {
        const link = document.createElement("a");
        link.href = linkUrl;
        link.textContent = linkText;
        editor.appendChild(link);
      } else {
        document.execCommand(command, false, null);
      }
    }
    updateButtonColor(target);
    updateHeadingColor();
    updateFontFamily();
  }
});

//FONTTOOLBAR
const fontToolbar = document
  .getElementById("fontContent")
  .querySelector("#toolbar");
fontToolbar.addEventListener("click", (e) => {
  const target = e.target;
  if (target.tagName === "BUTTON") {
    const command = target.id;
    if (command === "uppercase") {
      transformText((text) => text.toUpperCase());
    } else if (command === "lowercase") {
      transformText((text) => text.toLowerCase());
    } else if (command === "capitalize") {
      capitalizeAfterPeriod();
    } else if (command === "list-bullet") {
      document.execCommand("insertUnorderedList", false, null);
    } else if (command === "list-number") {
      document.execCommand("insertOrderedList", false, null);
    } else {
      document.execCommand(command, false, null);
    }
    updateButtonColor(target);
  }
});

//PARATOOLBAR
const paraToolbar = document
  .getElementById("paraContent")
  .querySelector("#toolbar");
paraToolbar.addEventListener("click", (e) => {
  const target = e.target;
  if (target.tagName === "BUTTON") {
    const command = target.id;
    if (command === "left") {
      document.execCommand("justifyLeft", false, null);
    } else if (command === "center") {
      document.execCommand("justifyCenter", false, null);
    } else if (command === "right") {
      document.execCommand("justifyRight", false, null);
    } else if (command === "list-bullet") {
      document.execCommand("insertUnorderedList", false, null);
    } else if (command === "list-number") {
      document.execCommand("insertOrderedList", false, null);
    }
    document.execCommand(command, false, null);
    updateButtonColor(target);
  }
});

//CLIPTOOLBAR
const clipToolbar = document
  .getElementById("clipContent")
  .querySelector("#toolbar");
clipToolbar.addEventListener("click", (e) => {
  const target = e.target;
  if (target.tagName === "BUTTON") {
    const command = target.id;
    if (command === "cut") {
      document.execCommand(command, false, null);
    } else if (command === "insert-link") {
      const linkUrl = prompt("Enter link URL:");
      const linkText = prompt("Enter link text:");
      if (linkUrl && linkText) {
        const link = document.createElement("a");
        link.href = linkUrl;
        link.textContent = linkText;
        editor.appendChild(link);
      }
    } else if (command === "change-bg") {
      const colorPicker = document.getElementById("color-picker");
      colorPicker.click();
      colorPicker.addEventListener("input", (e) => {
        const newColor = e.target.value;
        editor.style.backgroundColor = newColor;
      });
    } else if (command === "clear-all") {
      editor.innerHTML = "";
    } else if (command === "copy-all") {
      document.execCommand("selectAll", false, null);
      document.execCommand("copy", false, null);
    } else {
      document.execCommand(command, false, null);
    }
    updateButtonColor(target);
  }
});

headingSelect.addEventListener("change", () => {
  const format = headingSelect.value;
  document.execCommand("formatBlock", false, format);
  updateHeadingColor();
  updateFontFamily();
});
fontSelect.addEventListener("change", () => {
  const font = fontSelect.value;
  editor.style.fontFamily = font;
  updateFontFamily();
});
editor.addEventListener("input", () => {
  updateButtonColor();
  updateHeadingColor();
  updateFontFamily();
});
function updateButtonColor(button = null) {
  const buttons = document.querySelectorAll("#editor-container button");
  buttons.forEach((button) => {
    const command = button.id;
    const isActive = document.queryCommandState(command);
    if (isActive) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
  if (button) {
    editor.focus();
  }
}
function updateHeadingColor() {
  const format = document.queryCommandValue("formatBlock");
  headingSelect.value = format;
  headingSelect.classList.toggle("active", format !== "");
}
function updateFontFamily() {
  const font = editor.style.fontFamily;
  fontSelect.value = font;
}
window.addEventListener("load", () => {
  updateButtonColor();
  updateHeadingColor();
  updateFontFamily();
});
function transformText(transformFunction) {
  const selectedText = window.getSelection().toString();
  const range = window.getSelection().getRangeAt(0);
  const span = document.createElement("span");
  span.textContent = selectedText;
  span.style.textTransform = "none";
  const transformedText = transformFunction(selectedText);
  span.textContent = transformedText;
  range.deleteContents();
  range.insertNode(span);
}
function capitalizeAfterPeriod() {
  const editorContent = editor.innerHTML;
  const transformedContent = editorContent.replace(
    /\. (\w)/g,
    (_, match) => `. ${match.toUpperCase()}`
  );
  editor.innerHTML = transformedContent;
}
function showAll() {
  hideAllContent();
  document.getElementById("allContent").style.display = "block";
  setActiveButton("allBtn");
}

function showFont() {
  hideAllContent();
  document.getElementById("fontContent").style.display = "block";
  setActiveButton("fontBtn");
}

function showPara() {
  hideAllContent();
  document.getElementById("paraContent").style.display = "block";
  setActiveButton("paraBtn");
}
function showClip() {
  hideAllContent();
  document.getElementById("clipContent").style.display = "block";
  setActiveButton("clipBtn");
}
function hideAllContent() {
  var contents = document.getElementsByClassName("content");
  for (var i = 0; i < contents.length; i++) {
    contents[i].style.display = "none";
  }
}
function setActiveButton(buttonId) {
  var buttons = document.querySelectorAll(".all, .font, .para, .clip");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("activesTop");
  }
  document.getElementById(buttonId).classList.add("activesTop");
}
function importFile(input) {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const importedContent = e.target.result;
      document.getElementById("editor").innerHTML = importedContent;
    };
    reader.readAsText(file);
  }
}
document
  .querySelector("button3:last-of-type")
  .addEventListener("click", function () {
    document.getElementById("fileInput").click();
  });
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

function blankEditor() {
  document.getElementById("editor").innerHTML = "";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  var buttons = document.querySelectorAll(".buttonzr");
  buttons.forEach((button) => {
    button.classList.toggle("dark-mode");
  });
}
function addContent() {
  var editor = document.getElementById("editor");
  editor.innerHTML += `
        <h1>Discipline: The Path to Excellence</h1>
        <hr>
         <p>Discipline isn't just a buzzword; it's the compass guiding us toward our aspirations. It's the unwavering commitment to our dreams, even when the journey gets rocky.</p>
         <p>Imagine a sculptor chiseling away at a block of marble. Each strike of the hammer shapes the masterpiece within. That's discipline—the consistent effort that molds us into our best selves.</p>
         <p>Here are some essential facets of discipline:</p>
        <ul>
         <li><strong>Setting Clear Objectives:</strong> Discipline begins with clarity. We define our goals, whether they're climbing literal mountains or conquering personal challenges.</li>
         <li><strong>Creating a Daily Ritual:</strong> Consistency breeds success. A disciplined person follows a daily routine, allocating time for work, reflection, and self-improvement.</li>
         <li><strong>Staying Focused Amid Chaos:</strong> Life throws distractions like confetti—social media, Netflix, that enticing bag of chips. Discipline means resisting these temptations and staying laser-focused on our mission.</li>
         <li><strong>Accountability:</strong> We hold ourselves responsible. If we stumble, we don't blame the ground; we acknowledge the fall and rise stronger.</li>
         <li><strong>Resisting Instant Gratification:</strong> Discipline isn't about being rigid; it's about making intentional choices. We say no to fleeting pleasures for lasting fulfillment.</li>
        </ul>
   <p>Why does discipline matter? Because it bridges the gap between dreams and reality. It transforms wishes into achievements, sketches into symphonies, and sweat into success.</p>
    <p>So, let's embrace discipline. Let's wake up early, write that novel, hit the gym, and chase our dreams relentlessly. Remember, the path to excellence is paved with discipline.</p>     
   `;
}
function undox() {
  document.execCommand("undo");
}

function redox() {
  document.execCommand("redo");
}
function downloadText() {
  const editorContent = document.getElementById("editor").innerHTML;
  const formattedContent = `<html><head><style>body { font-family: ${getSelectedFont()}; }</style></head><body>${editorContent}</body></html>`;
  const blob = new Blob([formattedContent], { type: "text/html" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "ZvPTD.html";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
function getSelectedFont() {
  return document.getElementById("editor").style.fontFamily;
}
function dataList() {
  var editor = document.getElementById("editor");
  editor.innerHTML += `
      <h3 style="margin-left:20px;">Shopping list</h3>
      <ul>
          <li>Cheese</li>
          <li>Milk</li>
          <li>Bread</li>
          <li>Fish</li>
          <li>Egg</li>
          <li>Vegetable</li>
          <li>Fruits</li>
      </ul>`;
}
function Square() {
  var editor = document.getElementById("editor");
  editor.innerHTML += `
        <div style="width: 100px; height: 100px; background-color: blue;"></div>
        <div style="width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent; border-bottom: 100px solid green;"></div>
        <div style="width: 100px; height: 100px; background-color: red; border-radius: 50%;"></div>
    `;
}
