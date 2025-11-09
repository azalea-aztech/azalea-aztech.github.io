import "./styles.css";
import { home, displayMenu, aboutPage } from "./pages";

console.log("Server running");
home();  

const homeButton = document.getElementById("homeBtn");
homeButton.addEventListener("click", home);
const menuButton = document.getElementById("menuBtn");
menuButton.addEventListener("click", displayMenu);
const aboutButton = document.getElementById("aboutBtn");
aboutButton.addEventListener("click", aboutPage);