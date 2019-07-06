import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from '../search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-result',
	templateUrl: './result.component.html',
	styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnDestroy {
	userName: string;
	user;
	private sub: any;
	private subUser: any;
	constructor(private searchService: SearchService,
		private route: ActivatedRoute) { }

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.userName = params['query'];
			this.searchService.searchUser(this.userName);
		 });
		
		 this.subUser = this.searchService.getUser().subscribe(user => {
			this.user = user;
		});
	}
	ngOnDestroy() {
		this.sub.unsubscribe();
		this.subUser.unsubscribe();
	}
}
