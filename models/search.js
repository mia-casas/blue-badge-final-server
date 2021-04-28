const { DataTypes } = require("sequelize");
const db = require("../db")

const Search = db.define('search', {
    label: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ingredients: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    owner: {
        type: DataTypes.INTEGER
    }
})

module.exports = Search;