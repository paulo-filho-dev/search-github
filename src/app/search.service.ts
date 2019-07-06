import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { User } from './user';

@Injectable({
	providedIn: 'root'
})
export class SearchService {
	private user: BehaviorSubject<User> = new BehaviorSubject(undefined);

	constructor(private http: HttpClient) { }

	getUser(): Observable<User> {
		return this.user.asObservable();
	}
	searchUser(userName){
		this.user.next(undefined);
		this.http.get(`${environment.API_URL}${userName}`).pipe(			
			catchError( error => {
				//Caso não encontre o usuário retorna null
				return of(null);
			})
		).subscribe(response => {
			if(response){
				this.getReposUser(userName, response);
			}else{
				this.user.next(response);
			}
		});
	}
	getReposUser(userName: string, user: User): Observable<any> {
		const repos = new BehaviorSubject(null);
		
		this.http.get(`${environment.API_URL}${userName}/repos`).pipe(			
			catchError( error => {
				//Caso não encontre o repositorios retorna null
				return of(null);
			})
		).subscribe(response => {
			user['repos'] = response;
			if(user.repos){
				user.repos.sort((a: any, b: any) => {
					return b.stargazers_count - a.stargazers_count;
				});
			}
			this.user.next(user);
		});

		return repos.asObservable();
	}

}
