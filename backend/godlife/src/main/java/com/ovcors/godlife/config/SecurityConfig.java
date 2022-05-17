package com.ovcors.godlife.config;

import com.ovcors.godlife.config.jwt.JwtAuthenticationFilter;
import com.ovcors.godlife.config.jwt.JwtAuthorizationFilter;
import com.ovcors.godlife.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private CorsConfig corsConfig;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RedisTemplate redisTemplate;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {return new BCryptPasswordEncoder();}

    @Value("${spring.jwt.secret}")
    public String secret;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .addFilter(corsConfig.corsFilter())
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

                .exceptionHandling()
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint())
                .and()

                .addFilterBefore(new JwtAuthenticationFilter(authenticationManager(), secret, userRepository, redisTemplate), UsernamePasswordAuthenticationFilter.class)
                .addFilter(new JwtAuthorizationFilter(authenticationManager(), userRepository, secret))

                .httpBasic().disable()
                .formLogin()
                .usernameParameter("email")
                .passwordParameter("password")
                .loginProcessingUrl("/user/login")
                .and()

                .authorizeRequests()
                .antMatchers("/user/info", "/user", "/user/god-life", "/user/change-pw")
                .access("hasRole('ROLE_USER')")
                .antMatchers("/bingo", "/bingo/{seq}/godlife", "/bingo/count", "/bingo/date/{date}")
                .access("hasRole('ROLE_USER')")
                .antMatchers("/goal/complete", "/goal/usergoal")
                .access("hasRole('ROLE_USER')")
                .antMatchers("/feed/follow/{name}")
                .access("hasRole('ROLE_USER')")
                .anyRequest().permitAll();
    }
}
