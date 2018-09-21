import {hashHistory,browserHistory} from "react-router";
import "./style.less";
import {add,reduce} from "../../../actions/actions";
import store from "../../../store/store";
import url from "../../config/config";
export default React.createClass({
    getInitialState(){
      return {
        data:{
            applyCondition: "身份证就能贷",
            applyCount: "38874",
            applyProcessImg: "",
            description: "大额借款，3分钟秒下",
            hotLabel: "large",
            labelIds: "3",
            limitUnit: "D",
            maxAmount: "20000",
            maxLimit: "7",
            minAmount: "5000",
            minLimit: "",
            name: "信用贷",
            proInstructions: "大额借款，3分钟秒下",
            rate: "0.067",
            rateType: "0.067"
            }
      }
    },
    getDefaultProps(){
        return {
            
            
        } 
    },
    componentWillMount(){
        var id = this.props.location.query.pro;
        console.log(id);
        var data = 'productId=' + id;
        var that = this;
        fetch(url.url +'toProductView',{
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method:"POST",body:data})
            .then(r=>r.json())
            .then((data)=>{
                // console.log(data);                  
                  if(data){
                    that.setState({
                          data:data
                      })
                }
        })
    },
    render:function(){ 
        var data = this.state.data;
        console.log(data);
        var labelIds = data.labelIds;
        var tags = labelIds.split(',');
        // console.log(tags);
        var taglist=[];
        tags.forEach(function(tag){
            switch(tag){
                case '1': taglist.push(<span key={tag}>热门推荐</span>);
                          break;
                case '2': taglist.push(<span key={tag}>小额快贷</span>);
                          break;
                case '3': taglist.push(<span key={tag}>大额低息</span>);
                          break;
                case '4': taglist.push(<span key={tag}>不上征信</span>);
                          break;
                case '5': taglist.push(<span key={tag}>不查芝麻</span>);
                          break;
                default: taglist.push(<span key={tag}>热门推荐</span>);
                          break;
            }
        })
        var rateType = data.rateType;
        var ratedes = '';
        switch(rateType){
            case 'D': ratedes = '日利率';
                      break;
            case 'M': ratedes = '月利率';
                      break;
            case 'Y': ratedes = '年利率';
                      break;
            default:  ratedes = '年利率';
                      break;
        }
        return (
            <div className="pro">
                <p className="tip">同时申请多个平台，可以大大提高下款率哦！</p>
                <div className="pro-basic">
                    <div className="row">
                        <div className="col-xs-4 pro-img">
                            <img className="" src='images/1.jpg'/>
                        </div>
                        <div className="col-xs-8 pro-info">
                            <p>
                                <span className='pro-name'>{data.name}</span>
                                <span className='pro-apply'>{data.applyCount}人申请</span>
                            </p>
                            <div className='clear'></div>
                            <p className='pro-tag'>
                                {taglist}
                            </p>
                            <p className='pro-intro'>{data.description}</p>
                        </div>
                        <div className='clear'></div>
                    </div>
                    <hr/>
                    <div className="row pro-param">
                        <div className="col-5">
                            <p className="param-tit">可贷金额</p>
                            <p className="param-data">{data.minAmount}-{data.maxAmount}元</p>
                        </div>
                        <div className="col-4">
                            <p className="param-tit">可贷期限</p>
                            <p className="param-data">{data.minLimit}-{data.maxLimit}个月</p>
                        </div>
                        <div className="col-3">
                            <p className="param-tit">{ratedes}</p>
                            <p className="param-data">0.067%</p>
                        </div>
                        <div className='clear'></div>
                    </div>
                </div>
                <div className="pro-basic">
                    <p className="pro-basic-tit">申请条件</p>
                    <hr/>
                    <p className="pro-basic-content">{data.applyCondition}</p>
                </div>
                <div className="pro-basic">
                    <p className="pro-basic-tit">申请流程</p>
                    <hr/>
                    <p className="pro-basic-content">
                        <img className="pro-basic-content-img" src={data.applyProcessImg}/>
                    </p>
                </div>
                <div className="pro-basic bottom-basic">
                    <p className="pro-basic-tit">产品说明</p>
                    <hr/>
                    <p className="pro-basic-content">
                        {data.proInstructions}
                    </p>
                </div>
               <div className='applyBt'>立即申请</div>
            </div>
        )
    }
})