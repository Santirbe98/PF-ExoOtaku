const { Router } = require("express");
const router = Router();
const { Address } = require("../db");
const axios = require("axios");

let listacomuna = [
  { provincia: "Buenos Aires", ciudad: "La Matanza" },
  { provincia: "Buenos Aires", ciudad: "La Plata" },
  { provincia: "Buenos Aires", ciudad: "Mar del Plata" },
  { provincia: "Buenos Aires", ciudad: "Lomas de Zamora" },
  { provincia: "Buenos Aires", ciudad: "Quilmes" },
  { provincia: "Buenos Aires", ciudad: "Almirante Brown" },
  { provincia: "Buenos Aires", ciudad: "Merlo" },
  { provincia: "Buenos Aires", ciudad: "Lanús" },
  { provincia: "Buenos Aires", ciudad: "Moreno" },
  { provincia: "Buenos Aires", ciudad: "Florencio Varela" },
  { provincia: "Buenos Aires", ciudad: "General San Martín" },
  { provincia: "Buenos Aires", ciudad: "Tigre" },
  { provincia: "Buenos Aires", ciudad: "Avellaneda" },
  { provincia: "Buenos Aires", ciudad: "Tres de Febrero" },
  { provincia: "Buenos Aires", ciudad: "Berazategui" },
  { provincia: "Buenos Aires", ciudad: "Malvinas Argentinas" },
  { provincia: "Buenos Aires", ciudad: "Morón" },
  { provincia: "Buenos Aires", ciudad: "Bahía Blanca" },
  { provincia: "Buenos Aires", ciudad: "Esteban Echeverría" },
  { provincia: "Buenos Aires", ciudad: "Pilar" },
  { provincia: "Buenos Aires", ciudad: "San Isidro" },
  { provincia: "Buenos Aires", ciudad: "San Miguel" },
  { provincia: "Buenos Aires", ciudad: "Vicente López" },
  { provincia: "Buenos Aires", ciudad: "José C. Paz" },
  { provincia: "Buenos Aires", ciudad: "Escobar" },
  { provincia: "Buenos Aires", ciudad: "Hurlingham" },
  { provincia: "Buenos Aires", ciudad: "Ituzaingó" },
  { provincia: "Buenos Aires", ciudad: "Ezeiza" },
  { provincia: "Buenos Aires", ciudad: "San Fernando" },
  { provincia: "Buenos Aires", ciudad: "San Nicolás de Los Arroyos" },
  { provincia: "Buenos Aires", ciudad: "Tandil" },
  { provincia: "Buenos Aires", ciudad: "Zárate" },
  { provincia: "Buenos Aires", ciudad: "Olavarría" },
  { provincia: "Buenos Aires", ciudad: "Luján" },
  { provincia: "Buenos Aires", ciudad: "Pergamino" },
  { provincia: "Buenos Aires", ciudad: "Campana" },
  { provincia: "Buenos Aires", ciudad: "Necochea" },
  { provincia: "Buenos Aires", ciudad: "Junín" },
  { provincia: "Buenos Aires", ciudad: "Berisso" },
  { provincia: "Buenos Aires", ciudad: "General Rodríguez" },
  { provincia: "Entre Ríos", ciudad: "Paraná" },
  { provincia: "Entre Ríos", ciudad: "Concordia" },
  { provincia: "Entre Ríos", ciudad: "Gualeguaychú" },
  { provincia: "Entre Ríos", ciudad: "Concepción del Uruguay" },
  { provincia: "Entre Ríos", ciudad: "Gualeguay" },
  { provincia: "Entre Ríos", ciudad: "Chajarí" },
  { provincia: "Entre Ríos", ciudad: "Villaguay" },
  { provincia: "Entre Ríos", ciudad: "Victoria" },
  { provincia: "Entre Ríos", ciudad: "La Paz" },
  { provincia: "Entre Ríos", ciudad: "Colón" },
  { provincia: "Entre Ríos", ciudad: "Nogoyá" },
  { provincia: "Entre Ríos", ciudad: "Crespo" },
  { provincia: "Entre Ríos", ciudad: "Diamante" },
  { provincia: "Entre Ríos", ciudad: "San José" },
  { provincia: "Entre Ríos", ciudad: "Federal" },
  { provincia: "Entre Ríos", ciudad: "Santa Elena" },
  { provincia: "Entre Ríos", ciudad: "Federación" },
  { provincia: "Entre Ríos", ciudad: "Rosario del Tala" },
  { provincia: "Entre Ríos", ciudad: "San Salvador" },
  { provincia: "Entre Ríos", ciudad: "San José de Feliciano" },
  { provincia: "Entre Ríos", ciudad: "Villa Elisa" },
  { provincia: "Entre Ríos", ciudad: "Basavilbaso" },
  { provincia: "Entre Ríos", ciudad: "Viale" },
  { provincia: "Entre Ríos", ciudad: "San Benito" },
  { provincia: "Entre Ríos", ciudad: "General Ramírez" },
  { provincia: "Entre Ríos", ciudad: "Urdinarrain" },
  { provincia: "Entre Ríos", ciudad: "Bovril" },
  { provincia: "Entre Ríos", ciudad: "María Grande" },
  { provincia: "Entre Ríos", ciudad: "Puerto Ibicuy" },
  { provincia: "Entre Ríos", ciudad: "Libertador San Martín" },
  { provincia: "Entre Ríos", ciudad: "Larroque" },
  { provincia: "Entre Ríos", ciudad: "Maciá" },
  { provincia: "Entre Ríos", ciudad: "Villa Hernandarias" },
  { provincia: "Entre Ríos", ciudad: "Cerrito" },
  { provincia: "Entre Ríos", ciudad: "Hasenkamp" },
  { provincia: "Entre Ríos", ciudad: "General Galarza" },
  { provincia: "Entre Ríos", ciudad: "Lucas González" },
  { provincia: "Entre Ríos", ciudad: "San Jaime de la Frontera" },
  { provincia: "Entre Ríos", ciudad: "Oro Verde" },
  { provincia: "Entre Ríos", ciudad: "Villa Paranacito" },
  { provincia: "Santa Fe", ciudad: "Rosario" },
  { provincia: "Santa Fe", ciudad: "Santa Fe" },
  { provincia: "Santa Fe", ciudad: "Rafaela" },
  { provincia: "Santa Fe", ciudad: "Villa Gobernador Gálvez" },
  { provincia: "Santa Fe", ciudad: "Venado Tuerto" },
  { provincia: "Santa Fe", ciudad: "Reconquista" },
  { provincia: "Santa Fe", ciudad: "Santo Tomé" },
  { provincia: "Santa Fe", ciudad: "Villa Constitución" },
  { provincia: "Santa Fe", ciudad: "San Lorenzo" },
  { provincia: "Santa Fe", ciudad: "Esperanza" },
  { provincia: "Santa Fe", ciudad: "Granadero Baigorria" },
  { provincia: "Santa Fe", ciudad: "Casilda" },
  { provincia: "Santa Fe", ciudad: "Cañada de Gómez" },
  { provincia: "Santa Fe", ciudad: "Capitán Bermúdez" },
  { provincia: "Santa Fe", ciudad: "Pérez" },
  { provincia: "Santa Fe", ciudad: "Avellaneda" },
  { provincia: "Santa Fe", ciudad: "Funes" },
  { provincia: "Santa Fe", ciudad: "San Justo" },
  { provincia: "Santa Fe", ciudad: "Arroyo Seco" },
  { provincia: "Santa Fe", ciudad: "Sunchales" },
  { provincia: "Santa Fe", ciudad: "Vera" },
  { provincia: "Santa Fe", ciudad: "Firmat" },
  { provincia: "Santa Fe", ciudad: "Gálvez" },
  { provincia: "Santa Fe", ciudad: "Villa Ocampo" },
  { provincia: "Santa Fe", ciudad: "Rufino" },
  { provincia: "Santa Fe", ciudad: "Coronda" },
  { provincia: "Santa Fe", ciudad: "San Jorge" },
  { provincia: "Santa Fe", ciudad: "San Javier" },
  { provincia: "Santa Fe", ciudad: "Carcarañá" },
  { provincia: "Santa Fe", ciudad: "Tostado" },
  { provincia: "Santa Fe", ciudad: "Fray Luis Beltrán" },
  { provincia: "Santa Fe", ciudad: "Ceres" },
  { provincia: "Santa Fe", ciudad: "San Cristóbal" },
  { provincia: "Santa Fe", ciudad: "Roldán" },
  { provincia: "Santa Fe", ciudad: "Recreo" },
  { provincia: "Santa Fe", ciudad: "Las Rosas" },
  { provincia: "Santa Fe", ciudad: "Puerto General San Martín" },
  { provincia: "Santa Fe", ciudad: "Las Parejas" },
  { provincia: "Santa Fe", ciudad: "Laguna Paiva" },
  { provincia: "Santa Fe", ciudad: "Las Toscas" },
];

listacomuna.forEach((item) => {
  if (item.provincia === "Santa Fe") {
    item["valorEntrega"] = 100;
  }

  if (item.provincia === "Entre Ríos") {
    item["valorEntrega"] = 200;
  }

  if (item.provincia === "Buenos Aires") {
    item["valorEntrega"] = 400;
  }
});

router.post("/", async function (req, res) {
  try {
    listacomuna.map(
      async (e) =>
        await Address.findOrCreate({
          where: {
            provincia: e.provincia,
            ciudad: e.ciudad,
            valorEntrega: e.valorEntrega,
          },
        })
    );
    res.send("ok");
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/", async function (req, res) {
  /* const { provincia } = req.query; */
  try {
    let comunas = await Address.findAll();
    res.send(comunas);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
