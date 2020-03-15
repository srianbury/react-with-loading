import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withLoading, { DefaultError, DefaultLoading } from '.';

configure({ adapter: new Adapter() });

describe('with loading tests', () => {
  const Base = () => <div>Example</div>;
  const BaseWithLoading = withLoading(Base);

  const CustomError = () => <div>Custom Error Message</div>;
  const CustomErrorMessage = ({ error }) => <div>{error}</div>;

  const CustomLoader = () => <div>Custom Loader</div>;

  const withCustomLoading = Base =>
    withLoading(Base, {
      LoadingFallback: CustomLoader,
      ErrorFallback: CustomError,
    });
  const BaseWithCustomLoading = withCustomLoading(Base);

  const LoaderProp = () => (
    <div>
      Loading... I will override the custom loader from the args.
    </div>
  );

  const ErrorProp = () => (
    <div>Error... I will override the custom error from the args</div>
  );

  it('should run without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Base />, div);
  });

  it('should show Base', () => {
    const wrapper = mount(<BaseWithLoading loading={false} />);
    expect(wrapper.find(Base).length).toEqual(1);
  });

  it('should show loading', () => {
    const wrapper = mount(<BaseWithLoading loading={true} />);
    expect(wrapper.find(DefaultLoading).length).toEqual(1);
  });

  it('should show error', () => {
    const wrapper = mount(
      <BaseWithLoading loading={false} error={true} />,
    );
    expect(wrapper.find(DefaultError).length).toEqual(1);
  });

  it('should not show loader when error=true', () => {
    const wrapper = mount(
      <BaseWithLoading loading={false} error={true} />,
    );
    expect(wrapper.find(DefaultLoading).length).toEqual(0);
  });

  it('should show custom error component', () => {
    const wrapper = mount(
      <BaseWithLoading
        loading={false}
        error={true}
        ErrorFallback={CustomError}
      />,
    );
    expect(wrapper.find(CustomError).length).toEqual(1);
  });

  it('should show custom error message', () => {
    const error = 'Error.  Loading failed.';
    const wrapper = mount(
      <BaseWithLoading
        loading={false}
        error={error}
        ErrorFallback={CustomErrorMessage}
      />,
    );

    expect(wrapper.find(CustomErrorMessage).text()).toEqual(error);
  });

  it('should show custom loading component', () => {
    const wrapper = mount(
      <BaseWithLoading
        loading={true}
        LoadingFallback={CustomLoader}
      />,
    );
    expect(wrapper.find(CustomLoader).length).toEqual(1);
  });

  it('should not show default loader when custom loader is given', () => {
    const wrapper = mount(
      <BaseWithLoading
        loading={true}
        LoadingFallback={CustomLoader}
      />,
    );
    expect(wrapper.find(DefaultLoading).length).toEqual(0);
  });

  it('should show custom loader from args', () => {
    const wrapper = mount(<BaseWithCustomLoading loading={true} />);
    expect(wrapper.find(CustomLoader).length).toEqual(1);
  });

  it('should show custom error from args', () => {
    const wrapper = mount(
      <BaseWithCustomLoading loading={false} error={true} />,
    );
    expect(wrapper.find(CustomError).length).toEqual(1);
  });

  it('should show prop loader when arg loader and prop loader are given', () => {
    const wrapper = mount(
      <BaseWithCustomLoading
        loading={true}
        LoadingFallback={LoaderProp}
      />,
    );
    expect(wrapper.find(LoaderProp).length).toEqual(1);
  });

  it('should show prop error when arg error and prop error are given', () => {
    const wrapper = mount(
      <BaseWithCustomLoading
        loading={true}
        error={true}
        ErrorFallback={ErrorProp}
      />,
    );
    expect(wrapper.find(ErrorProp).length).toEqual(1);
  });
});
