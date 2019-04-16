import React from 'react'
import {Button} from 'antd'
class Home extends React.Component{
    constructor(){
        super()
        this.go = this.go.bind(this)
    }
    go(){
        let { history } = this.props
        history.push('/login')
    }
    render(){
        return (
            <div>
                这是home页面
                <Button type='dashed' onClick={this.go}> 测试 </Button>
            </div>
        )
    }
}
export default Home