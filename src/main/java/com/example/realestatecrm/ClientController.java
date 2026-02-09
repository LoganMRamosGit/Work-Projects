package com.example.realestatecrm;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/clients")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    // GET all clients
    @GetMapping
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }

    // GET clients by stage
    @GetMapping("/stage/{stage}")
    public List<Client> getClientsByStage(@PathVariable ClientStage stage) {
        return clientService.getClientsByStage(stage);
    }
    @PutMapping("/{id}/stage")
    public Client updateClientStage(
            @PathVariable Long id,
            @RequestBody ClientStageUpdateRequest request
    ){
        return clientService.updateClientStage(id,request.getStage());
    }

    //delete client
    @DeleteMapping("/{id}")
    public void deleteClient(@PathVariable Long id){
        clientService.deleteClient(id);
    }
    @PutMapping("/{id}")
    public Client updateClient(
            @PathVariable Long id,
            @RequestBody Client updatedClient
    ){
        return clientService.updateClient(id,updatedClient);
    }

    //Create Client
    @PostMapping
    public Client createClient(@Valid @RequestBody Client client) {
        System.out.println(client);
        return clientService.addClient(
                client.getName(),
                client.getEmail(),
                client.getPhone(),
                client.getStage(),
                client.getBudgetRange(),
                client.getNotes()
        );


      /*  @PostMapping("/clients")
        public Client createClient (@RequestBody Client client){
            System.out.println("NAME RECEIVED = [" + client.getName() + "]");
            return clientService.addClient(client);
      */   }
}





