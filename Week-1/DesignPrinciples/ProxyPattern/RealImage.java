package DesignPrinciples.ProxyPattern;

public class RealImage implements Image {

    private String fileName;

    public RealImage(String fileName) {
        this.fileName = fileName;
        loadFromServer();
    }

    private void loadFromServer() {
        System.out.println("Loading image '" + fileName + "' from remote server...");
    }

    @Override
    public void display() {
        System.out.println("Displaying image: " + fileName);
    }

}