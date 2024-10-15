//RANDOM TEXT AND LOGO BACK
const flavortext = new Array(
    "<p>you're here early...!</p><p>the show will begin shortly.</p>",
    "<p>i'll be ready in a minute!</p><p>don't go anywhere, okay?</p>",
    "<p>wow, you're here already?</p><p>you just couldn't wait to see me, huh...</p>",
    "<p>we're both pretty early...</p><p>b-but i was here first, okay!?</p>"
);

const backurls = new Array(
    "../img/logoback1.png",
    "../img/logoback2.png",
    "../img/logoback3.png",
    "../img/logoback4.png",
    "../img/logoback5.png"
);


document.querySelector(".flavor-text").innerHTML = flavortext[
    Math.round(Math.random() * 100) % flavortext.length
];
document.querySelector(".back").style.setProperty("--randomBG", "url(" + backurls[
    Math.round(Math.random() * 100) % backurls.length]
+ ")");


// ROTATING LOGO
const logo = document.querySelector(".home-logo-image");
const originalClass = logo.className;
var isHovering = false;
var isSpinning = false;
var logoHeight = 19;
var zoomFactor = 2;
logo.style.setProperty("--height", logoHeight + "rem");

//checks if hovering over logo
logo.addEventListener("mouseover", event => {
    isHovering = true;
    logo.style.setProperty("--height", logoHeight + zoomFactor + "rem");
});
logo.addEventListener("mouseout", event => {
    isHovering = false;
    logo.style.setProperty("--rotateX", 0);
    logo.style.setProperty("--rotateY", 0);
    if (!isSpinning) {
        logo.style.setProperty("--height", logoHeight + "rem");
    }
});

// LOGO SPIN ON CLICK
var r = Math.round(Math.random() * 20) - 10;

logo.addEventListener("click", event => {
    isSpinning = true;
    logo.className = originalClass + " spin";
    document.documentElement.style.setProperty('--randomRotateZ', r + 'deg');
    logo.addEventListener("animationend", event => {
        logo.className = originalClass;
        //re-randomize z rotation and bg image
        r = Math.round(Math.random() * 20) - 10;
        document.querySelector(".back").style.setProperty("--randomBG", "url(" + backurls[
            Math.round(Math.random() * 100) % backurls.length]
        + ")");
        isSpinning = false;
        if (!isHovering) {
            logo.style.setProperty("--height", logoHeight + "rem");
        }
    });
});

// LOGO ROTATE BASED ON MOUSE POSITION
document.addEventListener("mousemove", (e) => {
    rotateElement(e, logo);
});

function rotateElement(event, element) {
    //get mouse position
    const x = event.clientX;
    const y = event.clientY;

    //find rotation center
    const box = element.getBoundingClientRect();
    const middleX = (box.left + box.right) / 2;
    const middleY = (box.top + box.bottom) / 2;
    const maxDist = Math.sqrt(
        Math.pow(window.innerWidth - middleX, 2) + Math.pow(window.innerHeight - middleY, 2));

    /* a coefficient that increases the strength of the effect as the cursor approaches the logo center.
    we want it to be 1 at the minimum distance and 0 at the maximum distance.
    the outermost exponent fine-tunes the rate of change. */
    const coeff = Math.pow(
        (Math.sqrt(Math.pow(middleX - x, 2) + Math.pow(middleY - y, 2)) / maxDist) * -1 + 1,
        6);


    //find offset from center, scaled to max rotation in degrees.
    const offsetX = ((x - middleX)/middleX) * 80 * coeff;
    const offsetY = ((y - middleY)/middleY) * 80 * coeff;


    element.style.setProperty("--rotateX", offsetX + "deg");
    element.style.setProperty("--rotateY", -1* offsetY + "deg");


}