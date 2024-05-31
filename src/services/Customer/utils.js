export const getCustomerByID = (customers, customerID) => {
  return customers?.content?.find((customer) => customer.id === customerID);
};
