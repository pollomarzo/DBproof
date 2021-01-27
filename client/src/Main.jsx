import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Container, Tabs, Tab, Typography } from '@material-ui/core';

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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Account" /> {/* account, profilo, carta, paypal */}
          <Tab label="Cast" /> {/* membro del cast */}
          <Tab label="Contenuto" /> {/* contenuto, episodio, saga */}
          <Tab label="Opinione" /> {/* opinione */}
          <Tab label="Playlist" /> {/* playlist */}
          <Tab label="Guarda" />
          <Tab label="General" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Account />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Cast />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Item />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Feedback />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Playlist />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Watch />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <General />
      </TabPanel>
    </div>
  );
};

export default Main;
