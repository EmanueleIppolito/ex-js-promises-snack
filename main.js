/* Snack 1
Ottieni il titolo di un post con una Promise.

Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise 
che recupera il titolo di un post dal link https://dummyjson.com/posts/{id}
🎯 Bonus: Ottieni l'intero post con l'autore
Crea una funzione getPost(id) che recupera l'intero post. 
Concatena una seconda chiamata che aggiunge una proprietà user 
che contiene i dati dell'autore, recuperati dalla chiamata 
https://dummyjson.com/users/{post.userId}. */


/*
🏆 Snack 2
Crea la funzione lanciaDado() che restituisce una Promise che, 
dopo 3 secondi, genera un numero casuale tra 1 e 6. 
Tuttavia, nel 20% dei casi, il dado si "incastra" e la 
Promise va in reject.
🎯 Bonus: HOF con closure per memorizzare l'ultimo lancio
Modifica la funzione in creaLanciaDado(), 
che restituisce una closure che memorizza l'ultimo risultato. 
Se il numero esce due volte di fila, stampa "Incredibile!". */


const getPostTitle = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then(res => res.json())
      .then(post => resolve(post.title))
      .catch(reject);
  });
};

const getPost = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`https://dummyjson.com/posts/${id}`)
          .then(resolve => resolve.json())
          .then(post => {
            fetch(`https://dummyjson.com/users/${post.userId}`)
              .then(resolve => resolve.json())
              .then(user => {
                post.user = [user.firstName, user.lastName];
                resolve({id: post.id,
              title: post.title,
              body: post.body,
              user: [user.firstName, user.lastName]});
              })
          })
          .catch(reject);
    })
  }

getPost(1)
  .then(post => console.log(post))
  .catch(console.error);


//Snack 2

const lanciaDado = () =>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const risultato = Math.floor(Math.random() * 6) + 1;
            if (Math.random() < 0.2) {
                reject("Il dado si è incastrato!");
            } else {
                resolve(risultato);
            }
        }, 3000);
    });
}
    

//Snack 2 Bonus

const creaLanciaDado = () => {
    let ultimoLancio = null;
    return () => {
        return lanciaDado()
        .then(risultato => {
            if (risultato === ultimoLancio) {
                console.log("Incredibile!");
            }
            ultimoLancio = risultato;
            return risultato;
        })
        .catch(error => {
            console.error(error);
        });
    }
};

const lancio = creaLanciaDado();

lancio()
  .then(n => {
    console.log("Primo:", n);
    return lancio();
  })
  .then(n => {
    console.log("Secondo:", n);
    return lancio();
  })
  .then(n => {
    console.log("Terzo:", n);
    return lancio();
  })
  .catch(err => {
    console.error("Errore:", err);
  });
