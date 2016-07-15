# shooting-viz

## Summary
An infographic showing the impact of the mass shootings in the US over the last 3 years. It uses the data from: http://www.shootingtracker.com

## Design
It shows a chloropleth map of the US and allows a user to explore the number of people affected(killed/wounded) by mass shootings over 4 years. Hovering over a state shows the number in million affected in that state for the selection under consideration and also highlights a bar on an accompanying bar chart. The purpose of the bar chart is to show the rank of the selected state among all states for that year and selection.

## See it here
http://deborah-digges.github.io/shooting-viz/index.html


## Feedback

1. States with higher population may have a higher crime rate. Avoid confounding of the results by finding the per capita crime rate for each state
2. It's difficult to compare values across states - make an accompanying horizontal bar chart(sorted)
3. Allow exploring the values across the 3 years
4. Encode 0 properly to show states where there are no shootings
5. pack a lot of more information by using JavaScript pop-ups on click or hover
6. A single scale is probably better, but  can show the information by year for each state in a pop-up - that makes it more useful because one can see how it is changing.  Right now, it is very difficult to visualize the change in a particular state over the years
7. Your legends could use some refinement - you can reduce the number of shades (I think there are too many) - 3 should be enough (representing low, average, high, based on median and quartiles) - or maybe 4 or 5 at most


## Resources
1. Data source: http://www.shootingtracker.com

