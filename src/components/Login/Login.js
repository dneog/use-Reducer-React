import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../Context/auth-Context';
import Input from '../UI/Input/Input';

const emailReducer =(state, action)=> {
  if(action.type==='User_Input'){
    return {value: action.val, isValid: action.val.includes('@')}
  }
  if(action.type=== 'Input_Blur'){
    return {value: state.value, isValid: state.value.includes('@')}
  }
  return {value: '', isValid: false}
  
}

const passwordReducer=(state, action)=> {
  if(action.type==='User_Input'){
    return {value: action.val, isValid: action.val.trim().length > 6}
  }
  if(action.type=== 'Input_Blur'){
    return {value: state.value, isValid: state.value.trim().length > 6}
  }
  return {value: '', isValid: false}
}
const Login = (props) => {
 
  
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchedEmail]= useReducer(emailReducer, {
    value: '',
    isValid: false
  });
  const [passwordState, dispatchedPassword]= useReducer(passwordReducer, {
    value: '',
    isValid: false
  })

  const authCtx= useContext(AuthContext);

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);



  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
   dispatchedEmail({type: 'User_Input', val: event.target.value});

    setFormIsValid(
     event.target.value.includes('@') && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
   dispatchedPassword({type:'User_Input', val: event.target.value })

    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchedEmail({type: 'Input_Blur' })

  };

  const validatePasswordHandler = () => {
    dispatchedPassword({type: 'Input_Blur'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input id='email' label='E-Mail' type='email' isValid={emailState.isValid} value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler}/>
        <Input id='password' label='password' type='password' isValid={passwordState.isValid} value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler}/>
       
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
