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

// Set certain important values for animation
const FPS = 60;

// Base change in z, y and x (not animated)
let dz = 2;
let dy = 0;
let dx = 0;

// Base angle changes
let pitch = 0;
let roll= 0;
let yaw = 0;

// Animated movement in dz, dy or dx
let change_in_dz = 0;
let change_in_dy = 0;
let change_in_dx = 0;

// Animated change in pitch, yaw and roll
let change_in_pitch = 0/* .5 * Math.PI */;
let change_in_roll = 0 /* 0.5 * Math.PI */;
let change_in_yaw = 0.5 * Math.PI;

const numbers = false

// Create an object for the position properties [-1,1]. These objects are "points"
const points = [

    new vector(0.5, 0.5, 0.5),
    new vector(-0.5, 0.5, 0.5),
    new vector(-0.5, -0.5, 0.5),
    new vector(0.5, -0.5, 0.5),

    new vector(0.5, 0.5, -0.5),
    new vector(-0.5, 0.5, -0.5),
    new vector(-0.5, -0.5, -0.5),
    new vector(0.5, -0.5, -0.5)
]

// Create an array containing a list of line segments to be joined, index i gets connected to i+1.. When i+1 > length.list, i+1%length.list (This should be updated to be made from another function)
const faces = [

]

function number_points(number_to_print, point){
        ctx.font = '30px Arial';
        ctx.fillStyle = 'red';
        if(numbers == true){
    ctx.fillText(number_to_print, point.x, point.y);
    }
}

// Function that draws the lines, controls some variables such as line width and colour, then make a path from p1 and p2, then fill the line
function line_renderer(p1, p2){
    ctx.lineWidth = 1 
    ctx.strokeStyle = FOREGROUND;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();

}


document.getElementById("Z_direction_button").onclick = function(){
    dz = parseFloat(document.getElementById("Z_direction_value").value);
}

document.getElementById("Y_direction_button").onclick = function(){
    dy = parseFloat(document.getElementById("Y_direction_value").value);
}

document.getElementById("X_direction_button").onclick = function(){
    dx = parseFloat(document.getElementById("X_direction_value").value);
}

document.getElementById("Z_velocity_button").onclick = function(){
    change_in_dz = parseFloat(document.getElementById("Z_velocity_value").value);
}

document.getElementById("Y_velocity_button").onclick = function(){
    change_in_dy = parseFloat(document.getElementById("Y_velocity_value").value);
}

document.getElementById("X_velocity_button").onclick = function(){
    change_in_dx = parseFloat(document.getElementById("X_velocity_value").value);
}

document.getElementById("pitch_button").onclick = function(){
    pitch = parseFloat(document.getElementById("pitch_value").value);
}

document.getElementById("roll_button").onclick = function(){
    roll = parseFloat(document.getElementById("roll_value").value);
}

document.getElementById("yaw_button").onclick = function(){
    yaw = parseFloat(document.getElementById("yaw_value").value);
}

document.getElementById("pitch_velocity_button").onclick = function(){
    change_in_pitch = parseFloat(document.getElementById("pitch_velocity_value").value);
}

document.getElementById("roll_velocity_button").onclick = function(){
    change_in_roll = parseFloat(document.getElementById("roll_velocity_value").value);
}

document.getElementById("yaw_velocity_button").onclick = function(){
    change_in_yaw = parseFloat(document.getElementById("yaw_velocity_value").value);
}

document.getElementById("Reset_positions").onclick = function(){
    dz = 0;
    dx = 0;
    dy = 0;
    change_in_dx = 0;
    change_in_dy = 0;
    change_in_dz = 0;
    document.getElementById("Z_direction_value").value = '0';
    document.getElementById("Y_direction_value").value = '0';
    document.getElementById("X_direction_value").value = '0';
    document.getElementById("Z_velocity_value").value = '0';
    document.getElementById("Y_velocity_value").value = '0';
    document.getElementById("X_velocity_value").value = '0';
}

