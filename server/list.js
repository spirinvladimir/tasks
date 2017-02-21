module.exports = (db) => {
  let ids = [];
  db.forEach((key) => {
    ids.push(key);
  });
  return ids;
};
