import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { Icon } from '@ant-design/compatible';
import { signInApi } from '../../../api/user';

import "./LoginForm.scss";
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../utils/constants';

export const LoginForm = () => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const { email, password } = inputs;

    const changeForm = ( e ) => {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value
            })
    };

    const login = async() => {
        const result = await signInApi( inputs );
        
        if ( result.message ) {
            notification['error']({
                message: result.message
            })
        } else {
            const { accessToken, refreshToken } = result;
            localStorage.setItem( ACCESS_TOKEN, accessToken );
            localStorage.setItem( REFRESH_TOKEN, refreshToken );

            notification["success"]({
                message: "Login correcto."
            });

            window.location.href = "/admin";
        }

    };
    
    
    return (
        <Form className="login-form" onChange={ changeForm } onFinish={ login }>
            <Form.Item>
                <Input
                    prefix={ <Icon type="user" style={{ color: "rgba(0,0,0,0.25)" }} /> }
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    className="login-form__input"
                    value={ email }
                    />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={ <Icon type="lock" style={{ color: "rgba(0,0,0,0.25)" }} /> }
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="login-form__input"
                    value={ password }
                />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="login-form__button">
                    Entrar
                </Button>
            </Form.Item>
        </Form>
    )
}
