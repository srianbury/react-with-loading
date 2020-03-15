# react-with-loading [![Build Status](https://travis-ci.org/srianbury/react-with-loading.svg?branch=master)](https://travis-ci.org/srianbury/react-with-loading)

react-with-loading-srian is a react HOC that show your data after it's been fetched, a loader when it's loading, and an error when it fails.

### Install
`npm i react-with-loading-srian`

### Quick Start
![Basic Example](https://github.com/srianbury/react-with-loading/blob/master/images/basic_example.PNG)

[![Edit with-loading-basic](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/confident-archimedes-om29l?fontsize=14&hidenavigation=1&theme=dark)

### Advanced Use Example
[![Edit with-react-loading-advanced-usage](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/festive-wildflower-xxtpr?fontsize=14&hidenavigation=1&theme=dark)

### PropTypes
```
withLoading.propTypes = {
  Component: PropTypes.element,
  FallbackOptions: PropTypes.shape({  // FallbackOptions allows you to write your own HOC with your own default Fallbacks
    LoadingFallback: PropTypes.func,
    ErrorFallback: PropTypes.func,
  }),
};
```
```
Wrapped.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.any,
  LoadingFallback: PropTypes.func,
  ErrorFallback: PropTypes.func,
};
```
