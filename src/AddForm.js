import React from 'react';
import {Button, Icon, Layout, message, Input, Form, DatePicker, Select} from 'antd';
const {Header, Footer, Sider, Content} = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class AddForm extends React.Component {
    static propTypes = {
        onSubmit: React.PropTypes.func.isRequired
    }

    render() {
        const {onSubmit, form} = this.props;
        const {getFieldDecorator} = form;
        return <Form>
            <FormItem>
                {getFieldDecorator('car_id', {
                    rules: [{required: true, message: '不能为空'}],
                })(<Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                          placeholder="车牌号码"/>)}
            </FormItem>
            <FormItem>
                {getFieldDecorator('nickname')(<Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                                      type="text"
                                                      placeholder="客人昵称"/>)}
            </FormItem>
            <FormItem>
                {getFieldDecorator('change_time', {
                    rules: [{required: true, message: '不能为空'}],
                })(<DatePicker format={'YYYY-MM-DD'}
                               placeholder="更换机油的日期"
                               style={{width: '100%'}}/>)}
            </FormItem>
            <FormItem>
                {getFieldDecorator('change_mile', {
                    rules: [{required: true, message: '不能为空'}],
                })(<Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                          type="text"
                          placeholder="上次更换公里数"/>)}
            </FormItem>
            <FormItem>
                {getFieldDecorator('sug_mile', {
                    rules: [{required: true, message: '不能为空'}],
                })(<Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                          type="text"
                          placeholder="建议更换公里数"/>)}
            </FormItem>
            <FormItem>
                {getFieldDecorator('oil_type', {
                    rules: [{required: true, message: '请选择机油类型'}],
                })(<Select placeholder="机油类型">
                    <Option value="嘉实多磁护">嘉实多磁护</Option>
                    <Option value="金嘉护">金嘉护</Option>
                    <Option value="壳牌H7">壳牌H7</Option>
                    <Option value="壳牌H5">壳牌H5</Option>
                    <Option value="壳牌H3">壳牌H3</Option>
                </Select>)}
            </FormItem>
            <FormItem>
                <Button style={{width: '100%'}} type="primary" htmlType="submit" onClick={() => {
                    form.validateFields((err, values) => {
                        if (!err) {
                            !values.nickname && form.setFieldsValue({'nickname': '客户'});
                            onSubmit(form.getFieldsValue());
                            form.resetFields();
                        }
                    });
                }}>添加</Button>
            </FormItem>
        </Form>
    }
}

export default Form.create({})(AddForm);