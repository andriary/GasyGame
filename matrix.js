
function distanceEntreCoordonnees(Mx, My, shX, shY) {
    return (Math.sqrt((Mx - shX) ** 2 + (My - shY) ** 2));
}

function supressionBoule(index , shape){
    shapes.splice(index,1)
}