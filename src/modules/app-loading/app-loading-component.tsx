 
import { useEffect } from 'react';
import type { ConnectedProps } from 'react-redux';
import { connect } from 'react-redux';
 
import { loadApp } from './app-loading-saga';

const mapDispatchToProps = { loadApp };

const connector = connect(undefined, mapDispatchToProps);

type AppLoadingPropsFromRedux = ConnectedProps<typeof connector>;

function AppLoadingComponent({ loadApp }: AppLoadingPropsFromRedux) {
  useEffect(() => {
    loadApp();
  }, [loadApp]);
 

  return (
    <div>Loading App.....</div>
  );
}

export default connector(AppLoadingComponent);
