import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs';

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        like(state, action) {
            const changedBlog = action.payload;
            const { id } = action.payload;

            const newState = state.map(b => b.id !== id ? b : changedBlog);
            return newState;

        },
        setBlogs(state, action) {
            return action.payload;
        },
        appendBlog(state, action) {
            state.push(action.payload);
        },
    },
});

export const { setBlogs, appendBlog, like } = blogSlice.actions;

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll();
        dispatch(setBlogs(blogs));
    };
};

export const createBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog);
        dispatch(appendBlog(newBlog));
    };
};

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id);
        dispatch(setBlogs());
    };
};

export const likeBlog = (id, blog) => {
    return async dispatch => {
        const likedBlog = await blogService.update(id, blog);
        dispatch(like(likedBlog))
    };
};

export default blogSlice.reducer;