import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';
import { HStack } from 'shared/ui/Stack';
import { ListBox } from 'shared/ui/ListBox/ListBox';

const MainPage = () => {
    const { t } = useTranslation();
    const [value, setValue] = useState('');

    const onChange = (val:string) => {
        setValue(val);
    };

    return (
        <Page>
            {t('Главная страница')}
            <div>dsds</div>
            <div>dsds</div>
            <HStack>
                <div>dsds</div>
                <div>dsds</div>
                <ListBox
                    defaultValue="Выбери значение"
                    onChange={(value:string) => {}}
                    value={undefined}
                    items={[
                        { value: '1', content: '123' },
                        { value: '3231', content: '23323123', disabled: true },
                        { value: '1323', content: '1232323' },
                    ]}
                />
            </HStack>
            <div>dsds</div>
            <div>dsds</div>
        </Page>
    );
};

export default MainPage;
