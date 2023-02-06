var mouseOnSuggest = false;

Vue.prototype.$Message.config({
    top: 70,
    duration: 2,
});

var search = new Vue({
    el: "#whole",
    data: {
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
        // 单曲搜索结果的显示状态
        isShow: false,
        // 搜索结果的显示背景
        isCoverShow: false,
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
    },
    mounted() {
        const that = this;
        this.getDefaultKeyword();
        this.init(this);

        window.addEventListener('unload', e => this.unloadHandler(e, this)); //添加页面关闭事件

        $("#pull").on('click', function(e) {
            if (e.target.id != "pull") {
                let lzsum = 10 + Math.floor(Math.random() * 5);
                for (let i = 0; i < lzsum; i++) {
                    let rad = Math.random() * 2 * Math.PI;
                    let vx = 3 * (Math.random() - 0.5) * Math.cos(rad);
                    let vy = 3 * (Math.random() - 0.5) * Math.sin(rad);
                    let time = 80 + 20 * Math.random();
                    mouseParticle.push(new partical(mouseX, mouseY, time, vx, vy, 0, 0, 10, 0, Math.random() * 255, Math.random() * 255, Math.random() * 255, 255, 255, 255, Math.random() * 4 * Math.PI * 3 - 2 * Math.PI * 3, Math.random() * 4 * Math.PI * 3 - 2 * Math.PI * 3))
                }
                e.stopPropagation(); //currentTarget始终是监听事件者，而target是事件的真正发出者
            } else {
                that.lockpull();
            }
        })

        document.getElementById("player").addEventListener('ended', function() {
            that.playTheNext();
        }, false);

        $(window).click(function(e) {
            if (!mouseOnSuggest) that.showSuggest = false;
        })
        $("#searchSuggest").mouseenter(function(e) {
            mouseOnSuggest = true;
        })
        $("#searchSuggest").mouseleave(function(e) {
            mouseOnSuggest = false;
        })
        $("#input1").click(function(e) {
            mouseOnSuggest = true;
        })

        $(".login-button").on('click', function(e) { //用户登录
            $(".login").addClass("active")
            setTimeout(function() {
                $(".sk-rotating-plane").addClass("active");
                $(".login").css("display", "none");
            }, 500)

            login_timeout = setTimeout(function() {
                $(".login").removeClass("active");
                $(".sk-rotating-plane").removeClass("active");
                Vue.prototype.$Message.warning("登录超时");
            }, 10000)

            that.userSave(that)

            api.post('users/login', { username: that.username, password: that.password }).then((res) => {
                if (res.code === 0) {
                    sessionStorage.setItem('token', res.data.token)
                    sessionStorage.setItem('username', this.username)
                    Vue.prototype.$Message.success(res.message);
                    clearTimeout(login_timeout);

                    api.get('users/user/historyandplaylist/' + that.username).then((res) => { // 获得用户历史记录和播放列表
                        that.history = JSON.parse(res.data.musicHistory)
                        that.playList = JSON.parse(res.data.myPlayList)
                        Vue.prototype.$Message.success('已成功为您恢复历史记录与播放列表');
                    })

                    that.login_username = that.username;

                    setTimeout(function() {
                        $(".login").removeClass("active");
                        $(".sk-rotating-plane").removeClass("active");
                    }, 1000)
                } else {
                    Vue.prototype.$Message.error(res.message);
                    clearTimeout(login_timeout);
                    setTimeout(function() {
                        $(".login").removeClass("active");
                        $(".sk-rotating-plane").removeClass("active");
                    }, 1000)
                    sessionStorage.removeItem('token')
                }
            })
        })

        $(".register-button").on('click', function(e) { //用户注册
            if (that.username && that.password && that.repassword) {
                if (that.password === that.repassword) {
                    let data = {
                        phone: '未知',
                        nikename: '未知',
                        age: '未知',
                        sex: '未知',
                        musicHistory: '',
                        myPlayList: '',
                        username: that.username,
                        password: that.password,
                    }
                    api.post('users/register', data).then((res) => {
                        if (res.code === 0) {
                            sessionStorage.removeItem('token')
                            alert(res.message)
                            $(".register").css("display", "none");
                            $(".login").css("display", "block");
                        }
                    })
                } else {
                    Vue.prototype.$Message.error("内容输入错误，两次密码输入不一致");
                }
            } else {
                Vue.prototype.$Message.error("内容输入错误，请输入必要信息");
            }
        })

        that.getRecommend();
        that.getSongList();

        window.setInterval(function() { synchronization(that) }, 20); //同步
    },
    methods: {
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

        init: (thisvue) => { //初始化加载localstorage

            if (localStorage.getItem("rtx") != null) {
                thisvue.rtx = localStorage.getItem("rtx");
            }

            if (localStorage.getItem("volume") != null) {
                thisvue.volume = localStorage.getItem("volume");
                document.getElementById("player").volume = thisvue.volume / 100;
            }

            if (localStorage.getItem("islock") != null) {
                thisvue.islock = JSON.parse(localStorage.getItem("islock"));
                thisvue.lockpull(thisvue.islock);
            } else {
                thisvue.lockpull(true);
            }

            if (localStorage.getItem("curMusic") != null) {
                thisvue.curMusic = JSON.parse(localStorage.getItem("curMusic"));
                if (thisvue.curMusic.id) {
                    thisvue.playMusic(thisvue.curMusic, false);
                    getcover(thisvue.curMusic);
                }
            }

            if (localStorage.getItem("musicHistory") != null) {
                thisvue.history = JSON.parse(localStorage.getItem("musicHistory"));
            }

            if (localStorage.getItem("myPlayList") != null) {
                thisvue.playList = JSON.parse(localStorage.getItem("myPlayList"));
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

        admin: function() {
            if (this.login_username == "admin") {
                // window.open("http://localhost:8081/admin/users");
                $('.user_suspensions').css('display', 'block')
                $(".login").css("display", "none");
                $(".register").css("display", "none");
                this.getUsers()

            } else {
                Vue.prototype.$Message.info("您还不是管理员哦");
            }
        },

        online: function(username) {
            api.get('admin/stopLogin/' + username).then((res) => {
                Vue.prototype.$Message.info(res.message);
                this.getUsers()
            })
        },

        getUsers: function() {
            //获取所有用户
            api.get('admin/getAllUser').then((res) => {
                this.user_list = res.data
            })
        },

        about: () => {
            alert("作者：刘睿\nQQ：1104052058", "星空播放器")
        },

        getRecommend: function() {
            axios.get('/personalized?limit=30').then((response) => {
                this.recommendSongList = response.data.result;
                for (let i = 0; i < this.recommendSongList.length; i++) {
                    this.recommendSongList[i].picUrl += "?param=200y200";
                }
            })
        },

        getSongList: function(id) {
            if (id == undefined) return;
            let that = this;
            axios.get('/playlist/detail?id=' + id).then((response) => {
                that.curPlayList = response.data.playlist;
                that.curPlayList.coverImgUrl += "?param=200y200";

                let searchStr = "/song/detail?ids=";
                for (let i = 0; i < that.curPlayList.trackIds.length; i++) {
                    searchStr += that.curPlayList.trackIds[i].id;
                    if (i != that.curPlayList.trackIds.length - 1) searchStr += ",";
                }
                axios.get(searchStr).then((response) => { //统一保存格式为songdetail
                    that.curSongList = response.data.songs;
                    for (let i = 0; i < that.curSongList.length; i++) {
                        that.curSongList[i].dt = that.durationEdit(that.curSongList[i].dt);
                    }
                })
            })

            axios.get('/comment/playlist?id=' + id).then((response) => {
                that.curPlayListComment = response.data.comments;

                for (let i = 0; i < that.curPlayListComment.length; i++) {
                    that.curPlayListComment[i].user.avatarUrl += "?param=50y50";
                }
            })
        },

        getAlbum: function(id) {
            if (id == undefined) return;
            let that = this;
            axios.get('/album?id=' + id).then((response) => {
                that.curAlbum = response.data.album;
                that.curAlbum.picUrl += "?param=200y200";

                let albumSongs = response.data.songs;
                let searchStr = "/song/detail?ids=";
                for (let i = 0; i < albumSongs.length; i++) {
                    searchStr += albumSongs[i].id;
                    if (i != albumSongs.length - 1) searchStr += ",";
                }
                axios.get('/album/detail/dynamic?id=' + id).then((response) => {
                    that.curAlbum.subCount = response.data.subCount;

                    axios.get(searchStr).then((response) => { //统一保存格式为songdetail
                        that.curAlbumList = response.data.songs;
                        for (let i = 0; i < that.curAlbumList.length; i++) {
                            that.curAlbumList[i].dt = that.durationEdit(that.curAlbumList[i].dt);
                        }
                    })
                })
            })

            axios.get('/comment/album?id=' + id).then((response) => {
                that.curAlbumComment = response.data.comments;

                for (let i = 0; i < that.curAlbumComment.length; i++) {
                    that.curAlbumComment[i].user.avatarUrl += "?param=50y50";
                }
            })
        },

        getSinger: function(id) {
            if (id == undefined) return;
            let that = this;
            axios.get('/artists?id=' + id).then((response) => { //获得歌手
                that.curSinger = response.data.artist;
                that.curSinger.picUrl += "?param=200y200";
            })

            axios.get('/artist/desc?id=' + id).then((response) => {
                that.curSingerDesc = response.data.introduction;
                for (let i = 0; i < that.curSingerDesc.length; i++) {
                    that.curSingerDesc[i].txt = that.curSingerDesc[i].txt.split("\n");
                }
            })

            axios.get('/artist/album?id=' + id).then((response) => { //获得专辑ID
                that.curSingerAlbum = response.data.hotAlbums;

                that.curSingerAlbumSongs = [];
                for (let j = 0; j < that.curSingerAlbum.length; j++) {
                    axios.get('/album?id=' + that.curSingerAlbum[j].id).then((response) => { //获得专辑详情
                        that.curSingerAlbum[j].picUrl += "?param=150y150";

                        let albumSongs = response.data.songs;
                        let searchStr = "/song/detail?ids=";
                        for (let i = 0; i < albumSongs.length; i++) {
                            searchStr += albumSongs[i].id;
                            if (i != albumSongs.length - 1) searchStr += ",";
                        }
                        axios.get(searchStr).then((response) => { //统一保存格式为songdetail
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

        shutDown: function(type, close = true) {
            let thisisShow = this.isShow;
            let thisisSongListShow = this.isSongListShow;
            let thisisAlbumShow = this.isAlbumShow;
            let thisisSingerShow = this.isSingerShow;

            this.isCoverShow = false;
            this.isShow = false;
            this.isSongListShow = false;
            this.isAlbumShow = false;
            this.isSingerShow = false;

            document.getElementById("showSearchEm").innerHTML = "显示搜索";
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
            document.getElementById("showSearchEm").innerHTML = "隐藏搜索";
        },

        getDefaultKeyword: function() {
            axios.get('/search/default').then((response) => {
                this.defaultShowKeyword = response.data.data.showKeyword;
                this.defaultRealKeyword = response.data.data.realkeyword;
            })
        },

        /*搜索*/
        search: function(type = "单曲", id = 0) {
            if (this.login_username == "") {
                Vue.prototype.$Message.info("请登录后再进行此操作");
                return;
            }

            /*如果用户没有输入任何关键词，使用默认的关键词*/
            if (this.keyWord == "") this.keyWord = this.defaultRealKeyword;
            switch (type) {
                case ("单曲"):
                    this.shutDown("单曲", false);
                    axios.get('/search?keywords=' + this.keyWord).then((response) => {
                        this.songList = response.data.result.songs;
                        for (let i = 0; i < this.songList.length; i++) {
                            this.songList[i].duration = this.durationEdit(this.songList[i].duration);
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
                $("#searchSuggest").css("visibility", "hidden");
                return;
            } else {
                this.showSuggest = true;
                $("#searchSuggest").css("visibility", "visible");
            }
            axios.get('/search/suggest?keywords=' + this.keyWord).then((response) => {
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

            axios.get('/song/detail?ids=' + item.id).then((response) => {
                this.curMusic = response.data.songs[0];

                axios.get('/song/url?id=' + this.curMusic.id).then((response) => {
                    this.curMusic.url = response.data.data[0].url;
                    this.shutDown("");

                    document.getElementById("songname").innerHTML = this.curMusic.name;

                    document.getElementById("songdetail").innerHTML = "";
                    for (let i = 0; i < this.curMusic.ar.length; i++) {
                        document.getElementById("songdetail").innerHTML += this.curMusic.ar[i].name;
                        if (i != this.curMusic.ar.length - 1) document.getElementById("songdetail").innerHTML += " / ";
                    }

                    cursonglrc = [];
                    currentLine = 0;

                    getLrc(this.curMusic.id);
                    getcover(this.curMusic);
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
                            play.style.backgroundImage = 'url("player/pause.png")';

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
            axios.get('/comment/music?id=' + musicId + '&limit=50').then((response) => {
                that.comments = response.data.comments;

                curComment = 0;
                totalSongComments = []; //清空评论
                curSongComments = [];
                document.getElementById("thecomments").innerHTML = "";
                for (let i = 0; i < that.comments.length; i++) {
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
                play.style.backgroundImage = 'url("player/pause.png")';
            } else if (player.src != "" && play.title == "pause") {
                player.pause();

                play.title = "play"
                play.style.backgroundImage = 'url("player/play.png")';
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
            axios.get('/mv/url?id=' + mvid).then(
                (response) => {
                    this.mvUrl = response.data.data.url;
                    this.viewShow = true;
                    this.mvIsPlay = true;

                    let player = document.getElementById("player");
                    let play = document.getElementById("play");
                    player.pause();
                    play.title = "play"
                    play.style.backgroundImage = 'url("player/play.png")';
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
            play.style.backgroundImage = 'url("player/play.png")';
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
            if (document.getElementById("showSearchEm").innerHTML == "隐藏搜索") {
                this.isCoverShow = false;
                this.isShow = false;
                this.isSongListShow = false;
                this.isAlbumShow = false;
                this.isSingerShow = false;
                document.getElementById("showSearchEm").innerHTML = "显示搜索";
            } else {
                this.isCoverShow = true;
                this.isShow = true;
                document.getElementById("showSearchEm").innerHTML = "隐藏搜索";
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

            let pull = document.getElementById("pull");
            if (this.islock) {
                $("#pull").css("bottom", "-2px");
                pull.style.backgroundImage = "url('player/lockarray.png')";
            } else {
                $("#pull").css("bottom", "-80px");
                pull.style.backgroundImage = "url('player/array.png')";
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
            if (this.curPlayList != "") {
                this.shutDown("歌单");
            } else {
                alert("请先搜索歌单！");
            }
        },

        switchAlbum: function() {
            if (this.curAlbum != "") {
                this.shutDown("专辑");
            } else {
                alert("请先搜索专辑！");
            }
        },

        switchSinger: function() {
            if (this.curSinger != "") {
                this.shutDown("歌手");
            } else {
                alert("请先搜索歌手！");
            }
        },

    }
})