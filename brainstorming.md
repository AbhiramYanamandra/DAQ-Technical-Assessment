# Brainstorming

## Part 1: (Server.ts in streaming folder)
#### problem diagnosis
After reading through the hint, we can see that try catch is viable option.
Through console.logs and throughly reading battery_emulator.ts we can see that there is only one type of error that will be thrown that is a syntaxError caused by an additional '}'. 
#### problem solution
A try catch code block can be implemented to catch the syntaxError's. We can then attempt to remove the extra '}' that is the reason for the error then attempt to JSON.parse msg again. 
If msg being passed in has the problematic '}', it will throw an error, which means that the JSON.parse did not successfully run therefore, attempt to remove the extra '}' then run JSON.parse again.

## Part 2: (Server.ts in streaming folder)
#### problem diagnosis
Safe operating window of 20-80 degrees celcius, Add a feature to the backend streaming service
so that each time the received battery temperature exceeds this range more than 3 times in 5 seconds, 
the current timestamp is logged to a file named 'incidents.log'.
#### problem solution
Have an empty array and in that send all the incoming msg objects within the same 5 seconods time frame
into that empty array, then iterate through the temperatures of the msg objects in the now populated array 
and everytime temperature exceeds 80 degrees, add to a count, and when count increases past 3, capture the 
timestamp of the last object in the array and send it incidents.log file.
