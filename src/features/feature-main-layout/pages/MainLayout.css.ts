import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

import css from '../../../core-features/feature-ui/css';

export const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  // ======================================================
  // EXAMPLE 1 ON css templating
  // ======================================================
  root: css`
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: hidden;
  `,
  appFrame: css`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
  `,
  appBar: css`
    z-index: ${theme.zIndex.drawer + 1};
    position: absolute;
  `,
  navIconHide: {
    [theme.breakpoints.up('md')]: css`
      display: none;
    `,
  },
  drawerPaper: {
    ...css`
      width: 250px;
      background-color: ${theme.palette.background.default};
    `,
    [theme.breakpoints.up('md')]: css`
      width: ${drawerWidth}px;
      position: relative;
      height: 100%;
    `,
  },
  content: {
    ...css`
      background-color: ${theme.palette.background.default};
      width: 100%;
      height: calc(100% - 56px);
      margin-top: 56px;
    `,
    [theme.breakpoints.up('sm')]: css`
      height: calc(100% - 64px);
      margin-top: 64px;
    `,
  },

  // ======================================================
  // EXAMPLE 2: OBJECT props
  // ======================================================
  //root: {
  //  width: '100%',
  //  height: '100%',
  //  zIndex: 1,
  //  overflow: 'hidden',
  //},
  //appFrame: {
  //  position: 'relative',
  //  display: 'flex',
  //  width: '100%',
  //  height: '100%',
  //},
  //appBar: {
  //  zIndex: theme.zIndex.drawer + 1,
  //  position: 'absolute',
  //},
  //navIconHide: {
  //  [theme.breakpoints.up('md')]: {
  //    display: 'none',
  //  },
  //},
  //drawerPaper: {
  //  width: 250,
  //  backgroundColor: theme.palette.background.default,
  //  [theme.breakpoints.up('md')]: {
  //    width: drawerWidth,
  //    position: 'relative',
  //    height: '100%',
  //  },
  //},
  //content: {
  //  backgroundColor: theme.palette.background.default,
  //  width: '100%',
  //  height: 'calc(100% - 56px)',
  //  marginTop: 56,
  //  [theme.breakpoints.up('sm')]: {
  //    height: 'calc(100% - 64px)',
  //    marginTop: 64,
  //  },
  //},
}));

export default useStyles;
