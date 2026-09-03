const sequelize = require('../config/database');
const User = require('./User');
const Role = require('./Role');
const Permission = require('./Permission');
const AuditLog = require('./AuditLog');

// Define Relationships

// User <-> Role (Many-to-Many)
User.belongsToMany(Role, { through: 'UserRoles' });
Role.belongsToMany(User, { through: 'UserRoles' });

// Role <-> Permission (Many-to-Many)
Role.belongsToMany(Permission, { through: 'RolePermissions' });
Permission.belongsToMany(Role, { through: 'RolePermissions' });

// AuditLog associations (Optional, but good for joins)
AuditLog.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(AuditLog, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Role,
  Permission,
  AuditLog
};
