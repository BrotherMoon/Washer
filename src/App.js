import React from 'react';
import {Button, Icon, Layout, Switch, message, Input, Table, Popover} from 'antd';
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
            opened: false,
            carID: ''
        };
    }

    handleToggle = () => {
        this.setState({
            opened: !this.state.opened
        })
    }

    handleSearch = (e) => {
        this.setState({
            carID: e.target.value
        })
    }

    handleSubmit = (custorm) => {
        fetch(`http://localhost:3003/custorm`, {
            method: 'post',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: `car_id=${custorm.car_id.toUpperCase()}&nickname=${custorm.nickname}&change_time=${custorm.change_time.format('YYYY-MM-DD')}&change_mile=${custorm.change_mile}&sug_mile=${custorm.sug_mile}&oil_type=${custorm.oil_type}`
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response)
                }
            })
            .then(json => {
                message.success('添加成功');
                this.handleToggle();
                const custormNow = this.state.custorm;
                custormNow.push(json.data);
                this.setState({
                    custorm: custormNow
                })
            })
            .catch(ex => {
                console.error('parsing failed', ex);
                message.error('添加失败，请重新再试');
            });
    }

    componentDidMount = () => {
        fetch(`http://localhost:3003/custorm`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response)
                }
            })
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
            <Header><Search placeholder="请输入车牌号码" style={{width: 200}} onChange={this.handleSearch}
            /> <Popover content={<AddForm onSubmit={this.handleSubmit}/>} title="custorm" trigger="click"
                        visible={opened}>
                <Button type={opened ? "danger" : "primary"} onClick={this.handleToggle}>{opened ? "关闭" : "添加"}</Button>
            </Popover></Header>
            <Content><DataList data={custorm.filter((el) => el.car_id.indexOf(this.state.carID.toUpperCase()) !== -1)}/></Content>
        </Layout>
    }
}
