let sala = document.getElementById("sala");

//contador de butacas reservadas.
let contadorWrap = document.createElement("p");
contadorWrap.innerHTML = 'Total Reservas: <span id="contador">0</span>';
document.body.appendChild(contadorWrap);

let contador = document.getElementById("contador");

//Crear las butacas.
for(i = 1; i <=10 ; i++){//Filas.
    for(j = 1; j <=20 ; j++){//Columnas.
        let butaca = document.createElement("div");
        butaca.classList.add("butaca","verde");
        butaca.id = "butaca-"+i+"-"+j;
        sala.appendChild(butaca);

    }
}

//Seleccionar todas las butacas.
let butacas = this.document.getElementsByClassName("butaca");

//Agregar evento a todas las butacas.
    for(let i = 0; i < butacas.length; i++){   
        butacas[i].addEventListener("click", function(){

        if(this.classList.contains("verde")){
            this.classList.remove("verde");
            this.classList.add("rojo");
        }
        else if(this.classList.contains("rojo")){
            this.classList.remove("rojo");
            this.classList.add("verde");
        }
        //Actualizar contador.
        contador.textContent = document.querySelectorAll(".butaca.rojo").length;
    })
}

let guardarBtn = document.createElement("button");
guardarBtn.textContent = "GUARDAR";
document.body.appendChild(guardarBtn);

guardarBtn.addEventListener("click", function(){
    let butacasReservadas = [];
    for(let i = 0; i < butacas.length ; i++){
        if(butacas[i].classList.contains("rojo")){
            butacasReservadas.push(butacas[i].id);
            console.log(butacasReservadas);
        }
    }

    //Guardar en localstorage.
    localStorage.setItem("butacasReservadas", JSON.stringify(butacasReservadas));

    //Cambiar visualmente las butaacas ocupdas.
    butacasReservadas.forEach(id => {
        let butaca = document.getElementById(id);
        butaca.classList.remove("rojo");
        butaca.classList.add("gris");
    });
    contador.textContent = document.querySelectorAll(".butaca.rojo").length;
})

let limpiarBtn = document.createElement("button");
limpiarBtn.textContent = "LIMPIAR";
document.body.appendChild(limpiarBtn);
limpiarBtn.addEventListener("click", function(){
    //Limpiar localstorage.
    localStorage.removeItem("butacasReservadas");

    //Cambiar visualmente las butacas ocupdas.
    for(let i = 0 ; i < butacas.length ; i++){
        if(butacas[i].classList.contains("gris")){
            butacas[i].classList.remove("gris");
            butacas[i].classList.add("verde");
            
        }
    }
    //Actualizar contador.
    contador.textContent = document.querySelectorAll(".butaca.rojo").length;
})

//Cargar las butacas reservadas al corgar la pagina.
function cargarReservas(){
    let reservasGuardadas = JSON.parse(localStorage.getItem("butacasReservadas")) || [];
    reservasGuardadas.forEach(id => {
        let butaca = document.getElementById(id);
        if(butaca){
            butaca.classList.remove("verde");
            butaca.classList.add("gris");
        }
    });
    contador.textContent = document.querySelectorAll(".butaca.rojo").length;
}

cargarReservas();
