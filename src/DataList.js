import React from 'react';
import {Button, Icon, Layout, message, Input, Table, Popconfirm} from 'antd';
const {Header, Footer, Sider, Content} = Layout;
const Search = Input.Search;

export default class DataList extends React.Component {
    static propTypes = {
        data: React.PropTypes.array.isRequired,
        onDelete: React.PropTypes.func.isRequired,
        onEdit: React.PropTypes.func.isRequired,
        toggleVisible: React.PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.columns = [{
            title: '车牌号码',
            dataIndex: 'car_id',
            key: 'car_id',
        }, {
            title: '客人昵称',
            dataIndex: 'nickname',
            key: 'nickname',
        }, {
            title: '上次更换时间',
            dataIndex: 'change_time',
            key: 'change_time',
        }, {
            title: '上次更换公里数',
            dataIndex: 'change_mile',
            key: 'change_mile',
        }, {
            title: '建议更换公里数',
            dataIndex: 'sug_mile',
            key: 'sug_mile',
        }, {
            title: '机油类型',
            dataIndex: 'oil_type',
            key: 'oil_type',
        }, {
            title: '',
            dataIndex: 'operation',
            render: (text, record, index) => {
                return <a onClick={() => this.props.toggleVisible(record.key)} href="#">编辑</a>
            },
        }, {
            title: '',
            dataIndex: 'operation1',
            render: (text, record, index) => {
                return <Popconfirm title="确定要删除该用户信息？" onConfirm={() => this.props.onDelete(record.key)}>
                    <a href="#">删除</a>
                </Popconfirm>
            },
        }];
    }

    render() {
        const {data, isRequired} = this.props;
        return <Table columns={this.columns} dataSource={data}/>
    }
}
