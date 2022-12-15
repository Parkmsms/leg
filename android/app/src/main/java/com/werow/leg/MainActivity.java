package com.werow.leg;

import android.os.Bundle; // add
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;

// react-native-splash-screen >= 3.3.0 
import org.devio.rn.splashscreen.SplashScreen; 

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this);  // here 
      super.onCreate(savedInstanceState);
      // Intent intent = getIntent();
      // if (Intent.ACTION_VIEW.equals(intent.getAction())) {
      //       Uri uri = "nmap://actionPath?parameter=value&appname=com.werow.leg"
            
      //       if(uri != null) {
      //           String parameter = uri.getQueryParameter("parameter");
      //           String appname = uri.getQueryParameter("appname");

      //           Log.d("MyTag","parameter : " + when + " , appname : " + message);
      //       }
            
      // }
  }
  
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "leg";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the rendered you wish to use (Fabric or the older renderer).
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new MainActivityDelegate(this, getMainComponentName());
  }

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }
  }
}
