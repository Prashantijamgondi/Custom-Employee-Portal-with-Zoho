const axios = require('axios');

async function getZohoAccessToken() {
  try {
    const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
      params: {
        refresh_token: process.env.ZOHO_REFRESH_TOKEN,
        client_id: process.env.ZOHO_CLIENT_ID,
        client_secret: process.env.ZOHO_CLIENT_SECRET,
        grant_type: 'refresh_token'
      }
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Failed to retrieve Zoho Access Token', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Map roles to their target Zoho application URLs (as per requirements)
const getZohoAppUrl = (role) => {
  switch (role) {
    case 'HR': return 'https://people.zoho.com/';
    case 'Sales': return 'https://crm.zoho.com/';
    case 'Support': return 'https://desk.zoho.com/';
    case 'Finance': return 'https://books.zoho.com/';
    case 'Admin': return 'https://one.zoho.com/'; // Admin can access portal
    default: return null;
  }
};

module.exports = {
  getZohoAccessToken,
  getZohoAppUrl
};
