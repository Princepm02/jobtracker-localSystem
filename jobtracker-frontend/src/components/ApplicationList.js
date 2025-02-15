import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  // This state holds the form data used for both adding and updating
  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    appliedDate: '',
    status: 'Pending',
    interviewDate: '',
    notes: ''
  });
  // If editingId is null, the form is used to add a new application.
  // Otherwise, it is used to update the application with the given ID.
  const [editingId, setEditingId] = useState(null);

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      companyName: '',
      role: '',
      appliedDate: '',
      status: 'Pending',
      interviewDate: '',
      notes: ''
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload (dates can be null if not provided)
    const payload = {
      ...formData,
      appliedDate: formData.appliedDate || null,
      interviewDate: formData.interviewDate || null,
    };

    try {
      if (editingId === null) {
        // Adding a new application
        await axios.post('http://localhost:8080/api/applications', payload);
      } else {
        // Updating an existing application (ID from editingId, not from payload)
        await axios.put(`http://localhost:8080/api/applications/${editingId}`, payload);
      }
      resetForm();
      fetchApplications();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (application) => {
    // Populate form with selected application data for editing
    setFormData({
      companyName: application.companyName,
      role: application.role,
      appliedDate: application.appliedDate,
      status: application.status,
      interviewDate: application.interviewDate || '',
      notes: application.notes || '',
    });
    setEditingId(application.id);
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
      <h2>{editingId ? 'Update Application' : 'Add New Application'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Company Name</label>
          <input 
            type="text" 
            className="form-control" 
            name="companyName" 
            value={formData.companyName} 
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
            value={formData.role} 
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
            value={formData.appliedDate} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label>Status</label>
          <select 
            className="form-control" 
            name="status" 
            value={formData.status} 
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
            value={formData.interviewDate} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="mb-3">
          <label>Notes (Optional)</label>
          <textarea 
            className="form-control" 
            name="notes" 
            value={formData.notes} 
            onChange={handleInputChange}>
          </textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          {editingId ? 'Update Application' : 'Add Application'}
        </button>
        {editingId && (
          <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>
            Cancel
          </button>
        )}
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
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(app)}>
                  Edit
                </button>
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
