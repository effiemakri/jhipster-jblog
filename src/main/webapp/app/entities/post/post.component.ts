import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Post } from './post.model';
import { PostService } from './post.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-post',
    templateUrl: './post.component.html'
})
export class PostComponent implements OnInit, OnDestroy {
posts: Post[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private postService: PostService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.postService.query().subscribe(
            (res: ResponseWrapper) => {
                this.posts = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPosts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Post) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInPosts() {
        this.eventSubscriber = this.eventManager.subscribe('postListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
