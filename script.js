// Define rotation angles for each face of the dice
const rots = [
  { ry: 0, rx: 0 }, // 1
  { ry: 90, rx: 0 }, // 2
  { ry: 180, rx: 0 }, // 3
  { ry: 270, rx: 0 }, // 4
  { ry: 0, rx: 90 }, // 5
  { ry: 0, rx: -90 }, // 6
];

// Array to hold the values of the rolled dice
let val = [1, 1];

// Set initial properties for the dice faces
gsap.set(".face", {
  position: "absolute",
  userSelect: "none",
  width: "100%",
  height: "100%",
  rotateY: (i) => rots[i].ry, // Rotate based on the defined angles
  rotateX: (i) => rots[i].rx,
  transformOrigin: "50% 50% -150px", // Set the origin for 3D rotation
  z: 150,
  background: (i) =>
    "url(./images/dieSprite.svg) 0px -" + String(i * 300) + "px", // Set background image for each face
});

// Clone the dice element and append it to the tray
let die2 = document.querySelector(".die").cloneNode(true);
document.querySelector(".tray").append(die2);

// Set properties for the main dice element
gsap.set(".die", {
  attr: { class: (i) => "die die" + (i + 1) }, // Assign class names
  width: 300,
  height: 300,
  perspective: 999, // Set perspective for 3D effect
});

// Set properties for the cube that represents the dice
gsap.set(".cube", {
  position: "absolute",
  width: 300,
  height: 300,
  transformStyle: "preserve-3d", // Preserve 3D transformations
  z: -600, // Position in the z-axis
});

// Function to handle the dice rolling animation
function roll() {
  // Generate random values for the dice
  val[0] = gsap.utils.random(1, 6, 1);
  val[1] = gsap.utils.random(1, 6, 1);

  // Create a timeline for the animation
  gsap
    .timeline()
    .to(
      ".sum",
      {
        duration: 0.17,
        overwrite: true,
        opacity: 0, // Fade out the sum display
        ease: "power1.inOut",
      },
      0,
    )

    .fromTo(
      ".cube",
      {
        z: -600, // Start position for the cube
      },
      {
        duration: 0.75,
        z: -300, // End position for the cube
        ease: "expo",
        yoyoEase: "bounce.out(5)", // Bounce effect
        repeat: 1, // Repeat the animation
      },
      0,
    )

    .fromTo(
      ".cube",
      {
        rotationX: (i) => (i == 0 ? "-=360" : "+=360"), // Ensure rotation even if the same number is rolled
      },
      {
        duration: 1.5,
        ease: "back",
        rotationX: (i) => -rots[val[i] - 1].rx, // Rotate to the new face
        rotationY: (i) => -rots[val[i] - 1].ry,
      },
      0,
    )

    .set(
      ".sum",
      {
        textContent: String(val[0] + val[1]), // Update the displayed sum
      },
      0.8,
    )

    .to(
      ".sum",
      {
        opacity: 1, // Fade in the new sum
        ease: "power3.inOut",
      },
      0.8,
    );
}

// Trigger the roll function on pointer up or window load
window.onpointerup = window.onload = roll;

// COPYRIGHT NOTICE
// Select DOM element
const copyright = document.getElementById("copy");

// Dynamically generate copyright information
copyright.innerHTML = `<a href="https://www.gaz41.com">gaz41.com</a>. <span class="copy2">No copyright infringement intended</span>`;

// GSAP
// 3D dice rolling animation using the GSAP (GreenSock Animation Platform) library.
// The code sets up the visual representation of dice, handles the rolling logic, and updates the displayed sum of the rolled values.
