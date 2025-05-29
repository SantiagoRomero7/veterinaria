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

  
