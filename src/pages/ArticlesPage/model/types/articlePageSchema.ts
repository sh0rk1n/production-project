import { EntityState } from '@reduxjs/toolkit';
import {
    Article, ArticleViewType, ArticleSortField, ArticleType,
} from 'entities/Article';
import { SortOrder } from 'shared/types';

export interface ArticlePageSchema extends EntityState<Article> {
    isLoading?:boolean
    error?:string

    // pagination
    page: number
    limit: number
    hasMore: boolean
    // filters
    view: ArticleViewType
    order: SortOrder
    sort:ArticleSortField
    search: string
    type:ArticleType

    _inited: boolean
}
