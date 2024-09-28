function typeAndClearTextLoop(
  textareaId,
  text,
  typeInterval,
  clearInterval,
  pauseInterval
) {
  let i = 0;
  let typing = true;
  let timer;

  function startTyping() {
    if (i < text.length) {
      document.getElementById(textareaId).value += text.charAt(i);
      i++;
    } else {
      typing = false;
      setTimeout(startDeleting, pauseInterval);
    }
  }

  function startDeleting() {
    if (i > 0) {
      document.getElementById(textareaId).value = document
        .getElementById(textareaId)
        .value.slice(0, -1);
      i--;
    } else {
      typing = true;
      setTimeout(startTyping, pauseInterval);
    }
  }

  timer = setInterval(
    function () {
      if (typing) {
        startTyping();
      } else {
        startDeleting();
      }
    },
    typing ? typeInterval : clearInterval
  );
}

typeAndClearTextLoop(
  "editor",
  `   <h1>Hello</h1>
    </body>
</html> `,
  160,
  50,
  2000
);
typeAndClearTextLoop(
  "editor2",
  `let number = 4;
console.log(isEven(number)); `,
  100,
  50,
  2000
);
typeAndClearTextLoop(
  "editor3",
  `font-size: 20px;
 text - align: center;
      padding: 10px;
}`,
  400,
  50,
  2000
);

var isExpanded = {};
function toggleTextarea(textareaId) {
  var textarea = document.getElementById(textareaId);
  if (!isExpanded[textareaId]) {
    textarea.style.height = "100px";
    textarea.style.width = "50%";
  } else {
    textarea.style.height = "90px";
    textarea.style.width = "160px";
  }
  isExpanded[textareaId] = !isExpanded[textareaId];
  textarea.style.transition = "all 0.5s";
}
function toggleSidebar() {
  var sidebar = document.querySelector(".sidebar");
  if (sidebar.classList.contains("active")) {
    sidebar.classList.remove("active");
  } else {
    sidebar.classList.add("active");
  }
}
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  var buttons = document.querySelectorAll(".buttonzr");
  buttons.forEach((button) => {
    button.classList.toggle("dark-mode");
  });
}
