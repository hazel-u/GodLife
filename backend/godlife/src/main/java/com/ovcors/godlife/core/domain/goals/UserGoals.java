package com.ovcors.godlife.core.domain.goals;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class UserGoals {
    @Id
    @GeneratedValue
    private Long seq;

    @OneToMany(mappedBy = "usergoals")
    private List<Goals> goals = new ArrayList<>();

    public void addGoal(Goals goal){
        this.goals.add(goal);
    }


}