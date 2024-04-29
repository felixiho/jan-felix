import { curry } from 'ramda';
import { connect } from 'react-redux'; 

import RequiresPermission from './requires-auth-component';
import { RootState } from '@/redux/root-reducer';

function requiresPermission(
  NotPermittedComponent: React.ComponentType,
  selector: (state: RootState) => boolean,
  PermittedComponent: React.ComponentType,
) {
  const mapStateToProps = (state: RootState) => ({
    NotPermittedComponent,
    PermittedComponent,
    isPermitted: selector(state),
  });

  return connect(mapStateToProps)(RequiresPermission);
}

export default curry(requiresPermission);
