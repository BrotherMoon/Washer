import React from 'react';
import {Button, Icon, Layout, message, Input, Form, DatePicker} from 'antd';
const {Header, Footer, Sider, Content} = Layout;
const FormItem = Form.Item;

class AddForm extends React.Component {
    static propTypes = {
        onSubmit: React.PropTypes.func.isRequired
    }

    render() {
        const {onSubmit, form} = this.props;
        const {getFieldDecorator} = form;
        return <Form>
            <FormItem>
                {getFieldDecorator('car_id')(<Input required={true}
                                                    prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                                    placeholder="车牌号码"/>)}
            </FormItem>
            <FormItem>
                {getFieldDecorator('nickname')(<Input required={true}
                                                      prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                                      type="text"
                                                      placeholder="客人昵称"/>)}
            </FormItem>
            <FormItem>
                {getFieldDecorator('change_time')(<DatePicker format={'YYYY-MM-DD'} required={true}
                                                              placeholder="更换机油的日期"
                                                              style={{width: '100%'}}/>)}
            </FormItem>
            <FormItem>
                {getFieldDecorator('change_mile')(<Input required={true}
                                                         prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                                         type="text"
                                                         placeholder="上次更换公里数"/>)}
            </FormItem>
            <FormItem>
                {getFieldDecorator('sug_mile')(<Input required={true}
                                                      prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                                      type="text"
                                                      placeholder="建议更换公里数"/>)}
            </FormItem>
            <FormItem>
                {getFieldDecorator('oil_type')(<Input required={true}
                                                      prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                                      type="text"
                                                      placeholder="机油类型"/>)}
            </FormItem>
            <FormItem>
                <Button style={{width: '100%'}} type="primary" htmlType="submit" onClick={() => {
                    onSubmit(this.props.form.getFieldsValue());
                }}>添加</Button>
            </FormItem>
        </Form>
    }
}

export default Form.create({})(AddForm);