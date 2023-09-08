# Brainstorming

## Part 1: (Server.ts in streaming folder)
#### problem diagnosis
After reading through the hint, we can see that try catch is viable option.
Through console.logs and throughly reading battery_emulator.ts we can see that there is only one type of error that will be thrown that is a syntaxError caused by an additional '}'. 
#### solution
A try catch code block can be implemented to catch the syntaxError's. We can then attempt to remove the extra '}' that is the reason for the error then attempt to JSON.parse msg again. 
If msg being passed in has the problematic '}', it will throw an error, which means that the JSON.parse did not successfully run therefore, attempt to remove the extra '}' then run JSON.parse again.

## Part 2: (Server.ts in streaming folder)
#### problem diagnosis
Safe operating window of 20-80 degrees celcius, Add a feature to the backend streaming service
so that each time the received battery temperature exceeds this range more than 3 times in 5 seconds, 
the current timestamp is logged to a file named 'incidents.log'.
#### solution
Have an empty array and in that send all the incoming msg objects within the same 5 seconods time frame
into that empty array, then iterate through the temperatures of the msg objects in the now populated array 
and everytime temperature exceeds 80 degrees, add to a count, and when count increases past 3, capture the 
timestamp of the last object in the array and send it incidents.log file. We can achieve this using the setTimeout() 
function. The setTimeout() function schedules the code to be run in a specified delay in this case that delay being 5000
miliseconds. 

## Part 3: (app.tsx in battery-ui folder)
#### problem diagnosis
The frontend is currently very basic. Extend the frontend by:
Making the battery temperature value change colours based on the current temperature (e.g. changing to red when the safe temperature range is exceeded).
Making the frontend more aesthetically pleasing, however you see fit.
#### solution
This is easily done by using hooks. We use the useState() and useEffect() hooks to accomplish the task of changing
the Temperature value colour based on the current temperature. If the temperature drop below 20 degrees or goes above 80 degrees
the colour changes to red. 
On top of this, I also added in an extra battery status bar, which also changes between red and green depending on the temperature
value. This was done with aesthetics and functionality in mind. The battery status bar is a bar that changes from green to red when the
battery is not in the safe range, this colour change is quicker to spot as it is a solid block of colour chaging to another colour.
In effort to make the frontend more aesthetic, I also changed the layout from potrait to landscpe and displayed all the information in a card
that takes up the majority of the screen, with the redback racing logo right beside the card. I believe that this approach did look more aesthetically pleasing compared to having a card with the redback racing logo on top of the card, which was initally the approach I tinkered with
and wanted to go with. 
I tried to the a line graph that dynamically displays the data and although I was able to import and implement a graph with example values, 
of the battery temperature, I was not able to find a way to update this graph dynamically. 

## Part 4: 
#### problem diagnosis
Part 4 - EXTENSION TASK
Build a CI/CD pipeline with GitHub Actions which automates:
linting
unit testing
building docker images for each application
pushing them to Docker Hub
#### solution
I was able to implement a linter and I was able to fix majority of the issues that the linter produced, although there were a few
errors that the linter case that I was not able to fix and as a result I decided it was best not to implement the linter in the pipeline
as I realised that my code would not pass the pipeline.
