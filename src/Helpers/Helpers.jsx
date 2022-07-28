export const userAccessingOwnResource = (userId, urlId) => userId == urlId;

// To be implemented after doing its backend work.
export const userAccessingManagedResource = (userId, urlId) => {
    // Check if user is managing required user data.
    // for now a simple implementation of admin role is implemented.
    if (userId ==1){
        return true;
    }else{
        return false;
    }
};
