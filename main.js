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
        case "5": listarMascotas(); break;
        case "6": listarMascotas(); break;
        case "7": listarMascotas(); break;
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
  
    // Usamos find para buscar la primera coincidencia exacta (ignorando mayúsculas)
    const mascota = mascotas.find(m => m.nombre.toLowerCase() === nombreBuscado.toLowerCase());
  
    if (!mascota) {
      alert("Mascota no encontrada.");
      return;
    }
  
    const dueño = dueños.find(d => d.id === mascota.idDueño);
    const nombreDueño = dueño ? dueño.nombre : "Dueño desconocido";
  
    let info = `
  🐾 Mascota encontrada:
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
  
  
  
