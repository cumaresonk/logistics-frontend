import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_DRIVERS } from '../../graphql/queries.ts';
import { DELETE_DRIVER } from '../../graphql/mutations.ts';

const DriverList: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_ALL_DRIVERS);
  const [deleteDriver] = useMutation(DELETE_DRIVER);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    if (data && data.drivers) {
      setDrivers(data.drivers);
    }
  }, [data]);

  const handleEdit = (driver: any) => {
    navigate(`/drivers/edit/${driver.id}`, { state: { driver } });
  };

  const handleDelete = async (id: number) => {

      try {
        await deleteDriver({
          variables: { id },
          refetchQueries: [{ query: GET_ALL_DRIVERS }],
        });
      
      } catch (error) {
        console.error('Error deleting driver:', error);
      }
    
  };

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (error) return <p style={styles.error}>Error loading drivers</p>;

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h2 style={styles.header}>Driver List</h2>
        <button onClick={() => navigate('/drivers/add')} style={styles.addButton}>
          Add
        </button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>ID</th>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Vehicle</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver: any, index: number) => (
            <tr key={driver.id}>
              <td style={styles.tableCell}>{index+1}</td>
              <td style={styles.tableCell}>{driver.name}</td>
              <td style={styles.tableCell}>{driver.vehicle}</td>
              <td style={styles.actions}>
              <button style={styles.actionButton} onClick={() => handleEdit(driver)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(driver.id)} style={styles.actionButton}>
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

export default DriverList;

const styles = {
  container: {
    width: '90%',
    margin: '25px auto',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '59px',
    marginBottom: '20px',
    width: "88%",
  },
  header: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '14px',
    transition: 'background-color 0.3s ease',
  },
  table: {
    width: '90%',
    margin: '0 auto',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    fontSize: '14px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '100%',
   
  },
  tableHeader: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px',
    border: '1px solid #aaa',
    textAlign: 'center',
  },
  tableCell: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'center',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    border: 'none',
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    cursor: 'pointer',
    marginRight: '8px',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
  },
  loading: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#555',
  },
  error: {
    textAlign: 'center',
    fontSize: '14px',
    color: 'red',
  },
};
