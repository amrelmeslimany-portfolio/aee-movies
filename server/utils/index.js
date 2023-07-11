module.exports = {
  createPathURL: (file) => `${file.destination}/${file.filename}`.slice(2),
};
