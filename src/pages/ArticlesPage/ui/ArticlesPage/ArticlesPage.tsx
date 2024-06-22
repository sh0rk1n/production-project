import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { ArticleList, ArticleViewType } from 'entities/Article';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { ArticleViewSelector } from 'features/ArticleViewSelector/ArticleViewSelector';
import { fetchArticleList } from '../../model/services/fetchArticleList/fetchArticleList';
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../model/selectors/articlePageSelectors';
import { articlesPageActions, articlesPageReducer, getArticles } from '../../model/slices/articlesPageSlice';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

const reducers:ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const error = useSelector(getArticlesPageError);
    const view = useSelector(getArticlesPageView);

    const onChangeView = useCallback((view:ArticleViewType) => {
        dispatch(articlesPageActions.setView(view));
        dispatch(articlesPageActions.initState);
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchArticleList());
    }, []);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.ArticlesPage, {}, [className])}>
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
                <ArticleList
                    isLoading={isLoading}
                    view={view}
                    articles={articles}
                />
            </div>
        </DynamicModuleLoader>

    );
};

export default memo(ArticlesPage);
