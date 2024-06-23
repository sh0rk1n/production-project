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
        page: 1,
        hasMore: true,
        _inited: false,
    }),
    reducers: {
        setView: (state, action:PayloadAction<ArticleViewType>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
        },
        setPage: (state, action:PayloadAction<number>) => {
            state.page = action.payload;
        },
        initState: (state) => {
            const view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as ArticleViewType;
            state.view = view;
            state.limit = view === ArticleViewType.BIG ? 4 : 8;
            state._inited = true;
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
                    articlesAdapter.addMany(state, action.payload);
                    state.hasMore = action.payload.length > 0;
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
