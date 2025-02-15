import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [newApp, setNewApp] = useState({
    companyName: '',
    role: '',
    appliedDate: '',
    status: 'Pending',
    interviewDate: '',
    notes: ''
  });

  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/applications');
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleInputChange = (e) => {
    setNewApp({ ...newApp, [e.target.name]: e.target.value });
  };

  const handleAddApplication = async (e) => {
    e.preventDefault();
    try {
      // Prepare the payload (dates can be null if empty)
      const payload = {
        ...newApp,
        appliedDate: newApp.appliedDate || null,
        interviewDate: newApp.interviewDate || null
      };
      await axios.post('http://localhost:8080/api/applications', payload);
      setNewApp({
        companyName: '',
        role: '',
        appliedDate: '',
        status: 'Pending',
        interviewDate: '',
        notes: ''
      });
      fetchApplications();
    } catch (error) {
      console.error('Error adding application:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/applications/${id}`);
      fetchApplications();
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  return (
    <div>
      <h2>Add New Application</h2>
      <form onSubmit={handleAddApplication}>
        <div className="mb-3">
          <label>Company Name</label>
          <input 
            type="text" 
            className="form-control" 
            name="companyName" 
            value={newApp.companyName} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <input 
            type="text" 
            className="form-control" 
            name="role" 
            value={newApp.role} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label>Applied Date</label>
          <input 
            type="date" 
            className="form-control" 
            name="appliedDate" 
            value={newApp.appliedDate} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label>Status</label>
          <select 
            className="form-control" 
            name="status" 
            value={newApp.status} 
            onChange={handleInputChange}
          >
            <option value="Pending">Pending</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Rejected">Rejected</option>
            <option value="Hired">Hired</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Interview Date (Optional)</label>
          <input 
            type="date" 
            className="form-control" 
            name="interviewDate" 
            value={newApp.interviewDate} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="mb-3">
          <label>Notes (Optional)</label>
          <textarea 
            className="form-control" 
            name="notes" 
            value={newApp.notes} 
            onChange={handleInputChange}>
          </textarea>
        </div>
        <button type="submit" className="btn btn-primary">Add Application</button>
      </form>

      <hr />

      <h2>Applications</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Applied Date</th>
            <th>Status</th>
            <th>Interview Date</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app.id}>
              <td>{app.companyName}</td>
              <td>{app.role}</td>
              <td>{app.appliedDate}</td>
              <td>{app.status}</td>
              <td>{app.interviewDate}</td>
              <td>{app.notes}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(app.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationList;
