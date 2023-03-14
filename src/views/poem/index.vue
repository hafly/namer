<template>
  <a-spin :spinning="loading" :delay="200">
    <div class="poem-container">
      <div style="padding: 20px;">
        <h3 style="font-weight: bold">古诗文起名</h3>
        <a-radio-group v-model:value="poemType" name="radioGroup" @change="onChange">
          <a-radio value="shijing">诗经</a-radio>
          <a-radio value="chuci">楚辞</a-radio>
          <a-radio value="tangshi">唐诗</a-radio>
          <a-radio value="songci">宋词</a-radio>
          <a-radio value="yuefu">乐府诗集</a-radio>
          <a-radio value="gushi">古诗三百首</a-radio>
          <a-radio value="cifu">著名辞赋</a-radio>
        </a-radio-group>
      </div>
      <div style="padding:0 20px;">
        <a-input-group compact>
          <a-input
              v-model:value="familyName"
              placeholder="姓氏"
              enter-button
              :maxlength="2"
              style="width: 250px;"
          />
          <a-button type="primary" @click="onSearch">起名</a-button>
        </a-input-group>
      </div>
      <div>
        <ul class="result-container">
          <li v-for="(item, index) in nameList" :key="index" v-html="item" class="name-box"></li>
        </ul>
      </div>
    </div>
  </a-spin>
</template>

<script>
import { message } from 'ant-design-vue';
import Namer from "./Namer";
import '@/assets/css/poem.less'

export default {
  name: "poem",
  data() {
    return {
      loading: true,
      namer: new Namer(),
      poemType: 'shijing',
      familyName: '李',
      nameAmount: 10,
      nameList: []
    }
  },
  created() {
    this.namer.loadBook('shijing', () => {
      this.loading = false
    });
  },
  methods: {
    onChange(e) {
      this.loading = true;
      this.namer.loadBook(e.target.value, () => {
        this.loading = false
      });
    },
    onSearch() {
      if (!this.familyName) {
        message.warn('请输入姓氏');
        return;
      }
      this.nameList = [];
      for (let i = 0; i < this.nameAmount; i++) {
        const nameObj = this.namer.genName();
        const html = this.genNameHtml(nameObj);
        if (html) this.nameList.push(html)
      }
    },
    genNameHtml(obj) {
      if (!obj) return null;
      const { name, sentence, title, author, book, dynasty } = obj;

      const sentenceHtml = sentence.replace(new RegExp(`[${name}]`, 'ig'), char => `<i>${char}</i>`);
      return `
        <h3>${this.familyName}${name}</h3>
        <p class='sentence'>
          <span>「</span>
          ${sentenceHtml}
          <span>」</span>
        </p>
        <div class='source-row' >
          <div class='book'>《${title}》</div>
          <div class='author'>[${dynasty}]&nbsp;${author || '佚名'}</div>
        </div>`;
    }
  }
};
</script>