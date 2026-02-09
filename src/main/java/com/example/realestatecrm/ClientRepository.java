package com.example.realestatecrm;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.realestatecrm.Client;
import java.util.List;

public interface ClientRepository extends JpaRepository<Client, Long> {
    List<Client> findByStage(ClientStage stage);
}
