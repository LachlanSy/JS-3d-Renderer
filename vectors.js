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

     // Function that moves the vector by factor dz
     translateZ(dz){
        this.z += dz;
        return this;
    }

     translateX(dx){
        this.x += dx;
        return this;
    }

     translateY(dy){
        this.y += dy;
        return this;
    }

    // Function that rotates the object according to the rotation matrix
    rotateXZ(angle){
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const x = this.x * cos - this.z * sin;
        const z = this.x * sin + this.z * cos;

        this.x = x;
        this.z = z;

        return this;
    }

    rotateYZ(angle){
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const y = this.y * cos - this.z * sin;
        const z = this.y * sin + this.z * cos;

        this.y = y;
        this.z = z;

        return this;
    }
        
    rotateXY(angle){
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const x = this.x * cos - this.y * sin;
        const y = this.x * sin + this.y * cos;

        this.x = x;
        this.y = y;

        return this;
    }

    

    // Function that projects using z-projection
    project(){
        return {
            x: this.x / this.z,
            y: this.y / this.z
        };
    }


    // Returns a clone of the same vector to preserve geometry over transformations
    clone() {
        return new vector(this.x, this.y, this.z);
    }
}


