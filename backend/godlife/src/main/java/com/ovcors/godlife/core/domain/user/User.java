package com.ovcors.godlife.core.domain.user;

import com.ovcors.godlife.core.domain.bingo.Bingo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "USER")
public class User {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name="uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(columnDefinition = "BINARY(16)")
    private UUID seq;

    @Column
    private String email;

    @Column
    private String password;

    @Column
    private String name;

    @Column
    @Enumerated(EnumType.STRING)
    private JoinType oauth_type;

    @Column
    private Boolean deleted;

    @Column
    private LocalDate recentDate;

    @Column
    private int godCount;

    @OneToMany(mappedBy="user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Bingo> bingos = new ArrayList<>();

    @Builder
    public User(String email, String password, String name, JoinType oauth_type, Boolean deleted, LocalDate recentDate, int godCount) {
        this.email = email;
        this.password = password;
        this.name=name;
        this.oauth_type=oauth_type;
        this.deleted=deleted;
        this.recentDate = recentDate;
        this.godCount=godCount;
    }

    public void changeName(String name) {
        this.name = name;
    }

    public void deleteUser() {
        this.name = "deleteUserName";
        this.email = "deleteEmail@delete.com";
        this.deleted = true;
    }

    public void changePW(String newPassword) {
        this.password = newPassword;
    }
}
