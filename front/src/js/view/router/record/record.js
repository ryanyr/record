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
         data:[],
         recorder:{},
         playdisplay:false,
         uploaddisplay:false,
         playTipdisplay:false
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
    startRecording() {
        var that = this;
        var recorder = this.state.recorder;
        var audio = document.querySelector('audio');
        HZRecorder.get(function (rec) {
            that.setState({recorder:rec});
            that.state.recorder.start();
        });
    },
    stopRecording() {
        var recorder = this.state.recorder;
        var audio = document.querySelector('audio');
        recorder.stop();
        this.setState({
            playdisplay:true,
            uploaddisplay:true
        });
    },
    playRecording() {
        var recorder = this.state.recorder;
        var audio = document.querySelector('audio');
        recorder.play(audio);
        this.setState({
            playTipdisplay:true
        });
    },
    uploadAudio() {
        var recorder = this.state.recorder;
        var audio = document.querySelector('audio');
        recorder.upload("Handler1.ashx", function (state, e) {
            switch (state) {
                case 'uploading':
                    //var percentComplete = Math.round(e.loaded * 100 / e.total) + '%';
                    break;
                case 'ok':
                    //alert(e.target.responseText);
                    alert("上传成功");
                    break;
                case 'error':
                    alert("上传失败");
                    break;
                case 'cancel':
                    alert("上传被取消");
                    break;
            }
        });
    },
    render:function(){
        var playBtn;
        var playtip;
        if(this.state.playdisplay){
            playBtn = <button onClick={this.playRecording} type="button" className="btn btn-primary btn-sm">播放</button>
        } 
        if(this.state.playTipdisplay){
            playtip = <p>点击音乐播放键即可播放录音，如确认后可点击提交上传</p>
        } 
        var uploadBtn;
        if(this.state.uploaddisplay){
            uploadBtn = <button onClick={this.uploadAudio} type="button" className="btn btn-primary btn-sm">提交</button>
        }    
        return (
            <div className="home record">
                <Header title='上传录音'/>
                <div className="row hint">
                    <div className="col-3">
                        <img src='images/1.jpg'/>
                    </div>
                    <div className="col-9 tips">
                        <p>请录一段不少于5秒的录音内容，可以参考今日早安文案</p>
                    </div>
                </div>
                <div className="content">
                    <p>【早安心语】今天是7月31日 ，星期二，农历六月十九，这是多么美好的一天啊，充满着耐心与希望。生活中，很多时候都需要我们有耐心，耐心做人，耐心做事，更要耐心生活。我们也必须先学会承受，再学会参与。承受需要阅历和沉实，参与需要勇气和激情。生活就是在热情与平淡中慢慢磨合的，无论会遇到多少苦涩，我们最终还是会珍爱生活，珍惜每一个新的清晨，并对未来的日子充满信心和希冀。早安，今天的你。</p>
                </div>
                <div className="func">
                    <p>戴上耳机录音效果更好哦</p>
                    <div><audio controls="true"></audio></div>
                    <button onClick={this.startRecording} type="button" className="btn btn-primary btn-sm">录音</button>
                    <button onClick={this.stopRecording} type="button" className="btn btn-primary btn-sm">停止</button>
                    {playBtn}
                    {uploadBtn}
                    {playtip}
                </div>             
            </div>
        )
    }
})