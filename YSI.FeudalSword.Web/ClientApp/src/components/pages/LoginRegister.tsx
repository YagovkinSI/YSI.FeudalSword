import * as React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Button, Card, Form, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { ApplicationState } from '../../store';
import { authorizationActionCreators } from '../../store/Authorization/AuthorizationActionCreators';

const LoginRegister: React.FC = () => {
    const appState = useSelector(state => state as ApplicationState);
    const dispatch = useDispatch();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [loginError, setLoginError] = useState('');
    const [passwordError, setPasswordError] = useState('');    
    const [passwordConfirmError, setPasswordConfirmError] = useState('');

    const isLoading = appState.root.authorization.isBusy;
    const isLogin = useLocation().pathname === "/login"

    const submit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault();
        if (!validateForm(isLogin))
            return;
        if (isLogin)
            dispatch(authorizationActionCreators.login(login, password))
        else 
            dispatch(authorizationActionCreators.register(login, password, passwordConfirm));
    }
    
    const validateForm = (isLogin: boolean) => {
        let success = validateLogin() && 
            validatePassword() &&
            (isLogin || validatePasswordConfirm());   
        return success;
    }

    const validateLogin = () => {
        if (login === '')        
            setLoginError('Введите логин')        
        else
            return true;
        return false;
    }

    const validatePassword = () => {
        var lowercase =  /[a-z]/;
        var upercase =  /[A-Z]/;
        var digit =  /[0-9]/;
        if (password === '')
            setPasswordError('Введите пароль')
        else if (password.length < 6)
            setPasswordError('Пароль должен содержать не менее 6 символов')
        else if (!password.match(lowercase))
            setPasswordError('Пароль должен содержать строчную латинскую букву')
        else if (!password.match(upercase))
            setPasswordError('Пароль должен содержать заглавную латинскую букву')
        else if (!password.match(digit))
            setPasswordError('Пароль должен содержать цифру')
        else 
            return true;
        return false;
    }

    const validatePasswordConfirm = () => {
        if (passwordError === '' && passwordConfirm !== password)        
            setPasswordConfirmError('Введенные пароли не совпадают')        
        else
            return true;
        return false;
    }

    const loginFormGroup = (login: string, loginError: string) => {
        return (
            <Form.Group className="mb-3" controlId="formLogin">
                <Form.Label>Логин</Form.Label>
                <Form.Control 
                    placeholder = "Введите логин"
                    value = {login} 
                    onChange = {e => {
                        setLogin(e.target.value);
                        setLoginError('');
                    }} 
                    isInvalid = {loginError !== ''} />
                <Form.Control.Feedback type='invalid'>
                    {loginError}
                </Form.Control.Feedback>
            </Form.Group>
        )
    }    

    const passwordFormGroup = (password: string, passwordError: string) => {
        return (
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control 
                    type = "password"
                    placeholder = "Введите пароль"
                    value = {password} 
                    onChange = {e => {
                        setPassword(e.target.value);
                        setPasswordError('');
                        setPasswordConfirmError('');
                    }} 
                    isInvalid = {passwordError !== ''} />
                <Form.Control.Feedback type='invalid'>
                    {passwordError}
                </Form.Control.Feedback>
            </Form.Group>
        )
    }   

    const confirmPasswordFormGroup = (passwordConfirm: string, passwordConfirmError: string) => {
        return (
            <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Повторите пароль</Form.Label>
                <Form.Control 
                    type = "password"
                    placeholder = "Повторите пароль"
                    value = {passwordConfirm} 
                    onChange = {e => {
                        setPasswordConfirm(e.target.value);
                        setPasswordConfirmError('');
                    }} 
                    isInvalid = {passwordError !== ''} />
                <Form.Control.Feedback type='invalid'>
                    {passwordConfirmError}
                </Form.Control.Feedback>
            </Form.Group>
        )
    }

    const defaultButton = (
        <Button variant="primary" type="submit">
            {isLogin ? "Войти" : "Регистрация"}
        </Button>
    )

    const loadingButton = (
        <Button variant="primary" type="submit" disabled>                          
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            Загрузка...
        </Button>        
    )

    return (
        <div>
            <Card style={{ width: '18rem', margin: 'auto' }}>
                <Card.Header as="h5">{isLogin ? "Логин" : "Регистрация"}</Card.Header>
                <Card.Body>
                    <Form onSubmit={submit}>  
                        { loginFormGroup(login, loginError) }
                        { passwordFormGroup(password, passwordError) }
                        { isLogin 
                            ? <></>
                            : confirmPasswordFormGroup(passwordConfirm, passwordConfirmError)
                        }                                             
                        { isLoading 
                            ? loadingButton
                            : defaultButton
                        }
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )  
};

export default LoginRegister;
