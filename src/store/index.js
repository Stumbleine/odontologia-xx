import { configureStore } from "@reduxjs/toolkit";
import AccountSlice from "./AccountSlice";
import AuthSlice from "./AuthSlice";
import UsersSlice from "./UsersSlice";
import NewsSlice from "./NewsSlice";

export default configureStore({
    reducer:{
        auth: AuthSlice,
        account:AccountSlice,
        users: UsersSlice,
        news: NewsSlice
    }
})