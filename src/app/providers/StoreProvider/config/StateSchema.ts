import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import {
    AnyAction, Dispatch, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { ProfileSchema } from 'entities/Profile';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from 'entities/Article';
import { ArticleDetailsCommentsSchema, ArticleDetailsPageSchema } from 'pages/ArticleDetailsPage';
import { AddCommentFormSchema } from 'features/addCommentForm';
import { ArticlePageSchema } from 'pages/ArticlesPage';
import { ScrollSaveSchema } from 'widgets/Page/ScrollSave';
import {
    ArticleDetailsPageRecommendationsSchema,
} from 'pages/ArticleDetailsPage/model/types/ArticleDetailsPageRecommendationsSchema';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema
    scrollSave: ScrollSaveSchema

    // async reducer
    loginForm?: LoginSchema
    profile?:ProfileSchema
    articleDetails?:ArticleDetailsSchema
    addCommentForm?:AddCommentFormSchema
    articlesPage?:ArticlePageSchema
    articleDetailsPage?:ArticleDetailsPageSchema
}

export type StateSchemaKey = keyof StateSchema
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>
export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    getMountedReducers: () => MountedReducers
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg
    dispatch?: Dispatch
    state: StateSchema
}
