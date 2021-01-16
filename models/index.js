const { Sequelize } = require("sequelize");
const PatientModel = require("./patients");

const sequelize = new Sequelize("FacahcNHMe", "FacahcNHMe", "iZbXKe8jv5", {
  host: "remotemysql.com",
  port: "3306",
  dialect: "mysql",
});

const Patient = PatientModel(sequelize, Sequelize);
Patient.removeAttribute('id');

sequelize.sync({ force: false }).then(() => {
  console.log("sync tables");
  console.log(Patient);
});

module.exports = { Patient };
