const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: { username },
      include: Role
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // In a real app, use bcrypt.compare(password, user.password)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const roleName = user.Roles.length > 0 ? user.Roles[0].name : 'User';

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: roleName
      },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: roleName
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { login };
