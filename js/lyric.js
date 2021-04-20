(function (window) {
    function Lyric(path) {
        return new Lyric.prototype.init(path)
    }

    Lyric.prototype = {
        constructor: Lyric,
        init: function (path) {
            this.path = path
        },
        times: [],
        lyrics: [],
        index: -1,
        loadLyric: function (callBack) {
            let $this = this
            $.ajax({
                url: $this.path,
                dataType: "text",
                success: function (data) {
                    // console.log(data);
                    $this.parseLyric(data)
                    callBack()
                },
                error: function (e) {
                    console.log(e)
                }
            })
        },
        parseLyric: function (data) {
            let $this = this
            //清空上一首歌词时间
            $this.times = []
            $this.lyrics = []
            let array = data.split("\n")
            //console.log(array);
            let timeReg = /\[(\d*:\d*\.\d*)\]/
            //遍历取出每一条歌词
            $.each(array, function (index, ele) {
                //处理歌词
                let lrc = ele.split("]")[1]
                if (lrc.length == 1) return true
                $this.lyrics.push(lrc)
                // console.log(ele);
                let res = timeReg.exec(ele)
                //console.log(res);
                if (res == null) return true
                let timeStr = res[1]
                let res2 = timeStr.split(":")
                let min = parseInt(res2[0]) * 60
                let sec = parseFloat(res2[1])
                let time = parseFloat(Number(min + sec).toFixed(2))
                //console.log(time);
                $this.times.push(time)


            })
        },
        currentIndex: function (currentTime) {
            if (currentTime >= this.times[0]) {
                this.index++
                this.times.shift()//删除数组前面一个元素
            }
            return this.index
        },


    }
    Lyric.prototype.init.prototype = Lyric.prototype
    window.Lyric = Lyric
})(window)