import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "style-loader!./aijianzi.less";


class Aijianzi extends Component {

    constructor(props) {
        super(props);
        this.loadImageFile = this.loadImageFile.bind(this)
        this.draw = this.draw.bind(this)
        this.IsPC = this.IsPC.bind(this)
        this.uploadImg = this.uploadImg.bind(this)
        this.saveImg = this.saveImg.bind(this)
        this.state = {
        }
    }

    IsPC() {
        let { userAgent } = navigator;
        let Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        let flag = true;
        for (let i = 0; i < Agents.length; i += 1) {
          if (userAgent.indexOf(Agents[i]) > 0) { 
              flag = false; 
              break; 
           }
        }
        return flag;
    }

    uploadImg () {
        document.querySelector('#loadImageFile').click();
    }

    loadImageFile (e) {
        let file = e.target.files[0];
        if (!file.type.match('image.*')) {
          return false;
        }
        let fileReader = new FileReader();
        fileReader.onload =  (e) => {
            this.draw(e.target.result);
        };
        fileReader.readAsDataURL(file);
    }

    draw (src)  {
        var base64 = [];
        var c = document.querySelector('canvas');
        var ctx = c.getContext('2d');
        ctx.fillStyle = "#fff";
        c.width = 290;
        c.height = 290;
        ctx.rect(0, 0, c.width, c.height);
        ctx.fill();
        // 画底图
        var img = new Image;
        img.src = src;
        img.onload = function () {
          ctx.drawImage(img, 0, 0, 290, 290);
          // 画红旗
          var icon = new Image;
          icon.src = require('@src/h5/images/icon.png'),
          icon.onload = function () {
            ctx.drawImage(icon, 0, 0, 290, 290);
            document.querySelector('#preview').src = c.toDataURL("image/jpeg", 0.8);
          }
        }
    }

    saveImg () {
        if (this.IsPC()) {
            var canvas = document.querySelector('canvas')
            var url = canvas.toDataURL("image/jpeg", 0.8);
            var a = document.createElement("a");
            a.download = '头像';
            a.target = "_blank";
            a.href = url;
            document.body.appendChild(a);
            a.click();
            a.remove();
          } else {
            alert('移动端请长按图片保存');
          }
    }

    renderHeader ()  {
        return (
            <a target="_blank" href="https://github.com/shuai4983958/headImage" className="github-corner"
                aria-label="View source on Github">
                <svg viewBox="0 0 250 250" aria-hidden="true">
                    <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                    <path
                    d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                    fill="currentColor" style={{'transformOrigin': '130px 106px'}} className="octo-arm"></path>
                    <path
                    d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                    fill="currentColor" className="octo-body"></path>
                </svg>
            </a>
        )
    }

    renderContent () {
        return (
            <div>
                 <p>爱背单词的璐璐头像生成工具</p>
                <input id="loadImageFile" type="file" accept="image/*" onChange={this.loadImageFile} style={{visibility: 'hidden'}}/>
                 <canvas style={{display: 'none'}}></canvas>
                 <img id="preview" src="" alt=""/>
            </div>
        )
    }

    renderFooter () {
        return (
            <div className="btn-group">
                <button className="btn-save" onClick={this.uploadImg}>上传头像</button>
                <button className="btn-save" onClick={this.saveImg}>保存头像</button>
            </div>
        )
    }

    render() {
      return (
        <div className="app">
            {this.renderHeader()}
            {this.renderContent()}
            {this.renderFooter()}
       </div>
      )
    }
}

const mount = document.createElement('div');
mount.id = 'app';
document.body.appendChild(mount);

ReactDOM.render(<Aijianzi/>, document.getElementById("app"));   
