import { backend_url } from "../config";
import AuthService from "./auth-service";

class TransactionService {
    static async transactions() {
        return fetch(backend_url + '/api/transactions/', {
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

    // static async transactions() {
    //     return [{
    //             "sender": 7,
    //             "recipient": 11,
    //             "cash": 123,
    //             "date": "2020.03.20"
    //         },
    //         {
    //             "sender": 9,
    //             "recipient": 7,
    //             "cash": 321,
    //             "date": "2021.03.21"
    //         },
    //         {
    //             "sender": 7,
    //             "recipient": 8,
    //             "cash": 123,
    //             "date": "2021.03.21"
    //         },
    //         {
    //             "sender": 9,
    //             "recipient": 11,
    //             "cash": 321,
    //             "date": "2020.03.20"
    //         }
    //     ]
    // }

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
}

export default TransactionService;