module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "Transaction",
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      identificationNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobilId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalPayment: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lokasiId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      image: {
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
      tableName: "transactions",
      timestamps: true,
    }
  );

  return Transaction;
};
