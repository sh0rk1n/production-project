import { memo, useCallback, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { ArticleType } from 'entities/Article';

interface ArticleTypeTabsProps {
    className?: string;
    value: ArticleType
    onChangeType: (type:ArticleType) => void
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
    const { className, value, onChangeType } = props;

    const typeTabs = useMemo<TabItem[]>(() => [
        {
            value: ArticleType.ALL,
            content: 'ВСЕ',
        },
        {
            value: ArticleType.IT,
            content: 'АЙТИ',
        }, {
            value: ArticleType.ECONOMICS,
            content: 'ЭКОНОМИКА',
        }, {
            value: ArticleType.SCIENCE,
            content: 'НАУКА',
        },
    ], []);

    const onTabClick = useCallback((tab: TabItem) => {
        onChangeType(tab.value as ArticleType);
    }, [onChangeType]);

    return (
        <Tabs
            tabs={typeTabs}
            value={value}
            onTabClick={onTabClick}
            className={classNames('', {}, [className])}
        />
    );
});
