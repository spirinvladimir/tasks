module.exports = (data) => {
  let result = {};

  try {
    result.data = JSON.parse(data);
    result.status = true;
  } catch (e) {
    result.status = false;
  }
  return result;
};
