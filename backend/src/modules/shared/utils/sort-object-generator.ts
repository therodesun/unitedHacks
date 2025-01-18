// It receives 3 strings like for example,
// sort parameter - ["firstName", "lastName", "phoneNumber"]
// order parameter - ["asc", "desc", "asc"]
// validFields parameter - ["firstName", "lastName"]
// First it validates all fields with valid fields and excludes useless ones
// Then it validates and if there is not relevant value in second (order) array it gives "asc" as a default and returns it

export function sortObjectGenerator(
  sort: string,
  order: string,
  validFields: string[],
): any {
  const fieldNames = sort?.split(',')?.length ? sort?.split(',') : [];
  const orderNames = order?.split(',')?.length ? order?.split(',') : [];

  const result = {};
  for (let i = 0; i < fieldNames.length; i++) {
    const field = fieldNames[i];
    if (validFields.includes(field)) {
      if (orderNames[i]) {
        orderNames[i].toLowerCase() === 'desc'
          ? (result[`${field}`] = 'DESC')
          : (result[`${field}`] = 'ASC');
      } else {
        result[`${field}`] = 'ASC';
      }
    }
  }

  return result;
}
