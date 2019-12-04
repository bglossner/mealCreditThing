import PostsAPIWrapper from './posts_wrapper';

export default class HungerAPIWrapper extends PostsAPIWrapper {
    constructor(baseURL, getDefaultStatusResponseFunc) {
        super(baseURL, getDefaultStatusResponseFunc);
        this.postType = "hunger";
    }
}