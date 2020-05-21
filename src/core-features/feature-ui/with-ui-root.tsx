import React from 'react';
import jss from 'jss';
import jssPluginTemplate from 'jss-plugin-template';
import { CssBaseline } from '@material-ui/core';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import theme from './theme';

jss.setup(jssPreset());
jss.use(jssPluginTemplate());

export default function withUiRoot(Component: any) {
	function WithRoot(props: object) {
		// MuiThemeProvider makes the theme available down the React tree
		// thanks to React context.
		return (
		  <StylesProvider jss={ jss }>
        <ThemeProvider theme={theme}>
          {/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />

          <Component {...props} />
        </ThemeProvider>
      </StylesProvider>
		);
	}

	return WithRoot;
}
