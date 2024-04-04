package com.project.trainscheduler.entity;
import jakarta.persistence.*;

@Entity
@Table(name = "train_routes")
public class TrainRoutes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String oraPlecare;

    private String oraSosire;

    private String orasDestinatie;

    private String orasOrigine;

    private String dateTime;

    @ManyToOne()
    @JoinColumn(name = "tren_schimbare_1")
    private Trains trenSchimbare1;

    @ManyToOne()
    @JoinColumn(name = "tren_schimbare_2")
    private Trains trenSchimbare2;

    @ManyToOne()
    @JoinColumn(name = "tren_schimbare_3")
    private Trains trenSchimbare3;

    @ManyToOne()
    @JoinColumn(name = "tren_schimbare_4")
    private Trains trenSchimbare4;

    public String getOrasDestinatie() {
        return orasDestinatie;
    }

    public void setOrasDestinatie(String orasDestinatie) {
        this.orasDestinatie = orasDestinatie;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    public String getOrasOrigine() {
        return orasOrigine;
    }

    public void setOrasOrigine(String orasOrigine) {
        this.orasOrigine = orasOrigine;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOraPlecare() {
        return oraPlecare;
    }

    public void setOraPlecare(String oraPlecare) {
        this.oraPlecare = oraPlecare;
    }

    public String getOraSosire() {
        return oraSosire;
    }

    public void setOraSosire(String oraSosire) {
        this.oraSosire = oraSosire;
    }

    public Trains getTrenSchimbare1() {
        return trenSchimbare1;
    }

    public void setTrenSchimbare1(Trains trenSchimbare1) {
        this.trenSchimbare1 = trenSchimbare1;
    }

    public Trains getTrenSchimbare2() {
        return trenSchimbare2;
    }

    public void setTrenSchimbare2(Trains trenSchimbare2) {
        this.trenSchimbare2 = trenSchimbare2;
    }

    public Trains getTrenSchimbare3() {
        return trenSchimbare3;
    }

    public void setTrenSchimbare3(Trains trenSchimbare3) {
        this.trenSchimbare3 = trenSchimbare3;
    }

    public Trains getTrenSchimbare4() {
        return trenSchimbare4;
    }

    public void setTrenSchimbare4(Trains trenSchimbare4) {
        this.trenSchimbare4 = trenSchimbare4;
    }
}
