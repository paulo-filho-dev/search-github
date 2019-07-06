import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../search.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	@Input() userName;
	form;
	constructor(	
		private searchService: SearchService,
		private fb: FormBuilder,
		private router: Router) { }

	ngOnInit() {
		this.form = this.fb.group({
			userName: [(this.userName ? this.userName : '')],
		})
	}
	onSubmit(){
		this.router.navigate(['/result', this.form.value.userName]);
	}
}
