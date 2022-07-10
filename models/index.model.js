const { Sequelize } = require("sequelize");
const { host_postgres, config_postgres } = require("../connection/setup-sequelize");

const sequelize = new Sequelize(host_postgres, config_postgres);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("./schema/users.model")(sequelize, Sequelize);
db.Roles = require("./schema/roles.model")(sequelize, Sequelize);

db.Users.belongsTo(db.Roles);
db.Roles.hasMany(db.Users);

module.exports = db;