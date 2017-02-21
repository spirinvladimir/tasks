module.exports = (ws) => {
  return (data) => {
    ws.send(data);
  };
};
