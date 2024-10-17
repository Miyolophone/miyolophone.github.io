//RANDOM TEXT AND LOGO BACK
const flavortextArr = new Array(
    ["<p>you're here early...!</p>", "<p>the show will begin shortly.</p>"],
    ["<p>i'll be ready in a minute!</p>","<p>don't go anywhere, okay?</p>"],
    ["<p>wow, you're here already?</p>", "<p>you just couldn't wait to see me, huh...</p>"],
    ["<p>we're both pretty early...</p>", "<p>b-but i was here first, okay!?</p>"]
);

const backurlsArr = new Array(
    "../img/logoback1.png",
    "../img/logoback2.png",
    "../img/logoback3.png",
    "../img/logoback4.png",
);

const flavorTextSeed = Math.round(Math.random() * 100) % flavortextArr.length;
document.querySelector(".innerft1").innerHTML = flavortextArr[flavorTextSeed][0];
document.querySelector(".innerft2").innerHTML = flavortextArr[flavorTextSeed][1];

document.querySelector(".back").style.setProperty("--randomBG", "url(" + backurlsArr[
    Math.round(Math.random() * 100) % backurlsArr.length]
+ ")");


// ROTATING LOGO
const logo = document.querySelector(".home-logo-image");
const originalClass = logo.className;
var isHovering = false;
var isSpinning = false;
var logoHeight = 300;
var zoomFactor = 20;

function setLogoHeight(h) {
    logo.style.setProperty("--height", h + "px");
};

setLogoHeight(logoHeight);

//checks if hovering over logo
logo.addEventListener("mouseover", event => {
    isHovering = true;
    setLogoHeight(logoHeight + zoomFactor);
});
logo.addEventListener("mouseout", event => {
    isHovering = false;
    logo.style.setProperty("--rotateX", 0);
    logo.style.setProperty("--rotateY", 0);
    if (!isSpinning) {
        setLogoHeight(logoHeight);
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
        document.querySelector(".back").style.setProperty("--randomBG", "url(" + backurlsArr[
            Math.round(Math.random() * 100) % backurlsArr.length]
        + ")");

        isSpinning = false;
        if (!isHovering) {
            setLogoHeight(logoHeight);
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


    /* find offset from center and scales it to yield an appropriate value in degrees.
    Clamps the maximum rotation value to 50 degrees */
    const offsetX = Math.min(((x - middleX)/middleX) * 100 * coeff, 50);
    const offsetY = Math.min(((y - middleY)/middleY) * 100 * coeff, 50);


    element.style.setProperty("--rotateX", offsetX + "deg");
    element.style.setProperty("--rotateY", -1* offsetY + "deg");
}