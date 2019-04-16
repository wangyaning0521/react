import React from 'react';
import { withRouter } from 'react-router'
import { Form, Input, message,  Row,  Button  } from 'antd';

const FormItem = Form.Item;


import logo from '../images/logo.png'
// 验证规则

const emailRule = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
const passwordRule=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;

import  '../style/login.less'

//定义组件  
class Login extends React.Component{
    
    constructor(props) {
        super(props)
        this.state = {
            codeUrl:'',
            timestamp:'',
        }
    } 

    validateToNext( rule, value, callback ){
        
        switch( rule.field ){
            case 'username':
                if( value && !emailRule.test(value)  )  callback('请填写正确邮箱')
            break;
            case 'password':
                if( value && !passwordRule.test(value)   )  callback('请填写6-18位包含字符数字')
            break;
            case 'verification':
                if( value && value.length < 4   )  callback('验证码格式错误！')
            break;
        }
        callback()
    }

    /**
     * @event 登录
     */
    handleSubmit(){
        this.props.form.validateFields(
            (err , val ) => {
                if (!err) {
                    val.time = this.state.timestamp
                    
                }
            },
        );
    }

    componentDidMount(){
        let timestamp = (new Date()).valueOf();
        this.setState({
            timestamp,
            codeUrl:`/api/qlth-wf-base/api/user/validateCode/${timestamp}`
        })
    }

	render() {
        const { getFieldDecorator } = this.props.form;
        return (  
            <div className='Loginform'>
                <div className='logo'>
                    <span>你好，react</span>
                </div>
                <form>
                    <FormItem hasFeedback>
                        {
                            getFieldDecorator('email', {
                                rules: [
                                    {
                                        required: true, message: '账号不可为空'
                                    },
                                    {
                                        validator: this.validateToNext.bind(this),
                                    }
                                ],
                            })
                            (<Input  placeholder="Username" />)
                        }

                    </FormItem>
                    <FormItem hasFeedback>
                        {
                            getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true, message: '密码不可为空'
                                    },
                                    {
                                        validator: this.validateToNext.bind(this),
                                    }
                                ],
                            })
                            (<Input type="password"  placeholder="Password" />)
                        }
                    </FormItem>
                    <FormItem className='verificationFrom' hasFeedback>
                        {
                            getFieldDecorator('validateCode', {
                                rules: [
                                    {
                                        required: true, message: '验证码不可为空'
                                    },
                                    {
                                        validator: this.validateToNext.bind(this),
                                    }
                                ],
                            })
                            (<Input placeholder="填写验证码"  />)
                        }
                        <img src={this.state.codeUrl} alt="验证"/>
                    </FormItem>
                    <Row>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>
                            登录
                        </Button>
                        <p>
                            <span>hello,react</span>
                            <span>hello,react</span>
                        </p>
                    </Row>

                </form>
            </div>  
        );  
	}  
}

const LoginPage = Form.create()(Login);

export default withRouter(LoginPage)