
d3.json("../data/2021CountryContinent.json").then((data) => {
  console.log(data);
});
let ratings = ['Bib Gourmand', '1 MICHELIN Star', '2 MICHELIN Stars', '3 MICHELIN Stars']
function buildPlots(ratings) {
  d3.json("../data/2021CountryContinent.json").then((data) => {
    console.log(data);
    let countArray = []
    // Loop through the array of awards
    for (let i = 0; i < ratings.length; i++) {
      // Store the award at index `i` for evaluation
      rating = ratings[i];
      // Initialize the count
      let count = 0;
      // Loop through the array of restaurant
      for (let j = 0; j < data.length; j++) {
        row = data[j];
        if (row.Award == rating) {
          count += 1
        }
      }
      countArray.push(count)
    }
    // Set up the pie chart
    let trace2 = {
      values: countArray,
      labels: ratings,
      type: 'pie',
      name: 'Amount of Restaurants by Michelin Award Level'
    };
    let pieData = [trace2];
    let layout2 = {
      title: 'Amount of Restaurants by Michelin Award Level',
      xaxis: {
        title: 'Awards',

      },
    };
    Plotly.newPlot("pie", pieData, layout2);

      });
}
buildPlots(ratings)

// Top 10 Cuisines
// "Modern Cuisine", "Creative", "Japanese", "Traditional Cuisine", "French", "Street Food", "Italian", "Classic Cuisine", "Regional Cuisine", "Cantonese"