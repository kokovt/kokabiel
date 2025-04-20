const iframe = document.getElementById("editorIframe");
const about = document.getElementById("aboutButton");
const timeline = document.getElementById("timelineButton");

const links = {
  "about": {
    link: "./kokabiel.html",
    title: "About Kokabiel",
    element: about
  },
  "timeline": {
    link: "./timeline.html",
    title: "Timeline",
    element: timeline
  }
}

function changeTab(tabName) {
  iframe.src = links[tabName].link;
  document.title = links[tabName].title;

  let activeElements = document.getElementsByClassName("active");

  for (let i = 0; i < activeElements.length; i++) {
    activeElements[i].classList.remove("active");
  }

  links[tabName].element.classList.add("active");
}


changeTab("about");
