import {hashHistory,browserHistory,Link} from "react-router";
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
                        <div className="col-3" onClick={hashHistory.goBack}>{this.props.back}</div>
                        <div className="col-6">{this.props.title}</div>
                        <div className="col-3"></div>
                    </div>
                </div>
                <div className="headmenu">
                    <div className="row">
                        <div className="col-4" style={this.props.menu==1?{color:'red'}:{}}>
                            <Link to='/home' style={this.props.menu==1?{color:'red'}:{}}><i className="iconfont icon-erji"></i></Link>
                            <p><Link to='/home' style={this.props.menu==1?{color:'red'}:{}}>早安播报</Link></p>
                        </div>
                        <div className="col-4" style={this.props.menu==2?{color:'red'}:{}}>
                            <Link to='/rank' style={this.props.menu==2?{color:'red'}:{}}><i className="iconfont icon-paihangbang"></i></Link>
                            <p><Link to='/rank' style={this.props.menu==2?{color:'red'}:{}}>排行榜</Link></p>
                        </div>
                        <div className="col-4" style={this.props.menu==3?{color:'red'}:{}}>
                            <Link to='/my' style={this.props.menu==3?{color:'red'}:{}}><i className="iconfont icon-wode"></i></Link>
                            <p><Link to='/my' style={this.props.menu==3?{color:'red'}:{}}>我的</Link></p>
                        </div>
                    </div>    
                </div>
            </div>
        )
    }
})