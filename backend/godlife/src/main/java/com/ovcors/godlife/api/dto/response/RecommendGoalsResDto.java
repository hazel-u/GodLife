package com.ovcors.godlife.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecommendGoalsResDto implements Comparable<RecommendGoalsResDto>{
    private Long goals_seq;
    private Long count;
    private String content;

    @Override
    public int compareTo(RecommendGoalsResDto o) {
        if(this.count==o.count) {
            return (int) (this.goals_seq-o.goals_seq);
        }
        return (int) (o.count-this.count);
    }
}
