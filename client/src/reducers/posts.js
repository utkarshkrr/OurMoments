import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';

export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true }
        case END_LOADING:
            return { ...state, isLoading: false }
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload?.data || [], // Safe access with fallback
                currentPage: action.payload?.currentPage || 1,
                numberOfPages: action.payload?.numberOfPages || 0,
            };
        case FETCH_POST:
            return { ...state, post: action.payload };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload }; // Safe access with fallback
        case UPDATE:
        case LIKE:
            return { 
                ...state, 
                posts: (state.posts || []).map((post) => 
                    post._id === action.payload._id ? action.payload : post
                )
            };
        case COMMENT:
            return{
                ...state,
                posts: state.posts.map((post) => {
                    //return the post that got a comment
                    if(post._id === action.payload.id){
                        return action.payload;
                    }
                    //return all other posts normally
                    return post;
                })
            };
        case CREATE:
            return { ...state, posts: [...(state.posts || []), action.payload] }; // Safe access
        case DELETE:
            return { 
                ...state, 
                posts: (state.posts || []).filter((post) => post._id !== action.payload)
            };
        default:
            return state;
    }
}