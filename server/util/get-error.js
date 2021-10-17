/**
 * getError
 * --
 * Take a string error message or error instance and depending on environment,
 * return an instance or string message. When not in a production setting,
 * send the error instance which has a stack trace for easier debugging
 * @param {String|Error} error The error instace or message
 * @returns {String|Error}
 */
module.exports = function getError(error) {
  if (!error) return;
  let errorMessage;
  let errorInstance;

  switch (typeof error) {
    case "string":
      errorMessage = error;
      errorInstance = new Error(error);
      break;

    default:
    case "object":
      if (!error.message) {
        console.warn("improper error object sent to getError");
        return error;
      }

      errorMessage = error.message;
      errorInstance = error;
  }

  if (process.env.NODE_ENV === "production") {
    return errorMessage;
  }

  return errorInstance;
};
