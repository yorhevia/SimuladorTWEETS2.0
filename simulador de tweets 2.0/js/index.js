const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets =[];

//eventos
addEventListener();
function addEventListener(){
  formulario.addEventListener('submit' ,agregarTweet);
  listaTweets.addEventListener('click', borrarTweet);
  //cargar contenido de los tweets
    document.addEventListener('DOMContentLoaded', ()=>{
    tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    console.log(tweets)
    crearHTML();
  } )
}



function agregarTweet(e){
    // creando los tweet
   // console.log('ingrese la funcion');
    e.preventDefault();
    const tweet = document.querySelector('#tweet').value;
    let numeroC = tweet.length;
    //validar si el campo tweet esta vacio

    if(tweet  === ''){
      //console.log('esta vacio')
      mostrarError('el tweet no puede estar vacio')
      return
    }else if (numeroC>250){
      mostrarError("se ha pasado la cantidad de caracteres")
    }else{
      //console.log('campo lleno')
      //estructura para gurdar un objeto
      const tweetObj = {
        id:Date.now(),
        tweet:tweet
      }
    
     tweets = [...tweets,tweetObj]
      console.log(tweets)
      crearHTML();

      formulario.reset();
    } 


    
    
}

function mostrarError (mensaje){
const mensajeError = document.createElement('p');
mensajeError.textContent = mensaje;
mensajeError.classList.add('error');
//insertar el mensaje de error
const contenido = document.querySelector('#contenido');
contenido.appendChild(mensajeError);

//eliminar la alerta
setTimeout(()=>{
  mensajeError.remove()
},3000)
}


function crearHTML(){
 console.log('ingrese a la funcion html')
  //mostrar todo la informacion en el arrglo de tweets
  limpiarHTML ();
  if(tweets.length > 0){
    // si al menos ahi un tweet guardado en el arreglo 
    // crear y mostrar ese html en el interfaz
     
    tweets.forEach(tweets => {
      const li = document.createElement('li');
      const btnEliminar = document.createElement('a');
      btnEliminar.classList.add('borrar-tweet');
       btnEliminar.innerText = 'x';

       btnEliminar.onclick = () =>{
        borrarTweet(tweets.id);
       }

      //console.log(tweets.tweet);

      // añade el texto
      li.innerText = tweets.tweet; 
      //añade el bototn de borrar tweet
      li.appendChild(btnEliminar);
      // añade el tweet ala lista 
      listaTweets.appendChild(li)

    });
  }
  sincronizarStorage();
}

function limpiarHTML(){
  while(listaTweets.firstChild){
    listaTweets.removeChild(listaTweets.firstChild);
  }
}


function borrarTweet(id){
  //console.log('ingrse a la funciom borrar tweet', id)

  tweets = tweets.filter(tweets => tweets.id !==id);
  //console.log(tweets)
  crearHTML();
}

// agregar los tweets al localStotage
function sincronizarStorage(){
  localStorage.setItem('tweets',JSON.stringify(tweets));
}