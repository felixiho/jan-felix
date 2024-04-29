import { getAppFinishedLoading } from '@/modules/app-loading/app-loading-reducer';
import requiresAuth from './requires-auth';
import AppLoading from '@/modules/app-loading/app-loading-component';

export default requiresAuth(AppLoading, getAppFinishedLoading);
