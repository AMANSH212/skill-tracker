// backend/src/services/validation.js
module.exports = {
  validateEmployee: (data) => {
    if (!data.name || !data.role || !data.last_updated) {
      return "Missing required fields";
    }
    return null;
  }
};
