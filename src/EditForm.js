import React from 'react';
import {Button, Icon, Layout, message, Input, Form, Modal, DatePicker, Select} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import moment from 'moment';

class EditForm extends React.Component {
    static propTypes = {
        onEdit: React.PropTypes.func.isRequired,
        toggleVisible: React.PropTypes.func.isRequired,
        visible: React.PropTypes.bool.isRequired,
        chosenCustorm: React.PropTypes.object
    }

    render() {
        const {onEdit, form, visible, toggleVisible, chosenCustorm} = this.props;
        const {getFieldDecorator} = form;
        return <Modal title="编辑用户" visible={visible} okText="保存" onCancel={() => toggleVisible('')}
                      onOk={() => {
                          form.validateFields((err, values) => {
                              if (!err) {
                                  !values.nickname && form.setFieldsValue({'nickname': '客户'});
                                  onEdit(form.getFieldsValue());
                              }
                          });
                      }}>
            <Form>
                <FormItem>
                    {getFieldDecorator('car_id', {
                        initialValue: chosenCustorm.car_id,
                        rules: [{required: true, message: '不能为空'}],
                    })(<Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                              placeholder="车牌号码"/>)}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('nickname', {
                        initialValue: chosenCustorm.nickname,
                    })(<Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                              type="text"
                              placeholder="客人昵称"/>)}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('change_time', {
                        initialValue: moment(),
                        rules: [{required: true, message: '不能为空'}],
                    })(<DatePicker format={'YYYY-MM-DD'}
                                   placeholder="更换机油的日期"
                                   style={{width: '100%'}}/>)}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('change_mile', {
                        initialValue: chosenCustorm.change_mile,
                        rules: [{required: true, message: '不能为空'}],
                    })(<Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                              type="text"
                              placeholder="上次更换公里数"/>)}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('sug_mile', {
                        initialValue: chosenCustorm.sug_mile,
                        rules: [{required: true, message: '不能为空'}],
                    })(<Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                              type="text"
                              placeholder="建议更换公里数"/>)}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('oil_type', {
                        initialValue: chosenCustorm.oil_type,
                        rules: [{required: true, message: '请选择机油类型'}],
                    })(<Select placeholder="机油类型">
                        <Option value="嘉实多磁护">嘉实多磁护</Option>
                        <Option value="金嘉护">金嘉护</Option>
                        <Option value="壳牌H7">壳牌H7</Option>
                        <Option value="壳牌H5">壳牌H5</Option>
                        <Option value="壳牌H3">壳牌H3</Option>
                    </Select>)}
                </FormItem>
            </Form>
        </Modal>
    }
}

export default Form.create()(EditForm);