import "./style.less";
import {hashHistory,browserHistory,Link} from "react-router";
import url from "../../config/config";
export default React.createClass({
    getInitialState(){
        return {
    
        }
      },
      getDefaultProps(){
          return {
              
              
          } 
      },
    componentWillMount(){
        var that = this;
        var data = {
            labelId:4, 
            currentPage:1,
            pageSize:2
        }
        var dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})
		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
		}
        /* fetch(url.url +'loanProduct',{
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method:"POST",body:dataStr})
            .then(r=>r.json())
            .then((data)=>{                  
                  if(data){
                    that.setState({
                          data:data.list
                      })
                }
        }) */
    },
    render:function(){
        return (
            <div className="login">
                <form className="form-signin">
                    <div className="text-center mb-4">
                        <h5 className="h5 mb-3 font-weight-normal">登录</h5>
                    </div>

                    <div className="form-label-group">
                        <label>手机号</label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="请输入手机号" required=""/>
                     </div>

                    <div className="form-label-group">
                        <label>登录密码</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="请输入登录密码" required=""/>
                    </div>


                    <button className="btn btn-md btn-block" type="submit">登录</button>
                    <p className="mt-5 mb-3 text-muted text-center"><Link to='reg'>立即注册</Link></p>
                </form>
            </div>
        )
    }
})