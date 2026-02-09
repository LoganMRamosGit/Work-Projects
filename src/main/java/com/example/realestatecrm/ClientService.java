package com.example.realestatecrm;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository){
        this.clientRepository=clientRepository;}

    //view a list of all clients
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    //a sub method that is used to see the clients that are in a stage
    public List<Client> getClientsByStage(ClientStage stage) {

        return clientRepository.findByStage(stage);
    }

    public Client updateClient( Long id, Client updatedClient){
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client Not Found."));
        if (updatedClient.getName() != null)
            client.setName(updatedClient.getName());

        if (updatedClient.getStage() != null)
            client.setStage(updatedClient.getStage());

        return clientRepository.save(client);
    }

    //creates a client
    public Client addClient(String name, String email, String phone, ClientStage stage, String budget, String notes)
        { if (name == null || name.trim().isEmpty()){
            throw new IllegalArgumentException("Client name is required");
        }
        Client client = new Client(
                name,
                email,
                phone,
                stage,
                budget,
                notes
        );

        return clientRepository.save(client);
    }



    // change the client from one stage to another
    public Client updateClientStage(Long id,ClientStage newStage) {

        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found"));


        client.setStage(newStage);
        return clientRepository.save(client);
    }


    //delete a client
    public void deleteClient(Long id) {
       clientRepository.deleteById(id);
    }
}

