import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_SHIPMENTS } from '../../graphql/queries.ts';
import { DELETE_SHIPMENT } from '../../graphql/mutations.ts';

const ShipmentList: React.FC = () => {
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(GET_ALL_SHIPMENTS);
  const [deleteShipment] = useMutation(DELETE_SHIPMENT);

  const handleEdit = (shipment: any) => {
    navigate(`/shipments/edit/${shipment.id}`, { state: { shipment } });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteShipment({ variables: { id } });
      refetch();
    } catch (err) {
      console.error(`Error deleting shipment: ${err.message}`);
    }
  };

  if (loading) return <p>Loading shipments...</p>;
  if (error) return <p>Error fetching shipments: {error.message}</p>;

  const shipments = data?.getAllShipments || [];

  return (
    <div style={styles.shipmentListContainer}>
      <div style={styles.headerContainer}>
        <h2 style={styles.header}>Shipment List</h2>
        <button style={styles.addButton} onClick={() => navigate('/shipments/add')}>
          Add
        </button>
      </div>
      <table style={styles.shipmentTable}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>No</th>
            <th style={styles.tableHeader}>Driver</th>
            <th style={styles.tableHeader}>Customer</th>
            <th style={styles.tableHeader}>Origin</th>
            <th style={styles.tableHeader}>Destination</th>
            <th style={styles.tableHeader}>Status</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment: any, index: number) => (
            <tr key={shipment.id}>
              <td style={styles.tableCell}>{index + 1}</td>
              <td style={styles.tableCell}>{shipment.driver.name}</td>
              <td style={styles.tableCell}>{shipment.customer.name}</td>
              <td style={styles.tableCell}>{shipment.origin}</td>
              <td style={styles.tableCell}>{shipment.destination}</td>
              <td style={styles.tableCell}>{shipment.status}</td>
              <td style={styles.actions}>
                <button style={styles.actionButton} onClick={() => handleEdit(shipment)}>
                  Edit
                </button>
                <button style={styles.actionButton} onClick={() => handleDelete(shipment.id)}>
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

export default ShipmentList;

const styles = {
  shipmentListContainer: {
    width: '90%',
    margin: '25px auto',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    width: "88%",
    marginLeft: "59px",
  },
  header: {
    fontSize: '16px',
    marginBottom: '20px',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '14px',
    ':hover': {
      backgroundColor: '#45a049',
    },
  },
  shipmentTable: {
    width: '90%',
    maxWidth: '100%',
    margin: '0 auto',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    fontSize: '14px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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
    ':hover': {
      backgroundColor: '#45a049',
    },
  },
};

