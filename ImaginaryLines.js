class lines {
    constructor(x, y, height, width) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.left = x - width/2 + 75;
        this.right = x + width/2 - 25;
        this.top = y - height/2 + 75;
        this.bottom = y + width/2 - 25;

        

        const topLeft={x:this.left,y:this.top};
        const topRight={x:this.right,y:this.top};
        const bottomLeft={x:this.left,y:this.bottom};
        const bottomRight={x:this.right,y:this.bottom};

        this.borders = [
            [topLeft,bottomLeft],
            [topRight,bottomRight],
            [topLeft,topRight],
            [bottomLeft, bottomRight]
        ];

        this.tab = [];
        for(let i=0; i<=6; i++) {
            this.tab[i] = [];
            for(let j=0; j<=6; j++) {
                let p;
                if ((i== 0 || i== 6 ) && (j>= 2 && j<= 4)) {
                    p = new points(this.left, this.right, this.top, this.bottom, i, j, true);
                } else if ((i== 1 || i== 5) && (j>= 1 && j<= 5)) {
                    p = new points(this.left, this.right, this.top, this.bottom, i, j, true);
                } else if (i== 2 || i==3 || i==4){
                    p = new points(this.left, this.right, this.top, this.bottom, i, j, true);
                } else {
                    p = new points(this.left, this.right, this.top, this.bottom, i, j);
                }
                this.tab[i][j] = p;
                //console.log(i+": "+this.tab[i][j].x + ", "+j+":"+ this.tab[i][j].y);
            }
        } 
    }

    draw(contexte) {

        // le boribory ngeza be Violet ¤¤¤

        contexte.beginPath();
        contexte.lineWidth = '8';
        contexte.strokeStyle = '#4f3268';
        contexte.arc(250 , 250 , 225 , 0 , 2*Math.PI);
        contexte.stroke();

        contexte.beginPath();
        contexte.lineWidth = '5';
        contexte.strokeStyle = '#4f3268';
        contexte.arc(250 , 250 , 235 , 0 , 2*Math.PI);
        contexte.stroke();

        // Lignes verticales <3

        let i = 6;
        for(let j= 0 ; j<= 6 ; j++) {
            contexte.beginPath();
            contexte.lineWidth = 1;
            contexte.strokeStyle = "transparent"
            contexte.moveTo(this.tab[0][j].x , this.tab[0][j].y);
            contexte.lineTo(this.tab[i][j].x , this.tab[i][j].y);
            contexte.stroke();
        }
        
        // Lignes horizontales <3

        for(let j= 0 ; j<= 6 ; j++) {
            contexte.beginPath();
            contexte.lineWidth = 1;
            contexte.strokeStyle = "transparent"
            contexte.moveTo(this.tab[j][0].x , this.tab[j][0].y);
            contexte.lineTo(this.tab[j][i].x , this.tab[j][i].y);
            contexte.stroke();
        }  

        // Places utiles (ze miasa rehetra) <3 <3

        for (let i= 0 ; i<= 6 ; i++) {
            for (let j= 0 ; j<= 6 ; j++) {
                if (this.tab[i][j].utile) {
                    contexte.fillStyle = "RGBa(100, 80, 100, 0.2";
                    contexte.beginPath();
                    contexte.arc((this.tab[i][j].x) , (this.tab[i][j].y) , 10 , 0 , 2*Math.PI);
                    contexte.fill();
                }
            }
        }
  
        contexte.closePath();
    }
}