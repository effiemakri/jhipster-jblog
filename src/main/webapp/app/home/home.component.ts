import {Component, OnInit} from '@angular/core';
import {Post} from "../entities/post/post.model";
import {PostService} from "../entities/post/post.service";
import {ResponseWrapper} from "../shared/model/response-wrapper.model";

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]

})
export class HomeComponent implements OnInit {

    // get a list of our posts
    posts: Post[] = [];

    constructor(private postService: PostService) {}

    loadAll() {
        this.postService.query().subscribe(
            (res: ResponseWrapper) => {
                console.log(res.json);
                this.posts = res.json;
            },
            (res: ResponseWrapper) => {
                console.log(res.json);
            }
        );
    }

    ngOnInit() {
        console.log("ngOnInit ...");
        this.loadAll();
    }
}
