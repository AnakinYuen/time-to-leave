import React, { useMemo, useContext } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Required } from 'utility-types';
import { ThemeContext } from 'src/providers/theme';

type Props = Required<React.Props<unknown>, 'children'>;

const Theme: React.FC<Props> = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const muiTheme = useMemo(() => {
    const isDarkTheme = theme === 'dark';
    document.body.classList.add(isDarkTheme ? 'body--dark' : 'body--light');
    document.body.classList.remove(isDarkTheme ? 'body--light' : 'body--dark');
    return createMuiTheme({
      palette: {
        primary: {
          light: '#f15a24',
          main: '#f15a24',
          dark: '#333',
        },
        secondary: {
          main: '#f15a24',
        },
        info: {
          light: '#fff',
          main: '#fff',
          dark: '#db4105',
        },
        type: theme,
      },
    });
  }, [theme]);

  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
};

export default Theme;
