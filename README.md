# shooting-viz

## Summary
An infographic showing the impact of the mass shootings in the US over the last 3 years. It uses the data from: http://www.shootingtracker.com

## Design
It shows a chloropleth map of the US and allows a user to explore the number of people affected(killed/wounded) by mass shootings over 4 years. Hovering over a state shows the number in million affected in that state for the selection under consideration and also highlights a bar on an accompanying bar chart. The purpose of the bar chart is to show the rank of the selected state among all states for that year and selection.

## See it here
http://deborah-digges.github.io/shooting-viz/index.html


## Feedback

<input type="checkbox" readonly checked> States with higher population may have a higher crime rate. Avoid confounding of the results by finding the per capita crime rate for each state

<input type="checkbox" readonly checked> It's difficult to compare values across states - make an accompanying horizontal bar chart(sorted)

<input type="checkbox" readonly checked> Allow exploring the values across the 3 years

<input type="checkbox" readonly> Encode 0 properly to show states where there are no shootings

<input type="checkbox" readonly> pack a lot of more information by using JavaScript pop-ups on click or hover

<input type="checkbox" readonly >A single scale is probably better, but  can show the information by year for each state in a pop-up - that makes it more useful because one can see how it is changing.  Right now, it is very difficult to visualize the change in a particular state over the years

<input type="checkbox" readonly>Your legends could use some refinement - you can reduce the number of shades (I think there are too many) - 3 should be enough (representing low, average, high, based on median and quartiles) - or maybe 4 or 5 at most


## Resources
1. Data source: http://www.shootingtracker.com
2. Mike Bostock's [Let's Make a Bar Chart](https://bost.ocks.org/mike/bar/)
3. [D3 collections](https://github.com/d3/d3-collection)

