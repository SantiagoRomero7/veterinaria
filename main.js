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
      alert(" Dueño no encontrado. Registre el dueño primero.");
      return;
    }
  
    const nombre = prompt("Nombre de la mascota:");
    const especie = prompt("Especie (Perro, Gato, Ave, Reptil, Otro):");
    const edadStr = prompt("Edad (en años):");
    const pesoStr = prompt("Peso (en kg):");
    const estado = prompt("Estado de salud (Sano, Enfermo, En tratamiento):");
  
    if (!nombre || !especie || !edadStr || !pesoStr || !estado) {
      alert(" Todos los campos son obligatorios.");
      return;
    }
  
    const edad = parseFloat(edadStr);
    const peso = parseFloat(pesoStr);
  
    if (isNaN(edad) || edad <= 0) {
      alert(" La edad debe ser un número positivo.");
      return;
    }
  
    if (isNaN(peso) || peso <= 0) {
      alert(" El peso debe ser un número positivo.");
      return;
    }
  
    const estadosPermitidos = ["Sano", "Enfermo", "En tratamiento"];
    if (!estadosPermitidos.includes(estado)) {
      alert(` Estado de salud inválido. Debe ser uno de: ${estadosPermitidos.join(", ")}`);
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
      alert(" No hay mascotas registradas.");
      return;
    }
  
    console.log(" Lista de mascotas registradas:\n");
  
    mascotas.forEach(m => {
      const dueño = dueños.find(d => d.id === m.idDueño);
      const nombreDueño = dueño ? dueño.nombre : "Dueño desconocido";
  
      console.log("───────────────────────────────");
      console.log(`   Mascota ID: ${m.id}`);
      console.log(`   Nombre: ${m.nombre}`);
      console.log(`   Especie: ${m.especie}`);
      console.log(`   Edad: ${m.edad} años`);
      console.log(`   Peso: ${m.peso} kg`);
      console.log(`   Estado de salud: ${m.estado}`);
      console.log(`   Dueño: ${nombreDueño}`);
      console.log("───────────────────────────────");
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
        case "4": buscarMascota(); break;
        case "5": actualizarEstadoSalud(); break;
        case "6": eliminarMascota(); break;
        case "7": verMascotasDeDueño(); break;
        case "8": alert("¡Hasta pronto!"); break;
        default: alert("Opción inválida.");
      }
    } while (opcion !== "8");
  }
  
  menu();

  function buscarMascota() {
    const nombreBuscado = prompt("Ingrese el nombre de la mascota a buscar:");
    if (!nombreBuscado) {
      alert("Debe ingresar un nombre.");
      return;
    }
  
    const mascota = mascotas.find(m => m.nombre.toLowerCase() === nombreBuscado.toLowerCase());
  
    if (!mascota) {
      alert("Mascota no encontrada.");
      return;
    }
  
    const dueño = dueños.find(d => d.id === mascota.idDueño);
    const nombreDueño = dueño ? dueño.nombre : "Dueño desconocido";
  
    let info = `
  Mascota encontrada:
  Nombre: ${mascota.nombre}
  Especie: ${mascota.especie}
  Edad: ${mascota.edad} años
  Peso: ${mascota.peso} kg
  Estado de salud: ${mascota.estado}
  Dueño: ${nombreDueño}
  `;
  
    console.log(info);
    alert(`Mascota "${mascota.nombre}" encontrada. Mira la consola para más detalles.`);
  }
  
  function actualizarEstadoSalud() {
    const nombre = prompt("Ingrese el nombre de la mascota a actualizar:");
    if (!nombre) {
      alert("Debe ingresar un nombre.");
      return;
    }
  
    const mascota = mascotas.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());
    if (!mascota) {
      alert("Mascota no encontrada.");
      return;
    }
  
    const nuevoEstado = prompt("Nuevo estado de salud (Sano, Enfermo, En tratamiento):");
    const estadosPermitidos = ["Sano", "Enfermo", "En tratamiento"];
    if (!estadosPermitidos.includes(nuevoEstado)) {
      alert("Estado inválido. Debe ser: Sano, Enfermo o En tratamiento.");
      return;
    }
  
    mascota.estado = nuevoEstado;
    alert(`Estado de salud actualizado a ${nuevoEstado} para ${mascota.nombre}.`);
  }
  
  function eliminarMascota(){
    const nombre = prompt("Ingrese el nombre de la mascota a eliminar:");
    if (!nombre) {
      alert("Debe ingresar un nombre.");
      return;
  }

  const index = mascotas.findIndex(m => m.nombre.toLowerCase() === nombre.toLowerCase());
  if (index === -1) {
    alert("Mascota no encontrada.");
    return;
  }

  const confirmacion = confirm(' ¿ Seguro de eliminar esta mascota ?');
  if (confirmacion) {
    mascotas.splice(index, 1);
    alert("Mascota eliminada con èxito.");
    } else {
      alert("Eliminación cancelada.");
      }
  }
  

  function verMascotasDeDueño() {
    const cedula = prompt("Ingrese la cédula del dueño:");
    if (!cedula) {
      alert("Debe ingresar una cédula.");
      return;
    }
  
    const dueño = dueños.find(d => d.cedula === cedula);
    if (!dueño) {
      alert("Dueño no encontrado.");
      return;
    }
  
    const mascotasDueño = mascotas.filter(m => m.idDueño === dueño.id);
    if (mascotasDueño.length === 0) {
      alert("Este dueño no tiene mascotas registradas.");
      return;
    }
  
    console.log(` Mascotas del dueño ${dueño.nombre}:`);
    mascotasDueño.forEach(m => {
      console.log(`- ${m.nombre} (${m.especie}, ${m.edad} años, ${m.estado})`);
    });
  
    alert(`Se encontraron ${mascotasDueño.length} mascota(s). Mira la consola.`);
  }
  