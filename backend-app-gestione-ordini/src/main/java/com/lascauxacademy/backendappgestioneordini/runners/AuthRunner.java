package com.lascauxacademy.backendappgestioneordini.runners;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.lascauxacademy.backendappgestioneordini.entities.Role;
import com.lascauxacademy.backendappgestioneordini.models.ERole;
import com.lascauxacademy.backendappgestioneordini.repositories.RoleRepository;
import com.lascauxacademy.backendappgestioneordini.repositories.UserRepository;
import com.lascauxacademy.backendappgestioneordini.services.AuthService;

@Component
public class AuthRunner implements ApplicationRunner {

    RoleRepository roleRepository;
    UserRepository userRepository;
    AuthService authService;

    public AuthRunner(RoleRepository roleRepository, UserRepository userRepository, AuthService authService) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.authService = authService;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        //setRoleDefault();
    }

    private void setRoleDefault() {
        Role admin = new Role();
        admin.setRoleName(ERole.ROLE_ADMIN);
        roleRepository.save(admin);

        Role operator = new Role();
        operator.setRoleName(ERole.ROLE_OPERATOR);
        roleRepository.save(operator);

    }

}
