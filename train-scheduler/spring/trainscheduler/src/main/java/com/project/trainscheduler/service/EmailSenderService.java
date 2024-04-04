package com.project.trainscheduler.service;

import com.itextpdf.io.font.FontConstants;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.layout.element.*;
import com.project.trainscheduler.entity.TicketHistory;
import com.project.trainscheduler.entity.Trains;
import com.project.trainscheduler.payload.request.DataEmailRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.property.HorizontalAlignment;
import com.itextpdf.layout.property.TextAlignment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;


import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.List;

@Service
public class EmailSenderService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmailWithQRCodeFile(String to, String subject, List<String> ticketList) throws jakarta.mail.MessagingException {
        jakarta.mail.internet.MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText("See the attached QR code");
        for (int i = 0; i < ticketList.size(); i++) {
            helper.addAttachment("ticket" + (i + 1) + ".pdf", new File(ticketList.get(i)));
        }

        mailSender.send(message);
    }

    public void generateQRCode(String text, int width, int height, String filePath) throws Exception {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);

        Path path = Paths.get(filePath);
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", new FileOutputStream(path.toFile()));
    }

    public void createPdf(Trains train, List<DataEmailRequest> dataEmailRequests, int trainIndex, String filePath, int[] contorForTickets, String dateTime) throws Exception {
        // Define the font
        PdfFont font = PdfFontFactory.createFont(FontConstants.HELVETICA_BOLD);

        // Create a PDF document


        PdfDocument pdf = new PdfDocument(new PdfWriter(filePath));

        // Set the page size and margins
        PageSize pageSize = new PageSize(500, 700);
        pdf.setDefaultPageSize(pageSize);

        // Create a document object
        Document document = new Document(pdf);
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Calendar calendar = Calendar.getInstance();
        String currentDateTime = dateFormat.format(calendar.getTime());
        Set<String> seenNames = new HashSet<>();
        for (int i = contorForTickets[0]; i < dataEmailRequests.size(); i++) {
            if (seenNames.contains(dataEmailRequests.get(i).getPassagerName())) {
                System.out.println("Duplicate passenger name found: " + dataEmailRequests.get(i).getPassagerName());
                break;
            } else {
                seenNames.add(dataEmailRequests.get(i).getPassagerName());
            }
            // Add a header
            Paragraph header = new Paragraph("Train Ticket")
                    .setFont(font)
                    .setFontSize(20)
                    .setMarginBottom(20)
                    .setHorizontalAlignment(HorizontalAlignment.CENTER);
            document.add(header);

            // Add the train information
            Table table = new Table(new float[]{2, 3})
                    .setHorizontalAlignment(HorizontalAlignment.CENTER)
                    .setMarginBottom(20);
            table.addCell(createCell("Train No.", font, true));
            table.addCell(createCell(train.getNumarTren(), font, false));
            table.addCell(createCell("Departure Time", font, true));
            table.addCell(createCell(train.getOraPlecare(), font, false));
            table.addCell(createCell("Departure Date", font, true));
            table.addCell(createCell(dateTime, font, false));
            table.addCell(createCell("From", font, true));
            table.addCell(createCell(train.getOrasOrigine(), font, false));
            table.addCell(createCell("To", font, true));
            table.addCell(createCell(train.getOrasDestinatie(), font, false));
            table.addCell(createCell("Class Type", font, true));
            table.addCell(createCell(dataEmailRequests.get(i).getClassType(), font, false)); //@TODO DE LAUT TIPUL DE CLASA
            table.addCell(createCell("SeatNumber", font, true));
            table.addCell(createCell(dataEmailRequests.get(i).getSeatNumbers().toString(), font, false));
            table.addCell(createCell("Price", font, true));
            table.addCell(createCell(dataEmailRequests.get(i).getPrices().get(trainIndex), font, false)); //@TODO DE LAUT PRETUL
            document.add(table);

            // Add the passenger and arrival information
            Paragraph passengerHeader = new Paragraph("Passenger Information")
                    .setFont(font)
                    .setFontSize(16)
                    .setMarginBottom(20);
            document.add(passengerHeader);
            Table infoTable = new Table(new float[]{2, 3})
                    .setHorizontalAlignment(HorizontalAlignment.CENTER)
                    .setMarginBottom(20);
            infoTable.addCell(createCell("Name:", font, true));
            infoTable.addCell(createCell(dataEmailRequests.get(i).getPassagerName(), font, false));
            infoTable.addCell(createCell("Ticket Type:", font, true));
            infoTable.addCell(createCell(dataEmailRequests.get(i).getTicketType(), font, false));
            infoTable.addCell(createCell("Arrival Time:", font, true));
            infoTable.addCell(createCell(train.getOraSosire(), font, false));
            infoTable.addCell(createCell("Time Until Arrival:", font, true));
            infoTable.addCell(createCell(dataEmailRequests.get(i).getTimeUntilArrival().get(trainIndex), font, false));
            infoTable.addCell(createCell("Date:", font, true));
            infoTable.addCell(createCell(currentDateTime, font, false));
            document.add(infoTable);


            String qrCodeFilePath = "src/main/resources/static/file_with_qrcode/qrcode.png";
            generateQRCode("https://example.com", 200, 200, qrCodeFilePath);
            Image qrCodeImage = new Image(ImageDataFactory.create(qrCodeFilePath));
            document.add(qrCodeImage);
            document.add(new AreaBreak());

            contorForTickets[0]++;

        }
        // Add a footer with the current date and time

        Paragraph footer = new Paragraph("Generated on " + currentDateTime)
                .setFont(font)
                .setFontSize(12)
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginTop(10);
        document.add(footer);

        document.close();
    }

    public void createPdfToDownload(TicketHistory ticketHistory, String filePath) throws Exception {
        // Define the font
        PdfFont font = PdfFontFactory.createFont(FontConstants.HELVETICA_BOLD);

        // Create a PDF document
        PdfDocument pdf = new PdfDocument(new PdfWriter(filePath));

        // Set the page size and margins
        PageSize pageSize = new PageSize(500, 700);
        pdf.setDefaultPageSize(pageSize);

        // Create a document object
        Document document = new Document(pdf);


        // Add a header
        Paragraph header = new Paragraph("Train Ticket")
                .setFont(font)
                .setFontSize(20)
                .setMarginBottom(20)
                .setHorizontalAlignment(HorizontalAlignment.CENTER);
        document.add(header);

        // Add the train information
        Table table = new Table(new float[]{2, 3})
                .setHorizontalAlignment(HorizontalAlignment.CENTER)
                .setMarginBottom(20);
        table.addCell(createCell("Train No.", font, true));
        table.addCell(createCell(ticketHistory.getNumarTren(), font, false));
        table.addCell(createCell("Departure Time", font, true));
        table.addCell(createCell(ticketHistory.getOraPlecare(), font, false));
        table.addCell(createCell("From", font, true));
        table.addCell(createCell(ticketHistory.getOrasPlecare(), font, false));
        table.addCell(createCell("To", font, true));
        table.addCell(createCell(ticketHistory.getOrasSosire(), font, false));
        table.addCell(createCell("Class Type", font, true));
        table.addCell(createCell(ticketHistory.getClassType(), font, false));
        table.addCell(createCell("Price", font, true));
        table.addCell(createCell(ticketHistory.getPret(), font, false));
        document.add(table);

        // Add the passenger and arrival information
        Paragraph passengerHeader = new Paragraph("Passenger Information")
                .setFont(font)
                .setFontSize(16)
                .setMarginBottom(20);
        document.add(passengerHeader);
        Table infoTable = new Table(new float[]{2, 3})
                .setHorizontalAlignment(HorizontalAlignment.CENTER)
                .setMarginBottom(20);
        infoTable.addCell(createCell("Name:", font, true));
        infoTable.addCell(createCell(ticketHistory.getNumePasager(), font, false));
        infoTable.addCell(createCell("Ticket Type:", font, true));
        infoTable.addCell(createCell(ticketHistory.getTipTicket(), font, false));
        infoTable.addCell(createCell("Arrival Time:", font, true));
        infoTable.addCell(createCell(ticketHistory.getOraSosire(), font, false));
        infoTable.addCell(createCell("Time Until Arrival:", font, true));
        String departureTimeStr = ticketHistory.getOraPlecare();
        String arrivalTimeStr = ticketHistory.getOraSosire();

        LocalTime departureTime = LocalTime.parse(departureTimeStr, DateTimeFormatter.ofPattern("HH:mm"));
        LocalTime arrivalTime = LocalTime.parse(arrivalTimeStr, DateTimeFormatter.ofPattern("HH:mm"));

        Duration duration = Duration.between(departureTime, arrivalTime);

        Long totalHours = duration.toHours();
        Long minutes = duration.toMinutes() % 60;
        String timeUntilArrival = totalHours.toString() + " ore " + minutes.toString() + " minute";
        infoTable.addCell(createCell(timeUntilArrival, font, false));
        document.add(infoTable);

        // Add a footer with the current date and time
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Calendar calendar = Calendar.getInstance();
        String currentDateTime = dateFormat.format(calendar.getTime());
        Paragraph footer = new Paragraph("Generated on " + currentDateTime)
                .setFont(font)
                .setFontSize(12)
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginTop(10);
        document.add(footer);

        document.close();
    }

    private Cell createCell(String text, PdfFont font, boolean isHeader) {
        Paragraph p = new Paragraph(text).setFont(font);
        Cell cell = new Cell().add(p);
        if (isHeader) {
            cell.setBackgroundColor(ColorConstants.LIGHT_GRAY);
        }
        return cell;
    }

    @Async
    public void send(String to, String email) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            helper.setText(email, true);
            helper.setTo(to);
            helper.setSubject("Confirm your email");
//            helper.setFrom("marcelnistreanu@gmail.com");
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            System.out.println("Failed to send email: " + e);
        }

    }

}
