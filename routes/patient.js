const router = require("express").Router();
var cors = require('cors')
const { Patient } = require("../models");

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-RequestedWith, Content-Type, Accept");
    next();
   });

router.get("/patients", cors(), async (req, res, next) => {
  try {
    const patients = await Patient.findAll({
      attributes: ["id_de_caso", "departamento_nom", "edad", "sexo"],
    });

    if (patients) {
      res.status(200).json(patients);
    } else {
      res.status(401).send({ message: "No hay pacientes" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error" });
    next(error);
  }
});

router.post("/add", cors(),  async (req, res, next) => {
  try {
    const addPatient = await Patient.create(req.body);
    res.status(200).json(addPatient);
  } catch (error) {
    res.status(500).send({ message: "Error" });
    next(error);
  }
});

router.put("/update",  cors(), async (req, res, next) => {
  try {
    const updatePatient = await Patient.update(
      {
        id_de_caso: req.body.id_de_caso,
        departamento_nom: req.body.departamento_nom,
        edad: req.body.edad,
        sexo: req.body.sexo,
      },
      {
        where: { id_de_caso: req.body.id_de_caso },
      }
    );
    res.status(200).json(updatePatient);
  } catch (error) {
    res.status(500).send({ message: "Error" });
    next(error);
  }
});

router.delete("/delete",  cors(), async (req, res, next) => {
    try {
        const deletePatient = await Patient.destroy({where: {id_de_caso: req.body.id_de_caso}});
        if(deletePatient){
            console.log(deletePatient)
            return res.status(200).send({message: "Paciente eliminado"})
        }
    } catch (error) {
        res.status(500).send({ message: "Error" });
        next(error);
    }
});

module.exports = router;
