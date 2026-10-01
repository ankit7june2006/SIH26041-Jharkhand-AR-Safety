package gov.jharkhand.ar.safety;

import android.Manifest;
import android.app.Activity;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.webkit.JavascriptInterface;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.view.Window;
import android.view.WindowManager;
import java.util.Locale;

public class MainActivity extends Activity implements TextToSpeech.OnInitListener {

    private WebView mWebView;
    private TextToSpeech mTTS;
    private boolean ttsReady = false;
    private String pendingText = null;
    private String pendingLang = null;
    private static final int PERMISSION_REQUEST_CODE = 101;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Fullscreen immersive mode
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);

        // Initialize Android Native Text-to-Speech Engine
        mTTS = new TextToSpeech(this, this);

        mWebView = new WebView(this);
        setContentView(mWebView);

        checkAndRequestPermissions();
        configureWebView();

        // Load 100% offline bundled assets
        mWebView.loadUrl("file:///android_asset/index.html");
    }

    @Override
    public void onInit(int status) {
        if (status == TextToSpeech.SUCCESS && mTTS != null) {
            ttsReady = true;
            // Default Indian voice phonetics
            mTTS.setLanguage(new Locale("hi", "IN"));
            mTTS.setPitch(1.0f);
            mTTS.setSpeechRate(0.88f);
            if (pendingText != null) {
                final String text = pendingText;
                final String lang = pendingLang;
                pendingText = null;
                pendingLang = null;
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        speakInternal(text, lang);
                    }
                });
            }
        }
    }

    private void speakInternal(String text, String lang) {
        try {
            if (mTTS != null) {
                if ("English".equalsIgnoreCase(lang) || "en".equalsIgnoreCase(lang) || "en-IN".equalsIgnoreCase(lang)) {
                    mTTS.setLanguage(Locale.US);
                } else {
                    // Hindi and Santali tribal phonetics use Indian TTS engine
                    mTTS.setLanguage(new Locale("hi", "IN"));
                }
                mTTS.setSpeechRate(0.86f);
                mTTS.speak(text, TextToSpeech.QUEUE_FLUSH, null, "UTTERANCE_AR_SAFETY");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public class AndroidTTSBridge {
        @JavascriptInterface
        public void speak(final String text, final String lang) {
            if (text == null || text.trim().isEmpty()) {
                return;
            }
            if (!ttsReady || mTTS == null) {
                pendingText = text;
                pendingLang = lang;
                return;
            }
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    speakInternal(text, lang);
                }
            });
        }

        @JavascriptInterface
        public void stop() {
            if (mTTS != null) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            mTTS.stop();
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                });
            }
        }

        @JavascriptInterface
        public boolean isReady() {
            return ttsReady;
        }
    }

    private void configureWebView() {
        WebSettings settings = mWebView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setDatabaseEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);

        // Bind Android Native TTS Bridge for APK speech support
        mWebView.addJavascriptInterface(new AndroidTTSBridge(), "AndroidTTS");

        mWebView.setWebViewClient(new WebViewClient());

        // Automatic permission granting for Camera AR and Web Audio
        mWebView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onPermissionRequest(final PermissionRequest request) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        request.grant(request.getResources());
                    }
                });
            }
        });
    }

    private void checkAndRequestPermissions() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            String[] permissions = {
                Manifest.permission.CAMERA,
                Manifest.permission.RECORD_AUDIO,
                Manifest.permission.MODIFY_AUDIO_SETTINGS
            };

            for (String perm : permissions) {
                if (checkSelfPermission(perm) != PackageManager.PERMISSION_GRANTED) {
                    requestPermissions(permissions, PERMISSION_REQUEST_CODE);
                    break;
                }
            }
        }
    }

    @Override
    public void onBackPressed() {
        if (mWebView.canGoBack()) {
            mWebView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onDestroy() {
        if (mTTS != null) {
            try {
                mTTS.stop();
                mTTS.shutdown();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        super.onDestroy();
    }
}
