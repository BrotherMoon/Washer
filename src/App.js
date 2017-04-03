import React from 'react';
import {Button, Icon, Layout, Switch, message, Input} from 'antd';
const {Header, Footer, Sider, Content} = Layout;
const Search = Input.Search;
import 'antd/dist/antd.css';
import './App.css';
import config from '../config';

export default class App extends React.Component {
    componentDidMount = () => {

    }

    render() {
        return <Layout>
            <Header>小康汽车美容部 <Search
                placeholder="请输入车牌号码"
                style={{width: 200}}
                onSearch={value => console.log(value)}
            /></Header>
            <Content>Content</Content>
            <Footer>Footer</Footer>
        </Layout>
    }
}
