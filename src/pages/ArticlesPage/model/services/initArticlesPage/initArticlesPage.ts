import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlesPageInited } from 'pages/ArticlesPage/model/selectors/articlePageSelectors';
import { articlesPageActions } from 'pages/ArticlesPage/model/slices/articlesPageSlice';
import { fetchArticleList } from 'pages/ArticlesPage/model/services/fetchArticleList/fetchArticleList';

export const initArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'articlesPage/initArticlesPage',
    async (_, thunkApi) => {
        const { dispatch, getState } = thunkApi;
        const inited = getArticlesPageInited(getState());

        if (!inited) {
            dispatch(articlesPageActions.initState());
            dispatch(fetchArticleList({
                page: 1,
            }));
        }
    },
);
