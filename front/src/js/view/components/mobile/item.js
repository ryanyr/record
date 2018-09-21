import {hashHistory,browserHistory,Link} from "react-router";
import "./style.less";

export default React.createClass({
  getInitialState(){
    return {
      ddd:""
    }
  },
  componentWillMount(){
    var data = this.props.product;
    // console.log(data);
    this.setState({data:data});
  },
  componentWillReceiveProps(){
     /* var data = this.props.product;
     console.log(data); */
  },
  btn(e){
      this.setState({
        ddd:e.target.value
      })
  },
    render(){
        var data = this.state.data;
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
            default:  break;
        }
        return (
            <div className='mitem'>
                <div className='row mitem-body'>
                    <div className='col-xs-3 mitem-imgbox'>
                        <img className='mitem-img' src={data.picture}/>
                    </div>                    
                    <div className='col-xs-9 mitem-r1'>
                        <p className='mitem-pname'>{data.name}</p>
                        <p className='mitem-pintro'>
                            {taglist}
                        </p>
                        <div className='row'>
                            <div className='col-xs-6 mitem-unit unit1'>
                                <p className='mitem-data'>{data.rate}</p>
                                <p className='mitem-param'>{ratedes}</p>
                            </div>
                            <div className='col-xs-6 mitem-unit unit2'>
                                <p className='mitem-data'>{data.maxAmount}元</p>
                                <p className='mitem-param'>最高可贷</p>
                            </div>
                        </div>
                    </div> 
                </div>
                <div className='mitem-intro'>
                    <span className='mitem-desc'>{data.description}</span>
                    <span className='mitem-apply'>{data.applyCount}人申请</span>
                    <div className='clear'></div>
                </div>
            </div>
        )
    }
})