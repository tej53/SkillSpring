class Computer {
    private String cpu;
    private String ram;
    private String storage;
    private String operatingSystem;
    private boolean wifi;

    private Computer(Builder builder) {
        this.cpu = builder.cpu;
        this.ram = builder.ram;
        this.storage = builder.storage;
        this.operatingSystem = builder.operatingSystem;
        this.wifi = builder.wifi;
    }

    void displayDetails() {
        System.out.println("CPU: " + cpu);
        System.out.println("RAM: " + ram);
        System.out.println("Storage: " + storage);
        System.out.println("Operating System: " + (operatingSystem != null ? operatingSystem : "Not specified"));
        System.out.println("Wi-Fi Enabled: " + (wifi ? "Yes" : "No"));
    }

    static class Builder {
        private String cpu;
        private String ram;
        private String storage;
        private String operatingSystem;
        private boolean wifi;

        Builder(String cpu, String ram, String storage) {
            this.cpu = cpu;
            this.ram = ram;
            this.storage = storage;
        }

        Builder setOperatingSystem(String operatingSystem) {
            this.operatingSystem = operatingSystem;
            return this;
        }

        Builder setWifi(boolean wifi) {
            this.wifi = wifi;
            return this;
        }

        Computer build() {
            return new Computer(this);
        }
    }
}

public class BuilderPatternTest {
    public static void main(String args[]){
        Computer basicComputer = new Computer.Builder(
                "Intel i3",
                "8 GB",
                "256 GB SSD")
                .build();

        Computer gamingComputer = new Computer.Builder(
                "Intel i7",
                "32 GB",
                "1 TB SSD")
                .setOperatingSystem("Windows 11")
                .setWifi(true)
                .build();

        Computer officeComputer = new Computer.Builder("AMD Ryzen 5", "16 GB",
                "512 GB SSD").setOperatingSystem("Ubuntu Linux")
                .setWifi(true)
                .build();

        System.out.println("===== Basic Computer =====");
        basicComputer.displayDetails();

        System.out.println("===== Gaming Computer =====");
        gamingComputer.displayDetails();

        System.out.println("===== Office Computer =====");
        officeComputer.displayDetails();
    }
}
