package com.lascauxacademy.backendappgestioneordini.runners;

import org.springframework.beans.factory.annotation.Autowired;
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
    // this component automatically runs some setup code when the application starts

    RoleRepository roleRepository;
    UserRepository userRepository;
    AuthService authService;

    public AuthRunner(RoleRepository roleRepository, UserRepository userRepository, AuthService authService) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.authService = authService;
    }

    // method that executes on application startup
    @Override
    public void run(ApplicationArguments args) throws Exception {
        setRoleDefault();
    }

    // method to set up default roles in the database
    private void setRoleDefault() {
        // create and save the admin role in the database
        if (!roleRepository.existsByRoleName(ERole.ROLE_ADMIN)) {
            Role admin = new Role();
            admin.setRoleName(ERole.ROLE_ADMIN);
            roleRepository.save(admin);
        }

        // create and save the operator role in the database
        if (!roleRepository.existsByRoleName(ERole.ROLE_OPERATOR)) {
            Role operator = new Role();
            operator.setRoleName(ERole.ROLE_OPERATOR);
            roleRepository.save(operator);
        }

    }


}
