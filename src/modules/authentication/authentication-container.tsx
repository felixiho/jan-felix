import { ConnectedProps, connect } from 'react-redux';
import { LoginComponent } from './authentication-component';
import { getIsAuthenticating, login } from './authentication-reducer';
import { ComponentType, ReactNode, useEffect, useState } from 'react'; 
import { RootState } from '@/redux/root-reducer';
import redirectIfLoggedIn from '@/hocs/redirect-if-logged-in';

const LoginContainer: ComponentType<UserAuthenticationPropsFromRedux> = ({
  ...props
}: {
  onSubmit: any;
  loading: boolean;
}): ReactNode => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LoginComponent
      {...props}
      email={email}
      password={password}
      onChangeEmail={e => setEmail(e)}
      onChangePassword={setPassword}
    />
  );
};

const mapDispatchToProps = {
  onSubmit: login,
};

const mapStateToProps = (state: RootState) => ({
  loading: getIsAuthenticating(state),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type UserAuthenticationPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LoginContainer);
