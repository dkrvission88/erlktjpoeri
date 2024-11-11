const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const subscriptionPaymentFinal = sequelize.define(
  "subscriptionPaymentFinal",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    user_reg_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    ack_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    region_name: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cors_plan: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    subscription_charge: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    sub_gst: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    subs_recieptNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subs_recieptAmt: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    gst_recieptNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gst_recieptAmt: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    path_sub_pdf: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Verified", "Approved", "Rejected"),
      defaultValue: "Pending",
    },
    rejection_reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    payment_verified_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    payment_verification_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    approved_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    approved_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    GST_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    GST_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull:true,
    },
  },
  {
    tableName: "subscription_payment_final",
    timestamps: false,
  }
);

module.exports = subscriptionPaymentFinal;
