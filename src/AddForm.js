import React from 'react';
import {Button, Icon, Layout, message, Input, Popover, Form, DatePicker} from 'antd';
const {Header, Footer, Sider, Content} = Layout;
const FormItem = Form.Item;

export default class AddForm extends React.Component {
    static propTypes = {
        opened: React.PropTypes.bool.isRequired,
        onToggle: React.PropTypes.func.isRequired,
        onSubmit: React.PropTypes.func.isRequired
    }

    render() {
        const {opened, onToggle, onSubmit} = this.props;
        return <Popover
            content={<Form className="login-form">
                <FormItem>
                    <Input required={true} ref="car_id" prefix={<Icon type="user" style={{fontSize: 13}}/>}
                           placeholder="车牌号码"/>
                </FormItem>
                <FormItem>
                    <Input required={true} ref="nickname" prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                           type="text"
                           placeholder="客人昵称"/>
                </FormItem>
                <FormItem>
                    <DatePicker required={true} placeholder="更换机油的日期" style={{width: '100%'}}/>
                </FormItem>
                <FormItem>
                    <Input required={true} ref="change_time" prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                           type="text"
                           placeholder="上次更换公里数"/>
                </FormItem>
                <FormItem>
                    <Input required={true} ref="sug_mile" prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                           type="text"
                           placeholder="建议更换公里数"/>
                </FormItem>
                <FormItem>
                    <Input required={true} ref="oil_type" prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                           type="text"
                           placeholder="机油类型"/>
                </FormItem>
                <FormItem>
                    <Button style={{width: '100%'}} type="primary" htmlType="submit" onClick={() => {
                        onSubmit(this.refs.car_id);
                    }}>添加</Button>
                </FormItem>
            </Form>}
            title="Title"
            trigger="click"
            visible={opened}
        ><Button type={opened ? "danger" : "primary"}
                 onClick={onToggle}>{opened ? "关闭" : "添加"}</Button></Popover>
    }
}
