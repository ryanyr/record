import {Router,Route,hashHistory,IndexRedirect,browserHistory,IndexRoute,withRouter,Switch} from "react-router";
import Rou from "./view/router/router";//跟路由
import Home from "./view/router/home/home";//首页
import Record from "./view/router/record/record";//录音页
import Rank from "./view/router/rank/rank";//排行榜
import My from "./view/router/my/my";//我的
import Other from "./view/router/other/other";//我的
import Avatar from "./view/router/my/my";//我的
import Login from "./view/router/login/loginRouter";//登录
import Reg from "./view/router/reg/loginRouter";//登录
import { Provider, connect } from "react-redux";
import store from "./store/store";
import 'babel-polyfill';//解决部分手机对es6object.assign的支持
export default React.createClass({
    enterMy(){
        window.scrollTo(0,0);
    },
    render:function(){
        return (
            <Provider store={store}>
            <Router history={hashHistory}>
                <Route path="/" component={Rou} onEnter={this.enterMy}>
                    <withRouter>                
                    <IndexRedirect to="home"/>                   
                    <Route path="home" component={Home} onEnter={this.enterMy}/>
                    <Route path="record" component={Record} onEnter={this.enterMy}/>
                    <Route path="rank" component={Rank} onEnter={this.enterMy}/>
                    <Route path="other" component={Other} onEnter={this.enterMy}/>
                    <Route path="my" component={My} onEnter={this.enterMy} />
                    <Route path="login" component={Login} onEnter={this.enterMy}/>
                    <Route path="reg" component={Reg} onEnter={this.enterMy}/>
                    </withRouter>                        
                </Route>                
            </Router>
            </Provider>
        )
    }
})