import React from 'react';
import {Button, Icon, Layout, Switch, message, Input, Table, Popover} from 'antd';
const {Header, Footer, Sider, Content} = Layout;
const Search = Input.Search;
import 'antd/dist/antd.css';
import './App.css';
import fetch from 'isomorphic-fetch';
import DataList from './DataList';
import AddForm from './AddForm';
import EditForm from './EditForm';
import config from '../config'
const address = __DEV__ ? 'localhost:3003' : config.serverAddress;

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            custorm: [],
            opened: false,
            visible: false,
            carID: ''
        };
    }

    /*添加表单的开关*/
    handleToggleOpened = () => {
        this.setState({
            opened: !this.state.opened
        })
    }

    /*编辑表单的开关*/
    handleToggleVisible = (key) => {
        this.setState({
            visible: !this.state.visible
        });
        if (key) {
            console.log(key);
            const custorm = this.state.custorm;
            custorm.forEach((val) => {
                val.chosen = false
            });
            const editedCustormIndex = custorm.findIndex((el) => el.key === key);
            custorm[editedCustormIndex].chosen = true;
            this.setState({
                custorm: custorm
            })
            console.log(this.state.custorm);
        }
    }
    /*搜索用户*/
    handleSearch = (e) => {
        this.setState({
            carID: e.target.value
        })
    }
    /*删除用户*/
    handleDelete = (key) => {
        fetch(`http://${address}/delete`, {
            method: 'post',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: `key=${key}`
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response)
                }
            })
            .then(json => {
                message.success('删除成功');
                const custormNow = this.state.custorm;
                const index = custormNow.findIndex((el) => el.key === key);
                custormNow.splice(index, 1);
                this.setState({
                    custorm: custormNow
                })
            })
            .catch(ex => {
                console.error('parsing failed', ex);
                message.error('删除失败，请重新再试');
            });
    }
    /*添加用户的请求方法*/
    handleSubmit = (custorm) => {
        fetch(`http://${address}/custorm`, {
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
                if (json.errCode == -1) {
                    message.error(json.errMsg);
                } else {
                    message.success('添加成功');
                    this.handleToggleOpened();
                    const custormNow = this.state.custorm;
                    custormNow.push(json.data);
                    this.setState({
                        custorm: custormNow
                    })
                }
            })
            .catch(ex => {
                console.error('parsing failed', ex);
                message.error('添加失败，请重新再试');
            });
    }
    /*编辑客户信息*/
    handleEdit = (custorm) => {
        const nowCustorm = this.state.custorm;
        const chosenCustormIndex = nowCustorm.findIndex((val) => val.chosen === true);
        fetch(`http://${address}/update`, {
            method: 'post',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: `key=${nowCustorm[chosenCustormIndex].key}&car_id=${custorm.car_id.toUpperCase()}&nickname=${custorm.nickname}&change_time=${custorm.change_time.format('YYYY-MM-DD')}&change_mile=${custorm.change_mile}&sug_mile=${custorm.sug_mile}&oil_type=${custorm.oil_type}`
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response)
                }
            })
            .then(json => {
                message.success('编辑成功');
                this.handleToggleVisible();
                /*编辑成功同时更新前端相关状态*/
                const time = custorm.change_time.format('YYYY-MM-DD');
                nowCustorm.splice(chosenCustormIndex, 1, Object.assign(nowCustorm[chosenCustormIndex], custorm, {change_time: time}));
                this.setState({
                    custorm: nowCustorm
                })
            })
            .catch(ex => {
                console.error('parsing failed', ex);
                message.error('编辑失败，请重新再试');
            });
    }
    componentDidMount = () => {
        fetch(`http://${address}/custorm`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response)
                }
            })
            .then(json => {
                message.success('加载成功');
                json.data.custorm.forEach((val) => {
                    val.chosen = false;
                });
                console.log(json.data.custorm);
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
        const {custorm, opened, visible} = this.state;
        return <Layout>
            <Header><Search placeholder="请输入车牌号码" style={{width: 200}} onChange={this.handleSearch}
            /> <Popover content={<AddForm onSubmit={this.handleSubmit}/>} title="custorm" trigger="click"
                        visible={opened}>
                <Button type={opened ? "danger" : "primary"}
                        onClick={this.handleToggleOpened}>{opened ? "关闭" : "添加"}</Button>
            </Popover></Header>
            <Content><DataList toggleVisible={this.handleToggleVisible} onEdit={this.handleEdit}
                               onDelete={this.handleDelete}
                               data={custorm.filter((el) => el.car_id.indexOf(this.state.carID.toUpperCase()) !== -1)}/></Content>
            <EditForm chosenCustorm={custorm.find((val) => val.chosen === true) || {}} onEdit={this.handleEdit}
                      toggleVisible={this.handleToggleVisible}
                      visible={visible}/>
        </Layout>
    }
}
