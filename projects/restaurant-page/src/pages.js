function home () {
    const container = document.getElementById("content");
    container.innerHTML = "";
    const heading1 = document.createElement("h1");
    const heading2 = document.createElement("h2");
    const heading3 = document.createElement("h3");

    heading1.innerHTML = "DishBone";
    heading1.classList.add("logo");

    heading2.innerHTML = "YOU WISH IT, WE DISH IT!";
    heading2.classList.add("slogan");

    heading3.innerHTML = "Are you tired of seeing the same old food on menus? Want to order dishes with your own twist on them? Choose something from our menu, add whatever your heart desires into the recipe and we will do our best to bring your dream onto a plate!";
    heading3.classList.add("desc");

    container.appendChild(heading1);
    container.appendChild(heading2);
    container.appendChild(heading3);
}

const menuItems = [];

function MenuItem(name, price, desc) {
    this.name = name;
    this.price = price;
    this.desc = desc;
}

function addToMenu(name,price, desc) {
    const itemToAdd = new MenuItem(name, price, desc);
    menuItems.push(itemToAdd);
}

addToMenu("Build-Your-Own Gourmet Burger", 12, "Classic beef patty with lettuce, tomato, and cheese. Start here and add your favorite toppings!");
addToMenu("Customizable Pasta Bowl", 11.5, "Choose your pasta type with a base sauce (marinara, alfredo, or pesto).");
addToMenu("Signature Salad Base", 9, "Mixed greens with cherry tomatoes, cucumbers, and a light vinaigrette.");
addToMenu("Persolnalized Stir-Fry Plate", 13, "Choice of chicken, tofu, or shrimp with mixed veggies and steamed rice.");
addToMenu("DIY Pizza Margherita", 10, "Fresh tomato sauce, mozzarella, and basil on a hand-tossed crust.");
addToMenu("Classic Soup Bowl", 7, "Choose tomato, chicken noodle, or vegetable soup base.");


function displayMenu() {
    const container = document.getElementById("content");
    container.innerHTML = "";
    const heading1 = document.createElement("h1");
    heading1.innerHTML = "Menu";
    heading1.classList.add("slogan");

    const menuDiv = document.createElement("div");
    for (let index = 0; index < menuItems.length; index++) {
        const item = menuItems[index];
        const div = document.createElement("div");
        const name = document.createElement("p");
        const price = document.createElement("p");
        const description = document.createElement("p");
        name.innerHTML = item.name;
        price.innerHTML = "$" + item.price.toFixed(2);
        description.innerHTML = item.desc;
        
        name.classList.add("name");
        description.classList.add("itemDesc");

        div.appendChild(name);
        div.appendChild(price);
        div.appendChild(description);

        div.classList.add("menuItem");

        menuDiv.appendChild(div);
    }

    const heading2 = document.createElement("h2");
    heading2.innerHTML = "Custom Toppings";
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const p3 = document.createElement("p");
    const p4 = document.createElement("p");
    const p5 = document.createElement("p");
    const p6 = document.createElement("p");

    p1.innerHTML = "Extra proteins: chicken, beef, tofu, shrimp — $3.50 each";
    p2.innerHTML = "Specialty cheeses: blue, goat, aged cheddar — $2.00 each";
    p3.innerHTML = "Fresh veggies: mushrooms, bell peppers, olives, jalapeños — $1.50 each";
    p4.innerHTML = "Gourmet sauces and spreads: truffle aioli, spicy sriracha, garlic herb butter — $1.75 each";
    p5.innerHTML = "Unique toppings: avocado, sun-dried tomatoes, crispy bacon, caramelized onions — $2.50 each";
    p6.innerHTML = "Artisan breads and sides: garlic focaccia, sweet potato fries, house-made pickles — $3.00 each";

    container.appendChild(heading1);
    container.appendChild(menuDiv);
    container.appendChild(heading2);    
    container.appendChild(p1);
    container.appendChild(p2);
    container.appendChild(p3);
    container.appendChild(p4);
    container.appendChild(p5);
    container.appendChild(p6);

    container.classList.add("menu");

}

function aboutPage() {
    const container = document.getElementById("content");
    container.innerHTML = "";

    const aboutHeader = document.createElement("h1");
    aboutHeader.innerHTML = "About Us";
    const aboutText = document.createElement("p");
    aboutText.innerHTML = "Welcome to DishBone—where culinary creativity meets your personal taste! Are you tired of seeing the same old food on menus everywhere you go? So were we! That’s why we created a restaurant that puts the power back in your hands. At our place, you’re not just a guest—you’re the chef of your own experience.";

    const storyHeader = document.createElement("h1");
    storyHeader.innerHTML = "Our Story";
    const storyText = document.createElement("p");
    storyText.innerHTML = "We started with a simple idea: Why settle for ordinary dishes when you can craft your own? Inspired by food lovers who crave something special and unique, our founders dreamed of a menu that’s more than a list—it’s an invitation to invent, explore, and taste something truly yours.";

    const howHeader = document.createElement("h1");
    howHeader.innerHTML = "How It Works";
    const howText = document.createElement("p");
    howText.innerHTML = "Our menu features a variety of base dishes—from gourmet burgers and pasta bowls to signature salads and DIY pizzas. But that’s just the beginning! Add whatever your heart desires to any recipe and we’ll do our best to bring your dream to life. With fresh ingredients, bold flavors, and endless combinations, we make every plate personal.";

    const promiseHeader = document.createElement("h1");
    promiseHeader.innerHTML = "Our Promise";
    const promiseText = document.createElement("p");
    promiseText.innerHTML = "We’re committed to quality, creativity, and satisfaction. Each meal is crafted with care and attention to your preferences—because we believe food should be fun, flavorful, and all about you.";

    const valuesHeader = document.createElement("h1");
    valuesHeader.innerHTML = "Community & Values";
    const valuesText = document.createElement("p");
    valuesText.innerHTML = "We support local suppliers and strive for sustainable practices, ensuring each ingredient is selected with respect for our environment and our community. Whether you’re dining in, taking out, or ordering online, our team can’t wait to serve you a meal like no other.";

    const joinHeader = document.createElement("h1");
    joinHeader.innerHTML = "Join The Adventure!";
    const joinText = document.createElement("p");
    joinText.innerHTML = "Explore our menu, share your dream dish, and discover a new way to enjoy food—personalized just for you. Come by and taste what you’ve been missing!";

    container.appendChild(aboutHeader);
    container.appendChild(aboutText);
    container.appendChild(storyHeader);
    container.appendChild(storyText);
    container.appendChild(howHeader);
    container.appendChild(howText);
    container.appendChild(promiseHeader);
    container.appendChild(promiseText);
    container.appendChild(valuesHeader);
    container.appendChild(valuesText);
    container.appendChild(joinHeader);
    container.appendChild(joinText);
    container.classList.add("about");
}

export { home, displayMenu, aboutPage };