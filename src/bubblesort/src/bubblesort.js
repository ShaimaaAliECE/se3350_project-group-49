const bubblesort = (arr)=> {
   
    //returns arr if length is less than or equal to 1
    if(arr.length<=1) return arr;

   
   let length = arr.length;
   let swapped ;
 
   //while swaooed
   do{
       swapped = false;

//swaps the numbers if arr at i is greater then arr at i+1
       for(let i=0;i<length;i++) 
       {
           if(arr[i]>arr[i+1])
           {
               let temp = arr[i];
               arr[i] = arr[i+1];
               arr[i+1] = temp;
               swapped = true;
           }

       }
   }while(swapped);
   //returns a sorted array
  return arr;
}


