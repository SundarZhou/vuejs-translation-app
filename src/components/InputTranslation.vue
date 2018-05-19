<template>
  <el-card class="box-card">
    <el-form>
      <el-row :gutter="70">
        <el-col :span="12">
          <el-select v-model="sourceLanguage" clearable placeholder="Source Language" :remote-method="getListOfSourceLanguages" filterable remote :loading="loading">
            <el-option v-for="language in sourceLanguages" :key="language.name" :label="language.name" :value="language.language">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-select v-model="targetLanguage" clearable placeholder="Target Language" :remote-method="getListOfTargetLanguages" filterable remote :loading="loading">
            <el-option v-for="language in targetLanguages" :key="language.name" :label="language.name" :value="language.language">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" v-model="text" placeholder="Text to be translated"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" style="text-align: center">
          <el-button type="primary" @click="onSubmit"> Translate </el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
import axios from 'axios'
import { apiKey } from '../config/apiconfig.js'
export default {
  name: 'InputTranslation',
  data() {
    return {
      text: '',
      sourceLanguage: '',
      targetLanguage: '',
      languages: [],
      sourceLanguages: [],
      targetLanguages: [],
      loading: false
    }
  },
  methods: {
    getListOfSourceLanguages(word) {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.sourceLanguages = this.languages.filter(language => {
          return language.name.toLowerCase().indexOf(word.toLowerCase()) > -1
        })
      }, 200)
    },
    getListOfTargetLanguages(word) {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.targetLanguages = this.languages.filter(language => {
          return language.name.toLowerCase().indexOf(word.toLowerCase()) > -1
        })
      }, 200)
    },
    onSubmit() {
      this.$emit('formSubmit', {
        sourceLanguage: this.sourceLanguage,
        targetLanguage: this.targetLanguage,
        text: this.text
      })
    }
  },
  computed: {
    browserLanguage: function() {
      return navigator.language.slice(0, 2)
    }
  },
  created() {
    axios
      .get(
        `https://translation.googleapis.com/language/translate/v2/languages?target=${
          this.browserLanguage
        }&key=${apiKey}`
      )
      .then(resopnse => {
        this.languages = resopnse.data.data.languages
      })
      .catch(error => {
        console.log('Error: ', error)
      })
  }
}
</script>

<style>
.box-card {
  width: 500px;
  max-width: 90vw;
  margin: auto;
  padding: 10px;
}
.el-row {
  margin-bottom: 20px;
}
</style>
