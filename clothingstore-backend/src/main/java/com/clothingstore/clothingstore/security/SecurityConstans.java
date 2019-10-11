package com.clothingstore.clothingstore.security;

public class SecurityConstans {
    public static final String USER_URLS = "/customer/**";
    public static final String USER_EDIT = "/customer/edit";
    public static final String[] USER_GET = {"/customer/all","/customer/search/**"};
    public static final String STATISTIC = "/statistic/**";

    public static final String[] CATALOG_URLS = {
            "/catalog/HAT",
            "/catalog/T-SHIRT",
            "/catalog/SWEATSHIRT",
            "/catalog/HOODIE",
            "/catalog/BACKPACK",
            "/catalog/CAP",
            "/catalog/search/**",
            "/catalog/full/**",
            "/catalog/top/**"
    };
    public static final String CATALOG_UPDATE = "/catalog/update/**";
    public static final String[] CATALOG_POST = {"/catalog/add","/catalog/save/images/**"};
    public static final String[] CATALOG_DELETE = {"/catalog/delete/**","/catalog/images/**"};
    public static final String[] CATALOG_GET = {"/type/all","/producer/all","/catalog/images/**","/catalog/all"};
    public static final String LIKES = "/likes/**";
    public static final String LIKES_DELETE = "/likes/delete/**";
    public static final String REVIEWS = "/review/clothes/**";


    public static final String ORDER_URLS = "/order/**";
    public static final String ORDER_ALL = "/order/all";
    public static final String RU_COUNTRIES_URL = "/country/all";
    public static final String EN_COUNTRIES_URL = "/en/country/all";
    public static final String SIZES_URL = "/sizes/all/**";

    public static final String H2_URL = "h2-console/**";

    public static final String SECRET = "SecretKeyToGenJWTs";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 3_000_000;
}
