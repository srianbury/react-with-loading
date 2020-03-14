import React from 'react';
import PropTypes from 'prop-types';

const withLoading = Component => {
  const Wrapped = ({
    loading,
    error,
    ErrorFallback,
    LoadingFallback,
    ...rest
  }) => {
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
    ErrorFallback: PropTypes.func,
    LoadingFallback: PropTypes.func,
  };
  return Wrapped;
};
withLoading.propTypes = {
  Component: PropTypes.element,
};

const DefaultError = () => <div>Error</div>;
const DefaultLoading = () => <div>Loading...</div>;

export default withLoading;
export { DefaultError, DefaultLoading }; // these are exported for testing
