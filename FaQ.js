function togglesidebar() {
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
const responses = {
  // Basic questions
  hello: " Hello! How can I help you?",
  "who are you?":
    " I am a chatbot programmed by ZievPad, I aim to answer questions that correspond to certain key questions about ZievPad",
  "do you have fellings?": " As an AI, I have no feelings.",
  "will you be able to answer any question like ai in general?":
    " sorry, I can't answer any questions like ai, I only answer questions according to the keywords above, namely about ZievPad and also the basic questions that have been given.",
  thanks: " You're welcome! If you need any more help, don't hesitate to ask.",
  // ZievPad startup questions
  "who is the founder of zievpad?":
    " Nozar Mandriva Amri is the CEO and founder of ZievPad",
  "where was zievpad founded?": " ZievPad was first erected in a bedroom",
  "is zievpad a big company?":
    " not, ZievPad is just a startup but in the future will become the largest science technology company in the world!",
  "why was zievpad created?":
    " ZievPad was created so that you can easily learn about technology, both programming and the world of work, such as data creation and so on",
  //new update
  "where is the text editor feature for backend languages?":
    " Backend features might be added to ZievPad, but it seems very difficult😐",
  //ZievPad feature
  "how to use features in zievpad collumn such as bold, italic and others?":
    " You can use the feature by holding or blocking one of the cells and pressing the feature button there",
};
function addMessage(message) {
  document.getElementById("userInput").scrollIntoView();
  document.getElementById("userInput").value = message;
}
function getResponse(message) {
  const lowerCaseMessage = message.toLowerCase();
  if (responses[lowerCaseMessage]) {
    return responses[lowerCaseMessage];
  } else {
    return "Please use the prepared question key.";
  }
}

function sendMessage() {
  const userInput = document.getElementById("userInput").value;
  const chatbox = document.getElementById("chatbox");
  chatbox.innerHTML += "<p><strong>You:</strong>" + userInput + "</p>";
  const botResponse = getResponse(userInput);
  chatbox.innerHTML += "<p><strong>Chatbot:</strong>" + botResponse + "</p>";
  document.getElementById("userInput").value = "";
}
function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}