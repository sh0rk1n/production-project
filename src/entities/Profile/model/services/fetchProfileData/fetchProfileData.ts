import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from 'entities/User';
import i18n from 'i18next';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Profile } from '../../types/Profile';

export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    'profile/fetchProfileData',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<Profile>('/profile');

            return response.data;
        } catch (err) {
            console.log(err);
            return rejectWithValue(i18n.t('Вы ввели неверный логин или пароль'));
        }
    },
);
