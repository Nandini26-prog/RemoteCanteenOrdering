package com.snappickk.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.snappickk.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
