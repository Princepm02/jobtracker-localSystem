import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApplicationList from './components/ApplicationList';

function App() {
  return (
    <div className="container">
      <h1 className="my-4">Job Application Tracker</h1>
      <ApplicationList />
    </div>
  );
}

export default App;
