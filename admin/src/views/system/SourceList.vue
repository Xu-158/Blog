<template>
  <div class="source">
    <el-tabs type="border-card">
      <el-tab-pane label="图片资源">
        <el-table :data="imagesViews" style="width: 100%">
          <el-table-column label="预览">
            <template slot-scope="scope">
              <a
                style="color:black"
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

          <el-table-column label="上传时间">
            <template slot-scope="scope">
              <el-tag size="medium">{{ regDate(scope.row.putTime) }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="deleteAction(scope.row.key)"
                >删除</el-button
              >
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
      <el-tab-pane label="音频资源">
        <audio controls ref="audio"></audio>
        <el-table :data="mp3Views" style="width: 100%">
          <el-table-column label="name">
            <template slot-scope="scope">
              <a
                style="color:black"
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
          <el-table-column label="上传时间">
            <template slot-scope="scope">
              <el-tag size="medium">{{ regDate(scope.row.putTime) }}</el-tag>
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
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="deleteAction(scope.row.key)"
                >删除</el-button
              >
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
import dateFormat from "@/utils/dateFormat";
export default {
  data() {
    return {
      baseUrl: "http://img.xujinfeng.top/",
      imagesPage: 1,
      mp3Page: 1,
      pageSize: 5,
      mp3Total: 1,
      imagesTotal: 1,
      imagesData: [],
      imagesViews: [],
      mp3Data: [],
      mp3Views: []
    };
  },
  created() {
    this.getImagesSource();
    this.getMp3Source();
  },
  computed: {
    regName() {
      return name => {
        return name
          .match(/\/.*\.mp3/)[0]
          .split(".")[0]
          .replace("/", "");
      };
    },
    regDate() {
      return date => {
        return dateFormat("YYYY-mm-dd HH:MM", new Date(date / 1e4));
      };
    }
  },
  methods: {
    // 获取图片资源
    async getImagesSource(skip) {
      if (!skip) {
        this.imagesData = (
          await getQiniuSource({
            limit: 9999,
            prefix: "image"
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
      this.$refs.audio.src = url;
      this.$refs.audio.play();
      console.log(this.$refs.audio);
    },

    async deleteAction(key) {
      const result = await qiniuDelete({ key });
      if (result.status === 0) {
        this.getImagesSource();
        this.getMp3Source();
      }
    }
  }
};
</script>

<style>
</style>