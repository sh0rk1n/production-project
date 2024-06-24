import { memo, useCallback, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { ArticleSortField } from 'entities/Article/model/types/article';
import { SortOrder } from 'shared/types';
import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField
    order:SortOrder
    onChangeOrder: (newOrder: SortOrder) => void
    onChangeSort: (newOrder: ArticleSortField) => void
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const {
        className,
        sort,
        onChangeSort,
        onChangeOrder,
        order,
    } = props;

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
        {
            value: 'asc',
            content: 'возрастанию',
        },
        {
            value: 'desc',
            content: 'убыванию',
        },
    ], []);

    const sortOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
        {
            value: ArticleSortField.CREATED,
            content: 'дата создания ',
        },
        {
            value: ArticleSortField.TITLE,
            content: 'названию ',
        }, {
            value: ArticleSortField.VIEWS,
            content: 'просмотрам ',
        },
    ], []);

    // const changeSortHandler = useCallback((newSort: string) => {
    //     onChangeSort(newSort as ArticleSortField);
    // }, [onChangeSort]);
    //
    // const changeOrderHandler = useCallback((newOrder: string) => {
    //     onChangeOrder(newOrder as SortOrder);
    // }, [onChangeOrder]);

    return (
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
            <Select<ArticleSortField>
                options={sortOptions}
                label="Сортировать ПО"
                value={sort}
                onChange={onChangeSort}
            />
            <Select
                options={orderOptions}
                label="по"
                value={order}
                onChange={onChangeOrder}
                className={cls.order}
            />
        </div>
    );
});
