<template>
  <div id="app">
    <el-container>
      <el-header>
        Translation Aplication
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <InputTranslation @formSubmit="translate" />
        </el-row>
        <el-row :gutter="20">
          <OutputTranslation :text="translatedText.translatedText" style="padding-top: 20px" />
        </el-row>

      </el-main>
      <el-footer style="font-size: 15px ">
        Powered by Vue Js
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import InputTranslation from './components/InputTranslation'
import OutputTranslation from './components/OutputTranslation'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    InputTranslation,
    OutputTranslation
  },
  data() {
    return {
      translatedText: []
    }
  },
  methods: {
    translate(formData) {
      if (
        formData.sourceLanguage === '' ||
        formData.targetLanguage === '' ||
        formData.text === ''
      ) {
        this.$notify({
          title: 'Error',
          message: 'Please fill in all the fields',
          type: 'error'
        })

        return
      }
      axios
        .post(
          `https://translation.googleapis.com/language/translate/v2?key=${
            process.env.APIKEY
          }`,
          {
            source: formData.sourceLanguage,
            target: formData.targetLanguage,
            q: formData.text
          }
        )
        .then(response => {
          this.translatedText = response.data.data.translations[0]
        })
        .catch(error => {
          console.log('Error : ', error)
        })
    }
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
}
.el-header,
.el-footer {
  text-align: center;
  color: white;
  background: #409eff;
  font-size: 30px;
  padding: 10px;
  border-radius: 20px;
}
.el-main {
  height: 80vh;
}
</style>
