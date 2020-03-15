import React from 'react';
import PropTypes from 'prop-types';

const withLoading = (Component, FallbackOptions = {}) => {
  const {
    LoadingFallback: LoadingFallbackArg,
    ErrorFallback: ErrorFallbackArg,
  } = FallbackOptions;

  const Wrapped = ({
    loading,
    error,
    LoadingFallback: LoadingFallbackProp,
    ErrorFallback: ErrorFallbackProp,
    ...rest
  }) => {
    const LoadingFallback = getFallback(
      LoadingFallbackArg,
      LoadingFallbackProp,
      DefaultLoading,
    );
    const ErrorFallback = getFallback(
      ErrorFallbackArg,
      ErrorFallbackProp,
      DefaultError,
    );

    if (error) {
      return (
        <>
          {ErrorFallback ? (
            <ErrorFallback error={error} />
          ) : (
            <DefaultError />
          )}
        </>
      );
    }

    if (loading) {
      return (
        <>
          {LoadingFallback ? <LoadingFallback /> : <DefaultLoading />}
        </>
      );
    }

    return <Component {...rest} />;
  };

  Wrapped.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.any,
    LoadingFallback: PropTypes.func,
    ErrorFallback: PropTypes.func,
  };
  return Wrapped;
};
withLoading.propTypes = {
  Component: PropTypes.element,
  FallbackOptions: PropTypes.shape({
    LoadingFallback: PropTypes.func,
    ErrorFallback: PropTypes.func,
  }),
};

function getFallback(arg, prop, defaultFallback) {
  if (prop) {
    return prop;
  }

  if (arg) {
    return arg;
  }

  return defaultFallback;
}

const DefaultError = () => <div>Error</div>;
const DefaultLoading = () => <div>Loading...</div>;

export default withLoading;
export { DefaultError, DefaultLoading }; // these are exported for testing
