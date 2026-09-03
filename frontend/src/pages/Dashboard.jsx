import { useState, useEffect } from 'react';
import api from '../services/api';

const Dashboard = () => {
  const [zohoAccess, setZohoAccess] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchZohoAccess = async () => {
      try {
        const response = await api.get('/zoho/access');
        setZohoAccess(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load application data');
      } finally {
        setLoading(false);
      }
    };

    fetchZohoAccess();
  }, []);

  const getAppDetails = (role) => {
    switch (role) {
      case 'HR': return { name: 'Zoho People', icon: '👥', color: 'bg-green-500' };
      case 'Sales': return { name: 'Zoho CRM', icon: '📈', color: 'bg-blue-500' };
      case 'Support': return { name: 'Zoho Desk', icon: '🎧', color: 'bg-yellow-500' };
      case 'Finance': return { name: 'Zoho Books', icon: '💰', color: 'bg-purple-500' };
      case 'Admin': return { name: 'Zoho One (All Apps)', icon: '⚙️', color: 'bg-gray-800' };
      default: return { name: 'No App Assigned', icon: '❌', color: 'bg-gray-400' };
    }
  };

  const appDetails = getAppDetails(user.role);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to your Workspace</h1>
          <p className="text-gray-500 mb-8">Access your tools securely based on your assigned role.</p>
          
          {loading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="col-span-1">
                <div className="bg-gray-50 rounded-xl p-6 h-full border border-gray-100 hover:shadow-md transition-shadow">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-4 text-white shadow-sm ${appDetails.color}`}>
                    {appDetails.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{appDetails.name}</h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    Access your authorized {appDetails.name} environment. Your credentials are securely managed by the portal.
                  </p>
                  <a
                    href={zohoAccess?.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors w-full"
                  >
                    Launch Application
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
