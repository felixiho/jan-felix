import Router from 'next/router.js';
import { curry } from 'ramda';
import React, { PropsWithChildren, useEffect } from 'react';
import type { ConnectedProps } from 'react-redux';
import { connect } from 'react-redux';

import hoistStatics from './hoist-statics';
import { RootState } from '@/redux/root-reducer';

function redirect(predicate: (state: RootState) => boolean, path: string) {
  const mapStateToProps = (
    state: RootState,
  ): { shouldRedirect: boolean } & Record<string, any> => ({
    shouldRedirect: predicate(state),
  });

  const connector = connect(mapStateToProps);
  return hoistStatics(function <T>(
    HigherOrderComponent: React.ComponentType<Omit<T, 'shouldRedirect'>>,
  ) {
    function Redirect({
      shouldRedirect,
      ...props
    }: PropsWithChildren<T & ConnectedProps<typeof connector>>): JSX.Element {
      useEffect(() => {
        if (shouldRedirect) {
          Router.push(path);
        }
      }, [shouldRedirect]);
      return <HigherOrderComponent {...props} />;
    }

    return connector(Redirect);
  });
}

export default curry(redirect);
