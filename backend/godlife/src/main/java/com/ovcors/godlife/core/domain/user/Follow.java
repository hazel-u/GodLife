package com.ovcors.godlife.core.domain.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Follow {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name="uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(columnDefinition = "BINARY(16)")
    private UUID seq;



    @ManyToOne
    @JoinColumn(name = "follower_seq")
    User follower;
    @ManyToOne
    @JoinColumn(name = "following_seq")
    User following;
    @Builder
    public Follow(User follower,User following){
        this.follower = follower;
        this.following = following;
    }
}
