package DesignPrinciples.FactoryMethodPattern;

public class PdfDocumentFactory extends DocumentFactory{
    @Override
    public Document createDocument(){
        return new PdfDocument();
    }
}
