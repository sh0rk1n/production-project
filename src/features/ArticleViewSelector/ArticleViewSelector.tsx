import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleViewType } from 'entities/Article';
import ListIcon from 'shared/assets/icons/list-24-24.svg';
import TilesIcon from 'shared/assets/icons/tiled-24-24.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
    className?: string;
    view:ArticleViewType
    onViewClick: (view: ArticleViewType)=> void
}

const viewTypes = [
    {
        view: ArticleViewType.SMALL,
        icon: TilesIcon,
    },
    {
        view: ArticleViewType.BIG,
        icon: ListIcon,
    },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props;

    const onClick = (newView: ArticleViewType) => () => {
        onViewClick?.(newView);
    };

    return (
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map((viewType, index) => (
                <Button
                    theme={ButtonTheme.CLEAR}
                    onClick={onClick(viewType.view)}
                    key={index}
                >
                    <Icon
                        Svg={viewType.icon}
                        className={classNames('', { [cls.notSelected]: viewType.view !== view })}
                    />
                </Button>
            ))}
        </div>
    );
});
