# shooting-viz

## Summary
An infographic showing the impact of mass shootings in the US over the last 3 years. It uses the data from: http://www.shootingtracker.com

## Design
It shows a chloropleth map of the US and allows a user to explore the number of people affected(killed/wounded) by mass shootings over 4 years. Hovering over a state shows the number in million affected in that state for the selection under consideration and also highlights a bar on an accompanying bar chart. The purpose of the bar chart is to show the rank of the selected state among all states for that year and selection.

- A Chloropleth was chosen as the primary visualization as it easy to observe the values across states in it
- A range selector was used for changing the value of the time variable as it is easy to see how values change over time
- An accompanying bar chart shows a better comparison among states for a given year. This was chosen because difference in the length of bars is more perceivable than difference in hue of color.

## See it here
http://deborah-digges.github.io/shooting-viz/index.html


## Feedback

&#9745; States with higher population may have a higher crime rate. Avoid confounding of the results by finding the per capita crime rate for each state

&#9745; It's difficult to compare values across states - make an accompanying horizontal bar chart(sorted)

&#9745; Allow exploring the values across the 3 years

&#128504; Encode 0 properly to show states where there are no shootings. Set the first color only for value 0 (now it is for 0-5), and if the value is 1 and more choose the next color.

&#128504; pack a lot of more information by using JavaScript pop-ups on click or hover

&#128504; A single scale is probably better, but  can show the information by year for each state in a pop-up - that makes it more useful because one can see how it is changing.  Right now, it is very difficult to visualize the change in a particular state over the years

&#128504; Your legends could use some refinement - you can reduce the number of shades (I think there are too many) - 3 should be enough (representing low, average, high, based on median and quartiles) - or maybe 4 or 5 at most

&#128504; Explore the chart by yourself and find interesting outcomes, highlight these outcomes on the project page, include your findings in README file

&#128504; create two different legends for killing and wounded.

&#128504; when we see bar presentation we cannot focus the mouse and understand, what particular state has this value. The only way to check it is to find it on the map. Implement state highlighting when the viewer focus on the particular bar, or, at least, show tooltip with the state name.

## Resources
1. Data source: http://www.shootingtracker.com
2. Mike Bostock's [Let's Make a Bar Chart](https://bost.ocks.org/mike/bar/)
3. [D3 collections](https://github.com/d3/d3-collection)

