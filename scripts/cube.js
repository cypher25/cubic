/**
 * Represents the Cube.
 * 
 * @constructor Cube
 * @param {number} size - Size of the Cube. 
 * @param {number} strokeWt - Stroke Weight of the Cube. 
 * @param {Array} col - Fill Color of the Cube.
 * @param {Array} strokeCol - Stroke Color of the Cube.
 */
function Cube(size, strokeWt, col, strokeCol) {
    this.size = size;
    this.strokeWt = strokeWt;
    this.col = col;
    this.strokeCol = strokeCol;

    // Shrinks the size of the cube.
    this.shrink = function (sr) {
        if (this.size > 0) {
            this.size -= sr;
        } else {
            if (window.innerWidth > 700) {
                this.size = window.innerWidth / 4;
            } else {
                this.size = window.innerWidth / 1.8;
            }
        }
        return this.size;
    }

    // Renders and controls the movements of the Cube.
    this.displayWRotate = function (velx, vely, sr) {
        push();
        strokeWeight(this.strokeWt);
        fill(this.col);
        stroke(this.strokeCol);
        rotateX(vely);
        rotateY(velx);
        box(this.shrink(sr));
        pop();
    }
}