import React, { FunctionComponent } from 'react';

type DefaultModuleLayoutProps = {
};

const DefaultModuleLayout: FunctionComponent<DefaultModuleLayoutProps> = (props) => {
  const {
    children,
  } = props;

  return (
    <>
      { children }
    </>
  );
};

export default DefaultModuleLayout;
