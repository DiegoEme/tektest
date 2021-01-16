module.exports = (sequelize, type) => {
  
  return sequelize.define("patient",
    {
      // Model attributes are defined here
      fecha_reporte_web: type.STRING,
      id_de_caso: type.STRING,
      fecha_de_notificaci_n: type.STRING,
      departamento: type.STRING,
      departamento_nom: type.STRING,
      ciudad_municipio: type.STRING,
      ciudad_municipio_nom: type.STRING,
      edad: type.STRING,
      unidad_medida: type.STRING,
      sexo: type.STRING,
      fuente_tipo_contagio: type.STRING,
      ubicacion: type.STRING,
      estado: type.STRING,
      pais_viajo_1_cod: type.STRING,
      pais_viajo_1_nom: type.STRING,
      recuperado: type.STRING,
      fecha_inicio_sintomas: type.STRING,
      fecha_diagnostico: type.STRING,
      fecha_recuperado: type.STRING,
      tipo_recuperacion: type.STRING,
      per_etn_: type.STRING,
      nom_grupo_: type.STRING,
      fecha_muerte: type.STRING,
    },
    {
      // Other model options go here
      timestamps: false,
    }
  )
};
