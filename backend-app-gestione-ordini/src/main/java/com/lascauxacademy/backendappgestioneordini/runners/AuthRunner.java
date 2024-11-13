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
public class AuthRunner implements ApplicationRunner{
	
	@Autowired RoleRepository roleRepository;
	@Autowired UserRepository userRepository;
	@Autowired AuthService authService;

	@Override
	public void run(ApplicationArguments args) throws Exception {
		// TODO Auto-generated method stub
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
