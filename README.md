# JS-3d-Renderer
A 3D engine / renderer entirely in JS using HTML canvas.

## Overview

A simple program that projects coordinates on a 2D screen into 3D geometry.

## Technicals

### Code rationale
Currently, the program works by reading some points, and then indexes of 2 points to join together via a line.
The vectors file contains a vector class, of which common vector operations and functions related to the projection and creation of lines is included, this vector class is implemented such that lines are able to be altered using method chaining. 

When points are made, the trianglify function should be made on the index of the points to join them into a triangle(strictly 3 points are to be inputted to form a triangle). 

### Usage

Simply install the project, which includes 1 html file, 3 js files (One of which is yet to be used) and a css file. Simply run the HTML file in localhost to view the render.

To edit the render, create a collection of vectors at wanted verticies in 3D space using
``` new Vector(*x coordinate*, *y coordinate*, *z coordinate*)```
inside the list called *points*. Then, to join points form a triangle by inputting the index of 3 points in the trianglify function. This will create lists in the array *faces* containing the indexes to be joined by a line. The program will iterate and join vertices per list in the array at the *ith* and *i+1th* index.

To alter translations and rotations to the object in 3D space, simply edit the textboxes provided in the HTML document. Complete pitch, yaw and roll rotations are supported, alongside support for xyz coordinates. Do note that the object uses z projection and therefore has weird clipping issues for -1 < z < 1. This problem will be fixed when rasterisation is implemented and I bother putting a clipping algorithm in. 

To run existing models, simply import an obj file. Only objs are currently supported. I havent bug tested any other filetype, but I doubt the program will even try to read them.

## To Do

- [ ] Implement homogeneous coordinates 
- [x] Create a function to break shapes of vertices > 3 into triangles
- [ ] Implement triangle rasterisation
- [x] Create some way to import models from common model files
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
