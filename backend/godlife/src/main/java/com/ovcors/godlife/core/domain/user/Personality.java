package com.ovcors.godlife.core.domain.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Personality {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(columnDefinition = "BINARY(16)")
    private UUID seq;

    @OneToOne
    @JoinColumn(name="user_seq")
    private User user;

    private PersonalityType personalityType;

    @Builder
    public Personality(User user, PersonalityType personalityType) {
        this.user = user;
        this.personalityType = personalityType;
    }

    public void changePersonality(PersonalityType type) {
        this.personalityType = type;
    }
}
