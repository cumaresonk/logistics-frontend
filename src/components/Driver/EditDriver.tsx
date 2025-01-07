import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_DRIVER } from '../../graphql/mutations.ts';
import { useNavigate, useLocation } from 'react-router-dom';

const EditDriver: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Receive driver data from the route's state
  const driver = location.state?.driver || { id: '', name: '', vehicle: '' };
  console.log("location.state?.driver",location.state?.driver)
  const [name, setName] = useState(driver.name);
  const [vehicle, setVehicle] = useState(driver.vehicle);
  const [updateDriver] = useMutation(UPDATE_DRIVER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateDriver({
        variables: { id: driver.id, name, vehicle },
      });
  
      navigate('/drivers');
    } catch (err) {
      console.error('Error updating driver:', err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Edit Driver</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
        </label>
        <label style={styles.label}>
          Vehicle:
          <input
            type="text"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            style={styles.input}
            required
          />
        </label>
        <button type="submit" style={styles.button}>
          Update
        </button>
      </form>
    </div>
  );
};

export default EditDriver;

const styles = {
  container: {
    width: '90%',
    maxWidth: '420px',
    margin: '20px auto',
    backgroundColor: 'rgb(245 242 242)',
    borderRadius: '6px',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '15px',
    fontSize: '18px',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '10px',
  },
  label: {
    fontSize: '14px',
    color: 'black',
    fontWeight: '500',
    marginBottom: '4px',
  },
  input: {
    padding: '10px',
    fontSize: '12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '93%',
    boxSizing: 'border-box',
    marginTop: '4px',
  },
  button: {
    padding: '10px 16px',
    fontSize: '14px',
    color: '#fff',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '34%',
    marginLeft: '135px',
    marginTop: '15px',
    transition: 'background-color 0.3s ease',
  },
};
