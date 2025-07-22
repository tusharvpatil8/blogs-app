import api from "./api";


export function getBlogs(data) {
    return api.post("user/all-blogs", data);
}

export function getBlogDetails(data) {
    return api.get(`user/blogs/${data}`);
}

export function getRelatedBlogs(param,data){
    return api.post(`user/all-related-blogs/${param}`,data);
}
