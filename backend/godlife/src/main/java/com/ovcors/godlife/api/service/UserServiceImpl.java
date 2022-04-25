package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.request.ChangePasswordReqDto;
import com.ovcors.godlife.api.dto.request.ChangeUserInfoReqDto;
import com.ovcors.godlife.api.dto.request.JoinReqDto;
import com.ovcors.godlife.api.dto.response.GodLifeResDto;
import com.ovcors.godlife.api.dto.response.UserInfoResDto;
import com.ovcors.godlife.api.exception.CustomException;
import com.ovcors.godlife.api.exception.ErrorCode;
import com.ovcors.godlife.core.domain.user.JoinType;
import com.ovcors.godlife.core.domain.user.User;
import com.ovcors.godlife.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
public class UserServiceImpl implements UserService{

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Override
    public User join(JoinReqDto joinReqDto) {
        System.out.println("join 진입");
        if("deleteUserName".equals(joinReqDto.getName()) || "deleteEmail@delete.com".equals(joinReqDto.getEmail())) {
            throw new CustomException(ErrorCode.WRONG_INPUT);
        }
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

    @Override
    public UserInfoResDto getUserInfo(UUID seq) {
        if(seq == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        User user = userRepository.findById(seq).get();
        UserInfoResDto userInfoResDto = UserInfoResDto.builder()
                .email(user.getEmail())
                .name(user.getName())
                .recentDate(user.getRecentDate())
                .godCount(user.getGodCount())
                .build();

        return userInfoResDto;
    }

    @Override
    public void setUserInfo(UUID seq, ChangeUserInfoReqDto changeUserInfoReqDto) {
        if(seq == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }

        User user = userRepository.findById(seq).get();
        user.changeName(changeUserInfoReqDto.getName());
        userRepository.save(user);
    }

    @Override
    public void deleteUser(UUID seq) {
        if(seq == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }

        User user = userRepository.findById(seq).get();
        user.deleteUser();
        userRepository.save(user);
    }

    @Override
    public Boolean duplicatedEmail(String email) {
        User existUser = userRepository.findByEmailAndDeletedFalse(email);
        if(existUser != null) {
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }
        return true;
    }

    @Override
    public Boolean duplicatedName(String name) {
        User existUser = userRepository.findByNameAndDeletedFalse(name);
        if(existUser != null) {
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }
        return true;
    }

    @Override
    public Boolean changePassword(UUID seq, ChangePasswordReqDto changePasswordReqDto) {
        if(seq == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }

        User user = userRepository.findById(seq).get();

        // oldPassword가 DB에 저장된 password와 맞나 확인
        Boolean matchCheck = bCryptPasswordEncoder.matches(changePasswordReqDto.getOldPassword(), user.getPassword());
        if(!matchCheck) {
            throw new CustomException(ErrorCode.WRONG_PASSWORD);
        }

        // newPassword와 newPasswordCheck가 동일한가 확인
        if(!changePasswordReqDto.getNewPassword().equals(changePasswordReqDto.getNewPasswordCheck())) {
            throw new CustomException(ErrorCode.NOT_MATCH_PASSWORD);
        }

        user.changePW(bCryptPasswordEncoder.encode(changePasswordReqDto.getNewPassword()));
        userRepository.save(user);

        return true;
    }

    @Override
    public GodLifeResDto getGodLife(UUID seq) {
        if(seq == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }

        User user = userRepository.findById(seq).get();

        GodLifeResDto godLifeResDto = GodLifeResDto.builder()
                .recentDate(user.getRecentDate())
                .godCount(user.getGodCount())
                .build();

        return godLifeResDto;
    }
}
