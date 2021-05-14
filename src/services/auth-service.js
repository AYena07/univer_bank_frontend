import {backend_url} from "../config";

class AuthService {
    static getCookie(name) {
        if (!document.cookie) {
            return null;
        }
        const token = document.cookie.split(';')
            .map(c => c.trim())
            .filter(c => c.startsWith(name + '='));

        if (token.length === 0) {
            return null;
        }
        return decodeURIComponent(token[0].split('=')[1]);
    }

    static async login(user) {
        const response = await fetch(backend_url + '/api/api-token-auth/', {
            method: "POST",
            mode: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': AuthService.getCookie('csrftoken')
            },
            credentials: 'include',
            body: JSON.stringify(user)
        })
        const body = await response.json()
        document.cookie = `token=${body.token}; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT`
        return body;
    }

    static async register(user) {
        return fetch(backend_url + '/api/users/register/', {
            method: "POST",
            mode: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': AuthService.getCookie('csrftoken')
            },
            body: JSON.stringify(user)
        })
    }

    static async logout() {
        return fetch(backend_url + '/api/users/logout/', {
            method: "POST",
            mode: "cors",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': AuthService.getCookie('csrftoken'),
                'Authorization': 'Token ' + AuthService.getCookie('token')
            }
        }).then( response => {
            document.cookie = "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=jitsi.cruxlab.io;";
        })
    }
}

export default AuthService;
