import Header from "../../components/public/header";
import Namecard from "../../components/public/namecard";
import {hashHistory,browserHistory,Link} from "react-router";
import "./style.less";
import {add,reduce} from "../../../actions/actions";
import store from "../../../store/store";
import url from "../../config/config";
import utils from "../../../utils/utils";
import { ajax } from 'jquery'
export default React.createClass({
    getInitialState(){
      return {
         currentPage:1,
         pagesize:100,
         data:[],
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
        fetch(url.url +'loanProduct',{
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
        })
    },
    render:function(){
        return (
            <div className="home">
                <Header title='排行榜' back='' menu='3'/>
                <div className='userBox'>
                    <div className='row border-none'>
                        <div className="col-12">
                            <img className="avatar" src="images/1.jpg"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 text-left">姓名</div>
                        <div className="col-6 text-right">Tofu</div>
                    </div>
                    <div className="row">
                        <div className="col-6 text-left">账号</div>
                        <div className="col-6 text-right">1816250679</div>
                    </div>
                    <div className="row">
                        <div className="col-6 text-left">我的二维码</div>
                        <div className="col-6 text-right">查看</div>
                    </div>
                    <br/>
                    <div className="row border-none">
                        <div className="col-6 text-left title">我的播报</div>
                        <div className="col-6 text-right"></div>
                    </div>
                    <div className="row">
                        <div className="col-6 text-left">2018/9/1</div>
                        <div className="col-6 text-right"><i className="iconfont icon-bofang"></i></div>
                    </div>
                    <div className="row">
                        <div className="col-6 text-left">2018/9/1</div>
                        <div className="col-6 text-right"><i className="iconfont icon-bofang"></i></div>
                    </div>
                </div>
                
            </div>
        )
    }
})