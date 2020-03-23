import Vue from 'vue';
import Vuex from 'vuex';
import {getRequest} from "../utils/api";
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { Notification } from 'element-ui';


Vue.use(Vuex)
const now = new Date();
const store = new Vuex.Store({
    state: {
        routes: [],
        sessions: {},
        hrs: [],
        currentHr:JSON.parse(window.sessionStorage.getItem("user")),
        //本地用户id
        currentSession: null,
        filterKey: '',
        stomp:null,
        isDot:{}
    },
    mutations: {
        INIT_CURRENTHR(state,hr){
            this.state.currentHr=hr
        },
        initRoutes(state, data) {
            state.routes = data;
        },
        changeCurrentSession (state,currentSession) {
            state.currentSession = currentSession;
            Vue.set(state.isDot,state.currentHr.username+'#'+currentSession.username,false)
        },
        addMessage (state,msg) {
            let mss = state.sessions[state.currentHr.username+'#'+msg.to];
            if(!mss){
                // state.sessions[state.currentHr.username+'#'+msg.to]=[];
                //刷新视图
                Vue.set(state.sessions,state.currentHr.username+'#'+msg.to,[])
            }
            state.sessions[state.currentHr.username+'#'+msg.to].push({
                content:msg.content,
                date: new Date(),
                self: !msg.notSelf
            })
        },
        INIT_DATA(state) {
            //浏览器本地的聊天记录可以在这里处理
            let data = localStorage.getItem('vue-chat-session');
            if (data) {
                state.sessions = JSON.parse(data);
            }
        },
        INIT_HR(state, data) {
            state.hrs = data
        },
    },

    actions: {
        //建立websocket连接
        connect(context){
            context.state.stomp=Stomp.over(new SockJS('/ws/ep'));
            context.state.stomp.connect({},success=>{
                context.state.stomp.subscribe('/user/queue/chat',msg=>{
                    let body =msg.body
                    debugger
                    let recvMsg = JSON.parse(msg.body)
                    //消息提示
                    if(!context.state.currentSession||recvMsg.from!=context.state.currentSession.username){
                        Notification.info({
                            title: recvMsg.from+'发来一条消息',
                            message: recvMsg.content,
                            position: 'bottom-right'
                        })
                        //小红点
                        Vue.set(context.state.isDot,context.state.currentHr.username+'#'+recvMsg.from,true)
                    }
                    //不是自己发送的消息
                    recvMsg.notSelf=true;
                    recvMsg.to=recvMsg.from;
                    context.commit('addMessage',recvMsg)
                })
            },error=>{

            })
        },
        initData(context) {
            context.commit('INIT_DATA')
            getRequest('/chat/hrs').then(resp=>{
                if(resp){
                    context.commit('INIT_HR',resp)
                }
            })
        }
    }
})

store.watch(function (state) {
    return state.sessions
}, function (val) {
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
}, {
    deep: true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
})


export default store;