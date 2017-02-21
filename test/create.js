const test = require('ava').test;
const create = require('../server/create');
const dirty = require('dirty');
const hat = require('hat');
const fs = require('fs');
const dbFileName = hat();
let db;

test.before(() => {
  db = dirty(dbFileName);
});

test('send created task to network ', (t) => {
  t.plan(2);

  const task = {
    title: hat(),
    description: hat()
  };

  create(task, db, (res) => {
    t.is(res.title, task.title);
    t.is(res.description, task.description);
  });
});

test('save created task to db', (t) => {
  t.plan(2);

  const task = {
    title: hat(),
    description: hat()
  };

  create(task, db, (res) => {
    const id = res.id;
    db.get(id, (value) => {
      t.is(value.title, task.title);
      t.is(value.description, task.description);
    });
  });
});

test.after(() => {
  db.close();
  fs.unlinkSync(dbFileName);
});
