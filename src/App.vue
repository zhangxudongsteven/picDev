<template>
  <div id="app" class="container">
    <div v-if="false">
        <a href="#app"><span class="glyphicon glyphicon-arrow-up my-right-top"></span></a>
    </div>
    <nav class="navbar navbar-default navbar-fix-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">PicRepo</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="#">View</a></li>
                </ul>
            </div>
        </div>
    </nav>         
    <div class="container">
        <div class="row">
            <div class="col-sm-3"> 
                <div class="btn-group my-bt">
                  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Sets <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a href="#" v-on:click="changeSet('test-set-1')">
                        test-set-1<span class="glyphicon glyphicon-ok my-on-right" v-if="setSelected === 'test-set-1'" aria-hidden="true"></span>
                    </a></li>
                    <li><a href="#" v-on:click="changeSet('pa-0')" style="text-align: left">
                        pa-0<span class="glyphicon glyphicon-ok my-on-right" v-if="setSelected === 'pa-0'" aria-hidden="true"></span>
                    </a></li>
                    <li><a href="#" v-on:click="changeSet('pa-1')" style="text-align: left">
                        pa-1<span class="glyphicon glyphicon-ok my-on-right" v-if="setSelected === 'pa-1'" aria-hidden="true"></span>
                    </a></li>
                    <li><a href="#" v-on:click="changeSet('pa-2')" style="text-align: left">
                        pa-2<span class="glyphicon glyphicon-ok my-on-right" v-if="setSelected === 'pa-2'" aria-hidden="true"></span>
                    </a></li>
                    <li><a href="#" v-on:click="changeSet('pa-3')" style="text-align: left">
                        pa-3<span class="glyphicon glyphicon-ok my-on-right" v-if="setSelected === 'pa-3'" aria-hidden="true"></span>
                    </a></li>
                    <li><a href="#" v-on:click="changeSet('pa-4')" style="text-align: left">
                        pa-4<span class="glyphicon glyphicon-ok my-on-right" v-if="setSelected === 'pa-4'" aria-hidden="true"></span>
                    </a></li>
                    <li><a href="#" v-on:click="changeSet('pa-5')" style="text-align: left">
                        pa-5<span class="glyphicon glyphicon-ok my-on-right" v-if="setSelected === 'pa-5'" aria-hidden="true"></span>
                    </a></li>
                    <li><a href="#" v-on:click="changeSet('pa-6')" style="text-align: left">
                        pa-6<span class="glyphicon glyphicon-ok my-on-right" v-if="setSelected === 'pa-6'" aria-hidden="true"></span>
                    </a></li>
                    <li><a href="#" v-on:click="changeSet('pa-7')" style="text-align: left">
                        pa-7<span class="glyphicon glyphicon-ok my-on-right" v-if="setSelected === 'pa-7'" aria-hidden="true"></span>
                    </a></li>
                    <li><a href="#" v-on:click="changeSet('wp')" style="text-align: left">
                        wp<span class="glyphicon glyphicon-ok my-on-right" v-if="setSelected === 'wp'" aria-hidden="true"></span>
                    </a></li>
                    <li role="separator" class="divider"></li>
                    <li><a href="#">reset</a></li>
                  </ul>
                </div>
                <hr>
                <div class="list-group" v-for="(item, index) in filterFolders">
                      <a href="#" class="list-group-item" v-bind:class="{active: item.name == groupSelected}" v-on:click="changeRepo(item.name)">{{item.name}}<span class="badge">{{item.amount}}</span></a>
                </div>
            </div>
            <div id="top" class="col-sm-9">
                <div><h4>{{ msg2 }}</h4></div>
                <hr>
                <div class="row">
                    <div class="col-sm-11">
                        <a href="#top">
                            <button type="button" class="btn btn-default dropdown-toggle my-on-left" aria-expanded="true" v-if="folderIndex != 0" v-on:click="lastGroup()">Last</button>
                            <button type="button" class="btn btn-default dropdown-toggle my-on-right" aria-expanded="true" v-if="folderIndex + 1 != lengthOfThisSet" v-on:click="nextGroup()">Next</button>
                        </a>
                    </div>
                    <div class="col-sm-1"></div>
                </div>
                <br> 
                <div v-for="(item, index) in selectedPics">
                    <img v-bind:src="item.url" alt="image with thumbnail corners" class="img-thumbnail">
                    <p class="my-pic-lable">{{index + 1}} / {{lengthOfThisFolder}} - {{item.name}}</p>
                </div>
                <br>
                <div>
                    <div class="col-sm-11">
                        <a href="#top">
                            <button type="button" class="btn btn-default dropdown-toggle my-on-left" aria-expanded="true" v-if="folderIndex != 0" v-on:click="lastGroup()">Last</button>
                            <button type="button" class="btn btn-default dropdown-toggle my-on-right" aria-expanded="true" v-if="folderIndex + 1 != lengthOfThisSet" v-on:click="nextGroup()">Next</button>
                        </a>
                    </div>
                    <div class="col-sm-1"></div>
                </div>
            </div>
        </div>
    </div>
    <hr>
  </div>
