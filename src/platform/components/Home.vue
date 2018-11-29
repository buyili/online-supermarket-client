<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8">
          <div class="head-left">
            <span class="head-text">Manage Platform</span>
          </div>
        </el-col>
        <el-col :span="8" :offset="8">
          <div class="head-right">
            <span class="head-text">{{admin.name}}</span>
            <el-button @click="logout">登出</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside>
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-tabs v-model="activeName">
          <el-tab-pane label="品牌管理" name="trademark">
            <el-row>
              <el-col
                :style="{ 'margin-top': '15px' }"
                :span="4"
                v-for="(trademark, index) in trademarks"
                :key="index"
                :offset="3"
              >
                <el-card :body-style="{ padding: '0px' }">
                  <img src class="image">
                  <div style="padding: 14px;">
                    <span>{{trademark.name}}</span>
                    <div class="bottom clearfix">
                      <el-button type="text" class="button" @click="delTrademark(trademark)">Delete</el-button>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>

            <br>
            <br>

            <el-form ref="trademarkForm" :model="addTrademark" label-width="180px" :rules="rules">
              <el-form-item label="Trademark Name" prop="name">
                <el-input v-model="addTrademark.name"></el-input>
              </el-form-item>
              <el-form-item label="Trademark Logo">
                <el-upload
                ref="upload"
                :action="uploadAction"
                :file-list="fileList"
                :auto-upload="false"
                :data="addTrademark"
                :http-request="upload"
                :multiple="false"
                :limit="1"
                :on-exceed="exceed"
                list-type="picture"
                >
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <el-button
                  style="margin-left: 10px;"
                  size="small"
                  type="success"
                  @click="submitUpload"
                  >上传到服务器</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="分类管理" name="category">
            <el-form ref="addCategoryForm" :model="addCategory" :inline="true" :rules="rules">
              <el-form-item label="Category Level">
                <el-select v-model="addCategory.level" placeholder="请选择">
                  <el-option label="一级目录" :value="1"></el-option>
                  <el-option label="二级目录" :value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="addCategory.level == 2" label="父目录" prop="parentId">
                <el-select v-model="addCategory.parentId" placeholder="请选择">
                  <el-option
                    v-for="item in categories"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Category Name" prop="name">
                <el-input v-model="addCategory.name"></el-input>
              </el-form-item>
              <el-button @click="addCategoryF">添加</el-button>
            </el-form>
            <el-button @click="queryAllCategories">刷新</el-button>

            <div class="category-show-wrap">
              <el-collapse @change="handleChange">
                <template v-for="(category, index) in categories">
                  <el-collapse-item :title="category.name" :name="category.id" :key="index">
                    <el-button @click="handleDelCategory(category)">Delete All And Parent</el-button>
                    <br>
                    <br>
                    <div v-if="category.child != null && category.child.length != 0">
                      <template v-for="(cCategory, cIndex) of category.child">
                        <el-button
                          :key="cIndex"
                          @click="handleDelCategory(cCategory)"
                        >{{cCategory.name}}</el-button>
                      </template>
                    </div>
                    <div v-else>not child data</div>
                  </el-collapse-item>
                </template>
              </el-collapse>
            </div>
          </el-tab-pane>
          <el-tab-pane label="角色管理" name="third"></el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import * as Api from "../api/login.js";
export default {
  data() {
    return {
      isCollapse: false,
      activeName: "trademark",
      rules: {
        name: [{ required: true, message: "请输入品牌名称", trigger: "blur" }],
        parentId: [
          { required: true, message: "请选择父目录", trigger: "change" }
        ]
      },
      trademarks: [],
      addTrademark: {
        name: ""
      },
      uploadAction: "http://localhost:8080/admin/trademarks/add",
      fileList: [],

      addCategory: {
        parentId: null,
        name: "",
        level: 1
      },
      categories: []
    };
  },

  computed: {
    admin: function() {
      return this._local.getItem("admin");
    },
    uploadHeaders: function() {
      return {
        token: this._local.getItem("token")
      };
    }
  },

  methods: {
    logout: function() {
      Api.logout(() => {
        this.$router.push("login");
      });
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },

    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    queryAllTrademark() {
      Api.queryAllTrademarks(({ data }) => {
        this.trademarks = data;
      });
    },

    delTrademark(trademark) {
      Api.delTrademark(
        trademark.id,
        () => {
          this._message.success("Delete Success!");
          this.queryAllTrademark();
        },
        () => {
          this._message.error("Delete Error!");
        }
      );
    },

    submitUpload() {
      this.$refs.upload.submit();
    },

    exceed() {
      this._message.warning("只能选择一个文件! 请先删除已选择文件");
    },

    upload(content) {
      this.$refs.trademarkForm.validate((success, error) => {
        if (success) {
          Api.addTrademark(
            content,
            body => {
              content.onSuccess();
              this._message.success("上传成功");
              this.queryAllTrademark();
            },
            ({ msg }) => {
              content.onError();
              this._message.error("上传失败! " + msg);
            }
          );
        }
      });
    },

    //Tab Category Manage
    handleChange(val) {
      console.log(val);
    },

    queryAllCategories() {
      Api.queryAllCategories(
        ({ data }) => {
          this.categories = data;
        },
        () => {}
      );
    },

    addCategoryF() {
      this.$refs.addCategoryForm.validate().then(() => {
        let category = {
          ...this.addCategory
        };
        if (category.level === 1) {
          category.parentId = 0;
        }
        Api.addCategory(
          category,
          body => {
            this._message.success("添加成功!");
            this.queryAllCategories();
          },
          () => {
            this._message.success("添加失败!");
          }
        );
      });
    },
    handleDelCategory(category) {
      Api.delCategory(
        category.id,
        () => {
          this._message.success("Delete Success!");
          this.queryAllCategories();
        },
        () => {
          this._message.error("Delete Error!");
        }
      );
    }
  },

  created: function() {
    this.queryAllCategories();
    this.queryAllTrademark();
  }
};
</script>


<style>
.head-text {
  margin-right: 18px;
  font-weight: 300;
  font-size: 24px;
}
.category-show-wrap {
  margin-top: 20px;
  padding: 0 20px;
  background-color: #ffffff;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