document.getElementById("Reset_rotations").onclick = function(){
    pitch = 0;
    yaw = 0;
    roll = 0;
    change_in_pitch = 0;
    change_in_yaw = 0;
    change_in_roll = 0;
    document.getElementById("pitch_value").value = '0';
    document.getElementById("roll_value").value = '0';
    document.getElementById("yaw_value").value = '0';
    document.getElementById("pitch_velocity_value").value = '0';
    document.getElementById("yaw_velocity_value").value = '0';
    document.getElementById("roll_velocity_value").value = '0';
}

function trianglify(v1, v2, v3){
    let trianglify = [points[v1], points[v2], points[v3]];
    faces.push(trianglify);
}

// This is the frame information, we can generate animations using the values such as fps, dz and angle. Speed of animation is controlled in here.
function frame_information(){
    const dt = 1/FPS;
    
    dz += change_in_dz*dt;
    dy += change_in_dy*dt;
    dx += change_in_dx*dt;
    
    pitch += change_in_pitch*dt;
    roll += change_in_roll*dt;
    yaw += change_in_yaw*dt;
    
    clean()
    // Iterate through the list of faces, take the first and second point and join them in lines. Go through all faces.
    for (const f of faces){
        for(let i = 0; i < f.length; ++i){
            const a = f[i];
            const b = f[(i + 1)%f.length];
            line_renderer(
            screen(a.clone().rotateYZ(pitch).rotateXZ(yaw).rotateXY(roll).translateZ(dz).translateY(dy).translateX(dx).project()),
            screen(b.clone().rotateYZ(pitch).rotateXZ(yaw).rotateXY(roll).translateZ(dz).translateY(dy).translateX(dx).project()))
        }
    }
    setTimeout(frame_information, 1000/FPS)
}
initialise_triangles();
setTimeout(frame_information, 1000/FPS)
upload_handler();

function initialise_triangles(){
    trianglify(0, 1, 2);
    trianglify(0, 2, 3);
    trianglify(0, 4, 5);
    trianglify(0, 1, 5);
    trianglify(5, 4, 6);
    trianglify(6, 4, 7);
    trianglify(6, 2, 5);
    trianglify(2, 5, 1);
    trianglify(2, 6, 3);
    trianglify(3, 6, 7);
    trianglify(3, 7, 4);
    trianglify(0, 4, 3);
}

function upload_handler(){
   const file_input = document.querySelector("#objFile");

  file_input.addEventListener("change", () => {
   const file_reader = new FileReader();

   file_reader.readAsText(file_input.files[0]);

   file_reader.addEventListener('load', () => {
    const obj_data = file_reader.result;
    read_into_renderer(obj_data)
   })
  }, {once:true})

}

const list_obj_data = [

]


function read_into_renderer(obj_data){

    const lines = obj_data.split(/\r?\n/);
    list_obj_data.length = 0;
    for (line of lines){
        list_obj_data.push(line);
    }
    console.log(list_obj_data);

    // Reset current shape

    points.length = 0;
    faces.length = 0;

    for(line of lines){
        constituents = line.trim();
        if(!constituents || constituents.startsWith("#")) continue;

        // Code for the points

        if(constituents.startsWith("v ")){
            const parts = constituents.split(/\s+/);
            const x_coordinate = parseFloat(parts[1]);
            const y_coordinate = parseFloat(parts[2]);
            const z_coordinate = parseFloat(parts[3]);
            points.push(new vector(x_coordinate, y_coordinate, z_coordinate));
            continue;
        }

    // faces

    if(constituents.startsWith("f ")){
        const parts = constituents.split(/\s+/).slice(1);

        const holding_indexes = [];
        for(const indexes of parts){
            let index = indexes.split("/")[0];
        
        if(index < 0) index = points.length + index + 1;

        holding_indexes.push(index - 1);
        }

        if(holding_indexes.length < 3) return;

        for(let i = 1; i < holding_indexes.length - 1; i++){
            trianglify(holding_indexes[0], holding_indexes[i], holding_indexes[i+1]);
        }

    }
}
console.log("Loaded:", points.length, "vertices,", faces.length, "triangles");
}
