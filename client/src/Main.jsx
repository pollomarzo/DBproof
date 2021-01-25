import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Container, Tabs, Tab, Typography } from '@material-ui/core';

import { Account, Cast, Feedback, Item, Playlist, Watch } from './screens';

const TabPanel = ({ children, title, value, index, ...other }) => {
  return (
    <div hidden={value !== index} {...other}>
      {value === index && (
        <Container>
          <Typography variant="h1">{title}</Typography>
          {children}
        </Container>
      )}
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
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} title="Account">
        <Account />
      </TabPanel>
      <TabPanel value={value} index={1} title="Cast">
        <Cast />
      </TabPanel>
      <TabPanel value={value} index={2} title="Item">
        <Item />
      </TabPanel>
      <TabPanel value={value} index={3} title="Feedback">
        <Feedback />
      </TabPanel>
      <TabPanel value={value} index={4} title="Playlist">
        <Playlist />
      </TabPanel>
      <TabPanel value={value} index={5} title="Watch">
        <Watch />
      </TabPanel>
    </div>
  );
};

export default Main;
