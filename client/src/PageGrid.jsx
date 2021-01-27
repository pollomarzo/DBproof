import { makeStyles, Grid } from '@material-ui/core';

/**
 * - insert new rel
 *   - profilo, contenuto
 */

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.background.default,
    display: 'flex',
    '& > *': {
      width: '50%',
    },
  },
  gridMainContainer: {
    width: '100%',
  },
  gridCell: {
    padding: theme.spacing(3),
    '& > *': {
      maxHeight: 600,
      overflow: 'auto',
    },
  },
}));

const groupBy = (groupSize, array) => {
  const result = [];
  let cursor = -1;
  array.forEach((item, index) => {
    if (index % groupSize === 0) {
      result.push([]);
      cursor++;
    }

    result[cursor].push(item);
  });
  return result;
};

const PageGrid = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Grid container className={classes.gridMainContainer}>
        {groupBy(2, children).map(([first, second], index) => (
          <Grid key={index} container>
            <Grid item xs={6} className={classes.gridCell}>
              {first}
            </Grid>
            <Grid item xs={6} className={classes.gridCell}>
              {second}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PageGrid;
