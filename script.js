function showPreview(){
	var htmlCode = document.getElementById("htmlCode").value;
	var cssCode = "<style>" + document.getElementById("cssCode").value + "</style>";
var jsCode =
    '<script type="text/javascript">' +
    `
    loglist = [];
console.log = function (message) {
  loglist.push({ data: message, type: "log", sender: "parent" });
  updateConsole();
};
console.error = function (message) {
  loglist.push({ data: message, type: "error", sender: "parent" });
  updateConsole();
};
console.warn = function (message) {
  loglist.push({ data: message, type: "warning", sender: "parent" });
  updateConsole();
};
console.info = function (message) {
  loglist.push({ data: message, type: "information", sender: "parent" });
  updateConsole();
};
function updateConsole() {
  let tempLog = [];
  for (var i in loglist) {
    if (loglist[i].type == "log") {
      tempLog.push("<p><h3>" + loglist[i].data.toString() + "</h3></p>");
    }
    if (loglist[i].type == "error") {
      tempLog.push(
        '<p><h3 style="color:red;">' +
          loglist[i].data.toString() +
          "</h3></p>"
      );
    }
    if (loglist[i].type == "warning") {
      tempLog.push(
        '<p><h3  style="color:yellow;">' +
          loglist[i].data.toString() +
          "</p></h3>"
      );
    }
    if (loglist[i].type == "information") {
      tempLog.push(
        '<p><h3  style="color:blue;">' +
          loglist[i].data.toString() +
          "</p></h3>"
      );
    }
  }
  let string = "";
  for (var i in tempLog) {
    string = string + tempLog[i];
  }
  let frame =
    window.parent.document.getElementById("console").contentWindow.document;
  frame.open();
  frame.write('<div class="msg">' + string + '</div>');
  window.parent.document.getElementById("console").contentWindow.scrollTo(0,frame.body.scrollHeight);
  frame.close();
}
window.onerror = function (message, url, lineNumber) {
	  loglist.push({ data: message, type: "error", sender: "parent" });
  updateConsole(); 
}
    ` +
    document.getElementById("jsCode").value + `
    loglist = undefined
    delete(loglist)
    `
    +
    "</script>";	var frame = document.getElementById("preview-window").contentWindow.document;
	frame.open();
	frame.write(htmlCode + cssCode + jsCode);
	frame.close();
}


function openPage(evt, pageName) {
  // Declare all variables
  var i, tabcontent, tablinks;
  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(pageName).style.display = "block";
  evt.currentTarget.className += " active";
}




// Samples Start
function checkSample(){
  c = new URL(window.location.href);
  q = c.searchParams.has("sample");
  if(q){
    q = c.searchParams.get("sample");
  }

  function load(name){
    n = name;
    html = document.getElementById("htmlCode");
    css = document.getElementById("cssCode");
    js = document.getElementById("jsCode");
    if(n === "headings"){
      html.value = "<h1>Heading 1</h1>\n<h2>Heading 2</h2>\n<h3>Heading 3</h3>\n<h4>Heading 4</h4>\n<h5>Heading 5</h5>\n<h6>Heading 6</h6>";
      css.value = "";
      js.value = "";
    }
  }

samples = ['headings'];

  // Write sample codes
  if(samples.includes(q)){
    load(q);
  }
  else{
    console.error("Error: The sample you requested to load doesn't exist. Check the URL or continue from our tutorials.");
  }
}
checkSample();
// Samples End