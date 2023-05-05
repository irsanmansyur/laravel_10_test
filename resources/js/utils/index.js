let lastGenerateId = 0;
export const lastId = (prefix = "id") => {
  lastGenerateId++;
  return `${prefix}${lastGenerateId}`;
};
