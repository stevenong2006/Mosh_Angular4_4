export class Post {
    userId!: Number;
    id!: number;
    title!: string;
    body!: string;
}

export class PostInfo {
    page!: Number;
    per_page!: Number;
    support: any;
    total!: Number;
    total_pages!: Number;
    data!: Post[];
}