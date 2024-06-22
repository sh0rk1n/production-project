import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticleViewType } from 'entities/Article';
import { ArticlePageSchema } from 'pages/ArticlesPage';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { fetchArticleList } from '../../model/services/fetchArticleList/fetchArticleList';

const articlesAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

const articlesPageSlice = createSlice({
    name: 'articlesPageSlice',
    initialState: articlesAdapter.getInitialState<ArticlePageSchema>({
        isLoading: false,
        error: undefined,
        ids: ['1', '2'],
        entities: {},
        view: ArticleViewType.SMALL,
    }),
    reducers: {
        setView: (state, action:PayloadAction<ArticleViewType>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
        },
        initState: (state) => {
            state.view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as ArticleViewType;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleList.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchArticleList.fulfilled,
                (
                    state,
                    action: PayloadAction<Article[]>,
                ) => {
                    state.isLoading = false;
                    articlesAdapter.setAll(state, action.payload);
                },
            )
            .addCase(fetchArticleList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },

});

export const {
    reducer: articlesPageReducer,
    actions: articlesPageActions,

} = articlesPageSlice;
