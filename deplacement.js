function minimum(Mx, My) {
    let distance;
    let ptX;
    let ptY;
    for (let i = 0; i <= 6; i++) {
        for (let j = 0; j <= 6; j++) {
            ptX = line.tab[i][j].x;
            ptY = line.tab[i][j].y;
            distance = distanceEntreCoordonnees(Mx, My, ptX, ptY);
            if(distance <= 20) {
                let p = new position (i , j )
               // posi = i;
                //posj = j;
                return p
            }
        }
        
    }
}

function decolorage() {
    for(let shape of shapes){
        shape.color = shape.colorOriginal;
    }
}

function verifyCercle(mouseX, mouseY) {
    let distance = 0;
    for(let shape of shapes){
        distance = distanceEntreCoordonnees(mouseX, mouseY, shape.x, shape.y);
        if(distance <= 18) {
            return true
        }
    }
   return false 
}

function recuperationId_apres_click(mouseX, mouseY){
    let id ;
    let p
    let distance = 0;
    for(let shape of shapes){
        distance = distanceEntreCoordonnees(mouseX, mouseY, shape.x, shape.y);
        if(distance <= 18) {
          p = new boules(shape.id, shape.i, shape.j,shape.color)
          return p
           // pieceselectione = shape.id;
           // console.log(pieceselectione)
        }
    }
    
}

function supressionPremiereBoule(id) {
        for(let shape of shapes) {
            if (id == shape.id) {
                supressionBoule(shapes.indexOf(shape) , 1);
                nbrPieces--;
            }
        }
}

function getPosition (id) {
   // console.log(id)
    let p;
    for (let shape of shapes) {
        if (id == shape.id) {
            p = new position(shape.i , shape.j);
        }
    }
   // console.log(p)
    return p;
}



function update_place_libre(){
for(let ligne of line.tab){
    for(let coord of ligne){
        let coordonneeTrouvee = false;
        for(let shape of shapes){
            if(shape.i === coord.i && shape.j === coord.j){
                coordonneeTrouvee = true;
                break;
            }
        }
        if(!coordonneeTrouvee && coord.utile){
            place_libres.push(coord);
        }
    }
}
//console.log(line.tab)
}

// function moveCercle(id , mouseX , mouseY) {
//     minimum(mouseX , mouseY);

//     let occupe = false;
//     for(let shape of shapes) {
//         if(posi!=null && posj!=null) {
//             if(shape.x == line.tab[posi][posj].x && shape.y == line.tab[posi][posj].y && line.tab[posi][posj].utile) {
//                 occupe = true;
//                 break;
//             }
//         }
//     }

//     if (!occupe) {
//         let ps = getPosition(id);
//         console.log(ps)
//         let difi = posi - ps.i;
//         let difj = posj - ps.j;
//         let di = 1;
//         let autour = false;
//         let autour2 = false;
        
//         if (difi == 0){
//             if (difj == 2 || difj == -2) {
//                 autour = true;
//                 autour2 = true;
//                 if (difj == -2) {
//                     di = -1;
//                 }
//             }
//         }
//         if (difj == 0) {
//             if (difi == 2 || difi == -2){
//                 autour = true;
//                 if (difi == -2) {
//                     di = -1;
//                 }
//             }
//         }

//         if (autour) {
//             let proximite = false;
//             for (let shape of shapes) {
//                 if (autour2) {
//                     if (shape.i == ps.i && shape.j == ps.j + di) 
//                         proximite = true;
//                 }
//                 else {
//                     if (shape.i == ps.i + di && shape.j == ps.j) 
//                         proximite = true;
//                 }
//             }
//             if (proximite) {
//                 for (let shape of shapes) {
//                     if (shape.id == id) {
//                         shape.x = line.tab[posi][posj].x;
//                         shape.y = line.tab[posi][posj].y;
//                         shape.i = posi;
//                         shape.j = posj;
//                     }
//                 }
//             }
//         }
//     }
//     else{
//         console.log("occupé eeee");
//     }
// }

