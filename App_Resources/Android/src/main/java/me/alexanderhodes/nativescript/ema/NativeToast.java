package me.alexanderhodes.nativescript.ema;

import android.widget.Toast;
import android.content.Context;

public class NativeToast {

    public static void show(Context context, String text) {
        Toast.makeText(context, text, Toast.LENGTH_SHORT).show();
    }

}
