//? writenumber 
function writenumber(numero) {
    const textarea = document.getElementById("display_textarea");
    textarea.value += numero;
}

//? writeoperation
function writeoperation(operacion) {
    const textarea = document.getElementById("display_textarea");
    textarea.value += operacion;
}

//? cleardisplay
function cleardisplay() {
    const textarea = document.getElementById("display_textarea");
    textarea.value = "";
}

//? equals
function equals() {
    const textarea = document.getElementById("display_textarea");
    const display = textarea.value;
    textarea.value = "";
    const answer = eval(display);
    writenumber(answer);
    /*try {
        const resultado = eval(display);
        
        // Verificar si el resultado es infinito o NaN
        if ( isNaN(answer)) {
            cleardisplay();
            writenumber("Error");
        } else {
            cleardisplay();
            writenumber(answer);
        }
    } catch (error) {
        cleardisplay();
        writenumber("Error");
        }*/
}

