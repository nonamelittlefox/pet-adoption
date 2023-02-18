import { Config } from 'src/const';
import { WebView } from 'react-native-webview';

import React from 'react';
import useSelector from 'src/utils/useSelector';

const Payslip = () => {
  const token = useSelector((state) => state.misc.token);
  const linkPayslip = `${Config.PAYSLIP}/auth-mobile?token=`;

  const link = `${linkPayslip}${token}`;

  return (
    <WebView
      source={{ uri: link }}
    />
  );
};

export default Payslip;
