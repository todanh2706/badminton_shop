import Users from "./Users.js";
import Addresses_Users from "./Addresses_Users.js";

Users.hasMany(Addresses_Users, { foreignKey: "user_id" });
Addresses_Users.belongsTo(Users, { foreignKey: "user_id" });

export { Users, Addresses_Users };