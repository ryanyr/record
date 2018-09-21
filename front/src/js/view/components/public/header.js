import {hashHistory,browserHistory} from "react-router";
import "./style.less";


export default React.createClass({
    getInitialState(){
        return {
            liked: true
        }
    },
    
    render(){
       
        return (
            <div className="headerBox">
                <div className="header">
                    <div className="row">
                        <div className="col-3">返回</div>
                        <div className="col-6">首页</div>
                        <div className="col-3"></div>
                    </div>
                </div>
                <div className="headmenu">
                    <div className="row">
                        <div className="col-4">
                            <i className="iconfont icon-erji"></i>
                            <p>早安播报</p>
                        </div>
                        <div className="col-4">
                            <i className="iconfont icon-paihangbang"></i>
                            <p>排行榜</p>
                        </div>
                        <div className="col-4">
                            <i className="iconfont icon-wode"></i>
                            <p>我的</p>
                        </div>
                    </div>    
                </div>
            </div>
        )
    }
})