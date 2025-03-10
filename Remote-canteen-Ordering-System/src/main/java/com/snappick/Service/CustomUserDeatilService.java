package com.snappick.Service;

import com.snappick.model.USER_ROLE;
import com.snappick.model.Users;
import com.snappick.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDeatilService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        Users user = userRepository.findByEmail(username);

        if(user!=null){
            throw new UsernameNotFoundException("user not found with email" +username);
        }

        USER_ROLE role= user.getrole();
    }

}
