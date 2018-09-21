import "./style.less";
import {hashHistory,browserHistory,Link} from "react-router";
export default React.createClass({
    render:function(){
        return (
            <div className="login">
                <form className="form-signin">
                    <div className="text-center mb-4">
                        <h5 className="h5 mb-3 font-weight-normal">注册</h5>
                    </div>

                    <div className="form-label-group">
                        <label>手机号</label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="请输入手机号" required=""/>
                     </div>

                    <div className="form-label-group">
                        <label>登录密码</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="请输入登录密码" required=""/>
                    </div>

                    <div className="form-label-group">
                        <label>确认密码</label>
                        <input type="password" id="inputPassword2" className="form-control" placeholder="请再次输入登录密码" required=""/>
                    </div>

                    <div className="form-label-group">
                        <label>手机验证码</label>
                        <div className='row'>
                            <div className='col-8'><input type="password" id="vcode" className="form-control" placeholder="请输入验证码" required=""/></div>
                            <div className='col-4'><div className='sendBtn'>发送验证码</div></div>
                        </div>
                    </div>

                    <button className="btn btn-md btn-block" type="submit">注册</button>
                    <p className="mt-5 mb-3 text-muted text-center"><Link to='login'>已有账号，立即登录</Link></p>
                </form>
            </div>
        )
    }
})