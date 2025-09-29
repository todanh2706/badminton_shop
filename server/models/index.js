import Users from "./Users";
import Addresses_Users from "./Addresses_Users";

Users.hasMany(Addresses_Users, { foreignKey: "user_id" });
Addresses_Users.belongsTo(Users, { foreignKey: "user_id" });

export { Users, Addresses_Users };