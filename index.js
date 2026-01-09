// Set colours (can also implement a colour switch later when I pop shaders in)
const BACKGROUND = "black";
const FOREGROUND = "white";

// Get the HTML document and make a border
const canvas = document.getElementById("window");
canvas.width = 800;
canvas.height = 800;

// Set canvas type
const ctx = canvas.getContext("2d");

// Function to clear the screen,, fill the screen with background colour, then make a big rectangle for the canvas
function clean() {
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Convert a point from the -1 -> 1 to actual screen coordinates
function screen(p) {
  return {
    x: (p.x + 1) * canvas.width / 2,
    y: (1 - (p.y + 1)/2) * canvas.height
  };
}

//This function can be reactivated, it is to place a small point rather than a line

//function make_point({ x, y }) {
 // const thickness = 20;
  //ctx.fillStyle = FOREGROUND;
  //ctx.fillRect(x - thickness/2, y - thickness/2, thickness, thickness);
//}

// Generate the new coordinate, which projects in x,y,z rather than x,y (this function works so long as z /= 0 (inside camera))
function project({x, y, z}){
    return{
        x: x/z,
        y: y/z
    }
}

// Set certain important values for animation
const FPS = 60;
let dz = 1;
let angle = 0;

// Create an object for the position properties [-1,1]. These objects are "points"
const points = [
    {x:0.5, y:0.5, z:0.5},
    {x:-0.5, y:0.5, z:0.5},
    {x:-0.5, y:-0.5, z:0.5},
    {x:0.5, y:-0.5, z:0.5},

    {x:0.5, y:0.5, z:-0.5},
    {x:-0.5, y:0.5, z:-0.5},
    {x:-0.5, y:-0.5, z:-0.5},
    {x:0.5, y:-0.5, z:-0.5},

]

// Create an array containing a list of line segments to be joined, index i gets connected to i+1.. When i+1 > length.list, i+1%length.list (This should be updated to be made from another function)
const faces = [
    [0,1,2,3],
    [4,5,6,7],
    [0,4],
    [1,5],
    [2,6],
    [3,7],
    [1,4],


    [2,5],
    [3, 6],
    [0, 7],

    [1,3],
    [6,4]

]

// Simple function that adds little value dz to z, which translates it by amount dz (only thing that could be added is internal paramater to change speed)
function translate_z({x,y,z}, dz){
    return{x,y,z: z + dz}
}

// Simple function that rotates the object around xz using rotation matrices
function rotate_xz({x,y,z}, angle){
    return{
        x: x * Math.cos(angle)- z * Math.sin(angle),
        y, 
        z: x * Math.sin(angle)+ z * Math.cos(angle)
    }
}

// Function that draws the lines, controls some variables such as line width and colour, then make a path from p1 and p2, then fill the line
function line_renderer(p1, p2){
    ctx.lineWidth = 5 
    ctx.strokeStyle = FOREGROUND;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

// This is the frame information, we can generate animations using the values such as fps, dz and angle. Speed of animation is controlled in here.
function frame_information(){
    const dt = 1/FPS;
    dz += 1*dt
    angle += 0.5 * Math.PI*dt
    clean();

    // Iterate through the list of faces, take the first and second point and join them in lines. Go through all faces.
    for (const f of faces){
        for(let i = 0; i < f.length; ++i){
            const a = points[f[i]];
            const b = points[f[(i + 1)%f.length]];
            line_renderer(
            screen(project(translate_z(rotate_xz(a, angle), 2))),
            screen(project(translate_z(rotate_xz(b, angle), 2)))
            );
        }
    }
    setTimeout(frame_information, 1000/FPS)
}
setTimeout(frame_information, 1000/FPS)