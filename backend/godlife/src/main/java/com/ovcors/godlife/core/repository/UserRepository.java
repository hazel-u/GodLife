package com.ovcors.godlife.core.repository;

import com.ovcors.godlife.core.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findByEmailAndDeletedFalse(String email); //jpa query method
    public User findByNameAndDeletedFalse(String name);
}
