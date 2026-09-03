const { AuditLog } = require('../models');

const verifyRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const userRole = req.user.role; // Attached by authMiddleware

      if (!allowedRoles.includes(userRole)) {
        // Log unauthorized access attempt
        await AuditLog.create({
          userId: req.user.id,
          action: 'UNAUTHORIZED_ACCESS_ATTEMPT',
          details: `Attempted to access route requiring roles: ${allowedRoles.join(', ')}`
        });

        return res.status(403).json({ message: 'Access Denied: Insufficient Permissions' });
      }

      next();
    } catch (error) {
      console.error('RBAC Error:', error);
      res.status(500).json({ message: 'Internal Server Error during authorization' });
    }
  };
};

module.exports = verifyRole;
