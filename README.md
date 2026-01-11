# JS-3d-Renderer
A 3D engine / renderer entirely in JS using HTML canvas.

## Overview

A simple program that projects coordinates on a 2D screen into 3D geometry.

## Technicals

### Code rationale
Currently, the program works by reading some points, and then indexes of 2 points to join together via a line.
The vectors file contains a vector class, of which common vector operations and functions related to the projection and creation of lines is included, this vector class is implemented such that lines are able to be altered using method chaining. 

### Usage

Simply install the project, which includes 1 html file and 2 js files. Simply run the HTML file in localhost to view the render.

To edit the render, create a collection of vectors at wanted verticies in 3D space using
``` new Vector(*x coordinate*, *y coordinate*, *z coordinate*)```
inside the list called *points*. Then, to join points create a list in the array *faces* containing the indexes to be joined by a line. The program will iterate and join vertices per list in the array at the *ith* and *i+1th* index.

To alter translations and rotations to the object in 3D space, edit the line_renderer call inside the frame_information function inside index.js to include only desired translations. Currently, the vector class only includes a rotation in XZ and a translation in z. There are included values that animate rotations and translations in the frame_information function called *dz* and *angle*. These values can be edited to change the speed of the desired effect on the renderer (the object will animate at the speed passed through the vector method called to it). More translations and rotations are to be implemented in future, but isnt prioritised.

## To Do

- [ ] Create a function to break shapes of vertices > 3 into triangles
- [ ] Implement triangle rasterisation
- [ ] Create some way to import models from common model files
- [ ] Create a shader algorithm
- [ ] Implement OOP methods to create common shapes

## Contact

Email: 
- @lachlansykes2006@gmail.com

Discord:
- lachlansy

Instagram:
- lachlan_sykes

Project Link: https://github.com/LachlanSy/JS-3d-Renderer
