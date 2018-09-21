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
         data:[]
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
        var ismobile = utils.isMobile();
        console.log(ismobile);
        var prolist=[];
        var data = this.state.data;
        console.log(data);
        if(ismobile){            
            for(var i=0;i<data.length;i++){
                prolist.push(<div className='row' key={i}><div className='col-12'><Link to={'/product?pro='+ data[i].id}><Item key={i} product={data[i]}/></Link></div></div>)
            }
        }else{
            for(var i=0;i<data.length;i=i+2){
                prolist.push(<div className='row' key={i}><div className='col-6'><Link to={'/productweb?pro='+ data[i].id}><Item key={i} product={data[i]}/></Link></div><div className='col-6'><Link to={'/productweb?pro='+ data[i].id}><Item key={i+1} product={data[i+1]}/></Link></div></div>)
            }
        }
        return (
            <div className="home">
                <div className="banner">
                <Banner/>
                </div>
                <div className="tag">
                    <span className='clicked'>热门推荐</span>
                    <span>小额快贷</span>
                    <span>大额低息</span>
                    <span>不上征信</span>
                    <span>不查芝麻</span>
                </div>
                {prolist}
            </div>
        )
    }
})