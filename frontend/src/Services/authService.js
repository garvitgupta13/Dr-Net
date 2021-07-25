import jwtDecode from "jwt-decode";

export function getCurrentUser() {
    try {
        //get the token
        const jwt = localStorage.getItem("token");
        //extract user object
        const user = jwtDecode(jwt);
        return user;
    } catch (ex) {
        return null;
    }
}
