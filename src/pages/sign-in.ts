import redirectIfLoggedIn from '@/hocs/redirect-if-logged-in';
import withLoading from '@/hocs/with-loading';
import AuthenticationContainer from '@/modules/authentication/authentication-container';
import { compose } from 'redux';

export default compose(
  redirectIfLoggedIn('/'),
  withLoading,
)(AuthenticationContainer);
