package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.request.SaveUserPersonalReqDto;
import com.ovcors.godlife.core.domain.user.Personality;
import com.ovcors.godlife.core.domain.user.PersonalityType;
import com.ovcors.godlife.core.domain.user.User;
import com.ovcors.godlife.core.repository.PersonalityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class PersonalityServiceImpl implements PersonalityService {

    private final PersonalityRepository personalityRepository;

    @Override
    public void setUserPersonality(User user, SaveUserPersonalReqDto reqDto) {
        Personality personality ;
        if( (personality = personalityRepository.findByUser(user)) == null ){
            personality = Personality.builder()
                    .personalityType(reqDto.getType())
                    .user(user)
                    .build();
        } else {
            personality.changePersonality(reqDto.getType());
        }
        personalityRepository.save(personality);
    }
}
