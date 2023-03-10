export const handleErrors = (error, res) => {
    // Check if the error is a validation error
    if (error.name === 'ValidationError') {
        // If it is, extract the error messages from each validation error and send them back to the client
        const errors = Object.values(error.errors) // Get an array of all the errors
            .map((err) => err.message); // Map over the array and extract the error message for each error
        return errors.join(', '); // Return a comma-separated list of error messages
    }

    // Check if the error is a duplicate key error
    if (error.code === 11000) {
        // If it is, extract the key and value that caused the error and send a message back to the client
        const key = Object.keys(error.keyPattern)[0]; // Get the key that caused the error
        const value = error.keyValue[key]; // Get the value of the key that caused the error
        const message = `A user with the ${key} '${value}' already exists.`; // Create an error message

        return message; // Return the error message
    }

    // If the error is not a validation error or a duplicate key error, log the error and send a server error message back to the client
    console.error(error); // Log the error to the console
    return 'Internal server error'; // Return a generic error message
};
