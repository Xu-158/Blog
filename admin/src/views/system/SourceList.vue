<template>
  <div class="source">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="图片资源" name="picture">
        <el-table :data="imagesViews" style="width: 100%">
          <el-table-column label="预览">
            <template slot-scope="scope">
              <a
                style="color: black"
                :href="baseUrl + scope.row.key"
                target="block"
              >
                <img
                  :src="baseUrl + scope.row.key"
                  alt=""
                  width="100"
                  height="100"
              /></a>
            </template>
          </el-table-column>
          <el-table-column label="mimeType">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.mimeType }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="Size">
            <template slot-scope="scope">
              <el-tag size="medium">{{
                sizeConversion(scope.row.fsize)
              }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="上传时间">
            <template slot-scope="scope">
              <el-tag size="medium">{{
                (scope.row.putTime / 1e4)
                  | dateFormatFilters("YYYY-mm-dd HH:MM:SS")
              }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-popconfirm
                title="确定删除这个标签吗？"
                @onConfirm="deleteAction(scope.row.key)"
              >
                <el-button slot="reference" size="mini" type="danger"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="imagesTotal"
            :page-size="pageSize"
            :current-page="imagesPage"
            @current-change="imagesPageChange"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="音频资源" name="music">
        <div class="upload">
          <el-row
            type="flex"
            class="row-bg"
            justify="space-around"
            align="middle"
          >
            <el-col :span="4">
              <el-upload
                class="upload-demo"
                drag
                :action="uploadUrl"
                :http-request="uploadMP3"
                :header="uploadHeaders"
                accept=""
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
              </el-upload></el-col
            >
            <el-col :span="6">
              <el-input v-model="inputID" placeholder="请输入ID"></el-input>
              <el-button @click="findID">查找</el-button>
            </el-col>
          </el-row>
        </div>

        <el-table :data="mp3Views" style="width: 100%">
          <el-table-column label="name">
            <template slot-scope="scope">
              <a
                style="color: black"
                :href="baseUrl + scope.row.key"
                target="block"
                >{{ regName(scope.row.key) }}</a
              >
            </template>
          </el-table-column>
          <el-table-column label="mimeType">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.mimeType }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="Size">
            <template slot-scope="scope">
              <el-tag size="medium">{{
                sizeConversion(scope.row.fsize)
              }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="上传时间">
            <template slot-scope="scope">
              <el-tag size="medium">{{
                (scope.row.putTime / 1e4)
                  | dateFormatFilters("YYYY-mm-dd HH:MM:SS")
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="播放">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-video-play"
                @click="play(baseUrl + scope.row.key)"
                >播放</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-popconfirm
                title="确定删除这个标签吗？"
                @onConfirm="deleteAction(scope.row.key)"
              >
                <el-button slot="reference" size="mini" type="danger"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="mp3Total"
            :page-size="pageSize"
            :current-page="mp3Page"
            @current-change="mp3PageChange"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getQiniuSource, qiniuDelete } from "@/api/qiniu";
import dateFormatFilters from "@/utils/dateFormatFilters.js";
import mixins_upload from "@/utils/mixins_upload";
import uploadToQiniu from "@/api/qiniuUpload";
import byteConversion from "@/utils/byteConversion";
export default {
  name: "sourceList",
  mixins: [mixins_upload, dateFormatFilters],
  data() {
    return {
      baseUrl: "http://img.xujinfeng.top/",
      imagesPage: 1,
      mp3Page: 1,
      pageSize: 8,
      mp3Total: 1,
      imagesTotal: 1,
      imagesData: [],
      imagesViews: [],
      mp3Data: [],
      mp3Views: [],
      activeName: "picture", //tabs 激活名字
      inputID: "",
    };
  },
  mounted() {
    this.showTabs();
    this.getImagesSource();
    this.getMp3Source();
  },
  computed: {
    regName() {
      return (name) => {
        return name
          .match(/\/.*\.mp3/)[0]
          .split(".")[0]
          .replace("/", "");
      };
    },
    sizeConversion() {
      return (fileSize) => {
        return byteConversion(fileSize);
      };
    },
  },
  methods: {
    //跳转到指定的Tabs
    showTabs() {
      if (this.$route.query.activeName != null) {
        this.activeName = this.$route.query.activeName;
      }
    },
    // 获取图片资源
    async getImagesSource(skip) {
      if (!skip) {
        this.imagesData = (
          await getQiniuSource({
            limit: 9999,
            prefix: "image",
          })
        ).data.items.reverse();
      }
      skip = skip || this.imagesPage;
      if (this.imagesData) {
        this.imagesTotal = this.imagesData.length;
        this.imagesViews = this.imagesData.slice(
          (skip - 1) * this.pageSize,
          skip * this.pageSize
        );
      }
    },

    // 获取mp3资源
    async getMp3Source(skip) {
      if (!skip) {
        this.mp3Data = (
          await getQiniuSource({ limit: 9999, prefix: "audio" })
        ).data.items.reverse();
      }
      skip = skip || this.mp3Page;
      if (this.mp3Data) {
        this.mp3Total = this.mp3Data.length;
        this.mp3Views = this.mp3Data.slice(
          (skip - 1) * this.pageSize,
          skip * this.pageSize
        );
      }
    },

    mp3PageChange(currentPage) {
      this.mp3Page = currentPage;
      this.getMp3Source(currentPage);
    },

    imagesPageChange(currentPage) {
      this.imagesPage = currentPage;
      this.getImagesSource(currentPage);
    },

    play(url) {
      this.$store.commit("setPlay", {
        url: url,
      });
    },

    async deleteAction(key) {
      const result = await qiniuDelete({ key });
      if (result.status === 0) {
        this.getImagesSource();
        this.getMp3Source();
      }
    },

    async uploadMP3(req) {
      console.log(req.file);
      if (req.file.type != "audio/mpeg") {
        this.$message.error('只支持上传 "audio/mpeg" 类型文件');
        return;
      }
      const result = await uploadToQiniu(req.file);
      console.log("result: ", result);
      console.log("result.url: ", result.url);
      this.getMp3Source();
    },

    findID() {
      if (!this.inputID) {
        this.$message.error("请先输入ID");
        return;
      }
      window.open(
        `http://music.163.com/song/media/outer/url?id=${this.inputID}.mp3`,
        "_blank"
      );
    },
  },
};
</script>

<style lang="scss" scoped>
</style>