<template>
  <div>
    <div class="article-link" v-for="(item, index) in articItem" :key="index" @click="toPreview(item)">
      <div class="article-item">
        <img class="artic-item-right"
          src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7de3f9db0dbc492bacd35874b648591f~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:120:120.awebp"
          alt="" />
        <div class="article-item-left">
          <div class="title-box">
            <div class="title">{{ item.article_title }}</div>
            <div class="content">
              {{ item.abstract }}
            </div>
          </div>
          <div class="article-item-left-top">
            <span>{{ item.nickname }}</span><span class="dot">|</span><span>{{ item.created_at }}</span><span
              class="dot">|</span><span>{{ articleType.filter((it) => it.id == item.article_type_id)[0].name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { defineComponent, ref, onMounted, PropType } from 'vue'
interface Article {
  user_id: number
  id: number
  likes_num: number
  nickname: string
  article_title: string
  created_at: string
  abstract: string
  article_type_id: string
  preview_number: string
}
export default defineComponent({
  props: {
    articItem: {
      type: Array as PropType<Article[]>,
      default: () => []
    }
  },
  emits: ['to-preview'],
  setup(props, { slots, expose, emit }) {
    const articleType = ref([
      {
        id: '1',
        name: '前端'
      },
      {
        id: '2',
        name: '后端'
      },
      {
        id: '3',
        name: 'Android'
      },
      {
        id: '4',
        name: '云服务'
      },
      {
        id: '5',
        name: '智能'
      }
    ])
    const toPreview = (item) => {
      emit('to-preview', item)
    }
    return {
      articleType,
      toPreview
    }
  }
})
</script>

<style lang="less" scoped>
.article-link {
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  .article-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #f1f1f1;

    .article-item-left {
      display: flex;
      overflow: hidden;
      align-items: baseline;
      white-space: nowrap;
      flex-direction: column;

      .article-item-left-top {
        font-size: 13px;
        color: #86909c;

        .dot {
          padding: 0 0.4rem;
        }
      }

      .operate ul {
        display: flex;

        .number {
          color: #b2bac2;
          margin-left: 0.2em;
          font-weight: 700;
        }

        li {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 0 0.8rem;
          height: 2.5rem;
          font-size: 1.083rem;
          line-height: 1;
          white-space: nowrap;
          color: #b2bac2;
          border-radius: 1px;
          border: 1px solid #edeeef;

          &:nth-child(n + 2) {
            margin-left: -1px;
          }

          &:last-child {
            visibility: hidden;
          }
        }
      }

      .title-box {
        width: 100%;
        margin: 5px 0;

        .title {
          font-size: 16px;
          font-weight: 700;
          line-height: 1.2;
          color: #1d2129;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 8px;

          &:hover {
            color: var(--el-color-primary);
            text-decoration: underline;
          }
        }

        .content {
          font-size: 13px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;

          color: #86909c;
          display: block;
          margin-bottom: 2px;
        }
      }
    }

    .artic-item-right {
      flex: 0 0 auto;
      width: 5rem;
      height: 5rem;
      background-color: #fff;
      border-radius: 4px;
      margin-right: 15px;
    }
  }
}

.article-link:hover .article-item-left .operate ul li:last-child {
  visibility: visible;
}
</style>
