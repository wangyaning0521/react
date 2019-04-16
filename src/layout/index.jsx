import React from 'react'
import ReactDOM from 'react-dom'
import '../style.less'

import { Layout,Icon  } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import logo from '../images/logo.png'

class Hello extends React.Component {
    constructor() {
        super()
        this.state = {
            nav:
                [
                    {
                        label:'企业工作台',
                        icon:'bars',
                        action:true
                    },
                    {
                        label:'人事档案',
                        icon:'user'
                    },
                    {
                        label:'薪酬个税服务',
                        icon:'pay-circle'
                    },
                    {
                        label:'社保服务',
                        icon:'insurance'
                    },
                    {
                        label:'账单',
                        icon:'dollar'
                    }
                ],
            silder:
                [
                    {
                        label:'工作台',
                        icon:'windows'
                    },
                    {
                        label:'管家',
                        icon:'contacts'
                    },
                    {
                        label:'政策查询',
                        icon:'aliyun'
                    },
                    {
                        label:'HR工具',
                        icon:'key'
                    },
                    {
                        label:'公众号',
                        icon:'wechat'
                    }
                ]
        }
    }
    navAction( actionIndex ){

        let nav = this.state.nav

        let newNav = nav.map((item,index)=>{

            let obj = {
                label: item.label,
                icon : item.icon
            }

            if( actionIndex == index  ) obj.action = true

            return obj
        })

        this.setState({
            nav:newNav
        })

    }
    render() {
        let { nav, silder } = this.state
        return ( 
            <Layout className='layout'>
                <Header  className='layout-header'>
                    <div className='layout-header-logo'>
                        <img src={logo} alt="logo"/>
                    </div>
                    <div className='layout-header-nav'>
                        {
                            nav.map((item,index) => {
                                return ( <div key={index} onClick={this.navAction.bind(this,index)} className={item.action ? 'layout-header-nav-item action_item' :  'layout-header-nav-item' }> <Icon type={item.icon} /> <span> {item.label} </span> </div> )
                            })
                        }
                    </div>
                </Header>
                <Content className='layout-content'>
                    {this.props.children}
                </Content>
                <div className='silder'>
                    {
                        silder.map((item,index) => {
                            return ( <div key={index} className='silder-item'> <Icon type={item.icon} /> <span> {item.label} </span> </div> )
                        })
                    }
                </div>
            </Layout>
        )
    }
}

export default Hello