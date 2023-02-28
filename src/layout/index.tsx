import React from 'react';
import Sidebar from 'src/components/Sidebar';
interface propsType {
  navigation: any;
}

const Layout = (props: propsType) => {
  return (
    <Sidebar />
  );
};

export default Layout;
