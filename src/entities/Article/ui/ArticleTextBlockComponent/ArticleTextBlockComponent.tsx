import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleTextBlockComponent.module.scss';

interface ArticleITextBlockComponentProps {
    className?: string;
}

export const ArticleTextBlockComponent = ({ className }: ArticleITextBlockComponentProps) => (
    <div className={classNames(cls.ArticleITextBlockComponent, {}, [className])} />
);
