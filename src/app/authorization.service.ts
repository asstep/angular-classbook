import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DatePipe} from "@angular/common";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class AuthorizationService {
    token = localStorage.getItem('token');

    constructor(private http: HttpClient, public isDatePipe: DatePipe) {}

    retunrToken(){
       return localStorage.getItem('token');
    }
    postLogin(email, password) {
        const params = {email: email, password: password};
        return this.http.post('http://test-front.datamaster.com.ua/api/login', params);
    }

    getLessonsList() {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
        });
        return this.http.get('http://test-front.datamaster.com.ua/api/lessons', {headers}).pipe(
            /* map(res => {
                 console.log(res);
                 res.forEach(function (item) {
                     switch (item.name) {
                         case 'алгебра' : {
                             console.log('алегбра');
                         }
                         default : {
                             console.log('def');
                         }
                     }
                     console.log(item);
                 })
                 return res;
             })*/
        );
    }

    postAddHomeWork(value) {
        let endDate = this.isDatePipe.transform(value.endDate, 'yyyy-MM-LL HH:mm:ss');

        const params = JSON.stringify({
            lesson_id: value.lesson,
            end_date: endDate,
            text: value.textTask
        });

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
        });

        return this.http.post('http://test-front.datamaster.com.ua/api/homeworks', params, {headers: headers}).pipe(map((response: Response) => response))
    }
}