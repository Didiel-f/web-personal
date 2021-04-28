import React from 'react';
import { Layout, Tabs } from 'antd';
import logo from '../../../assets/img/png/logo-white.png';
import { RegisterForm } from '../../../components/Admin/RegisterForm/RegisterForm';


import './SignIn.scss';
import { LoginForm } from '../../../components/Admin/LoginForm/LoginForm';
import { getAccessTokenApi } from '../../../api/auth';
import { Redirect } from 'react-router';

const SignIn = () => {

    const { Content } = Layout;
    const { TabPane } = Tabs;

    if ( getAccessTokenApi() ) {
        return <Redirect to="/admin" />
    }
    
    return (
        <Layout className="sign-in">
            <Content className="sign-in__content">
                <h1 className="sign-in__content-logo">
                    <img src={ logo } alt="Didiel Figueroa" />
                </h1>

                <div className="sign-in__content-tabs">
                    <Tabs type="card">
                        <TabPane tab={<span>Entrar</span>} key="1">
                            <LoginForm />
                        </TabPane>
                        <TabPane tab={<span>Nuevo usuario</span>}>
                            <RegisterForm />
                        </TabPane>
                    </Tabs>
                </div>
                
            </Content>
        </Layout>
    );
}

export default SignIn;