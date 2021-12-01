const facebookAppId = process.env.VUE_APP_ID;

export function initFacebookSdk() {
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: facebookAppId,
      cookie: false,
      xfbml: true,
      autoLogAppEvents: false,
      version: 'v12.0'
    })

    window.FB.getLoginStatus(function(response) {
      if(response.status == 'connected') {
        response.authResponse.accessToken = null
        window.FB.logout()
      }
    })
  };

  (function(d, debug){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0]
    if (d.getElementById(id)) {return}
    js = d.createElement('script')
    js.id = id
    js.async = true
    js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js"
    ref.parentNode.insertBefore(js, ref)
  }(document, false))
}