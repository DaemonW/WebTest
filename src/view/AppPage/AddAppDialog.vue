<template>
  <el-dialog
      title="ADD APP"
      :visible.sync="visible"
      :width="dialogWidth"
      top="25vh"
      :show-close="false"
      :before-close="onClose">
    <el-row align="middle" type="flex" justify="center">
      <el-col class="left-col" :span="6">
        <span>NAME: </span>
      </el-col>
      <el-col :span="16" style="text-align: right">
        <el-input style="width: 80%" v-model="appName"></el-input>
      </el-col>
    </el-row>

    <el-row align="middle" type="flex" justify="center">
      <el-col class="left-col" :span="6">
        <span>CATEGORY: </span>
      </el-col>
      <el-col :span="16" style="text-align: right">
        <el-select placeholder="SELECT CATEGORY" @change="onCategoryChange" style="width: 80%" v-model="appCategory">
          <el-option
              v-for="(item,index) in categories"
              :key="index"
              :label="item"
              :value="index">
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row align="middle" type="flex" justify="center">
      <el-col class="left-col" :span="6">
        <span>FILE: </span>
      </el-col>
      <el-col style="text-align: right" :span="16">
        <div @click="selectAPKFile">
          <input type="file" @change="parseApk" style="display: none" id="apk-picker"/>
          <el-button id="apk-selector" style="width: 80%">Choose Apk</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row align="middle" type="flex" justify="center">
      <el-col class="left-col" :span="6">
        <span>ENCRYPT: </span>
      </el-col>
      <el-col style="text-align: right" :span="16">
        <el-switch v-model="encrypt" active-color="#13ce66" inactive-color="#cdcdcd">
        </el-switch>
      </el-col>
    </el-row>

    <el-row align="middle" type="flex" justify="center">
      <el-col class="left-col" :span="6">
        <span>ICON: </span>
      </el-col>
      <el-col style="text-align: right" :span="16">
        <div @click="selectIconFile">
          <input type="file" @change="parseIcon" style="display: none" id="img-picker"/>
          <el-image fit="fill" :src="appIcon" style="float: right" class="avatar">
            <div slot="error" class="avatar-slot">
              <el-image :src="require('@/assets/default_pic.png')"></el-image>
            </div>
          </el-image>
        </div>
      </el-col>
    </el-row>

    <span slot="footer" class="dialog-footer">
      <el-row align="middle">
        <el-col :span="12">
          <el-button @click="dismiss">CANCEL</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="confirm">OK</el-button>
        </el-col>
      </el-row>
  </span>
  </el-dialog>
</template>

<script>

export default {
  name: "AddAppDialog",
  data() {
    return {
      dialogWidth: '',
      appName: '',
      appCategory: '',
      categoryIndex: -1,
      encrypt: false,
      appIcon: '',
      apkFile: undefined,
      categories: this.$store.getters.categories
    }
  },
  created() {
    if (this.$store.getters.isMobile) {
      this.dialogWidth = '80%';
    } else {
      this.dialogWidth = '450px';
    }
  },
  mounted() {
  },
  methods: {
    onClose() {
    },
    dismiss() {
      this.$store.commit('dismissAddAppDialog');
    },
    confirm() {
      if (!this.checkParams()) {
        return;
      }
      this.$store.commit('dismissAddAppDialog');
      this.uploadApp();
    },
    selectAPKFile() {
      let picker = document.getElementById('apk-picker');
      picker.click();
    },
    selectIconFile() {
      let picker = document.getElementById('img-picker');
      picker.click();
    },
    parseIcon(e) {
      let file = e.target.files[0];
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
      console.log("file type = " + file.type)
      const isLt2M = file.size / 1024 < 500;
      if (!isJPG) {
        this.$message('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message('上传头像图片大小不能超过 500KB!');
      }
      if (isJPG && isLt2M) {
        this.appIcon = URL.createObjectURL(file);
        console.log(this.appIcon);
      }
    },
    parseApk(e) {
      let file = e.target.files[0];
      let isApk = file.type === 'application/vnd.android.package-archive';
      if (!isApk) {
        this.$message('file is not an apk!')
        return;
      }
      let name = this.tripApkFileName(file.name, 20);
      document.getElementById('apk-selector').querySelector('span').innerText = name;
      this.apkFile = file;
    },
    onCategoryChange(c) {
      this.categoryIndex = c;
    },
    checkParams() {
      if (this.appName === "") {
        this.$message("App name shouldn't be empty!")
        return false;
      }
      if (this.appCategory === "") {
        this.$message("App catery shouldn't be empty!")
        return false;
      }
      if (this.apkFile === undefined) {
        this.$message("You need to specify a apk file!")
        return false;
      }
      return true;
    },
    uploadApp() {
      let app = {
        appName: this.appName,
        appCategory: this.appCategory,
        encrypt: this.encrypt,
        apkFile: this.apkFile
      }
      this.$store.dispatch('uploadApp', app);
    },
    reset() {
      this.appName = '';
      this.appCategory = '';
      this.appIcon = '';
      this.encrypt = false;
      this.categoryIndex = -1;
      this.apkFile = undefined;
    },
    tripApkFileName(str, len) {
      //length属性读出来的汉字长度为1
      if (str.length * 2 <= len) {
        return str;
      }
      var strlen = 0;
      var s = "";
      for (var i = 0; i < str.length; i++) {
        s = s + str.charAt(i);
        if (str.charCodeAt(i) > 128) {
          strlen = strlen + 2;
          if (strlen >= len) {
            return s.substring(0, s.length - 1) + "...";
          }
        } else {
          strlen = strlen + 1;
          if (strlen >= len) {
            return s.substring(0, s.length - 2) + "...";
          }
        }
      }
      return s;
    },
  },
  computed: {
    visible() {
      return this.$store.getters.showAddAppDialog;
    }
  },
  watch: {
    visible(val) {
      if (!val) {
        this.reset();
      }
    }
  }
}
</script>

<style scoped>

.el-row {
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 15px;
}

.el-col {
  text-align: center;
}

.left-col {
  text-align: left;
}

.el-button {
  width: 100px;
}

.avatar {
  width: 60px;
  height: 60px;
  display: block;
}

.avatar-slot {
  width: 60px;
  height: 60px;
}

span {
  text-lign: center;
}

::v-deep .el-dialog__header {
  text-align: center;
  background: #0088ff;
}

::v-deep .el-dialog__title {
  color: #ffffff;
}
</style>
