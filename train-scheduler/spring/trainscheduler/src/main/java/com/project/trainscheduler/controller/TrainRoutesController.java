package com.project.trainscheduler.controller;

import com.project.trainscheduler.entity.*;
import com.project.trainscheduler.payload.request.DataEmailRequest;
import com.project.trainscheduler.payload.request.RouteRequest;
import com.project.trainscheduler.payload.request.WagonSeatsRequest;
import com.project.trainscheduler.payload.response.MessageResponse;
import com.project.trainscheduler.payload.response.WagonSeatsResponse;
import com.project.trainscheduler.repository.*;
import com.project.trainscheduler.security.services.UserDetailsImpl;
import com.project.trainscheduler.service.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/")
public class TrainRoutesController {

    @Autowired
    private TrainsRepository trainsRepository;

    @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    private TrainRoutesRepository trainRoutesRepository;

    @Autowired
    private TicketHistoryRepository ticketHistoryRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private WagonRepository wagonRepository;

    @Autowired
    private WagonSeatsRepository wagonSeatsRepository;

    @Autowired
    private TrainsStationRepository trainsStationRepository;

    @GetMapping("/GetAllTrains")
    public List<Trains> getAllTrains() {
        List<Trains> trains =  trainsRepository.findAll();
        return trains;
    }
     @GetMapping("/GetTrainRoutes")
     public List<TrainRoutes> getTrainRoutest(@RequestParam("orasOrigine")String orasOrigine, @RequestParam("orasDestinatie") String orasDestinatie, @RequestParam("dateTime") String dateTime){ //@TODO ADD DATETIME
         List<TrainRoutes> trainRoutes = new ArrayList<>();
         trainRoutes = trainRoutesRepository.findAllByOrasOrigineAndOrasDestinatieAndDateTime(orasOrigine,orasDestinatie, dateTime);
         // iterez prin toate rutele de trenuri
         for(int i =0 ;i< trainRoutes.size();i++){
             List<Trains> trains = new ArrayList<>();

             // verific ce trenuri exista pentru fiacare ruta
             if(trainRoutes.get(i).getTrenSchimbare1() != null){
                 trains.add(trainRoutes.get(i).getTrenSchimbare1());
             }
             if(trainRoutes.get(i).getTrenSchimbare2() != null){
                 trains.add(trainRoutes.get(i).getTrenSchimbare2());
             }
             if(trainRoutes.get(i).getTrenSchimbare3() != null){
                 trains.add(trainRoutes.get(i).getTrenSchimbare3());
             }
             if(trainRoutes.get(i).getTrenSchimbare4() != null){
                 trains.add(trainRoutes.get(i).getTrenSchimbare4());
             }
             // iterez prin toate trenurile gasite (maxim 4)
             for(int j=0;j<trains.size();j++){
                 List<TrainStation> trainStations= new ArrayList<>();
                 // iau statiile pentru ficare tren in parte
                 trainStations = trainsStationRepository.findAllByTrainId(trains.get(j));
                 // sortez statiile dupa stationOrder
                 Collections.sort(trainStations, Comparator.comparingInt(TrainStation::getStationOrder));
                 // iterez prin toate statiile
                 for(int k=0;k<trainStations.size();k++){
                     Stations station = new Stations();
                     station.setStationName(trainStations.get(k).getStationsId().getStationName());
                     station.setId(trainStations.get(k).getStationsId().getId());
                     // populez lista de statii pentru fiecare tren in ordine
                     trains.get(j).getStations().add(station);
                 }
                 // updatez trenul cu lista noua de statii
                 if(j==0){
                     trainRoutes.get(i).setTrenSchimbare1(trains.get(j));
                 }
                 if(j==1){
                     trainRoutes.get(i).setTrenSchimbare2(trains.get(j));
                 }
                 if(j==2){
                     trainRoutes.get(i).setTrenSchimbare3(trains.get(j));
                 }
                 if(j==3){
                     trainRoutes.get(i).setTrenSchimbare4(trains.get(j));

                 }
             }
         }
         return trainRoutes;
     }

