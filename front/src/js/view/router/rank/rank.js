import Header from "../../components/public/header";
import Namecard from "../../components/public/namecard";
import Comments from "../../components/public/comments";
import Item from "../../components/mobile/item";
import Banner from "../../components/mobile/banner";
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
                <Header title='排行榜' back='' menu='2'/>
                <div className='row rankHead'>
                    <div className='col-3'>
                        <img className="avatar" src="images/1.jpg"/>
                        <p>第二名</p>
                        <p>Tofu</p>
                        <p><i className="iconfont icon-zan1"></i>100人</p>
                    </div>
                    <div className='col-6'>
                        <img className="avatar" src="images/1.jpg"/>
                        <p>第一名</p>
                        <p>Tofu</p>
                        <p><i className="iconfont icon-zan1"></i>100人</p>
                    </div>
                    <div className='col-3'>
                        <img className="avatar" src="images/1.jpg"/>
                        <p>第三名</p>
                        <p>Tofu</p>
                        <p><i className="iconfont icon-zan1"></i>100人</p>
                    </div>
                </div>
                <div className='rankList'>
                    <div className='row rankdetail'>
                        <div className='col-2 nameBox'>
                            <p>第1名</p>
                        </div>
                        <div className='col-2 avatarBox'>
                            <img className="avatar" src="images/1.jpg"/>
                        </div>
                        <div className='col-2 nameBox'>
                            <p>Tofu</p>
                        </div>
                        <div className='col-1 nameBox'>
                            <i className="iconfont icon-zan1"></i>
                        </div>
                        <div className='col-2 nameBox'>                        
                            <p>10000</p>                            
                        </div>
                        <div className='col-3 nameBox'>
                            <p>06:00:00</p>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
})