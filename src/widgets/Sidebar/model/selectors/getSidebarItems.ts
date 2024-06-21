import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'widgets/assets/icons/main-20-20.svg';
import AboutIcon from 'widgets/assets/icons/about-20-20.svg';
import ProfileIcon from 'widgets/assets/icons/profile-20-20.svg';
import ArticleIcon from 'widgets/assets/icons/article-20-20.svg';
import { SidebarItemType } from 'widgets/Sidebar/model/types/sidebar';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: RoutePath.main,
                Icon: MainIcon,
                text: 'Главная',
            },
            {
                path: RoutePath.about,
                Icon: AboutIcon,
                text: 'О сайте',
            },
        ];

        if (userData) {
            sidebarItemsList.push(
                {
                    path: RoutePath.profile + userData.id,
                    Icon: ProfileIcon,
                    text: 'Профиль',
                    authOnly: true,
                },
                {
                    path: RoutePath.articles,
                    Icon: ArticleIcon,
                    text: 'Cтатьи',
                    authOnly: true,
                },
            );
        }
        return sidebarItemsList;
    },
);
