<template>
    <!--vue总框架-->
    <div id="whole">
        <!-- <BigDipper ref="big_dipper"></BigDipper> -->
        <!-- <div id="particles-js">
            <div class="login">
                <div class="login-close" @click="$('.login').css('display','none')">关闭</div>
                <div class="login-top">登录</div>
                <div class="login-center clearfix">
                    <div class="login-center-img"><img src="img/name.png" /></div>
                    <div class="login-center-input">
                        <input type="text" name="" v-model="username" placeholder="请输入您的用户名"
                            onfocus="this.placeholder=''" onblur="this.placeholder='请输入您的用户名'" />
                        <div class="login-center-input-text">用户名</div>
                    </div>
                </div>
                <div class="login-center clearfix">
                    <div class="login-center-img"><img src="img/password.png" /></div>
                    <div class="login-center-input">
                        <input type="password" name="" v-model="password" placeholder="请输入您的密码"
                            onfocus="this.placeholder=''" onblur="this.placeholder='请输入您的密码'" />
                        <div class="login-center-input-text">密码</div>
                    </div>
                </div>
                <div class="login-button">登陆</div>
            </div>
            <div class="sk-rotating-plane"></div>
        </div>

        <div class="register">
            <div class="register-close" @click="$('.register').css('display','none')">关闭</div>
            <div class="register-top">注册</div>
            <div class="register-center clearfix">
                <div class="register-center-img"><img src="img/name.png" /></div>
                <div class="register-center-input">
                    <input type="text" name="" v-model="username" placeholder="请输入您的用户名" onfocus="this.placeholder=''"
                        onblur="this.placeholder='请输入您的用户名'" />
                    <div class="register-center-input-text">用户名</div>
                </div>
            </div>
            <div class="register-center clearfix">
                <div class="register-center-img"><img src="img/password.png" /></div>
                <div class="register-center-input">
                    <input type="password" name="" v-model="password" placeholder="请输入您的密码"
                        onfocus="this.placeholder=''" onblur="this.placeholder='请输入您的密码'" />
                    <div class="register-center-input-text">密码</div>
                </div>
            </div>
            <div class="register-center clearfix">
                <div class="register-center-img"><img src="img/password.png" /></div>
                <div class="register-center-input">
                    <input type="password" name="" v-model="repassword" placeholder="请重复您的密码"
                        onfocus="this.placeholder=''" onblur="this.placeholder='请输入您的密码'" />
                    <div class="register-center-input-text">密码</div>
                </div>
            </div>
            <div class="register-button">注册</div>
        </div>

        <div class="user_suspensions">
            <div class="login-close" @click="$('.user_suspensions').css('display','none')">关闭</div>
            <div class="user-top">用户管理</div>
            <div class="user-list-manger">
                <ul>
                    <li v-for="item in user_list" :key="item.id" class="userList">
                        <p class="userListItem">{{item.username}} ip:{{item.username}}</p>
                        <Button class="userListButton"
                            @click="online(item.username)">{{item.login==0?'封停':'解封'}}</Button>
                    </li>
                </ul>
            </div>
        </div> -->


        <div id="locatevplay" v-if="viewShow">
            <!-- 兼容性处理 -->
            <video id="vplay" class="media" controls="controls">
                <source :src="mvUrl" type="video/mp4">
                <source :src="mvUrl" type="video/ogg">
                <source :src="mvUrl" type="video/webm">
                <object :data="mvUrl" width="320" height="240">
                    <embed :src="mvUrl" width="320" height="240">
                </object>
            </video>
        </div>
        <div class="mask" v-if="viewShow" @click="closeMv()"></div>

        <div id="top">
            <!--顶部导航栏-->
            <div id="search">
                <a id="HTMLreset" href="javascript:;" @click="clearLocalStorage()">刷新页面</a>
                <div id="RtxSwitchDiv">
                    <a id="RtxSwitch" href="javascript:;" @click="switchRtx()">{{ rtx }}</a>
                </div>
                <div class="logo"></div>
                <div id="inputdiv">
                    <div id="searchSuggest" v-show="showSuggest">
                        <!--搜索建议-->
                        <em class="searchTip">搜索有关建议</em>
                        <div v-for="(value, index) in suggest" :key="index">
                            <!--对象v-for循环*-->
                            <h3 class="suggestName">{{ index }}</h3>
                            <ul class="suggestList">
                                <li v-for="(site, index2) in value" :key="index2"
                                    @click="suggestAction(index, site.name, site.id)"><a href="javascript:;">{{
                                        site.name
                                    }}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <input id="input1" type="text" autocomplete="off" v-model="keyWord" @click="getSearchSuggest()"
                        @keyup='getSearchSuggest()' @keyup.enter="search()" :placeholder='defaultShowKeyword' />
                </div>
                <div class="searchBtn" @click="search()"></div>
                <!-- <a class="user_nav" @click="login()" title="登录以解锁收藏与保存历史记录功能！">登录</a>
                <a class="user_nav" @click="register()" title="加入我们吧？">注册</a>
                <a class="user_nav" @click="admin()" title="管理员菜单">管理</a>
                <a class="user_nav" @click="about()" title="关于我">关于</a>
                <a class="user_nav" id="user_board" title="用户菜单">{{login_username == '' ? '您还未登录哦~' : '用户：' +
                    login_username}}</a> -->
            </div>
            <ul id="nav">
                <li class="nav_white_space_1"></li>
                <li><a class="nava" href="#" @click="switchRecommend()"><em class="navitem">推荐</em></a></li>
                <li><a :class="`nava${Object.keys(this.curPlayList).length === 0 ? ' nava_disable' : ''}`" href="#" @click="switchSongList()"><em class="navitem">歌单</em></a></li>
                <li><a :class="`nava${Object.keys(this.curAlbum).length === 0 ? ' nava_disable' : ''}`" href="#" @click="switchAlbum()"><em class="navitem">专辑</em></a></li>
                <li><a :class="`nava${Object.keys(this.curSinger).length === 0 ? ' nava_disable' : ''}`" href="#" @click="switchSinger()"><em class="navitem">歌手</em></a></li>
                <li class="nav_white_space_2"></li>
                <li id="showSearch"><a class="nava" href="#" @click="searchShow()"><em class="navitem" id="showSearchEm">{{isCoverShow ? '隐藏搜索' : '显示搜索'}}</em></a></li>
            </ul>
        </div>

        <div v-show="isCoverShow && !isShow" class="closeSearch" @click="shutDown('')"></div>

        <div v-show="isCoverShow" id="searchResultCover"></div>
        <div v-if="isShow" id="searchResult">
            <!--单曲搜索-->
            <ul id="tips">
                <li>
                    <p class="songName">歌曲标题</p>
                    <p class="artistBlock">歌手名</p>
                    <p href="javascript:;" id="album1">专辑</p>
                    <p class="duration">时长</p>
                    <!-- <p class="movie1"></p> -->
                </li>
            </ul>
            <div id="songListBlock">
                <ul id="songList">
                    <li v-for="(item, index) in songList" :key="index">
                        <div class="songName">
                            <a title="点击播放歌曲" href="javascript:;" @click='playMusic(item)'>{{ item.name }}</a>
                        </div>
                        <div class="artistBlock">
                            <div class="artistDiv" @mouseover="addActive($event)" @mouseout="removeActive($event)">
                                <div class="artist" v-for="(value, index) in item.ar" :key="index">
                                    <a title="点击搜索歌手" href="javascript:;" @click='search("歌手", value.id)'>{{
                                        value.name
                                    }}</a>
                                    <span v-if="item.ar && index != (item.ar).length - 1">/</span>
                                </div>
                            </div>
                        </div>
                        <div id="album2">
                            <a title="点击搜索专辑" href="javascript:;" @click='search("专辑", item.al.id)'
                                @mouseover="addActive($event)" @mouseout="removeActive($event)">{{ item.al.name }}</a>
                        </div>
                        <p class="duration">{{ item.dt }}</p>
                        <div class="movie2">
                            <div title="点击播放MV" v-if="item.mv != 0" href="javascript:;" @click='playMVById(item.mv)'></div>
                        </div>
                        <!-- 图标！ -->
                    </li>
                </ul>
            </div>
        </div>

        <div id="lrcbg">
            <!--歌词框架-->
            <div id="whiteblk">
                <p id="whitelrc"></p>
            </div>
            <ul id="lrc">

            </ul>
            <!-- 歌词特效 -->
            <div id="animated_lrc">
                <div id="animated_lrc_top">
                    <p id="animated_lrc_0"><span id="animated_lrc_span_0"></span></p>
                </div>
                <div id="animated_lrc_blk_top">
                    <p id="animated_lrc_blk_0"><span id="animated_lrc_blk_span_0"></span></p>
                </div>

                <div id="animated_lrc_bottom">
                    <p id="animated_lrc_1"><span id="animated_lrc_span_1"></span></p>
                </div>
                <div id="animated_lrc_blk_bottom">
                    <p id="animated_lrc_blk_1"><span id="animated_lrc_blk_span_1"></span></p>
                </div>
            </div>
        </div>

        <audio id="player">
            <!-- 提高兼容性 -->
            <source :src="curMusic.url" type="audio/mpeg">
            <source :src="curMusic.url" type="audio/ogg">
            <embed height="50" width="100" :src="curMusic.url">
        </audio>
        <!-- <em id="show" style="width:100px;height:100px;background:white;position: fixed;top:10px;left:10px;top:200px"></em> -->

        <div id="songdetail_widget">
            <div id="phone_curcover" class="curcover" @click="playNow()"></div>
            <!-- 当前歌曲图片 -->
            <div id="playerdiv5">
                <p id="songname">{{curMusic.name || '歌曲名'}}</p>
                <!-- 歌曲名歌曲信息 -->
                <p id="songdetail">{{curMusic.allSinger || '歌手名'}}</p>
            </div>
        </div>

        <div id="pull">
            <!--拉条-->
            <div id="playerdiv">
                <!--播放器框架-->
                <div id="playerdiv3">
                    <div class="curcover"></div>
                    <!-- 当前歌曲图片 -->
                    <div id="playerdiv5">
                        <p id="songname">{{curMusic.name || '歌曲名'}}</p>
                        <!-- 歌曲名歌曲信息 -->
                        <p id="songdetail">{{curMusic.allSinger || '歌手名'}}</p>
                    </div>
                </div>

                <div id="playerdiv6">
                    <div id="songvolume"></div>
                    <input type="range" min='0' max='100' id='volumerange' v-model='volume'>
                    <!-- 音量条 -->
                    <div id="playlist" @click="isHistory()"></div>
                    <!--历史列表显示-->
                </div>

                <!-- <div id="playerdiv1and2"> -->
                <div id="playerdiv1">
                    <button id='front' title="上一首" @click="playTheFormer()"></button>
                    <button id='play' title="play" @click="playNow()"></button>
                    <button id='next' title="下一首" @click="playTheNext()"></button>
                </div>
                <div id="playerdiv2">
                    <span id='cur'>00:00&nbsp;&nbsp;</span>
                    <input type="range" min='0' max='100' id='range' value='0'>
                    <!-- 进度条 -->
                    <span id='max'>&nbsp;&nbsp;{{ durationEdit(curMusic.dt) }}</span>
                </div>
                <!-- </div> -->
            </div>
        </div>

        <!-- /*推荐*/ -->
            <div id="recommend">
                <div width="100%">
                    <span id="reviewTitle">今日推荐</span>
                </div>
                <div id="recommendListBlock">
                    <ul id='recommendList'>
                        <li class="recommendListLi" v-for="(item, index) in recommendSongList" :key="index">
                            <div class="recommendDiv">
                                <span class="songListPlayCount">▷{{ item.playCount }}&nbsp;&nbsp;</span>
                                <span class="songListIntro">{{ item.name }}</span>
                                <img :title="item.copywriter" :src="item.picUrl" @click='search("歌单", item.id);cancelRecommend()' />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        <div class="recommendStarWidget" v-if="recommendStarShow && recommendSongListThree.length !== 0">
            <div class="recommendStarClose" title="关闭推荐" @click="recommendStarShow = false">×</div>
            <div :class="'recommendStar'+(index+1)" v-for="index of [0,1,2]" :key="index">
                <div class="firstStar">
                    <span class="firstStarBackgroundPlayCount">▷{{ recommendSongListThree[index].playCount }}&nbsp;&nbsp;</span>
                    <span class="firstStarBackgroundName">{{ recommendSongListThree[index].name }}</span>
                    <img class="firstStarBackground" :src="recommendSongListThree[index].picUrl" :title="recommendSongListThree[index].name" @click='search("歌单", recommendSongListThree[index].id);recommendStarShow = false;'/>
                </div>
            </div>
        </div>

        <!-- /*歌单*/ -->
        <div id="curSongList" v-if="isSongListShow">
            <div id="curSongListDetail">
                <div id="curSongListCoverDiv">
                    <img id="curSongListCover" :src="curPlayList.coverImgUrl" @click="replaceSongList()" />
                </div>
                <div id="curSongListCreater" v-if="JSON.stringify(curPlayList) != '[]'">
                    <div>[歌单]&nbsp;{{ curPlayList.name }}</div>
                    <img id="curSongListCreaterPic" :src="curPlayList.creator.avatarUrl" />
                    <div>
                        {{ curPlayList.creator.nickname }}&nbsp;&nbsp;{{
                            formatDate(curPlayList.trackUpdateTime)
                        }}&nbsp;&nbsp;更新
                    </div>
                    <div>
                        歌曲数：{{ curPlayList.trackIds.length }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;播放数：{{
                            curPlayList.playCount
                        }}
                    </div>
                    <div>
                        收藏人数：{{ curPlayList.subscribers.length }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分享数：{{
                            curPlayList.shareCount
                        }}
                    </div>
                    <div>简介：{{ curPlayList.description }}</div>
                </div>
                <h3 align="left" style="margin: 0px 0 20px 20px">精彩评论</h3>
                <div id="curSongListComment">
                    <ul id="curSongListCommentUl">
                        <li class="curSongListCommentLi" v-for="(item, index) in curPlayListComment" :key="index">
                            <img class="curSongListCommentPic" :src="item.user.avatarUrl" />
                            <div class="curSongListCommentCont">
                                <div class="curSongListCommentCont1">{{ item.user.nickname }}：{{ item.content }}</div>
                                <div class="curSongListCommentCont2">{{ formatDate(item.time) }}</div>
                            </div>
                            <hr>
                        </li>
                    </ul>
                </div>
            </div>

            <div id="curSongListSongs">
                <div id="songListSearchResult">
                    <ul id="tips">
                        <li>
                            <p class="songName">歌曲标题</p>
                            <p class="artistBlock">歌手名</p>
                            <p href="javascript:;" id="album1">专辑</p>
                            <p class="duration">时长</p>
                            <!-- <p class="movie1"></p> -->
                        </li>
                    </ul>
                    <div id="songListBlock">
                        <ul id="songList">
                            <li v-for="(item, index) in curSongList" :key="index">
                                <div class="songName">
                                    <a title="点击播放歌曲" href="javascript:;" @click='playMusic(item)'>{{ item.name }}</a>
                                </div>
                                <div class="artistBlock">
                                    <div class="artistDiv" @mouseover="addActive($event)"
                                        @mouseout="removeActive($event)">
                                        <div class="artist" v-for="(value, index) in item.ar" :key="index">
                                            <a title="点击搜索歌手" href="javascript:;" @click='search("歌手", value.id)'>{{
                                                value.name
                                            }}</a>
                                            <span v-if="item.ar && index != (item.ar).length - 1">/</span>
                                        </div>
                                    </div>
                                </div>
                                <div id="album2">
                                    <a title="点击搜索专辑" href="javascript:;" @click='search("专辑", item.al.id)'
                                        @mouseover="addActive($event)" @mouseout="removeActive($event)">{{
                                            item.al.name
                                        }}</a>
                                </div>
                                <p class="duration">{{ item.dt }}</p>
                                <div class="movie2">
                                    <div title="点击播放MV" v-if="item.mv != 0" href="javascript:;" @click='playMVById(item.mv)'></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- /*专辑*/ -->
        <div id="curAlbum" v-if="isAlbumShow">
            <div id="curAlbumDetail">
                <div id="curAlbumCoverDiv">
                    <img id="curAlbumCover" :src="curAlbum.picUrl" @click="replaceAlbum()" />
                </div>
                <div id="curAlbumCreater" v-if="JSON.stringify(curAlbum) != '[]'">
                    <div :title="curAlbum.name">[专辑]&nbsp;{{ curAlbum.name }}</div>
                    <img id="curAlbumCreaterPic" :src="curAlbum.artist.picUrl" />
                    <div>{{ curAlbum.artist.name }}&nbsp;&nbsp;{{ formatDate(curAlbum.publishTime) }}&nbsp;&nbsp;更新
                    </div>
                    <div>歌曲数：{{ curAlbumList.length }}</div>
                    <div>
                        收藏人数：{{ curAlbum.subCount }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分享数：{{
                            curAlbum.info.shareCount
                        }}
                    </div>
                    <div>简介：{{ curAlbum.description }}</div>
                </div>
                <h3 align="left" style="margin: 0px 0 20px 20px">精彩评论</h3>
                <div id="curAlbumComment">
                    <ul id="curAlbumCommentUl">
                        <li class="curAlbumCommentLi" v-for="(item, index) in curAlbumComment" :key="index">
                            <img class="curAlbumCommentPic" :src="item.user.avatarUrl" />
                            <div class="curAlbumCommentCont">
                                <div class="curAlbumCommentCont1">{{ item.user.nickname }}：{{ item.content }}</div>
                                <div class="curAlbumCommentCont2">{{ formatDate(item.time) }}</div>
                            </div>
                            <hr>
                        </li>
                    </ul>
                </div>
            </div>

            <div id="curAlbumSongs">
                <div id="AlbumSearchResult">
                    <!-- <h2 align="left" style="margin: 20px 0 10px 10px">专辑内容</h2> -->
                    <ul id="tips">
                        <li>
                            <p class="songName">歌曲标题</p>
                            <p class="artistBlock">歌手名</p>
                            <p href="javascript:;" id="album1">专辑</p>
                            <p class="duration">时长</p>
                            <!-- <p class="movie1"></p> -->
                        </li>
                    </ul>
                    <div id="AlbumBlock">
                        <ul id="Album">
                            <li v-for="(item, index) in curAlbumList" :key="index">
                                <div class="songName">
                                    <a title="点击播放歌曲" href="javascript:;" @click='playMusic(item)'>{{ item.name }}</a>
                                </div>
                                <div class="artistBlock">
                                    <div class="artistDiv" @mouseover="addActive($event)"
                                        @mouseout="removeActive($event)">
                                        <div class="artist" v-for="(value, index) in item.ar" :key="index">
                                            <a title="点击搜索歌手" href="javascript:;" @click='search("歌手", value.id)'>{{
                                                value.name
                                            }}</a>
                                            <span v-if="item.ar && index != (item.ar).length - 1">/</span>
                                        </div>
                                    </div>
                                </div>
                                <div id="album2">
                                    <a title="点击搜索专辑" href="javascript:;" @click='search("专辑", item.al.id)'
                                        @mouseover="addActive($event)" @mouseout="removeActive($event)">{{
                                            item.al.name
                                        }}</a>
                                </div>
                                <p class="duration">{{ item.dt }}</p>
                                <div class="movie2">
                                    <div title="点击播放MV" v-if="item.mv != 0" href="javascript:;" @click='playMVById(item.mv)'></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- /*歌手*/ -->
        <div id="curSinger" v-if="isSingerShow">
            <div id="curSingerDetail">
                <div id="curSingerCoverDiv">
                    <img id="curSingerCover" :src="curSinger.picUrl" />
                </div>
                <div id="curSingerCreater" v-if="JSON.stringify(curSinger) != '[]'">
                    <div>[歌手]&nbsp;{{ curSinger.name }}</div>
                    <div>单曲数：{{ curSinger.musicSize }}</div>
                    <div>专辑数：{{ curSinger.albumSize }}</div>
                    <div>MV数：{{ curSinger.mvSize }}</div>
                    <div>简介：{{ curSinger.briefDesc }}</div>
                </div>
                <h3 align="left" style="margin: 0px 0 20px 20px">歌手详情</h3>
                <div id="curSingerAlbum">
                    <ul id="curSingerAlbumUl">
                        <li class="curSingerAlbumLi" v-for="(item, index) in curSingerDesc" :key="index">
                            <h4>{{ item.ti }}</h4>
                            <p class="curSingerAlbumCont" v-for="(items, index2) in item.txt" :key="index2">{{ items }}
                            </p>
                            <hr>
                        </li>
                    </ul>
                </div>
            </div>

            <div id="curSingerSongs">
                <div id="SingerSearchResult">
                    <div id="SingerBlock">
                        <ul id="Singer">
                            <li class="SingerAlbum" v-for="(item, index) in curSingerAlbumSongs" :key="index">
                                <div class="SingerAlbumDiv">
                                    <div class="SingerAlbumPicDiv">
                                        <img class="SingerAlbumPic" :src="curSingerAlbum[index].picUrl"
                                            @click="search('专辑', curSingerAlbum[index].id)">
                                    </div>
                                    <div class="SingerAlbumDiv2">
                                        <div class="SingerAlbumDiv3">{{ curSingerAlbum[index].name }}</div>
                                        <div class="SingerAlbumDiv4">{{ formatDate(curSingerAlbum[index].publishTime) }}
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <div class="SingerAlbumItem" v-for="(item2, index2) in item" :key="index2">
                                    <div class="songName">
                                        <a title="点击播放歌曲" href="javascript:;" @click='playMusic(item2)'>{{
                                            item2.name
                                        }}</a>
                                    </div>
                                    <div class="artistBlock" @mouseover="addActive($event)"
                                        @mouseout="removeActive($event)">
                                        <div class="artistDiv" @mouseover="addActive($event)"
                                            @mouseout="removeActive($event)">
                                            <div class="artist" v-for="(value, index3) in item2.ar" :key="index3">
                                                <a title="点击搜索歌手" href="javascript:;" @click='search("歌手", value.id)'>{{
                                                    value.name
                                                }}</a>
                                                <span v-if="item2.ar && index3 != (item2.ar).length - 1">/</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="album2">
                                        <a title="点击搜索专辑" href="javascript:;" @click='search("专辑", item2.al.id)'
                                            @mouseover="addActive($event)" @mouseout="removeActive($event)">{{
                                                item2.al.name
                                            }}</a>
                                    </div>
                                    <p class="duration">{{ item2.dt }}</p>
                                    <div class="movie2">
                                        <div title="点击播放MV" v-if="item.mv != 0" href="javascript:;" @click='playMVById(item.mv)'></div>
                                    </div>
                                </div>
                                <hr>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- /*播放历史*/ -->
        <div id="historyAndplay" class="historyAndplay">
            <img id="historyAndplayBG" src="" />
            <div id="hisList" width="100%">
                <span id="HLTitle" :class="{ active: HPShow1 }" href="javascript:;" @click="switchHylist()">历史记录
                    <div id="ClearHLTitle" @click="ClearHL"></div>
                </span>
                <span id="PLTitle" :class="{ active: HPShow2 }" href="javascript:;" @click="switchPlist()">播放列表
                    <div id="ClearPLTitle" @click="ClearPL"></div>
                </span>
            </div>

            <div id="hyPlListBlock">
                <ul id='hyList' v-if="HPShow1">
                    <li class="hylistli" v-for="(item, index) in history" :key="index">
                        <div class="listenedName">
                            <a title="点击播放" href="javascript:;" @click='playMusic(item)' @mouseover="addActive($event)"
                                @mouseout="removeActive($event)">{{ item.name }}</a>
                        </div>
                        <div class="listenedArtist">
                            <div class="artistDiv" @mouseover="addActive($event)" @mouseout="removeActive($event)">
                                <div class="artist" v-for="(value, index) in item.ar" :key="index">
                                    <a title="点击搜索歌手" href="javascript:;" @click='search("歌手", value.id)'>{{
                                        value.name
                                    }}</a>
                                    <span v-if="item.ar && index != (item.ar).length - 1">/</span>
                                </div>
                            </div>
                        </div>
                        <div class="historyviedoplay" v-if="item.mv != 0" @click='playMVById(item.mv)'></div>
                        <div class="HLCancel" href="javascript:;" @click="removeHLitem(item.id)"></div>
                    </li>
                </ul>

                <ul id='PList' v-if="HPShow2">
                    <li class="Plistli" v-for="(item, index) in playList" :key="index">
                        <div class="listenedName">
                            <a title="点击播放" href="javascript:;" @click='playMusic(item)' @mouseover="addActive($event)"
                                @mouseout="removeActive($event)">{{ item.name }}</a>
                        </div>
                        <div class="listenedArtist">
                            <div class="artistDiv" @mouseover="addActive($event)" @mouseout="removeActive($event)">
                                <div class="artist" v-for="(value, index) in item.ar" :key="index">
                                    <a title="点击搜索歌手" href="javascript:;" @click='search("歌手", value.id)'>{{
                                        value.name
                                    }}</a>
                                    <span v-if="item.ar && index != (item.ar).length - 1">/</span>
                                </div>
                            </div>
                        </div>
                        <div class="historyviedoplay" v-if="item.mv != 0" @click='playMVById(item.mv)'></div>
                        <div class="HLCancel" href="javascript:;" @click="removeSLitem(item.id)"></div>
                    </li>
                </ul>
            </div>

        </div>

    </div>
</template>
<script type="text/javascript" src="@/old_components/mouse/partical.js"></script>
<script type="text/javascript" src="@/old_components/mouse/mouse.js"></script>
<script type="text/javascript" src="@/old_components/mouse/stars.js"></script>
<script type="text/javascript" src="@/old_components/painter.js"></script>
<script type="text/javascript" src="@/old_components/comment/comment.js"></script>

<script type="text/javascript" src="@/old_components/util/api.js"></script>

<script type="text/javascript" src="@/old_components/util/setTimer.js"></script>
<script type="text/javascript" src="@/old_components/player/player.js"></script>
<script type="text/javascript" src="@/old_components/lrc/lrc.js"></script>
<script type="text/javascript" src="@/old_components/synchronization.js"></script>

<!-- <script type="text/javascript" src="@/old_components/init.js"></script> -->
<script>
import 'animate.css';
import getVm from '../../static/old_components/util/getVm.js';
import BigDipper from '@/components/BigDipper';
export default {
    name: 'NeteaseCloadPlayer',
    components: {
        BigDipper
    },
    data() {
        return {
            //是否保存数据
            isStorage: true,
            //RTX
            rtx: "RtxOff",
            /*默认显示搜索词*/
            defaultShowKeyword: '',
            /*默认实际搜索词*/
            defaultRealKeyword: '',
            /*关键词*/
            keyWord: "",
            /*显示搜索建议*/
            showSuggest: false,
            /*搜索建议*/
            suggest: "",
            /*歌曲数组*/
            songList: [],
            /*歌曲数目*/
            count: 0,
            /*音量 */
            volume: 80,
            /*记录当前歌*/
            curMusic: { duration: "00:00" },
            /*封面*/
            musicCover: "",
            // 歌曲封面地址
            coverUrl: '',
            // 歌曲评论
            comments: [],

            // 搜索结果的显示背景
            isCoverShow: false,

            // 单曲搜索结果的显示状态
            isShow: false,
            // 歌单搜索结果的显示
            isSongListShow: false,
            // 专辑搜索结果的显示        
            isAlbumShow: false,
            // 歌手搜索结果的显示        
            isSingerShow: false,
            //mv播放显示
            viewShow: false,
            //musicIsPlay
            musicIsPlay: false,
            //mvIsPlay
            mvIsPlay: false,
            // mv地址
            mvUrl: "",
            //历史歌单
            history: [],
            //histroyAndplay列表显示
            historyShow: false,
            //播放器是否显示；默认不显示
            playerShow: false,
            //是否锁定player
            islock: false,
            //推荐歌单
            recommendSongList: [],
            //是否推荐
            isRecommend: true,
            //侧边列表的显示，默认为播放列表
            HPShow2: true,
            HPShow1: false,
            //播放列表
            playList: [],

            curPlayList: [],
            curSongList: [],
            curPlayListComment: [],

            curAlbum: [],
            curAlbumList: [],
            curAlbumComment: [],

            curSinger: [],
            curSingerAlbum: [],
            curSingerAlbumSongs: [],
            curSingerDesc: [],

            username: "",
            password: "",
            repassword: "",

            login_username: "",
            user_list: [],
            mouseOnSuggest: false,
            synchroTime: 0,
            recommendStarShow: true,

            noSongPlay: false,
        }
    },
    computed: {
        recommendSongListThree() {
            return this.recommendSongList.slice(0, 3)
        }
    },
    mounted() {
        const that = this;
        this.getDefaultKeyword();
        this.init();

        //图片慢加载
        $('#background_star').css('background-image', `url(${require('../assets/css/background/darkspace-min.jpg')})`)
        $('#background_earth').css('background-image', `url(${require('../assets/css/background/earth-min.png')})`)

        // this.$refs.big_dipper.starAniCount++;//北斗七星进度+1

        // darkspace.onload = () => {//图片预加载
        //     this.$refs.big_dipper.starAniCount++;
        // }
        // earth.onload = () => {
        //     this.$refs.big_dipper.starAniCount++;
        // }

        window.addEventListener('unload', e => this.unloadHandler(e, this)); //添加页面关闭事件

        $(window).on('click', function(e) {
            if (e.target.id != "pull") {
                // let lzsum = 10 + Math.floor(Math.random() * 5);
                // for (let i = 0; i < lzsum; i++) {
                //     let rad = Math.random() * 2 * Math.PI;
                //     let vx = 3 * (Math.random() - 0.5) * Math.cos(rad);
                //     let vy = 3 * (Math.random() - 0.5) * Math.sin(rad);
                //     let time = 80 + 20 * Math.random();
                //     mouseParticle.push(new partical(mouseX, mouseY, time, vx, vy, 0, 0, 10, 0, Math.random() * 255, Math.random() * 255, Math.random() * 255, 255, 255, 255, Math.random() * 4 * Math.PI * 3 - 2 * Math.PI * 3, Math.random() * 4 * Math.PI * 3 - 2 * Math.PI * 3))
                // }
                e.stopPropagation(); //currentTarget始终是监听事件者，而target是事件的真正发出者
            } else {
                that.lockpull();
            }
        })

        // 键盘事件
        $(window).on('keydown', function(e) {
            switch(e.keyCode) {  
                case 32:
                    // 按下空格
                    that.playNow();
                    e.stopPropagation();
                    return;  
                case 37:  
                    // 按下向左
                    player.currentTime -= 5;
                    e.stopPropagation();
                    return;  
                case 39:  
                    // 按下向右
                    player.currentTime += 5;
                    e.stopPropagation();
                    return;  
            }
        })

        document.getElementById("player").addEventListener('ended', function() {
            that.playTheNext();
        }, false);

        $(window).click(function(e) {
            if (!that.mouseOnSuggest) that.showSuggest = false;
        })
        $("#searchSuggest").mouseenter(function(e) {
            that.mouseOnSuggest = true;
        })
        $("#searchSuggest").mouseleave(function(e) {
            that.mouseOnSuggest = false;
        })
        $("#input1").click(function(e) {
            that.mouseOnSuggest = true;
        })

        // // 进度条拖动
        // $("#range").mousedown(function () { 
        //     that.mousePlayerFlag = true;
        // });

        // $("#range").mouseup(function () { 
        //     that.mousePlayerFlag = false;
        // });

        // $(".login-button").on('click', function(e) { //用户登录
        //     $(".login").addClass("active")
        //     setTimeout(function() {
        //         $(".sk-rotating-plane").addClass("active");
        //         $(".login").css("display", "none");
        //     }, 500)

        //     login_timeout = setTimeout(() => {
        //         $(".login").removeClass("active");
        //         $(".sk-rotating-plane").removeClass("active");
        //         Vue.prototype.$Message.warning("登录超时");
        //     }, 10000)

        //     that.userSave(that)

        //     api.post('users/login', { username: that.username, password: that.password }).then((res) => {
        //         if (res.code === 0) {
        //             sessionStorage.setItem('token', res.data.token)
        //             sessionStorage.setItem('username', this.username)
        //             Vue.prototype.$Message.success(res.message);
        //             clearTimeout(login_timeout);

        //             api.get('users/user/historyandplaylist/' + that.username).then((res) => { // 获得用户历史记录和播放列表
        //                 that.history = JSON.parse(res.data.musicHistory)
        //                 that.playList = JSON.parse(res.data.myPlayList)
        //                 Vue.prototype.$Message.success('已成功为您恢复历史记录与播放列表');
        //             })

        //             that.login_username = that.username;

        //             setTimeout(function() {
        //                 $(".login").removeClass("active");
        //                 $(".sk-rotating-plane").removeClass("active");
        //             }, 1000)
        //         } else {
        //             Vue.prototype.$Message.error(res.message);
        //             clearTimeout(login_timeout);
        //             setTimeout(function() {
        //                 $(".login").removeClass("active");
        //                 $(".sk-rotating-plane").removeClass("active");
        //             }, 1000)
        //             sessionStorage.removeItem('token')
        //         }
        //     })
        // })

        // $(".register-button").on('click', function(e) { //用户注册
        //     if (that.username && that.password && that.repassword) {
        //         if (that.password === that.repassword) {
        //             let data = {
        //                 phone: '未知',
        //                 nikename: '未知',
        //                 age: '未知',
        //                 sex: '未知',
        //                 musicHistory: '',
        //                 myPlayList: '',
        //                 username: that.username,
        //                 password: that.password,
        //             }
        //             api.post('users/register', data).then((res) => {
        //                 if (res.code === 0) {
        //                     sessionStorage.removeItem('token')
        //                     alert(res.message)
        //                     $(".register").css("display", "none");
        //                     $(".login").css("display", "block");
        //                 }
        //             })
        //         } else {
        //             Vue.prototype.$Message.error("内容输入错误，两次密码输入不一致");
        //         }
        //     } else {
        //         Vue.prototype.$Message.error("内容输入错误，请输入必要信息");
        //     }
        // })

        that.getRecommend();
        that.getSongList();

        // window.setInterval(() => { this.synchronization() }, 20); //同步
        getVm.sendThisAndInit(that)//对外开放vm
    },
    methods: {
        cancelRecommend() {//取消推荐
            $('#recommend').addClass('recommend_lock');
            // 适配移动端
            let isPhone = false;
            if($(window).width() < 500) {
                isPhone = true;
            }
            if(isPhone) {
                $(window).mousedown(function() {
                    $('#recommend').removeClass('recommend_lock');
                    $(window).unbind('mousedown');
                })
            } else {
                window.setTimeout(function() {
                    $('#recommend').removeClass('recommend_lock');
                }, 500)
            }
        },
        synchronization() {//同步函数，强制执行防止出现bug
            this.synchroTime++;

            if(document.getElementById("RtxSwitch").innerHTML == "RtxOn"){//全体染色

                let color = rainBow(this.synchroTime % 50 / 50);
                let r = color.red;
                let g = color.green;
                let b = color.blue;
                $("*").css("color","rgb(" + r + "," + g + ","  + b +")");

                let antiColor = anticolor(r,g,b);
                $("*").css("border-color","rgb(" + antiColor.red + "," + antiColor.green + ","  + antiColor.blue +")");

                // $("*").css("background-color", "red");
                $("#RtxSwitch").css("width", Math.sin(this.synchroTime / 10) * 20 + 120);
                $("#RtxSwitch").css("height", Math.sin(this.synchroTime / 10) * 5 + 40);
                $("#RtxSwitch").css("font-size", Math.sin(this.synchroTime / 10) * 3 + 20);
                $("#RtxSwitch").css("line-height", Math.sin(this.synchroTime / 10) * 5 + 40 + "px");
            }else{
                $("*").css("color","");
                $("*").css("border-color","");
            }

            getLine();//显示歌词

            let player = document.getElementById("player");
            let play = document.getElementById("play");

            $("#range").attr({'max':player.duration});
            $('#cur').text(timeToStr($("#range")[0].value));

            // 进度条同步
            if(window.mousePlayerFlag){
                player.currentTime = $("#range")[0].value;
                ppxx = $("#lrcbg").height() / 2 + $("#top").height() / 2 - 30 - (currentLine * 40);
                deltaTimer[0] = new Counter(40, 1000 / 20 * 0.5, -1);//del0--歌词自动滑动
            }else{
                $("#range").val(parseInt(Math.round(player.currentTime)));
            }

            // 音量同步
            if(window.volumeRangeFlag){
                let player = document.getElementById("player");
                player.volume = $("#volumerange").val() / 100;
            }

            var audioPlayer = document.querySelector('#player');
            if(audioPlayer.paused){
                play.title = "play"
                $('#play').removeClass("play_pause");
                // $('#phone_curcover').removeClass("curcover_ani");
                $('#phone_curcover').css("animationPlayState", "paused");
                // play.style.backgroundImage = 'url("../assets/css/player/play.png")';
            }else{
                play.title = "pause"
                $('#play').addClass("play_pause");
                // $('#phone_curcover').addClass("curcover_ani");
                $('#phone_curcover').css("animationPlayState", "");
                // play.style.backgroundImage = 'url("../assets/css/player/pause.png")';
            }

            // if(this.showSuggest){
            //     $("#searchSuggest").css("visibility","visible");
            // }else{
            //     $("#searchSuggest").css("visibility","hidden");
            // }

            // if(this.isRecommend){
            //     $("#recommend").css("visibility","visible");
            // }else{
            //     $("#recommend").css("visibility","hidden");
            // }

        },

        clearLocalStorage: function() {
            var that = this;
            $("*").css("cursor", "auto");
            that.userSave(that)
            setTimeout(function() {
                let choose = confirm("是否重置localStorage并刷新页面？");
                if (choose) {
                    that.isStorage = false;
                    location.reload();
                } else {
                    $("*").css("cursor", "none");
                }
            }, 200);
        },

        switchRtx: function() {
            if (this.rtx == "RtxOff") {
                this.rtx = "RtxOn";
            } else {
                this.rtx = "RtxOff";
            }
        },

        init: function() { //初始化加载localstorage

            if (localStorage.getItem("rtx") != null) {
                this.rtx = localStorage.getItem("rtx");
            }

            if (localStorage.getItem("volume") != null) {
                this.volume = localStorage.getItem("volume");
                document.getElementById("player").volume = this.volume / 100;
            }

            if (localStorage.getItem("islock") != null) {
                this.islock = JSON.parse(localStorage.getItem("islock"));
                this.lockpull(this.islock);
            } else {
                this.lockpull(true);
            }

            if (localStorage.getItem("curMusic") != null) {
                this.curMusic = JSON.parse(localStorage.getItem("curMusic"));
                if (this.curMusic.id) {
                    this.playMusic(this.curMusic, false);
                    // this.getCover(this.curMusic);
                } else {
                    this.noSongPlay = true;
                }
            } else {
                this.noSongPlay = true;
            }

            if (localStorage.getItem("musicHistory") != null) {
                this.history = JSON.parse(localStorage.getItem("musicHistory"));
            }

            if (localStorage.getItem("myPlayList") != null) {
                this.playList = JSON.parse(localStorage.getItem("myPlayList"));
            }
        },

        unloadHandler: function(e, thisvue) { //关闭时保存localstorage
            if (thisvue.isStorage) {
                thisvue.userSave(thisvue)

                localStorage.setItem("rtx", thisvue.rtx);
                localStorage.setItem("volume", thisvue.volume);
                localStorage.setItem("islock", thisvue.islock);
                localStorage.setItem("curMusic", JSON.stringify(thisvue.curMusic)); //通过JSON对象提供的parse和stringify将其他数据类型转化成字符串，再存储到storage中
                localStorage.setItem("musicHistory", JSON.stringify(thisvue.history));
                localStorage.setItem("myPlayList", JSON.stringify(thisvue.playList));
            } else {
                localStorage.clear();
            }
        },

        userSave: (thisvue) => {
            let data = {
                username: thisvue.username,
                musicHistory: JSON.stringify(thisvue.history),
                myPlayList: JSON.stringify(thisvue.playList),
            }
            api.post('users/user/changeInfo', data).then((res) => {
                if (res.code === 0) {
                    sessionStorage.removeItem('token')
                }
            })
        },

        formatDate: function(date) { //标准时间转换
            date = new Date(date);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();
            m = m < 10 ? ("0" + m) : m;
            d = d < 10 ? ("0" + d) : d;
            return y + "-" + m + "-" + d;
        },

        durationEdit: (duration) => {
            if(!$.isNumeric(duration)) return '00:00'
            let temp = duration / 1000;
            let minute = Math.floor(temp / 60);
            minute = minute < 10 ? '0' + minute : minute;
            let second = parseInt(temp % 60);
            second = second < 10 ? '0' + second : second;
            duration = minute + ':' + second;
            return duration;
        },

        login: () => {
            $(".login").css("display", "block");
            $(".register").css("display", "none");
            $(".user_suspensions").css("display", "none");
        },

        register: () => {
            $(".register").css("display", "block");
            $(".login").css("display", "none");
            $(".user_suspensions").css("display", "none");
        },

        // admin: function() {
        //     if (this.login_username == "admin") {
        //         // window.open("http://localhost:8081/admin/users");
        //         $('.user_suspensions').css('display', 'block')
        //         $(".login").css("display", "none");
        //         $(".register").css("display", "none");
        //         this.getUsers()

        //     } else {
        //         Vue.prototype.$Message.info("您还不是管理员哦");
        //     }
        // },

        // online: function(username) {
        //     api.get('admin/stopLogin/' + username).then((res) => {
        //         Vue.prototype.$Message.info(res.message);
        //         this.getUsers()
        //     })
        // },

        // getUsers: function() {
        //     //获取所有用户
        //     api.get('admin/getAllUser').then((res) => {
        //         this.user_list = res.data
        //     })
        // },

        // about: () => {
        //     alert("作者：刘睿\nQQ：1104052058", "星空播放器")
        // },

        getCover(song) {//获取封面
            if(song.al && song.al.id){
                this.$axios.get('/album?id=' + song.al.id).then((response)=>{
                    for(let i = 0;i < response.data.songs.length;i++){
                        if(response.data.songs[i].al.id == song.al.id) {
                            $('.curcover').css('background-image', 'url(' + response.data.songs[i].al.picUrl + "?param=120y120?)");
                            // document.getElementById("curcover").src = response.data.songs[i].al.picUrl + "?param=120y120?";
                            break;
                        }
                    }
                })
            }
        },

        getLrc(id) {//获取歌词
            var that = this

            that.$axios.get("/song/url?id=" + id).then(
                function (response) {
                    if (response.data.data[0].freeTrialInfo) {
                        // alert("该歌曲是VIP曲目，您只能试听30s");
                        that.$message.warning('该歌曲是VIP曲目，您只能试听30s');
                        // that.$message.error('错了哦，这是一条错误消息');
                        cursonglrc = [];
                        document.getElementById('lrc').innerHTML = "";
                        document.getElementById('whitelrc').innerHTML = "";
                    };

                    that.$axios.get("/lyric?id=" + id).then(//获取歌词
                        function (response) {
                            if (response.data.nolyric || (!response.data.lrc || !response.data.lrc.lyric)) {
                                cursonglrc = [];
                                document.getElementById('lrc').innerHTML = "";

                                cursonglrc.push(new songlrc(0, '纯音乐，请欣赏'));
                                document.getElementById('lrc').innerHTML += '<li id="slilrc0"><p id = "slrc0">' + '纯音乐，请欣赏' + '</p></li>';

                                let lastlrc2 = setInterval(function () {//歌词文件结尾处理
                                    if (player.duration) {
                                        cursonglrc.push(new songlrc(player.duration, ""));
                                        document.getElementById('lrc').innerHTML += '<li id="slilrc1"><p id = "slrc1"></p></li>';
                                        clearInterval(lastlrc2);
                                    }
                                }, 1000)
                            } else {
                                lrc = response.data.lrc.lyric;
                                get_timeAndlrc(lrc);
                            }
                            changeLrcAnimation(currentLine)
                        },
                        function (err) { }
                    );
                },
                function (err) { }
            );

        },

        getRecommend: function() {
            this.$axios.get('/personalized?limit=30').then((response) => {
                this.recommendSongList = response.data.result;
                for (let i = 0; i < this.recommendSongList.length; i++) {
                    this.recommendSongList[i].picUrl += "?param=200y200";
                }
                if(this.noSongPlay) {
                    this.$axios.get('/personalized/newsong?limit=1').then((response) => {
                        this.playMusic(response.data.result[0], false)
                        this.$message('已为您自动载入推荐歌曲')
                    })
                }
            })
        },

        getSongList: function(id) {//搜索歌单
            if (id == undefined) return;
            let that = this;
            this.$axios.get('/playlist/detail?id=' + id).then((response) => {
                that.curPlayList = response.data.playlist;
                that.curPlayList.coverImgUrl += "?param=200y200";

                let searchStr = "/song/detail?ids=";
                for (let i = 0; i < that.curPlayList.trackIds.length; i++) {
                    searchStr += that.curPlayList.trackIds[i].id;
                    if (i != that.curPlayList.trackIds.length - 1) searchStr += ",";
                }
                this.$axios.get(searchStr).then((response) => { //统一保存格式为songdetail
                    that.curSongList = response.data.songs;
                    for (let i = 0; i < that.curSongList.length; i++) {
                        that.curSongList[i].dt = that.durationEdit(that.curSongList[i].dt);
                    }
                })
            })

            this.$axios.get('/comment/playlist?id=' + id).then((response) => {
                that.curPlayListComment = response.data.comments;

                for (let i = 0; i < that.curPlayListComment.length; i++) {
                    that.curPlayListComment[i].user.avatarUrl += "?param=50y50";
                }
            })
        },

        getAlbum: function(id) {//获取专辑
            if (id == undefined) return;
            let that = this;
            this.$axios.get('/album?id=' + id).then((response) => {
                that.curAlbum = response.data.album;
                that.curAlbum.picUrl += "?param=200y200";

                let albumSongs = response.data.songs;
                let searchStr = "/song/detail?ids=";
                for (let i = 0; i < albumSongs.length; i++) {
                    searchStr += albumSongs[i].id;
                    if (i != albumSongs.length - 1) searchStr += ",";
                }
                this.$axios.get('/album/detail/dynamic?id=' + id).then((response) => {
                    that.curAlbum.subCount = response.data.subCount;

                    this.$axios.get(searchStr).then((response) => { //统一保存格式为songdetail
                        that.curAlbumList = response.data.songs;
                        for (let i = 0; i < that.curAlbumList.length; i++) {
                            that.curAlbumList[i].dt = that.durationEdit(that.curAlbumList[i].dt);
                        }
                    })
                })
            })

            this.$axios.get('/comment/album?id=' + id).then((response) => {
                that.curAlbumComment = response.data.comments;

                for (let i = 0; i < that.curAlbumComment.length; i++) {
                    that.curAlbumComment[i].user.avatarUrl += "?param=50y50";
                }
            })
        },

        getSinger: function(id) {//搜索歌手
            if (id == undefined) return;
            let that = this;
            this.$axios.get('/artists?id=' + id).then((response) => { //获得歌手
                that.curSinger = response.data.artist;
                that.curSinger.picUrl += "?param=200y200";
            })

            this.$axios.get('/artist/desc?id=' + id).then((response) => {
                that.curSingerDesc = response.data.introduction;
                for (let i = 0; i < that.curSingerDesc.length; i++) {
                    that.curSingerDesc[i].txt = that.curSingerDesc[i].txt.split("\n");
                }
            })

            this.$axios.get('/artist/album?id=' + id).then((response) => { //获得专辑ID
                that.curSingerAlbum = response.data.hotAlbums;

                that.curSingerAlbumSongs = [];
                for (let j = 0; j < that.curSingerAlbum.length; j++) {
                    this.$axios.get('/album?id=' + that.curSingerAlbum[j].id).then((response) => { //获得专辑详情
                        that.curSingerAlbum[j].picUrl += "?param=150y150";

                        let albumSongs = response.data.songs;
                        let searchStr = "/song/detail?ids=";
                        for (let i = 0; i < albumSongs.length; i++) {
                            searchStr += albumSongs[i].id;
                            if (i != albumSongs.length - 1) searchStr += ",";
                        }
                        this.$axios.get(searchStr).then((response) => { //统一保存格式为songdetail
                            that.curSingerAlbumSongs[j] = response.data.songs;
                            for (let i = 0; i < that.curSingerAlbumSongs[j].length; i++) {
                                that.curSingerAlbumSongs[j][i].dt = that.durationEdit(that.curSingerAlbumSongs[j][i].dt);
                            }
                            that.curSingerAlbumSongs = JSON.parse(JSON.stringify(that.curSingerAlbumSongs)); //__ob__: Observer这些数据是vue这个框架对数据设置的监控器，一般都是不可枚举的。凭此代码转换成可枚举类型
                        })
                    })
                }

            })

        },

        shutDown: function(type, close = true) {//切换显示状态
            let thisisShow = this.isShow;
            let thisisSongListShow = this.isSongListShow;
            let thisisAlbumShow = this.isAlbumShow;
            let thisisSingerShow = this.isSingerShow;

            this.isShow = false;
            this.isSongListShow = false;
            this.isAlbumShow = false;
            this.isSingerShow = false;
            this.isCoverShow = false;

            // document.getElementById("showSearchEm").innerHTML = "显示搜索";
            this.viewShow = false;
            this.showSuggest = false;
            switch (type) {
                case (""):
                    return;
                case ("单曲"):
                    if (!thisisShow || !close) {
                        this.isShow = true;
                    } else {
                        this.isShow = false;
                        return;
                    }
                    break;
                case ("歌单"):
                    if (!thisisSongListShow || !close) {
                        this.isSongListShow = true;
                    } else {
                        this.isSongListShow = false;
                        return;
                    }
                    break;
                case ("专辑"):
                    if (!thisisAlbumShow || !close) {
                        this.isAlbumShow = true;
                    } else {
                        this.isAlbumShow = false;
                        return;
                    }
                    break;
                case ("歌手"):
                    if (!thisisSingerShow || !close) {
                        this.isSingerShow = true;
                    } else {
                        this.isSingerShow = false;
                        return;
                    }
                    break;
            }
            this.isCoverShow = true;
            // document.getElementById("showSearchEm").innerHTML = "隐藏搜索";
        },

        getDefaultKeyword: function() {
            this.$axios.get('/search/default').then((response) => {
                this.defaultShowKeyword = response.data.data.showKeyword;
                this.defaultRealKeyword = response.data.data.realkeyword;
            })
        },

        /*搜索*/
        search: function(type = "单曲", id = 0) {
            // if (this.login_username == "") {
            //     Vue.prototype.$Message.info("请登录后再进行此操作");
            //     return;
            // }

            /*如果用户没有输入任何关键词，使用默认的关键词*/
            if (this.keyWord == "") this.keyWord = this.defaultRealKeyword;
            switch (type) {
                case ("单曲"):
                    this.shutDown("单曲", false);
                    this.$axios.get('/search?keywords=' + this.keyWord).then((response) => {
                        this.songList = response.data.result.songs;
                        for (let i = 0; i < this.songList.length; i++) {
                            this.songList[i].dt = this.durationEdit(this.songList[i].dt);
                        }
                    })
                    break;
                case ("歌单"):
                    this.shutDown("歌单", false);
                    this.getSongList(id);
                    break;
                case ("专辑"):
                    this.shutDown("专辑", false);
                    this.getAlbum(id);
                    break;
                case ("歌手"):
                    this.shutDown("歌手", false);
                    this.getSinger(id);
                    break;
            }
        },

        /*搜索建议*/
        getSearchSuggest: function() {
            if (this.keyWord == "") {
                this.showSuggest = false;
                // $("#searchSuggest").css("visibility", "hidden");
                return;
            } else {
                this.showSuggest = true;
                // $("#searchSuggest").css("visibility", "visible");
            }
            this.$axios.get('/search/suggest?keywords=' + this.keyWord).then((response) => {
                /*对搜索建议解析*/
                let form = response.data.result;
                delete form.order;
                let temp = JSON.stringify(form).replace(/albums/g, "专辑")
                temp = temp.replace(/artists/g, "歌手")
                temp = temp.replace(/songs/g, "单曲")
                temp = temp.replace(/playlists/g, "歌单")
                this.suggest = JSON.parse(temp);
            })
        },
        /*判断点击搜索建议时采取何种行为*/
        suggestAction: function(key, name, id) {
            if (key == "单曲") this.keyWord = name;
            this.search(key, id);
        },

        playMusic: function(item, preload = true) { //点击播放

            this.$axios.get('/song/detail?ids=' + item.id).then((response) => {//查找歌曲详情
                this.curMusic = response.data.songs[0];

                this.$axios.get('/song/url?id=' + this.curMusic.id).then((response) => {//通过id获取歌曲本体
                    this.curMusic.url = response.data.data[0].url;
                    this.shutDown("");

                    // document.getElementById("songname").innerHTML = this.curMusic.name;

                    // document.getElementById("songdetail").innerHTML = "";
                    let allSinger = ""
                    for (let i = 0; i < this.curMusic.ar.length; i++) {
                        allSinger += this.curMusic.ar[i].name;
                        if (i != this.curMusic.ar.length - 1) allSinger += " / ";
                    }
                    this.curMusic.allSinger = allSinger

                    cursonglrc = [];
                    currentLine = 0;

                    this.getLrc(this.curMusic.id);
                    this.getCover(this.curMusic);
                    this.getComment(this.curMusic.id);

                    let player = document.getElementById("player");
                    let play = document.getElementById("play");

                    player.src = this.curMusic.url;

                    this.pushMusicHL(this.curMusic);
                    this.pushMusicSL(this.curMusic);

                    if (preload) {
                        setTimeout(function() {
                            player.play();

                            play.title = "pause"
                            $('#play').addClass("play_pause");
                            // play.style.backgroundImage = 'url("player/pause.png")';

                        }, 200)
                    }

                    this.$forceUpdate();
                })

            })
        },

        getCurrentSongIndex: function() {
            var index = -1;
            for (let i = 0; i < this.playList.length; i++) {
                if (this.playList[i].id == this.curMusic.id) {
                    index = i;
                    break;
                }
            }
            return index;
        },

        playTheNext: function() {
            let len = this.playList.length;
            if (len < 1) return;
            var currentIndex = this.getCurrentSongIndex();
            var next = currentIndex < len - 1 ? this.playList[currentIndex + 1] : this.playList[0];
            this.playMusic(next);
            this.pushMusicHL(next);
        },

        playTheFormer: function() {
            let len = this.playList.length;
            if (len < 1) return;
            var currentIndex = this.getCurrentSongIndex();
            var former = currentIndex == 0 ? this.playList[len - 1] : this.playList[currentIndex - 1];
            this.playMusic(former);
            this.pushMusicHL(former);
        },

        /*传入所删记录的id*/
        removeHLitem: function(id) {
            var index = 0;
            for (let i = 0; i < this.history.length; i++) {
                if (this.history[i].id == id) {
                    index = i;
                    break;
                }
            }
            this.history.splice(index, 1);
        },

        /*传入所删记录的id*/
        removeSLitem: function(id) {
            var index = 0;
            if (this.playList.length == 1) {
                this.curMusic = { duration: "00:00" };
            }
            for (let i = 0; i < this.playList.length; i++) {
                if (this.playList[i].id == id) {
                    index = i;
                    break;
                }
            }
            if (this.playList[index].id == this.curMusic.id) {
                this.playTheNext();
            }
            this.playList.splice(index, 1);

        },

        getComment: function(musicId) {
            let that = this;
            this.$axios.get('/comment/music?id=' + musicId + '&limit=50').then((response) => {
                that.comments = response.data.comments;

                curComment = 0;
                totalSongComments = []; //清空评论
                curSongComments = [];
                document.getElementById("thecomments").innerHTML = "";
                for (let i = 0; i < that.comments.length; i++) {
                    if(i > 100) return;
                    let x = window.innerWidth;
                    let y = 115 + Math.random() * (window.innerHeight - 115 - 90);
                    let vx = -2 - Math.random() * 3;
                    let vy = 0;
                    totalSongComments.push(new comments(x, y, vx, vy, that.comments[i].user.avatarUrl + "?param=80y80", that.comments[i].user.nickname, that.comments[i].content, that.comments[i].time, i));
                }
            })
        },

        playNow: function() {
            let player = document.getElementById("player");
            let play = document.getElementById("play");

            if (player.src != "" && play.title == "play") {
                player.play();

                play.title = "pause"
                $('#play').addClass("play_pause");
                // play.style.backgroundImage = 'url("player/pause.png")';
            } else if (player.src != "" && play.title == "pause") {
                player.pause();

                play.title = "play"
                $('#play').removeClass("play_pause");
                // play.style.backgroundImage = 'url("player/play.png")';
            }
        },

        pushMusicHL: function(item) {
            for (let i = 0; i < this.history.length; i++) {
                if (this.history[i].id == item.id) {
                    this.history.splice(i, 1);
                }
            }
            this.history.unshift(item);
        },
        /*将播放的歌曲放到播放列表末尾*/
        pushMusicSL: function(item) {
            for (let i = 0; i < this.playList.length; i++) {
                if (this.playList[i].id == item.id) {
                    this.playList.splice(i, 1);
                }
            }
            this.playList.push(item);
        },

        ClearHL: function() {
            if (confirm("是否清空历史记录？")) this.history = [];
        },

        ClearPL: function() {
            if (confirm("是否清空播放列表？")) this.playList = [];
        },

        /*播放mv*/
        playMVById: function(mvid) {
            this.$axios.get('/mv/url?id=' + mvid).then(
                (response) => {
                    this.mvUrl = response.data.data.url;
                    this.viewShow = true;
                    this.mvIsPlay = true;

                    let player = document.getElementById("player");
                    let play = document.getElementById("play");
                    player.pause();
                    play.title = "play"
                    // play.style.backgroundImage = 'url("player/play.png")';
                    $('#play').removeClass("play_pause");
                }
            )
        },
        /*关闭mv时顺势暂停*/
        closeMv: function() {
            this.viewShow = false;
            let vplay = document.getElementById("vplay");
            vplay.pause();

            let player = document.getElementById("player");
            let play = document.getElementById("play");
            player.pause();
            play.title = "play"
            // play.style.backgroundImage = 'url("player/play.png")';
            $('#play').removeClass("play_pause");
        },

        /*绑定于mouseover时让目标元素移动*/
        addActive: function($event) {
            let target = $event.currentTarget; //触发事件的元素
            let width = target.offsetWidth;
            let parent = target.parentElement; //target的父元素
            let pWidth = parent.offsetWidth;
            let time = 3; //3s完成过渡效果
            if (width < pWidth) return; //若父元素宽度大于target,不触发效果
            target.style.transform = 'translateX(-' + width + 'px)'; //transform对inline/table无效*/
            target.style.transition = "transform " + time + 's' + ' linear';
        },
        /*绑定于mouseout时让目标元素移动回原来位置*/
        removeActive: function($event) {
            let target = $event.currentTarget;
            let width = target.offsetWidth;
            target.style.transform = '';
        },

        // addCancel:function($event){
        //     let target = $event.currentTarget.lastElementChild;
        //     target.style.display = 'inline-block';
        // },

        // removeCancel:function($event){
        //     let target = $event.currentTarget.lastElementChild;
        //     target.style.display = 'none';
        // },
        /*播放器移动*/
        playerMove: function($event) {
            let target = $event.currentTarget;
            let height = target.offsetHeight;
            let parent = target.parentElement; //target的父元素
            let pHeight = parent.offsetHeight;
            if (this.playerShow == false) {
                this.playerShow = true;
                parent.style.transform = "";
            } else {
                this.playerShow = false;
                let distance = pHeight - height;
                parent.style.transform = 'translateY(' + distance + 'px)';
            }
        },

        searchShow: function() {
            if (this.isCoverShow) {
                this.isCoverShow = false;
                this.isShow = false;
                this.isSongListShow = false;
                this.isAlbumShow = false;
                this.isSingerShow = false;
            } else {
                if(Object.keys(this.songList).length === 0) {
                    this.search()
                }
                this.isCoverShow = true;
                this.isShow = true;
            }
        },

        replaceSongList: function() {
            this.playList = this.curSongList;
            this.shutDown("");
            this.playMusic(this.playList[0]);
        },

        replaceAlbum: function() {
            this.playList = this.curAlbumList;
            this.shutDown("");
            this.playMusic(this.playList[0]);
        },

        lockpull: function(locktype = null) { //锁定player
            if (locktype == null) {
                this.islock = !this.islock;
            } else {
                this.islock = locktype;
            }
            // let pull = document.getElementById("pull");
            if (this.islock) {
                // $("#pull").css("bottom", "-2px");
                $('#pull').addClass('pull_lock');
            } else {
                // $("#pull").css("bottom", "-90px");
                $('#pull').removeClass('pull_lock');
            }
        },

        isHistory: function() {
            this.historyShow = !this.historyShow;
            if (this.historyShow) {
                $(".historyAndplay").css("visibility", "visible");
                $(".historyAndplay").css("height", "calc(100vh - 115px - 6px)");
            } else {
                $(".historyAndplay").css("visibility", "hidden");
                $(".historyAndplay").css("height", "0px");
            }
        },

        switchHylist: function() {
            this.HPShow1 = true;
            this.HPShow2 = false;
        },

        switchPlist: function() {
            this.HPShow2 = true;
            this.HPShow1 = false;
        },

        switchRecommend: function() {
            this.isRecommend = !this.isRecommend;
            if (this.isRecommend) {
                $("#recommend").css("visibility", "visible");
                $("#recommend").css("height", "calc(100vh - 115px - 6px)");
            } else {
                $("#recommend").css("visibility", "hidden");
                $("#recommend").css("height", "0px");
            }
        },

        switchSongList: function() {
            if (Object.keys(this.curPlayList).length !== 0) {
                this.shutDown("歌单");
            } else {
                this.$message("请先搜索歌单！");
            }
        },

        switchAlbum: function() {
            if (Object.keys(this.curAlbum).length !== 0) {
                this.shutDown("专辑");
            } else {
                this.$message("请先搜索专辑！");
            }
        },

        switchSinger: function() {
            if (Object.keys(this.curSinger).length !== 0) {
                this.shutDown("歌手");
            } else {
                this.$message("请先搜索歌手！");
            }
        },

    }
}
</script>
<style src="../assets/css/main.css" />
<style src="../assets/css/lrc/lrc.css" />
<style src="../assets/css/lrc/animated_lrc.css" />
<style src="../assets/css/player/player.css" />
<style src="../assets/css/top/top.css" />
<style src="../assets/css/search/search.css" />
<style src="../assets/css/media.css" />
<style src="../assets/css/recommend/recommend.css" />
<style src="../assets/css/recommend/recommendStar.css" />
<style src="../assets/css/songList/songList.css" />
<style src="../assets/css/album/album.css" />
<style src="../assets/css/singer/singer.css" />

<!-- <style src="../assets/css/user/suspensions.css" />
<style src="../assets/css/user/login.css" />
<style src="../assets/css/user/register.css" />
<style src="../assets/css/user/userinfo.css" /> -->

<style src="../assets/css/adaptation.css" />