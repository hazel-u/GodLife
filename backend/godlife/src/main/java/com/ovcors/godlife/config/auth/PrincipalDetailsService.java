package com.ovcors.godlife.config.auth;

import com.ovcors.godlife.core.domain.user.User;
import com.ovcors.godlife.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class PrincipalDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmailAndDeletedFalse(username);
        if (user != null) {
            return new PrincipalDetails(user);
        }
        // 요청에 해당하는 user를 찾지 못하면 여기에 도달
        throw new UsernameNotFoundException("User not found in the database");
    }
}
