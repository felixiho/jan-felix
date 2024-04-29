 
 
import { getIsAuthenticated } from '@/modules/authentication/authentication-reducer';
import curriedRedirect from './redirect';

console.log(typeof curriedRedirect);

export default curriedRedirect(getIsAuthenticated);
