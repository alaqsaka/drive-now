module.exports = (sequelize, DataTypes) => {
  const Lokasi = sequelize.define(
    "Lokasi",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      personInChargeName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      personInChargePhone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "lokasi",
      timestamps: true,
    }
  );

  return Lokasi;
};