    @PostMapping("/searchRoute")
    public ResponseEntity<?> searchRoute(@RequestBody RouteRequest route){
        List<TrainRoutes> trainRoute = new ArrayList<>();
        trainRoute=trainRoutesRepository.findAllByOrasOrigineAndOrasDestinatieAndDateTime(route.getOrasOrigine(),route.getOrasDestinatie(), route.getDateTime());
        if(trainRoute.size() == 0){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        RouteRequest newRoute= new RouteRequest();
        newRoute.setOrasOrigine(route.getOrasOrigine());
        newRoute.setOrasDestinatie(route.getOrasDestinatie());
        return ResponseEntity.ok(newRoute);
    }

    @GetMapping("/getTrainRoute")
    public ResponseEntity<?> getTrainRouteById(@RequestParam("trainRoute") Integer id){
        Optional<TrainRoutes> trainRoute = trainRoutesRepository.findById(id);
        if(trainRoute.isPresent()){
            return ResponseEntity.ok(trainRoute);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/buyTicketAndSendEmail")
    public ResponseEntity<?> sendEmail(@RequestBody List<DataEmailRequest> dataEmailRequest) throws Exception {
        Optional<TrainRoutes> trainRouteOptional = trainRoutesRepository.findById(dataEmailRequest.get(0).getTrainRouteId());
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if(userDetails == null) {
            return ResponseEntity.badRequest().build();
        }
        //test
        for(int i=0;i<dataEmailRequest.size();i++){
            dataEmailRequest.get(i).setEmail(userDetails.getEmail());
        }
        Optional<User> userOptional = userRepository.findByEmail(userDetails.getEmail());
        User user = userOptional.get();

        List<Trains> trains = new ArrayList<>();
        List<String> ticketList= new ArrayList<>();

        if(trainRouteOptional.isPresent()){
            TrainRoutes trainRoute = trainRouteOptional.get();

            if (trainRoute.getTrenSchimbare1() != null) {
                Trains train1 = trainRoute.getTrenSchimbare1();
                trains.add(train1);
            }

            if (trainRoute.getTrenSchimbare2() != null) {
                Trains train1 = trainRoute.getTrenSchimbare2();
                trains.add(train1);
            }

            if (trainRoute.getTrenSchimbare3() != null) {
                Trains train1 = trainRoute.getTrenSchimbare3();
                trains.add(train1);
            }

            if (trainRoute.getTrenSchimbare4() != null) {
                Trains train1 = trainRoute.getTrenSchimbare4();
                trains.add(train1);
            }
        }else{
            return ResponseEntity.badRequest().build();
        }
         int[] contorForTickets = {0};

        LocalDate inputDate = LocalDate.parse(trainRouteOptional.get().getDateTime());
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        for(int i=0; i< trains.size(); i++){
            emailSenderService.createPdf(trains.get(i),dataEmailRequest,i,"src/main/resources/static/file_with_qrcode/ticket_"+(i+1)+".pdf", contorForTickets, inputDate.format(outputFormatter));
            ticketList.add("src/main/resources/static/file_with_qrcode/ticket_"+(i+1)+".pdf");
        }
        emailSenderService.sendEmailWithQRCodeFile(dataEmailRequest.get(0).getEmail(), "Ticket", ticketList);

        //Ticket history part
        for(int i=0; i< trains.size(); i++){
            for(int j=0; j<dataEmailRequest.size(); j++){
                TicketHistory ticketHistory = new TicketHistory();
                ticketHistory.setPret(dataEmailRequest.get(j).getPrices().get(i));
                ticketHistory.setNumarTren(trains.get(i).getNumarTren());
                ticketHistory.setOrasPlecare(trains.get(i).getOrasOrigine());
                ticketHistory.setOrasSosire(trains.get(i).getOrasDestinatie());
                ticketHistory.setOraPlecare(trains.get(i).getOraPlecare());
                ticketHistory.setOraSosire(trains.get(i).getOraSosire());
                ticketHistory.setNumePasager(dataEmailRequest.get(j).getPassagerName());
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
                Calendar calendar = Calendar.getInstance();
                String currentDateTime = dateFormat.format(calendar.getTime());
                ticketHistory.setDataCumparareTicket(currentDateTime);
                ticketHistory.setClassType(dataEmailRequest.get(j).getClassType());
                ticketHistory.setTipTicket(dataEmailRequest.get(j).getTicketType());
                ticketHistory.setUser(user);
                ticketHistoryRepository.save(ticketHistory);
            }
        }
        return  ResponseEntity.ok().build();

    }

    @GetMapping("/createPdfToDownload")
    public ResponseEntity<?> createPdfToDownload(@RequestParam("id") Integer id) throws Exception{
         TicketHistory ticketHistory = ticketHistoryRepository.findById(id).get();
         emailSenderService.createPdfToDownload(ticketHistory,"../../angular/trainscheduler/src/assets/ticket.pdf");
         return ResponseEntity.ok().build();
     }

    @GetMapping("/download/{pdfId}")
    public ResponseEntity<FileSystemResource> downloadPdf(@PathVariable String pdfId) {
        // Construct the file path based on the PDF ID
        String filePath = "../../angular/trainscheduler/src/assets/" + pdfId + ".pdf";

        // Create a FileSystemResource for the PDF file
        FileSystemResource fileResource = new FileSystemResource(new File(filePath));

        // Set the response headers for content type and attachment
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", pdfId + ".pdf");

        // Return the file resource as ResponseEntity with appropriate headers
        return ResponseEntity
                .ok()
                .headers(headers)
                .body(fileResource);
    }


    @GetMapping("/get_wagons")
    public ResponseEntity<?> getWagons(@RequestParam("id") Long id){
         TrainRoutes trainRoutes= new TrainRoutes();
         Integer trainRouteId=id.intValue();
         trainRoutes=trainRoutesRepository.findById(trainRouteId).get();
         List<Trains> trains = new ArrayList<>();
         List<List<Long>> listOfWagonsId = new ArrayList<>();

        if(trainRoutes.getTrenSchimbare1() != null){
            trains.add(trainRoutes.getTrenSchimbare1());
        }
        if(trainRoutes.getTrenSchimbare2() != null){
            trains.add(trainRoutes.getTrenSchimbare2());
        }
        if(trainRoutes.getTrenSchimbare3() != null){
            trains.add(trainRoutes.getTrenSchimbare3());
        }
        if(trainRoutes.getTrenSchimbare4() != null){
            trains.add(trainRoutes.getTrenSchimbare4());
        }
        for(int i=0; i < trains.size();i++){
            List<Wagon> wagonList = new ArrayList<>();
            wagonList = wagonRepository.findAllByTrainId(trains.get(i).getId().longValue());
            List<Long> wagonsId= new ArrayList<>();
            for(int j=0;j<wagonList.size();j++){
            wagonsId.add(wagonList.get(j).getId());
           }
            listOfWagonsId.add(wagonsId);

        }
        return ResponseEntity.ok(listOfWagonsId);
    }


    @GetMapping("/get_seats")
    public ResponseEntity<?> getSeats(@RequestParam("id") Long id){
        List<WagonSeats> wagonSeats = wagonSeatsRepository.findAllByWagonId(id);
        if(wagonSeats.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        List<WagonSeatsResponse> wagonSeatsResponses = new ArrayList<>();
        for(int i=0;i<wagonSeats.size();i++){
            WagonSeatsResponse wagonSeatsResponse= new WagonSeatsResponse();
            wagonSeatsResponse.setSeatNumber(wagonSeats.get(i).getSeatNumber());
            wagonSeatsResponse.setSeatState(wagonSeats.get(i).getSeatState());
            wagonSeatsResponses.add(wagonSeatsResponse);
        }
        return ResponseEntity.ok(wagonSeatsResponses);
    }

    @PutMapping("/update_seats")
    public ResponseEntity<?> updateSeatsToPending(@RequestBody List<WagonSeatsRequest> wagonSeatsRequests){
        // iterezi prin numarul vagoanelor
        for(int i=0;i<wagonSeatsRequests.size();i++) {
            List<WagonSeats> wagonSeats = new ArrayList<>();
            // iau toate locurile vagoanelor dupa id-ul vagonului
            wagonSeats = wagonSeatsRepository.findAllByWagonId(wagonSeatsRequests.get(i).getWagonId());
            // iterez prin numarul de locuri primit inapoi
            for (int j = 0; j < wagonSeatsRequests.get(i).getWagonSeatsResponseList().size(); j++) {
                // iterez prin numarul total al locurilor din vagonul respectiv
                for (int k = 0; k < wagonSeats.size(); k++) {
                    // caut numarul locului din vagon care s-a schimbat
                    if (wagonSeats.get(k).getSeatNumber() == wagonSeatsRequests.get(i).getWagonSeatsResponseList().get(j).getSeatNumber()) {
                        // cand am gasit numarul locului din vagon verifica daca acesta este liber daca nu dau return bad request seat is not free
                        if (wagonSeats.get(k).getSeatState() == 2) {
                            wagonSeats.get(k).setSeatState(wagonSeatsRequests.get(i).getWagonSeatsResponseList().get(j).getSeatState());
                            break;
                        } else {
                            return ResponseEntity.badRequest().body("The seat is not free");
                        }
                    }
                }
            }
            wagonSeatsRepository.saveAll(wagonSeats);
        }
        return ResponseEntity.ok().build();
    }

    @PutMapping("/updateSeatsToAnyState")
    public ResponseEntity<?> updateSeatsToAnyState(@RequestBody List<WagonSeatsRequest> wagonSeatsRequests){
        // iterezi prin numarul vagoanelor
        for(int i=0;i<wagonSeatsRequests.size();i++) {
            List<WagonSeats> wagonSeats = new ArrayList<>();
            // iau toate locurile vagoanelor dupa id-ul vagonului
            wagonSeats = wagonSeatsRepository.findAllByWagonId(wagonSeatsRequests.get(i).getWagonId());
            // iterez prin numarul de locuri primit inapoi
            for (int j = 0; j < wagonSeatsRequests.get(i).getWagonSeatsResponseList().size(); j++) {
                // iterez prin numarul total al locurilor din vagonul respectiv
                for (int k = 0; k < wagonSeats.size(); k++) {
                    // caut numarul locului din vagon care s-a schimbat
                    if (wagonSeats.get(k).getSeatNumber() == wagonSeatsRequests.get(i).getWagonSeatsResponseList().get(j).getSeatNumber()) {
                        wagonSeats.get(k).setSeatState(wagonSeatsRequests.get(i).getWagonSeatsResponseList().get(j).getSeatState());
                        break;
                    }
                }
            }
            wagonSeatsRepository.saveAll(wagonSeats);
        }
        return ResponseEntity.ok().build();
    }




    // FUNCTIA ASTA VA FI STEARSA CAND PREZENTAM
   @GetMapping("/put_seats")
    public ResponseEntity<?> putSeats(){
        List<Wagon> wagons = wagonRepository.findAll();
        for(int i =0 ; i< wagons.size();i++){
            for(int j=0;j<20;j++){
                WagonSeats wagonSeats = new WagonSeats();
                wagonSeats.setSeatNumber(j+1);
                wagonSeats.setSeatState(2);
                wagonSeats.setWagon(wagons.get(i));
                wagonSeatsRepository.save(wagonSeats);
            }
        }

       return  ResponseEntity.ok().build();
   }




}