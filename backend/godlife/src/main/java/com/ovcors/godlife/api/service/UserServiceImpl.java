package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.request.JoinReqDto;
import com.ovcors.godlife.api.exception.CustomException;
import com.ovcors.godlife.api.exception.ErrorCode;
import com.ovcors.godlife.core.domain.user.JoinType;
import com.ovcors.godlife.core.domain.user.User;
import com.ovcors.godlife.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@Configurable
public class UserServiceImpl implements UserService{

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Override
    public User join(JoinReqDto joinReqDto) {
        System.out.println(userRepository);
        User existedEmailUser = userRepository.findByEmailAndDeletedFalse(joinReqDto.getEmail());
        if(existedEmailUser != null) {
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }

        User existedNameUser = userRepository.findByNameAndDeletedFalse(joinReqDto.getName());
        if(existedNameUser != null) {
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }

        User user = User.builder()
                .email(joinReqDto.getEmail())
                .password(bCryptPasswordEncoder.encode(joinReqDto.getPassword()))
                .name(joinReqDto.getName())
                .oauth_type(JoinType.NATIVE)
                .deleted(false)
                .recentDate(null)
                .godCount(0)
                .build();
        userRepository.save(user);

        return user;
    }
}
