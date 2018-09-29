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
         show:false
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
    showPlay(){
        console.log(1);
        var show = this.state.show;
        this.setState({show:!show});
    },
    render:function(){
        var showFlag = this.state.show;
        var showbox;
        if(showFlag){
            showbox = <div className="row playChoose">
                        <ul>
                            <li>2018年09月17日语音播报<i className="iconfont icon-bofang"></i></li>
                            <li>2018年09月17日语音播报<i className="iconfont icon-bofang"></i></li>
                            <li>2018年09月17日语音播报<i className="iconfont icon-bofang"></i></li>
                            <li>2018年09月17日语音播报<i className="iconfont icon-bofang"></i></li>
                            <li>2018年09月17日语音播报<i className="iconfont icon-bofang"></i></li>
                        </ul>
                    </div> 
        }else{
            showbox = null
        }         
        return (
            <div className="home">
                <Header title='首页' back='' menu='1'/>
                <Namecard/>
                <div className="content">
                    <img src="images/3.jpg"/>
                    <p>【早安心语】今天是7月31日 ，星期二，农历六月十九，这是多么美好的一天啊，充满着耐心与希望。生活中，很多时候都需要我们有耐心，耐心做人，耐心做事，更要耐心生活。我们也必须先学会承受，再学会参与。承受需要阅历和沉实，参与需要勇气和激情。生活就是在热情与平淡中慢慢磨合的，无论会遇到多少苦涩，我们最终还是会珍爱生活，珍惜每一个新的清晨，并对未来的日子充满信心和希冀。早安，今天的你。</p>
                    <div className="row funcmenu">
                        <div className="col-12 text-center">
                            <Link to='/record'>我要录制语音</Link>
                        </div>
                    </div>
                    <div className="tip">                        
                        <span>阅读 20000</span>
                        <span>点赞 1000</span>
                    </div>
                </div> 
                <Comments/>
                {showbox}
                <div className="row footer">
                    <div className="col-6" onClick={this.showPlay}>
                        播放选择
                    </div>
                    <div className="col-6">
                        <Link to='/rank'>排行榜</Link>
                    </div>
                </div>
            </div>
        )
    }
})