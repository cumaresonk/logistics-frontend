import { gql } from '@apollo/client';

// Shipments
export const GET_ALL_SHIPMENTS = gql`
  query GetAllShipments {
    getAllShipments {
      id
      origin
      destination
      status
      driver {
        id
        name
      }
      customer {
        id
        name
      }
    }
  }
`;

export const GET_SHIPMENT_BY_ID = gql`
  query GetShipmentById($id: ID!) {
    shipment(id: $id) {
      id
      origin
      destination
      status
      driver {
        id
        name
      }
      customer {
        id
        name
      }
    }
  }
`;

// Drivers
export const GET_ALL_DRIVERS = gql`
  query GetAllDrivers {
    drivers {
      id
      name
      vehicle
      shipments {
        id
        origin
        destination
        status
      }
    }
  }
`;

export const GET_DRIVER_BY_ID = gql`
  query GetDriverById($id: ID!) {
    driver(id: $id) {
      id
      name
      vehicle
      shipments {
        id
        origin
        destination
        status
      }
    }
  }
`;

// Customers
export const GET_ALL_CUSTOMERS = gql`
  query GetAllCustomers {
    customers {
      id
      name
      location
      shipments {
        id
        origin
        destination
        status
      }
    }
  }
`;

export const GET_CUSTOMER_BY_ID = gql`
  query GetCustomerById($id: ID!) {
    customer(id: $id) {
      id
      name
      location
      shipments {
        id
        origin
        destination
        status
      }
    }
  }
`;
