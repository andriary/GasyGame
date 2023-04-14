function lerp(A,B,t){
    return (A+(B-A)*t);
} 

class points {
    constructor(left, right, top, bottom, i, j , utile= false) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
        this.i = i;
        this.j = j;
        this.utile = utile;

        this.x = lerp(this.left, this.right, this.j/6);
        this.y = lerp(this.top, this.bottom, this.i/6);
    }
    
}