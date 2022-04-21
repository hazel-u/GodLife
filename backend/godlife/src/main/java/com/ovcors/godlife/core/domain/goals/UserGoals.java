package com.ovcors.godlife.core.domain.goals;


import com.ovcors.godlife.core.domain.user.User;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserGoals {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(columnDefinition = "BINARY(16)")
    private UUID seq;


    @ManyToOne
    @JoinColumn(name="goals_seq")
    private Goals goals;

    @ManyToOne
    @JoinColumn(name="user_seq")
    private User user;

    @Builder
    public UserGoals(User user, Goals goals){
        this.user = user;
        this.goals = goals;
    }

}