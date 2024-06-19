import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleCodeBlockComponent.module.scss';

interface ArticleICodeBlockComponentProps {
    className?: string;
}

export const ArticleCodeBlockComponent = ({ className }: ArticleICodeBlockComponentProps) => (
    <div className={classNames(cls.ArticleICodeBlockComponent, {}, [className])} />
);
