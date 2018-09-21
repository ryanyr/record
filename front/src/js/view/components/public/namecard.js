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
            <div>
                <div className="namecard">
                    <div className="row">
                        <div className="col-3">
                            <img className="avatar" src="images/1.jpg"/>
                        </div>
                        <div className="col-9">
                            <p className="username">Tofu</p>
                            <p>头像是我名片，我已坚持早起1天</p>
                        </div>
                    </div>    
                </div>
            </div>
        )
    }
})