import React from 'react';
import {Button, Icon, Layout, Switch, message, Input, Table} from 'antd';
const {Header, Footer, Sider, Content} = Layout;
const Search = Input.Search;
import 'antd/dist/antd.css';
import './App.css';
import config from '../config';
import fetch from 'isomorphic-fetch';
import DataList from './DataList';
import AddForm from './AddForm';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            custorm: [],
            opened: false
        };
    }

    handleToggle = () => {
        this.setState({
            opened: !this.state.opened
        })
    }

    handleSubmit = (str) => {
        console.log(str);
    }
    componentDidMount = () => {
        fetch(`http://localhost:3003/custorm`)
            .then(response => response.json())
            .then(json => {
                message.success('加载成功');
                console.log(json.data);
                this.setState({
                    custorm: json.data.custorm
                })
            })
            .catch(ex => {
                console.error('parsing failed', ex);
                message.error('加载失败，请重新再试');
            });
    }

    render() {
        const {custorm, opened} = this.state;
        return <Layout>
            <Header><Search placeholder="请输入车牌号码" style={{width: 200}} onSearch={value => console.log(value)}
            /> <AddForm onSubmit={this.handleSubmit} onToggle={this.handleToggle} opened={opened}/></Header>
            <Content><DataList data={custorm}/></Content>
        </Layout>
    }
}
