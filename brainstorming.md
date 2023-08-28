# Brainstorming

## Part 1: (Server.ts in streaming folder)
#### problem diagnosis
After reading through the hint, we can see that try catch is viable option.
Through console.logs and throughly reading battery_emulator.ts we can see that there is only one type of error that will be thrown that is a syntaxError caused by an additional '}'. 
#### problem solution
A try catch code block can be implemented to catch the syntaxError's. We can then attempt to remove the extra '}' that is the reason for the error then attempt to JSON.parse msg again. 
If msg being passed in has the problematic '}', it will throw an error, which means that the JSON.parse did not successfully run therefore, attempt to remove the extra '}' then run JSON.parse again.