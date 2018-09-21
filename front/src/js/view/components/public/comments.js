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
            <div className="comments">
                <div className="row">
                    <div className="col-6 text-left">精选留言</div>
                    <div className="col-6 text-right">写留言</div>
                </div>
                <div className="row comment">
                    <div className="col-3">
                        <img className="avatar" src="images/1.jpg"/>
                    </div>
                    <div className="col-9">
                        <p className="username">Tofu</p>
                        <p>头像是我名片，我已坚持早起1天头像是我名片，我已坚持早起1天头像是我名片，我已坚持早起1天头像是我名片，我已坚持早起1天头像是我名片，我已坚持早起1天头像是我名片，我已坚持早起1天</p>
                    </div>
                </div>   
            </div>
        )
    }
})