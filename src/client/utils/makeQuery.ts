export const makeQuery = (paramName: string, values: any[]) => {
  return values.map((value) => `${paramName}=${value}`).join('&');
};
