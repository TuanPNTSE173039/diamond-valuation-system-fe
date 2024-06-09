export const getCustomerByID = (customers, customerID) => {
  return customers?.content?.find((customer) => customer.id === customerID);
};
export const getStaffById = (staffs, staffId) => {
  return staffs?.content?.find((staff) => staff.id === staffId);
};
export const getValuationRequestById = (requests, id) => {
  return requests?.content.find((request) => request.id === id);
};
