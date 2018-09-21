import Item from "../../components/mobile/item";
import Banner from "../../components/mobile/banner";
import {hashHistory,browserHistory} from "react-router";
import "./style.less";
import {add,reduce} from "../../../actions/actions";
import store from "../../../store/store";
import url from "../../config/config";
export default React.createClass({
    getInitialState(){
      return {
        
      }
    },
    getDefaultProps(){
        return {
            
            
        } 
    },
    componentWillMount(){

    },
    render:function(){
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
                <Item/>
                <Item/>
            </div>
        )
    }
})