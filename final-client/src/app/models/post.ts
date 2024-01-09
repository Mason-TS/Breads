import { Time } from "@angular/common";

export class Post {
    postId?: string;
    body?: string;
    postDate?: Date;
    username?: string;

    constructor(id?: string, body?: string, postDate?: Date, username?: string) {
        this.postId = id;
        this.body = body;
        this.postDate = postDate;
        this.username = username;
    }
}
