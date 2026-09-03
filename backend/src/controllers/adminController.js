const { User, Role, AuditLog } = require('../models');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      include: Role
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.findAll({
      include: {
        model: User,
        attributes: ['username', 'name']
      },
      order: [['createdAt', 'DESC']]
    });
    res.json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getUsers,
  getAuditLogs
};
