import React from 'react';
import {Button, Icon, Layout, message, Input, Table} from 'antd';
const {Header, Footer, Sider, Content} = Layout;
const Search = Input.Search;

const columns = [{
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
}];

export default class DataList extends React.Component {
    static propTypes = {
        data: React.PropTypes.array.isRequired
    }

    render() {
        const {data} = this.props;
        return <Table columns={columns} dataSource={data}/>
    }
}
