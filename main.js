var Canvas = document.getElementById("myCanvas");
var contexte = Canvas.getContext("2d");

var height = Canvas.height;
var width = Canvas.width;
var gameHeight = 450;
var gameWidth = 450;

let place_libres =[]

// Lignes <3 <3 <3

const line = new lines(gameWidth/2, gameHeight/2, gameHeight, gameWidth);
line.draw(contexte);

// Création boules <3 <3 <3

let cpt = 0;
let shapes = []
for(let i= 0 ; i<= 6 ; i++) {
    for (let j= 0 ; j<= 6 ; j++ ) {
        if (line.tab[i][j].utile) {
            cpt++;
            shapes.push(new boules(cpt , i , j , "#e3a9c1"));
           // console.log("Boule numéro " +cpt+ " en place");
        }
    }
}

let drawShapes = function(){
    if(shapes.length > 0) {
        for(let shape of shapes){
            contexte.beginPath();
            contexte.arc(shape.x, shape.y, shape.circleRadius, 0, 2*Math.PI);
            contexte.fillStyle = shape.color;
            contexte.fill();
            contexte.lineWidth = 4;
            contexte.strokeStyle = "#c2956e";
            contexte.stroke();
        }
    }
}
//drawShapes();

function verifiOccupe(posi, posj) {
    if(shapes.length > 0){
        for(let shape of shapes) {
            if(shape.i == posi && shape.j == posj) {
                return true;
            }
        }
    }
    return false;
}

let pieceselectione;
let clicked = false;
let posi;
let posj;
let nbrPieces = 37; //aza adino manisy boucle mampihena anty any am deplacement avy eo (nbrPieces minimum = 2)

let deplacement_possible = []

function canvasClick(event) {
    let plateauGame = Canvas.getBoundingClientRect();
    let mouseX = event.clientX - plateauGame.left;
    let mouseY = event.clientY - plateauGame.top;

    //pieceselectione = '';

    if(place_libres!=undefined){
       // console.log("*")
        place_libres.splice(0,place_libres.length)
    }
    
    if (nbrPieces == 37) {
        // Elimination de la première boule <3 
            if(verifyCercle(mouseX , mouseY)){
                pieceselectione = recuperationId_apres_click(mouseX , mouseY)
            };
            supressionPremiereBoule(pieceselectione.id);
            pieceselectione = undefined

    }
    else {
       // console.log("Première boule supprimée");
        if(verifyCercle(mouseX , mouseY)){ 
            
            update_place_libre()
         // console.log(verifi_deplacement(mouseX , mouseY))

           if((verifi_deplacement(mouseX , mouseY))){
            pieceselectione = recuperationId_apres_click(mouseX , mouseY)
            //console.log(pieceselectione.id)
            decolorage()
            colorage(pieceselectione.id)
        }      
        }
        else{
            if(pieceselectione != undefined && minimum(mouseX, mouseY) != undefined && line.tab[minimum(mouseX, mouseY).i][minimum(mouseX, mouseY).j].utile){
                let i;
                let j;
                let mouv
                let point_deplac = minimum(mouseX, mouseY)
                mouv = mouve_shape(point_deplac)
                
                i = (mouv.i + point_deplac.i)/2
                j = (mouv.j + point_deplac.j)/2
                suppresion_piece(i,j)
                update_place_libre()
                console.log(point_deplac)
                if( !verifi_deplacement(line.tab[point_deplac.i][point_deplac.j].x , line.tab[point_deplac.i][point_deplac.j].y)){

                pieceselectione = undefined
                console.log(pieceselectione)
                }

               if(!verifi_si_bouge()){
                alert("OUPSSS ! VOUS AVEZ PERDU !\n IL N`Y A PLUS DE MOUVEMENT POSSIBLE")
               }
            if(shapes.length<=2){
                alert("YOUPII ! VOUS AVEZ GAGNE !\n FELICITATIONSSS")
            }
            }
        }
        
    }

}



function suppresion_piece(i,j){
    let index
    console.log("i: "+i+" j: "+j)
    for(let shape of shapes){
        if(shape.i == i && shape.j ==j){
            //console.log(shapes.indexOf(shape))
            index =shapes.indexOf(shape)
            console.log(index)
            shapes.splice(index,1)
        }}
}


function verifi_si_bouge(){
    let cpt_mouv_possible =0
    update_place_libre()
    for(let shape of shapes){
        if(verifi_deplacement(line.tab[shape.i][shape.j].x , line.tab[shape.i][shape.j].y)){
            cpt_mouv_possible++
        }
    }
    return cpt_mouv_possible
}



function mouve_shape(point_deplac){
    for(let shape of shapes){
        if(shape.id == pieceselectione.id){
            let p = new position( shape.i , shape.j )
            shape.i = point_deplac.i
            shape.j = point_deplac.j
            shape.x = line.tab[shape.i][shape.j].x
            shape.y = line.tab[shape.i][shape.j].y
            return p
        }
    }

}



function colorage(){
    for(let shape of shapes){
        if(shape.id ==pieceselectione.id ){
            shape.color="#9d78be"
        }
   }
}



function verifi_deplacement(mouseX , mouseY){
    let tmp_piece
    let i ;
    let j ;
    if(place_libres.length!=0){
        tmp_piece = recuperationId_apres_click(mouseX , mouseY)
        for( DIRECTION2 of DIRECTIONS2 ){
    
         i =tmp_piece.i + DIRECTION2.x
         j =tmp_piece.j + DIRECTION2.y
        
        for(place_libre of place_libres){
            if(i<=6 && j<=6){
            if(place_libre.i == i && place_libre.j == j && verifi_deplacement2(DIRECTIONS2.indexOf(DIRECTION2) ,tmp_piece )){ //ra misy piece de return () true
                return true
            }}
        }}
    }
return false
}
function verifi_deplacement2(index , tmp_piece){
    let k 
    let l
    for( let place_libre of place_libres){
       k = tmp_piece.i + DIRECTIONS1[index].x
       l = tmp_piece.j + DIRECTIONS1[index].y

       if(k==place_libre.i &&  l==place_libre.j ){//return false ra misy piece true si non
        return false
       }
    }
    return true
}

Canvas.addEventListener("click", canvasClick);

function animate() {
    contexte.clearRect(0, 0, Canvas.width, Canvas.height);
    line.draw(contexte);
    drawShapes();
    requestAnimationFrame(animate);
}
animate();