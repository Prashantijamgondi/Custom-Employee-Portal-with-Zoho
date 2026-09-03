const express = require('express');
const { login } = require('../controllers/authController');
const { getUsers, getAuditLogs } = require('../controllers/adminController');
const { getZohoAccessToken, getZohoAppUrl } = require('../services/zohoService');
const authMiddleware = require('../middlewares/auth');
const verifyRole = require('../middlewares/rbac');

const router = express.Router();

// Public route: Login
router.post('/auth/login', login);

// Admin routes
router.get('/admin/users', authMiddleware, verifyRole(['Admin']), getUsers);
router.get('/admin/logs', authMiddleware, verifyRole(['Admin']), getAuditLogs);

// Zoho Proxy Route
// This route returns the target Zoho URL and (if needed by frontend) an access token
router.get('/zoho/access', authMiddleware, async (req, res) => {
  try {
    const userRole = req.user.role;
    const targetUrl = getZohoAppUrl(userRole);

    if (!targetUrl) {
      return res.status(403).json({ message: 'No Zoho application assigned for this role.' });
    }

    // Attempt to get the access token using the backend service account credentials
    let accessToken = null;
    try {
      if (process.env.ZOHO_REFRESH_TOKEN) {
         accessToken = await getZohoAccessToken();
      } else {
         console.warn('Zoho integration skipped: No ZOHO_REFRESH_TOKEN provided in .env');
      }
    } catch (err) {
      console.error('Failed to get Zoho token in route', err);
      // We might still return the URL even if token fetch fails for demo purposes
    }

    res.json({
      targetUrl,
      accessToken,
      message: 'Access granted'
    });
  } catch (error) {
    console.error('Zoho access error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
