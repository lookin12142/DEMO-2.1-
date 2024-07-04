export const fetchEmergencyHistory = async () => {
    const response = await fetch('http://192.168.142.1:8000/api/emergencies/');
    return response.json();
  };
  