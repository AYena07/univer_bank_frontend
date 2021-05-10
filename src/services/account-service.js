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
                'X-CSRFToken': AuthService.getCookie('csrftoken')
            }
        })
    }

    static async currencies() {
        return fetch(backend_url + '/api/currency/', {
            method: "GET",
            mode: "cors",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + AuthService.getCookie('token'),
                'X-CSRFToken': AuthService.getCookie('csrftoken')
            }
        })
    }

    static createAccount(account) {
        return fetch(backend_url + '/api/accounts/', {
            method: "POST",
            mode: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + AuthService.getCookie('token'),
                'X-CSRFToken': AuthService.getCookie('csrftoken')
            },
            body: JSON.stringify(account)
        })
    }

    static getAccount(id) {
        return fetch(backend_url + '/api/accounts/' + id + '/', {
            method: "GET",
            mode: "cors",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + AuthService.getCookie('token'),
                'X-CSRFToken': AuthService.getCookie('csrftoken')
            }
        })
    }

    static changeAccount(account) {
        return fetch(backend_url + '/api/accounts/' + account.id + '/', {
            method: "PUT",
            mode: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + AuthService.getCookie('token'),
                'X-CSRFToken': AuthService.getCookie('csrftoken')
            },
            body: JSON.stringify(account)
        })
    }

    static getCards() {
        return fetch(backend_url + '/api/cards/', {
            method: "GET",
            mode: "cors",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + AuthService.getCookie('token'),
                'X-CSRFToken': AuthService.getCookie('csrftoken')
            }
        })
    }

    static postCard(card) {
        return fetch(backend_url + '/api/cards/', {
            method: "POST",
            mode: "cors",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + AuthService.getCookie('token'),
                'X-CSRFToken': AuthService.getCookie('csrftoken')
            },
            body: JSON.stringify(card)
        })
    }

    static updateCard(card) {
        return fetch(backend_url + '/api/cards/' + card.id + '/', {
            method: "PUT",
            mode: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + AuthService.getCookie('token'),
                'X-CSRFToken': AuthService.getCookie('csrftoken')
            },
            body: JSON.stringify(card)
        })
    }

    static getAccountUsers(id) {
        return fetch (backend_url + '/api/accounts/' + id + '/users/', {
            method: "GET",
            mode: "cors",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + AuthService.getCookie('token'),
                'X-CSRFToken': AuthService.getCookie('csrftoken')
            }
        })
    }

    static getPaymentMethods() {
        return fetch (backend_url + '/api/payment_methods/', {
            method: "GET",
            mode: "cors",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + AuthService.getCookie('token'),
                'X-CSRFToken': AuthService.getCookie('csrftoken')
            }
        })
    }
}

export default AccountService;
