export const getValuationRequestById = (requests, id) => {
  return requests?.content.find((request) => request.id === id);
};
