export const getStaffById = (staffs, staffId) => {
  return staffs?.content?.find((staff) => staff.id === staffId);
};
