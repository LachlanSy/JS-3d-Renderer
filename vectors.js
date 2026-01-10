class vector{
    // Constructor, sets default values as the 0 vector
    constructor(x = 0, y = 0, z = 0){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    // Method for adding vectors
    add(adding_vector){
            this.x += adding_vector.x;
            this.y += adding_vector.y;
            this.z += adding_vector.z;
            return this; 
    }

    // Method for subtracting vectors
    subtract(subtracting_vector){
            this.x -= subtracting_vector.x;
            this.y -= subtracting_vector.y;
            this.z -= subtracting_vector.z;
            return this;
    }

    // Method to return the dotproduct of 2 vectors
    dotproduct(vector){
        return(this.x * vector.x + this.y*vector.y + this.z*vector.z)
    }

    // Method for the crossproduct
    cross(vector) {
        const x = this.y * vector.z - this.z * vector.y;
        const y = this.z * vector.x - this.x * vector.z;
        const z = this.x * vector.y - this.y * vector.x;

        this.x = x;
        this.y = y;
        this.z = z;

        return this; 
    }

    // Method for the length of the vector object
    length_of(){
        return(Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z)))
     }

     // Returns the unit vector of the existing vector object
     unitvectorify(){
        const len = this.length_of();
        if(len != 0){
        this.x /= len;
        this.y /= len;
        this.z /= len;
        return this;
        }
     }

     translateZ(dz){
        this.z += dz;
        return this;
    }

    rotateXZ(angle){
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const x = this.x * cos - this.z * sin;
        const z = this.x * sin + this.z * cos;

        this.x = x;
        this.z = z;

        return this;
    }

    project(){
        return {
            x: this.x / this.z,
            y: this.y / this.z
        };
    }

    clone() {
        return new vector(this.x, this.y, this.z);
    }
}


// To do:
// Move common vector related mathematics to vector class

// The methods are instance methods such that object methods are able to
// to be chained together, previously they were static methods but 
// that didn't let me chain methods.

