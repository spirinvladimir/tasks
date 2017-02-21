const hat = require('hat');
const eventName = require('../lib/events').create;

module.exports = (db, send) => {
  return (task) => {
    const id = hat();
    const afterSet = (task) => {
      task.id = id;
      send(eventName, task);
    };

    db.set(
      id,
      task,
      afterSet
    );
  };
};
