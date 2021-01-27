import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Container, Tabs, Tab } from '@material-ui/core';

import {
  Account,
  Cast,
  Feedback,
  Item,
  Playlist,
  Watch,
  General,
} from './screens';

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Container>{children}</Container>}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Main = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  /**General, Account, Cast, Contenuto, Guarda, Opinione, Playlist */
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab label="General" />
          <Tab label="Account" /> {/* account, profilo, carta, paypal */}
          <Tab label="Cast" /> {/* membro del cast */}
          <Tab label="Contenuto" /> {/* contenuto, episodio, saga */}
          <Tab label="Guarda" />
          <Tab label="Opinione" /> {/* opinione */}
          <Tab label="Playlist" /> {/* playlist */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <General />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Account />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Cast />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Item />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Watch />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Feedback />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <Playlist />
      </TabPanel>
    </div>
  );
};

export default Main;
