import React, {useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../Context/auth-Context';

const Home = (props) => {
  const AuthCtx= useContext(AuthContext);
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={AuthCtx.onLogout}>LogOut</Button>
    </Card>
  );
};

export default Home;
