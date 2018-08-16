import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UserModel } from '../models/user.model';
import { UsersService } from '../users.service';
import { UsersPaginationModel } from '../models/users-pagination.model';

@Component({
    selector: 'app-all',
    templateUrl: './all.component.html',
    styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
    public page: string;
    public search: string;
    public searchForm: FormGroup;
    public users: UserModel;
    public usersPagination: UsersPaginationModel;

    constructor(
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private usersService: UsersService
    ) { }

    ngOnInit() {
        // subscribe to router event
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            this.page = params['page'] || '1';
            this.search = params['search'] || '';
            this.getData();
        });
        this.searchForm = this.fb.group({
            search: this.search
        });
    }

    getData() {
        let query = `?page=${this.page}`;
        if (this.search) {
            query = query + `&search=${this.search}`;
        }
        this.usersService.allGet(query)
            .subscribe(
                (res: any) => {
                    if (!res.success) {
                        console.log(res.message)
                        return;
                    }
                    this.users = res.data.users;
                    this.usersPagination = res.data.usersPagination;
                },
                (err: any) => {
                    console.log(err);
                }
            );
    }

    onSubmitHandler(value) {
        this.search = value.search;
        this.router.navigate(
            ['/users/all'],
            { queryParams: { page: '1', search: this.search } }
        );
    }
}
