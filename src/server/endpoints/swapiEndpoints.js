const _isWookieeFormat = (req) => {
  if (req.query.format && req.query.format == "wookiee") {
    return true;
  }
  return false;
};

const applySwapiEndpoints = (server, app) => {

  server.get("/hfswapi/test", async (req, res) => {
    const data = await app.swapiFunctions.genericRequest(
      "https://swapi.dev/api/",
      "GET",
      null,
      true
    );
    res.send(data);
  });

  server.get("/hfswapi/getPeople", async (req, res) => {
    const data = await app.db.swPeople.findAll();
 
    res.send(data);
  });

  server.get("/hfswapi/getPeople/:id", async (req, res) => {
    let _ = {
      ...req.params,
    };
    const data = await app.db.swPeople.findByPk(_.id);  
    res.send(data);
  });
  server.get("/hfswapi/getPlanet", async (req, res) => {
    const data = await app.db.swPlanet.findAll();
    res.send(data);
  });

  server.get("/hfswapi/getPlanet/:id", async (req, res) => {
    let _ = {
      ...req.params,
    };
    const data = await app.db.swPlanet.findByPk(_.id);
    res.send(data);
  });

  server.get("/hfswapi/getWeightOnPlanetRandom", async (req, res) => {
    let random = Math.floor(Math.random() * 4);
    if (random === 0) {
      random = 1;
    }
    const people = await app.db.swPeople.findByPk(random);
    const planet = await app.db.swPlanet.findByPk(Number(people.homeworld_id));
    const data = await app.swapiFunctions.getWeightOnPlanet(
      people.mass,
      planet.gravity
    );
    res.send({ weight: data });
  });

  server.get("/hfswapi/getLogs", async (req, res) => {
    const data = await app.db.logging.findAll();
    res.send(data);
  });
  server.post("/hfswapi/createPlanet", async (req, res) => {
    let _ = {
      ...req.body,
    };
    const data = await app.db.swPlanet.create({ ..._ });
    res.send(data);
  });

  server.post("/hfswapi/createPeople", async (req, res) => {
    let _ = {
      ...req.body,
    };
    const data = await app.db.swPeople.create({ ..._ });
    res.send(data);
  });
};

module.exports = applySwapiEndpoints;
