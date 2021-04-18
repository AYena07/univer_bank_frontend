import {backend_url} from "../config";
import AuthService from "./auth-service";

class AccountService {
    static async accounts() {
        return fetch(backend_url + '/api/accounts/', {
            method: "GET",
            mode: "cors",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + AuthService.getCookie('token'),
            }
        })
    }
}

export default AccountService;
