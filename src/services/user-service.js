import {backend_url} from "../config";
import AuthService from "./auth-service";

class UserService {
    static async me() {
        return fetch(backend_url + '/api/users/me/', {
            method: "GET",
            mode: "cors",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + AuthService.getCookie('token'),
                //'X-CSRFToken': AuthService.getCookie('csrftoken')
            }
        })
    }
}

export default UserService;