</template>

<script>
import { dropdown } from 'vue-strap';
let AV = require("leancloud-storage");
    
export default {
    
  name: 'app',
  components: {
      dropdown
  },
  data () {
    return {
      msg1: 'Sets',
      msg2: 'Welcome & Enjoy yourself',
      setInfos: [],
      filterFolders: [],
      selectedPics: [],
      groupSelected: "test-g1",
      setSelected: "",
      initialSet: "test-set-1"
    }
  },
  methods: {
      changeRepo: function(repoName) {
          if (this.groupSelected == repoName) return;
          this.groupSelected = repoName;
          this.getPics();
      },
      changeSet: function(setName) {
          if (this.setSelected == setName) return;
          this.setSelected = setName;
          this.filterFolders = [];
          var temSet = AV.Object.createWithoutData("Sets", this.selectedSetKey)
          var query = new AV.Query("Folders");
          query.equalTo("dependent", temSet);
          query.find().then(folders => {
              var temp = [];
              folders.forEach(function(folder, i, a) {
                  var obj = {};
                  obj["id"] = folder.id;
                  obj["name"] = folder.get("name");
                  obj["amount"] = folder.get("amount");
                  temp.push(obj);
              });
              this.filterFolders = temp;
              this.groupSelected = this.filterFolders[0]["name"];
              this.getPics();
          });
      },
      lastGroup: function() {
          this.changeRepo(this.filterFolders[this.folderIndex - 1].name);
      },
      nextGroup: function() {
          this.changeRepo(this.filterFolders[this.folderIndex + 1].name);
      },
      leanInit: function() {
          const appId = 'YWp5VQ5GqNBxSM5oW0GahRav-gzGzoHsz';
          const appKey = 'mwKhOt9ERxNNmEUGlpJ89f78';
          AV.init({appId, appKey});
          this.leanGetSets();
      },
      leanGetSets: function() {
          var query = new AV.Query("Sets");
          query.find().then(sets => {
              for (let item of sets) {
                  var obj = {};
                  obj["id"] = item.id;
                  obj["name"] = item.get("name");
                  obj["amount"] = item.get("amount");
                  this.setInfos.push(obj);
              }
              this.changeSet(this.setInfos[0].name);
              // console.log(this.setInfos);
          })
      },
      getPics: function() {
        var folderKey = "";
        for (let item of this.filterFolders) {
            if (item.name == this.groupSelected) {
                folderKey = item.id;
            }
        }
        var temFolder = AV.Object.createWithoutData("Folders", folderKey);
        var query = new AV.Query("Pics");
        query.equalTo("dependent", temFolder);
        query.find().then(pics => {
            var temp = [];
            pics.forEach(function(pic, i, a) {
                var obj = {};
                obj["id"] = pic.id;
                obj["name"] = pic.get("name");
                obj["url"] = pic.get("url");
                temp.push(obj);
            });
            this.selectedPics = temp;
        })
      }
  },
  computed: {
    // replace this when use object as set iterator
    selectedSetKey: function(){
        if (this.setSelected == "") return "";
        for (let item of this.setInfos) {
            if (item.name == this.setSelected) {
                return item.id;
            }
        }
        return "";
    },
    lengthOfThisFolder: function() {
        return this.selectedPics.length
    },
    lengthOfThisSet: function() {
        return this.filterFolders.length
    },
    folderIndex: function() {
        var index = 0;
        for (let item of this.filterFolders) {
            if (item.name == this.groupSelected) return index;
            index += 1;
        }
        return 0;
    }
  },
  mounted: function() {
      this.leanInit();
  }
}
</script>

<style>
    .my-on-right {
        float:right;
    },
    .my-on-left {
        float:left;
    }
    .my-bt {
        width: 200;
    }
    .my-right-top 
    {
        width: 40px;
        height:40px;
        position: fixed;
        z-index: 999;
        left:85%;
        top: 200px;
    }
</style>
