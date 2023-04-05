import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private url = 'http://localhost:9000/api/'
    public currentUser: any;
    public currentUserToken = '';
    public selectedBuses;
    public lastRouteUsed = localStorage.getItem('lastRouteUsed');

    constructor(
        private http: HttpClient,
        private routerService: Router
    ) {}

    loginUser(loginObject) {
        return this.http.post(this.url + 'login', loginObject).toPromise();
    }

    logoutUser() {
        delete this.currentUser;
        delete this.currentUserToken;
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('lastRouteUsed')
        this.routerService.navigate(['/login'])
    }

    saveUser(user) {
        const userObj = user.empleado;
        this.getDataObjectById('empleados', userObj.empleadoId).then( data => {
            console.log(data)
            console.log(userObj)

            this.currentUser = data;
            this.currentUserToken = userObj.token;
            localStorage.setItem("token",  userObj.token);
            localStorage.setItem("userId",  userObj.empleadoId);
        }).then(data => {
            this.routerService.navigate(['/'])})
    }

    checkAuth() {
        this.getToken(localStorage.getItem('token')).then( data => {
            if (!data) {
                this.routerService.navigate(['/login'])
            } else {
                this.routerService.navigate([this.lastRouteUsed || '/'])
            }
        })
    }

    getToken(token) {
        return this.http.get(this.url + 'login/' + token).toPromise();
    }

    getDataObject(model) {
        return this.http.get(this.url + model).toPromise();
    }

    getDataObjectById(model, id) {
        return this.http.get(this.url + model + '/' + id).toPromise();
    }

    getDataObjectFiltered(model, filter) {
        console.log(filter)
        return this.http.get(this.url + model + '?' + JSON.stringify(filter)).toPromise();
    }

    addDataObject(model, object) {
        return this.http.post(this.url + model, object).toPromise();
    }

    editDataObject(model, object, id) {
        return this.http.put(this.url + model + '/' + id, object).toPromise();
    }

    deleteDataObject(model, id) {
        return this.http.delete(this.url + model + '/' + id).toPromise();
    }
}