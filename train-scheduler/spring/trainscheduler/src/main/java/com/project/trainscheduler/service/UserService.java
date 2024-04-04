package com.project.trainscheduler.service;

import com.project.trainscheduler.dto.UserDto;
import com.project.trainscheduler.entity.User;
import com.project.trainscheduler.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserDto getUserInfo(String username){
        User user = userRepository.findByEmail(username).orElseThrow();
        UserDto userDto = new UserDto();
        userDto.setUsername(user.getUsername());
        userDto.setFullName(user.getFullName());
        userDto.setCnp(user.getCnp());
        userDto.setStudentId(user.getStudentId());
        userDto.setEmail(user.getEmail());
        return userDto;
    }

    public void updateUserInfo(String username, UserDto userDto) {
        User user = userRepository.findByEmail(username).orElseThrow();
        user.setUsername(userDto.getUsername());
        user.setFullName(userDto.getFullName());
        user.setCnp(userDto.getCnp());
        user.setStudentId(userDto.getStudentId());
        user.setEmail(userDto.getEmail());
        userRepository.save(user);
    }
}
