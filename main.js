let dueños = [];
let mascotas = [];

let idDueño = 1;
let idMascota = 1;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const validarEstadoSalud = (estado) => {
  const permitidos = ["Sano", "Enfermo", "En tratamiento"];
  return permitidos.includes(estado);
};

const buscarDueñoPorCedula = (cedula) => dueños.find((d) => d.cedula === cedula);

const buscarMascotaPorNombre = (nombre) =>
  mascotas.find((m) => m.nombre.toLowerCase() === nombre.toLowerCase());


async function menu() {
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
      case "1":
        await registrarDueño();
        break;
      case "2":
        await registrarMascota();
        break;
      case "3":
        await listarMascotas();
        break;
      case "4":
        await buscarMascota();
        break;
      case "5":
        await actualizarEstadoSalud();
        break;
      case "6":
        await eliminarMascota();
        break;
      case "7":
        await verMascotasDeDueño();
        break;
      case "8":
        alert("¡Hasta pronto!");
        break;
      default:
        alert("Opción inválida.");
    }
  } while (opcion !== "8");
}


function registrarDueño() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const nombre = prompt("Nombre del dueño:");
      const cedula = prompt("Cédula:");
      const telefono = prompt("Teléfono:");
      const correo = prompt("Correo:");

      if (!nombre || !cedula || !telefono || !correo) {
        alert("Todos los campos son obligatorios.");
        return resolve();
      }

      
      if (buscarDueñoPorCedula(cedula)) {
        alert("Ya existe un dueño registrado con esa cédula.");
        return resolve();
      }

      dueños.push({ id: idDueño++, nombre, cedula, telefono, correo });
      alert("Dueño registrado exitosamente.");
      resolve();
    }, 1500);
  });
}


function registrarMascota() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cedulaDueño = prompt("Cédula del dueño:");
      const dueño = buscarDueñoPorCedula(cedulaDueño);

      if (!dueño) {
        alert("Dueño no encontrado. Registre el dueño primero.");
        return resolve();
      }

      const nombre = prompt("Nombre de la mascota:");
      const especie = prompt("Especie:");
      const edadStr = prompt("Edad:");
      const pesoStr = prompt("Peso:");
      const estado = prompt("Estado de salud (Sano, Enfermo, En tratamiento):");

      if (!nombre || !especie || !edadStr || !pesoStr || !estado) {
        alert("Todos los campos son obligatorios.");
        return resolve();
      }

      const edad = parseFloat(edadStr);
      const peso = parseFloat(pesoStr);

      if (isNaN(edad) || edad <= 0) {
        alert("Edad inválida.");
        return resolve();
      }

      if (isNaN(peso) || peso <= 0) {
        alert("Peso inválido.");
        return resolve();
      }

      if (!validarEstadoSalud(estado)) {
        alert("Estado inválido.");
        return resolve();
      }

      mascotas.push({
        id: idMascota++,
        nombre,
        especie,
        edad,
        peso,
        estado,
        idDueño: dueño.id,
      });

      alert("Mascota registrada exitosamente.");
      resolve();
    }, 2000);
  });
}


async function listarMascotas() {
  if (mascotas.length === 0) {
    alert("No hay mascotas registradas.");
    return;
  }

  console.clear();
  console.log("Mascotas registradas:");
  mascotas.forEach((m) => {
    const dueño = dueños.find((d) => d.id === m.idDueño);
    console.log("─".repeat(30));
    console.log(`ID: ${m.id}`);
    console.log(`Nombre: ${m.nombre}`);
    console.log(`Especie: ${m.especie}`);
    console.log(`Edad: ${m.edad} años`);
    console.log(`Peso: ${m.peso} kg`);
    console.log(`Estado: ${m.estado}`);
    console.log(`Dueño: ${dueño?.nombre || "Desconocido"}`);
  });
  console.log("─".repeat(30));
  await delay(500);
  alert("Mira la consola para ver la lista.");
}


function buscarMascota() {
  return new Promise((resolve) => {
    const nombre = prompt("Nombre de la mascota a buscar:");
    if (!nombre) {
      alert("Debe ingresar un nombre.");
      return resolve();
    }

    setTimeout(() => {
      const mascota = buscarMascotaPorNombre(nombre);
      if (!mascota) {
        alert("Mascota no encontrada.");
        return resolve();
      }

      const dueño = dueños.find((d) => d.id === mascota.idDueño);
      console.log(
        `Mascota encontrada:\nNombre: ${mascota.nombre}\nEspecie: ${mascota.especie}\nEdad: ${mascota.edad}\nPeso: ${mascota.peso}\nEstado: ${mascota.estado}\nDueño: ${dueño?.nombre || "Desconocido"}`
      );
      alert(`Mascota "${mascota.nombre}" encontrada. Mira la consola.`);
      resolve();
    }, 1500);
  });
}


async function actualizarEstadoSalud() {
  const nombre = prompt("Nombre de la mascota a actualizar:");
  if (!nombre) return alert("Debes ingresar un nombre.");

  const mascota = buscarMascotaPorNombre(nombre);
  if (!mascota) return alert("Mascota no encontrada.");

  const nuevoEstado = prompt("Nuevo estado (Sano, Enfermo, En tratamiento):");
  if (!validarEstadoSalud(nuevoEstado)) {
    alert("Estado inválido.");
    return;
  }

  await delay(1000);
  mascota.estado = nuevoEstado;
  alert(`Estado actualizado a ${nuevoEstado} para ${mascota.nombre}.`);
}


function eliminarMascota() {
  return new Promise((resolve) => {
    const nombre = prompt("Nombre de la mascota a eliminar:");
    if (!nombre) {
      alert("Debes ingresar un nombre.");
      return resolve();
    }

    setTimeout(() => {
      const index = mascotas.findIndex(
        (m) => m.nombre.toLowerCase() === nombre.toLowerCase()
      );
      if (index === -1) {
        alert("Mascota no encontrada.");
        return resolve();
      }

      const confirmacion = confirm("¿Seguro que deseas eliminarla?");
      if (confirmacion) {
        mascotas.splice(index, 1);
        alert("Mascota eliminada con éxito.");
      } else {
        alert("Eliminación cancelada.");
      }

      resolve();
    }, 2000);
  });
}


async function verMascotasDeDueño() {
  const cedula = prompt("Cédula del dueño:");
  if (!cedula) return alert("Debes ingresar una cédula.");

  const dueño = buscarDueñoPorCedula(cedula);
  if (!dueño) return alert("Dueño no encontrado.");

  const mascotasDueño = mascotas.filter((m) => m.idDueño === dueño.id);
  if (mascotasDueño.length === 0) {
    alert("Este dueño no tiene mascotas registradas.");
    return;
  }

  await delay(2000);
  console.log(`Mascotas de ${dueño.nombre}:`);
  mascotasDueño.forEach((m) =>
    console.log(`- ${m.nombre} (${m.especie}, ${m.edad} años, ${m.estado})`)
  );
  alert(`Se encontraron ${mascotasDueño.length} mascota(s). Mira la consola.`);
}

menu();
