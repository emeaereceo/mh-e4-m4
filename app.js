function getUserId() {
  return document.getElementById("userIdInput").value;
}

function log(msg) {
  document.getElementById("output").textContent += msg + "\n";
}

function limpiar() {
  document.getElementById("output").textContent = "";
}

function iniciarCarga() {
  const bar = document.getElementById("progressBar");
  bar.style.width = "100%";
  bar.textContent = "Procesando...";
}

function finalizarCarga() {
  const bar = document.getElementById("progressBar");
  bar.style.width = "0%";
  bar.textContent = "Esperando...";
}

function mostrarError(err) {
  log("ERROR: " + err);
  finalizarCarga();
}

function setTituloResultado(texto) {
  document.getElementById("title-result").textContent = texto;
}

/*
  Simulación de Funciones de API
  Estas funciones simulan llamadas a una red. No las modifiques.
*/

// API para obtener datos de un usuario
const obtenerUsuario = (id, callback) => {
  // Simula una demora aleatoria entre 0.5 y 1.5 segundos
  const demora = Math.random() * 1000 + 500;
  setTimeout(() => {
    // Simula un posible error
    if (!id) {
      callback("Error: ID de usuario no proporcionado.", null);
      return;
    }
    console.log(`Buscando usuario con ID: ${id}...`);
    const usuario = {
      id: id,
      nombre: "John Doe",
      email: "john.doe@example.com",
    };
    callback(null, usuario);
  }, demora);
};

// API para obtener los posts de un usuario
const obtenerPosts = (userId, callback) => {
  const demora = Math.random() * 1000 + 500;
  setTimeout(() => {
    if (!userId) {
      callback(
        "Error: ID de usuario no proporcionado para buscar posts.",
        null
      );
      return;
    }
    console.log(`Buscando posts del usuario con ID: ${userId}...`);
    const posts = [
      { id: 101, titulo: "Mi primer post", contenido: "..." },
      { id: 102, titulo: "Mi segundo post", contenido: "..." },
    ];
    callback(null, posts);
  }, demora);
};

// API para obtener los comentarios de un post
const obtenerComentarios = (postId, callback) => {
  const demora = Math.random() * 1000 + 500;
  setTimeout(() => {
    if (!postId) {
      callback(
        "Error: ID de post no proporcionado para buscar comentarios.",
        null
      );
      return;
    }
    console.log(`Buscando comentarios del post con ID: ${postId}...`);
    const comentarios = [
      { id: 1, texto: "¡Excelente post!" },
      { id: 2, texto: "Muy informativo, gracias." },
    ];
    callback(null, comentarios);
  }, demora);
};

// * Ejecucion PARTE 1 (Callback hell 😈)

function ejecutarCallbacks() {
  limpiar();
  setTituloResultado("Resultado — Callbacks");
  iniciarCarga();
  const id = getUserId();

  obtenerUsuario(id, (err, user) => {
    if (err) return mostrarError(err);

    log("Usuario: " + user.nombre);

    obtenerPosts(user.id, (err, posts) => {
      if (err) return mostrarError(err);

      log("Posts cargados");

      obtenerComentarios(posts[0].id, (err, comentarios) => {
        if (err) return mostrarError(err);

        log("Comentarios: " + comentarios.length);
        finalizarCarga();
      });
    });
  });
}

// * Ejecucion PARTE 2 (Promesas)
const getUserPromise = (id) => {
  return new Promise((resolve, reject) => {
    const demora = Math.random() * 1000 + 500;

    setTimeout(() => {
      if (!id) {
        reject("Error: ID de usuario no proporcionado.");
        return;
      }

      console.log(`Buscando usuario con ID: ${id}...`);
      const usuario = { id, nombre: "John Doe", email: "john.doe@example.com" };
      resolve(usuario);
    }, demora);
  });
};

const getPostsPromise = (userId) => {
  return new Promise((resolve, reject) => {
    const demora = Math.random() * 1000 + 500;

    setTimeout(() => {
      if (!userId) {
        reject("Error: ID de usuario no proporcionado para buscar posts.");
        return;
      }

      console.log(`Buscando posts del usuario con ID: ${userId}...`);
      const posts = [
        { id: 101, titulo: "Mi primer post", contenido: "..." },
        { id: 102, titulo: "Mi segundo post", contenido: "..." },
      ];

      resolve(posts);
    }, demora);
  });
};

const getCommentsPromise = (postId) => {
  return new Promise((resolve, reject) => {
    const demora = Math.random() * 1000 + 500;

    setTimeout(() => {
      if (!postId) {
        reject("Error: ID de post no proporcionado para buscar comentarios.");
        return;
      }

      console.log(`Buscando comentarios del post con ID: ${postId}...`);
      const comentarios = [
        { id: 1, texto: "¡Excelente post!" },
        { id: 2, texto: "Muy informativo, gracias." },
      ];

      resolve(comentarios);
    }, demora);
  });
};

function ejecutarPromesas() {
  limpiar();
  setTituloResultado("Resultado — Promesas");
  iniciarCarga();
  const id = getUserId();

  getUserPromise(id)
    .then((user) => {
      log("Usuario: " + user.nombre);
      return getPostsPromise(user.id);
    })
    .then((posts) => {
      log("Posts cargados");
      return getCommentsPromise(posts[0].id);
    })
    .then((comentarios) => {
      log("Comentarios: " + comentarios.length);
      finalizarCarga();
    })
    .catch((err) => mostrarError(err));
}

// * Ejecucion Parte 3 (async await)

async function ejecutarAsync() {
  limpiar();
  setTituloResultado("Resultado — Async / Await");
  iniciarCarga();
  const id = getUserId();

  try {
    const user = await getUserPromise(id);
    log("Usuario: " + user.nombre);

    const posts = await getPostsPromise(user.id);
    log("Posts cargados");

    const comentarios = await getCommentsPromise(posts[0].id);
    log("Comentarios: " + comentarios.length);

    finalizarCarga();
  } catch (err) {
    mostrarError(err);
  }
}
