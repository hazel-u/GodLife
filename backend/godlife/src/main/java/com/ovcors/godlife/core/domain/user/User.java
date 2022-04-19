package com.ovcors.godlife.core.domain.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "USER")
public class User {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long seq;

    @Column
    private String email;

    @Column
    private String password;

    @Column
    private String name;

    @Column
    private String oauth_type;

    @Column
    private Boolean deleted;

    @Column
    private LocalDate recentDate;

    @Column
    private int godCount;

//    @OneToMany(mappedBy="user", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Bingo> bingos = new ArrayList<>();

    @Builder
    public User(String email, String password, String name, String oauth_type, Boolean deleted, LocalDate recentDate, int godCount) {
        this.email = email;
        this.password = password;
        this.name=name;
        this.oauth_type=oauth_type;
        this.deleted=deleted;
        this.recentDate = recentDate;
        this.godCount=godCount;
    }
}
