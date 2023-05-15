export const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

/**
 The `getError` function is a utility function that takes an `error` object as input and returns an appropriate error message. Here's how it works:
. If the `error` object has a `response` property and the `response` object has a `data` property with a `message` property, it means that the error originated from an HTTP response with a custom error message. In this case, the function returns the `message` property from the `data` object of the `response`. This is typically used when the backend API returns an error with a specific error message.
2. If the condition mentioned above is not met, it means that the error is a general error without a custom message. In this case, the function returns the `message` property of the `error` object itself. This is usually the case for network errors or other types of errors that don't have a specific custom message.
By using this utility function, you can extract the appropriate error message from an error object in a consistent manner, whether it's a custom message from an API response or a general error message.
 */
