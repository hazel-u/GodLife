package com.ovcors.godlife.config;

import com.ovcors.godlife.config.jwt.JwtProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*"); // Access-Control-Allow-Origin
        config.addAllowedHeader("*"); // Access-Control-Request-Headers
        config.addAllowedMethod("*"); // Access-Control-Request-Method
        config.addExposedHeader(JwtProperties.HEADER_STRING);
        config.addExposedHeader(JwtProperties.REFRESH_TOKEN_HEADER_STRING);

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
