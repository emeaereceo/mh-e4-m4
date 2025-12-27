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

// * PARTE 1 (Callback HELL)
obtenerUsuario(1, (errorUsuario, usuario) => {
  if (errorUsuario) {
    console.error(errorUsuario);
    return;
  }
  console.log("Usuario Obtenido : ", usuario);

  obtenerPosts(usuario.id, (errorPosts, posts) => {
    if (errorPosts) {
      console.error(errorPosts);
      return;
    }
    console.log("Posts obtenidos:", posts);

    obtenerComentarios(posts[0].id, (errorComentarios, comentarios) => {
      if (errorComentarios) {
        console.error(errorComentarios);
        return;
      }
      console.log("Comentarios obtenidos : ", comentarios);
    });
  });
});

// * PARTE 2 (PROMESAS)
// Primero Creamos las promesas que necesitamos para consultar los datos
const obtenerUsuarioPromesa = (id) => {
  return new Promise((resolve, reject) => {
    const demora = Math.random() * 1000 + 500;

    setTimeout(() => {
      if (!id) {
        reject("Error: ID de usuario no proporcionado");
        return;
      }

      console.log("Buscando usuario con ID : ${id}...");
      const usuario = { id, nombre: "John Doe", email: "john.doe@example.com" };
      resolve(usuario);
    }, demora);
  });
};

const obtenerPostsPromesa = (userId) => {
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

const obtenerComentariosPromesa = (postId) => {
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

// Segundo escuchamos estas promesas, y dependiendo de la respuesta, vamos ejecutando las funciones dependientes
obtenerUsuarioPromesa(1)
  .then((usuario) => {
    console.log("Usuario obtenido desde promesas:", usuario);
    return obtenerPostsPromesa(usuario.id);
  })
  .then((posts) => {
    console.log("Posts obtenidos desde promesas:", posts);
    return obtenerComentariosPromesa(posts[0].id);
  })
  .then((comentarios) => {
    console.log("Comentarios obtenidos desde promesas:", comentarios);
  })
  .catch((error) => {
    console.error("Ocurrió un error:", error);
  });

// * PARTE 3 (ASYNC - AWAIT)
// para este ejercicio se reutilizan las promesas creadas en el ejercicio parte 2, pero para ejecutarlas se utiliza async await
async function mostrarPerfilDeUsuario() {
  try {
    const usuario = await obtenerUsuarioPromesa(1);
    console.log("Usuario obtenido desde async/await:", usuario);

    const posts = await obtenerPostsPromesa(usuario.id);
    console.log("Posts obtenidos desde async/await:", posts);

    const comentarios = await obtenerComentariosPromesa(posts[0].id);
    console.log("Comentarios obtenidos desde async/await:", comentarios);
  } catch (error) {
    console.error("Ocurrió un error:", error);
  }
}

mostrarPerfilDeUsuario();
