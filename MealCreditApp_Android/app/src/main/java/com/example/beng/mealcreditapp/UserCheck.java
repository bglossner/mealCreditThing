package com.example.beng.mealcreditapp;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Base64;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UserCheck {

    private static String jwt = "";
    private static String filename = "spUser";
    private static SharedPreferences sp;
    private static boolean hasInitialized = false;

    public static void initializeUserCheck(Context context) {
        sp = context.getSharedPreferences(filename, Context.MODE_PRIVATE);
        jwt = sp.getString("jwt", "");
        /*if(setJwt) {
            jwt = sp.getString("storedjwt", "");
        }*/
        hasInitialized = true;
    }

    public static boolean hasInitialized() {
        return hasInitialized;
    }

    private static boolean userExists() {
        return !jwt.equals("");
    }

    private static String getJwt() {
        //System.out.println("jwt: " + jwt);
        if(userExists() && hasInitialized) {
            return jwt;
        }
        return "";
    }

    public static boolean setUserInfoIfExists() {
        String gotJwt = getJwt();
        if(!gotJwt.equals("")) {
            String jwtBody;
            try {
                jwtBody = JsonMethods.decoded(jwt);
                //System.out.println(jwtBody);
                JSONObject json = new JSONObject(jwtBody);
                String userIdFound;
                if(!json.isNull("user_id")) {
                    userIdFound = json.getString("user_id");
                    String userId = sp.getString("user_id", "");
                    //System.out.println("UserID: " + userId);
                    if(!userId.equals(userIdFound)) {
                        return false;
                    }
                    else {
                        String firstname = sp.getString("firstname", "");
                        String lastname = sp.getString("lastname", "");
                        String username = sp.getString("username", "");
                        String email = sp.getString("email", "");
                        User.setUser(jwt, userIdFound, username, firstname, lastname);
                        User.setEmail(email);
                    }
                }
                else {
                    userIdFound = null;
                    return false;
                }

            } catch (Exception e) { return false; }
            return true;
        }
        return false;
    }

    public static void setUserSharedPreferences(JSONObject json) {
        if(hasInitialized()) {
            Iterator<String> keys = json.keys();
            SharedPreferences.Editor sPEditor = sp.edit();
            while (keys.hasNext()) {
                try {
                    String key = keys.next();
                    switch(key) {
                        case "token":
                            sPEditor.putString("jwt", json.getString("token"));
                            break;
                        case "message":
                            break;
                        case "user_id":
                            sPEditor.putString("user_id", json.get("user_id").toString());
                            break;
                        default:
                            String newValue = json.getString(key);
                            sPEditor.putString(key, newValue);
                            break;
                    }
                } catch (JSONException e) {
                    continue;
                }
            }

            sPEditor.apply();
        }
    }

    protected static void setPasswordNull() {
        SharedPreferences.Editor sPEditor = sp.edit();
        sPEditor.putString("password", "");
        sPEditor.apply();
    }

    protected static boolean isPasswordSet() {
        String password = sp.getString("password", "");
        if(password == null || password.equals("")) {
            return false;
        }
        return true;
    }

    public static void resetUserPreferences() {
        if(hasInitialized()) {
            SharedPreferences.Editor sPEditor = sp.edit();
            sPEditor.putString("jwt", "");
            sPEditor.putString("user_id", "");
            sPEditor.putString("firstname", "");
            sPEditor.putString("lastname", "");
            sPEditor.putString("email", "");
            sPEditor.putString("username", "");
            sPEditor.apply();
            User.setUser("", "", "", "", "");
        }
    }

    public static final Pattern VALID_EMAIL_ADDRESS_REGEX =
            Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

    public static boolean validate(String emailStr) {
        Matcher matcher = VALID_EMAIL_ADDRESS_REGEX .matcher(emailStr);
        return matcher.find();
    }

    public static void updateSinglePreference(String key, String value) {
        if(hasInitialized()) {
            SharedPreferences.Editor sPEditor = sp.edit();
            sPEditor.putString(key, value);
            sPEditor.apply();
        }
    }
}