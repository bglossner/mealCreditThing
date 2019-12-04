import PostsAPIWrapper from './posts_wrapper';

export default class AvailabilityAPIWrapper extends PostsAPIWrapper {
    constructor(baseURL, getDefaultStatusResponseFunc) {
        super(baseURL, getDefaultStatusResponseFunc);
        this.postType = "availability";
    }
}