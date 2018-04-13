<template>
  <div class="m-apps">
    <div class="container-fluid">
        <!-- Summary info -->
        <div class="row clearfix">
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div @click="download('https://raw.githubusercontent.com/sutd-statnlp/project-statnlp-desktop-server-monitor/master/download/ServerMonitor.dmg.zip')">
                <InfoBox icon="get_app" title="Download" value="MacOS" effect="hover-expand-effect"/>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div @click="download('https://raw.githubusercontent.com/sutd-statnlp/project-statnlp-desktop-server-monitor/master/download/ServerMonitor.exe.zip')">
                <InfoBox icon="get_app" title="Download" value="Windows" effect="hover-expand-effect"/>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div @click="download('https://raw.githubusercontent.com/sutd-statnlp/project-statnlp-desktop-server-monitor/master/download/ServerMonitor-x86_64.zip')">
                <InfoBox icon="get_app" title="Download" value="Linux" effect="hover-expand-effect"/>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div @click="download('https://raw.githubusercontent.com/sutd-statnlp/project-statnlp-mobile-server-monitor/master/download/ServerMonitor.app.zip')">
                <InfoBox icon="get_app" title="Download" value="IOS" effect="hover-expand-effect"/>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div @click="download('https://raw.githubusercontent.com/sutd-statnlp/project-statnlp-mobile-server-monitor/master/download/ServerMonitor.apk.zip')">
                <InfoBox icon="get_app" title="Download" value="Android" effect="hover-expand-effect"/>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import InfoBox from '@/components/InfoBox'

export default {
  components: {
    InfoBox
  },
  name: 'AppsPage',
  data () {
    return {
    }
  },
  methods: {
    download (url) {
      window.location.assign(url)
    }
  }
}
</script>

<style scoped>
  .info-box{
    cursor: pointer;
  }
</style>
