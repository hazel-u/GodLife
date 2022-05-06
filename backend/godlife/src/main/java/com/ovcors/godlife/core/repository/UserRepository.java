package com.ovcors.godlife.core.repository;

import com.ovcors.godlife.core.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    public User findByEmailAndDeletedFalse(String email); //jpa query method
    public User findByNameAndDeletedFalse(String name);
    public List<User> findByNameContaining(String name);
}
