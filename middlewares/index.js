function updateUpdatedAt(next) {
  this.updatedAt = Date.now();
  next();
}

module.exports = { updateUpdatedAt };
