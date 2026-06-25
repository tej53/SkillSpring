package EcommercePlatformSearchFunction;

public class Search {
    public static Product linearSearch(Product products[], int id){
        for(int i=0;i<products.length;i++){
            if(products[i].productId == id){
                return products[i];
            }
        }

        return null;
    }

    public static Product binarySearch(Product products[], int id){
        int start = 0;
        int last = products.length-1;

        while(start<=last){
            int mid = (start+last)/2;

            if(products[mid].productId == id){
                return products[mid];
            }else if(products[mid].productId > id){
                last = mid - 1;
            }else{
                start = mid + 1;
            }
        }

        return null;
    }

    
}
