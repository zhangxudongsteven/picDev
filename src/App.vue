<template>
  <div id="app" class="container">
    <nav class="navbar navbar-default navbar-fix-top">
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
                <div v-if="false"><h4>{{ msg1 }}: "{{ setSelected }}"</h4></div>
                <div class="btn-group my-bt">
                  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Sets <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a href="#" v-on:click="changeSet('test-set-1')">
                        test-set-1<span class="glyphicon glyphicon-ok my-on-right" v-if="setSelected === 'test-set-1'" aria-hidden="true"></span>
                    </a></li>
                    <li><a href="#" v-on:click="changeSet('test-set-2')" style="text-align: left">
                        test-set-2<span class="glyphicon glyphicon-ok my-on-right" v-if="setSelected === 'test-set-2'" aria-hidden="true"></span>
                    </a></li>
                    <li role="separator" class="divider"></li>
                    <li><a href="#">reset</a></li>
                  </ul>
                </div>
                <hr>
                <div class="list-group" v-for="(item, index) in filterFolders">
                      <a href="#" class="list-group-item" v-bind:class="{active: item.name == groupSelected}" v-on:click="changeRepo(item.name)">{{item.name}}<span class="badge">{{item.count}}</span></a>
                </div>
            </div>
            <div id="top" class="col-sm-9">
                <div><h4>{{ msg2 }}</h4></div>
                <hr>
                <div v-for="(item, index) in selectedPicRepo">
                    <img v-bind:src="item.path" alt="image with thumbnail corners" class="img-thumbnail">
                    <p class="my-pic-lable">{{index + 1}} / {{lengthOfThisFolder}} - {{item.name}}</p>
                </div>
                <br>
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
    <hr>
  </div>
</template>

<script>
// var Nanobar = require('nanobar');
    
export default {
    
  name: 'app',
  components: {
  },
  data () {
    return {
      msg1: 'Sets',
      msg2: 'Welcome & Enjoy yourself',
      picInfos: [],
      folderInfos: [],
      filterFolders: [],
      setInfos: [],
      apiUrlPics: './assets/pics.json',
      apiUrlFolders: './assets/folders.json',
      apiUrlSets: './assets/sets.json',
      groupSelected: "test-g1",
      setSelected: "",
      initialSet: "test-set-1"
    }
  },
  methods: {
      getJsonData: function() {
			this.$http.get(this.apiUrlPics)
				.then((response) => {
                    // console.log(response.data);
                    this.picInfos = response.data
				})
				.catch(function(response) {
					console.log(response)
				})
      },
      getGroupJsonData: function() {
			this.$http.get(this.apiUrlFolders)
				.then((response) => {
                    // console.log(response.data);
                    this.folderInfos = response.data;
                    this.changeSet(this.initialSet);
				})
				.catch(function(response) {
					console.log(response)
				})
      },
      getSetJsonData: function() {
			this.$http.get(this.apiUrlSets)
				.then((response) => {
                    // console.log(response.data);
                    this.setInfos = response.data
				})
				.catch(function(response) {
					console.log(response)
				})
      },
      changeRepo: function(repoName) {
          // console.log(repoName);
          this.groupSelected = repoName;
      },
      changeSet: function(setName) {
          if (this.setSelected == setName) return;
          this.setSelected = setName;
          // console.log(this.setSelected);
          this.filterFolders = [];
          for (let item of this.folderInfos) {
            if (item.set == this.setSelected) {
                this.filterFolders.push(item)
            }
          }
          this.groupSelected = this.filterFolders[0].name;
      },
      lastGroup: function() {
          this.changeRepo(this.filterFolders[this.folderIndex - 1].name);
      },
      nextGroup: function() {
          this.changeRepo(this.filterFolders[this.folderIndex + 1].name);
      },
      nanobarInit: function() {
          var options = {
            id: 'app'
          };
          var nanobar = new Nanobar(options);
          nanobar.go(70);
      }
  },
  computed: {
    selectedPicRepo: function() {
        var temp = [];
        for (let item of this.picInfos) {
            if (item.folder == this.groupSelected) {
                temp.push(item);
            }
        }
        return temp;
    },
    lengthOfThisFolder: function() {
        return this.selectedPicRepo.length
    },
    lengthOfThisSet: function() {
        return this.filterFolders.length
    },
    folderIndex: function() {
        var index = 0;
        for (let item of this.filterFolders) {
            if (item.name == this.groupSelected) {
                return index;
            }
            index += 1;
        }
        return 0;
    }
  },
  mounted: function() {
      // console.log("initial rendering is over");
      this.getJsonData();
      this.getGroupJsonData();
      this.getSetJsonData();
      //this.nanobarInit();
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
</style>
