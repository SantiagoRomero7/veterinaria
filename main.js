let dueños = [];
let mascotas = [];

let idDueño = 1;
let idMascota = 1;

function registrarDueño() {
    const nombre = prompt("Nombre del dueño:");
    const cedula = prompt("Cédula:");
    const telefono = prompt("Teléfono:");
    const correo = prompt("Correo:");
  
    if (!nombre || !cedula || !telefono || !correo) {
      alert("Todos los campos son obligatorios.");
      return;
    }
  
    dueños.push({
      id: idDueño++,
      nombre,
      cedula,
      telefono,
      correo
    });
  
    alert("Dueño registrado con éxito.");
  }

  
  function registrarMascota() {
    const cedulaDueño = prompt("Ingrese la cédula del dueño:");
    const dueño = dueños.find(d => d.cedula === cedulaDueño);
    if (!dueño) {
      alert("Dueño no encontrado.");
      return;
    }
  
    const nombre = prompt("Nombre de la mascota:");
    const especie = prompt("Especie (Perro, Gato, Ave, Reptil, Otro):");
    const edad = parseFloat(prompt("Edad (años):"));
    const peso = parseFloat(prompt("Peso (kg):"));
    const estado = prompt("Estado de salud (Sano, Enfermo, En tratamiento):");
  
    if (!nombre || !especie || isNaN(edad) || edad <= 0 || isNaN(peso) || peso <= 0 || !["Sano", "Enfermo", "En tratamiento"].includes(estado)) {
      alert("Datos inválidos.");
      return;
    }
  
    mascotas.push({
      id: idMascota++,
      nombre,
      especie,
      edad,
      peso,
      estado,
      idDueño: dueño.id
    });
  
    alert("Mascota registrada con éxito.");
  }


  function listarMascotas() {
    if (mascotas.length === 0) {
      alert("No hay mascotas registradas.");
      return;
    }
    mascotas.forEach(m => {
      console.log(` ${m.nombre} - ${m.especie} - Edad: ${m.edad} años - Estado: ${m.estado}`);
    });
  }
  
  function menu() {
    let opcion;
    do {
      opcion = prompt(`
     Gestión Veterinaria:
      1. Registrar dueño
      2. Registrar mascota
      3. Listar mascotas
      4. Buscar mascota
      5. Actualizar estado de salud
      6. Eliminar mascota
      7. Ver mascotas de un dueño
      8. Salir
      `);
  
      switch (opcion) {
        case "1": registrarDueño(); break;
        case "2": registrarMascota(); break;
        case "3": listarMascotas(); break;
        case "8": alert("¡Hasta pronto!"); break;
        default: alert("Opción inválida.");
      }
    } while (opcion !== "8");
  }
  
  menu();
  
  