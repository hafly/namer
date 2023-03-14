import { randInt, randEle } from "@/utils/utils";

class Namer {
  constructor() {
    this.book = null;
  }

  formatStr(str) {
    let res = str.replace(/(\s|”|“){1,}|<br>|<p>|<\/p>/g, '');
    res = res.replace(/\(.+\)/g, '');
    return res;
  }

  splitSentence(content) {
    if (!content) return [];
    let str = this.formatStr(content);
    str = str.replace(/！|。|？|；/g, s => `${s}|`);
    str = str.replace(/\|$/g, '');
    let arr = str.split('|');
    arr = arr.filter(item => item.length >= 2);
    return arr;
  }

  // 清除标点符号
  cleanPunctuation(str) {
    const puncReg = /[<>《》！*(^)$%~!@#…&%￥—+=、。，？；‘’“”：·`]/g;
    return str.replace(puncReg, '');
  }

  cleanBadChar(str) {
    const badChars = '胸鬼懒禽鸟鸡我邪罪凶丑仇鼠蟋蟀淫秽妹狐鸡鸭蝇悔鱼肉苦犬吠窥血丧饥女搔父母昏狗蟊疾病痛死潦哀痒害蛇牲妇狸鹅穴畜烂兽靡爪氓劫鬣螽毛婚姻匪婆羞辱尸'.split('');
    return str.split('').filter(char => badChars.indexOf(char) === -1).join('');
  }

  genName() {
    if (!this.book) return null;
    try {
      const passage = randEle(this.book);
      const { content, title, author, book, dynasty } = passage;
      if (!content) return null;

      const sentenceArr = this.splitSentence(content);

      if (!(Array.isArray(sentenceArr) && sentenceArr.length > 0)) return null;

      const sentence = randEle(sentenceArr);

      const cleanSentence = this.cleanBadChar(this.cleanPunctuation(sentence));
      if (cleanSentence.length <= 2) return null;

      const name = this.getTwoChar(cleanSentence.split(''));
      return {
        name,
        sentence,
        content,
        title,
        author,
        book,
        dynasty,
      };
    } catch (err) {
      console.error(err)
    }
  }

  getTwoChar(arr) {
    const len = arr.length;
    const first = randInt(0, len - 1);
    let second = randInt(0, len - 1);
    let cnt = 0;
    while (second === first) {
      second = randInt(0, len - 1);
      cnt++;
      if (cnt > 100) {
        break;
      }
    }
    return first <= second ? `${arr[first]}${arr[second]}` : `${arr[second]}${arr[first]}`;
  }

  loadBook(book, cb) {
    const url = `/json/${book}.json`;
    fetch(url, { cache: 'force-cache' }).then(res => res.json()).then(data => {
      this.book = data;
      if (typeof cb === 'function') {
        cb(data);
      }
    }).catch(err => {
      console.error(err)
    })
  }
}

export default Namer;
