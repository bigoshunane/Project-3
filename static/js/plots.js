
var dataPath = "/michelin"


let ratings = ['Bib Gourmand', '1 MICHELIN Star', '2 MICHELIN Stars', '3 MICHELIN Stars']
let stars = ['1 MICHELIN Star', '2 MICHELIN Stars', '3 MICHELIN Stars']
let cuisines = ['Modern Cuisine', 'Creative', 'Japanese', 'Traditional Cuisine','French', 'Street Food', 'Italian','Classic Cuisine','Regional Cuisine','Cantonese']
let prices = ["1", "2", "3", "4", "5"]

// const uniques = [...new Set(data.map(item => item.Cuisine))]
// console.log(uniques)

function buildPlots(ratings,cuisines,prices) {
  d3.json(dataPath).then((data) => {

      //Start of code to create a pie chart for awards
      let countArray =[]
      // Loop through the array of awards
      for (let i = 0; i < ratings.length; i++) {

        // Store the award at index `i` for evaluation
        rating = ratings[i];

        // Initialize the count
        let count = 0;

        // Loop through the array of restaurants
        for(let j = 0; j <data.length; j++){
          row = data[j];

          if(row.award == rating){
            count +=1

          }
        }
      countArray.push(count)
      }

    let trace1 = {
        values: countArray,
        labels: ratings,
        type: 'pie',
        name: 'Michelin Awards'
    };
    let pieData = [trace1];

    let layout1 = {
        title: 'Michelin Awards',
        xaxis: {
          title: 'Awards'
        },
    };

    // Render the plot to the div tag with id "pie"
    Plotly.newPlot("pie", pieData, layout1);

    //Start of code to create a bar chart for cuisines
      let cuisineCountArray =[]

      // Loop through the array of cuisines
      for (let i = 0; i < cuisines.length; i++) {

        // Store the cuisine at index `i` for evaluation
        cuisine = cuisines[i];

        // Initialize the count
        let cuisineCount= 0;

        // Loop through the array of restaurants
        for(let j = 0; j <data.length; j++){
          row = data[j];

          if(row.Cuisine == cuisine){
            cuisineCount +=1
          }
        }
      cuisineCountArray.push(cuisineCount)
      }

    let trace2 = {
        x: cuisines,
        y: cuisineCountArray,
        type: 'bar',
        name: 'Top Ten Cuisines in Michelin Award Winning Restaurants'
    };
    let barData = [trace2];

    let layout2 = {
        title: 'Top Ten Cuisines',
        xaxis: {
          title: 'Cuisines'
        },
    };

      // Render the plot to the div tag with id "bar"
    Plotly.newPlot("bar", barData, layout2);

    // Start of code to create a stacked bar chart for prices
    let priceCountArray =[]

        // Loop through the array of prices
    for (let i = 0; i < prices.length; i++) {
          price = prices[i];

         // Store the price at index `i` for evaluation

         // Initialize the count
    //let priceCount= 0;

         // Loop through the array for each award to count prices
      for (let k = 0; k < ratings.length; k++){
          rating = ratings[k];

          let priceCount = 0;

          for(let j = 0; j <data.length; j++){
              row = data[j];

              if(row.price == price && row.Award == rating){
                  priceCount +=1
              }
          }

          priceCountArray.push(priceCount)
        }

    }

      //Stacked Bar chart for meal price range
      let stackTrace1 = {
        x: ratings,
        y: priceCountArray,
        name: '$0-$55',
        type: 'bar'
      };

      let stackTrace2 = {
        x: ratings,
        y: priceCountArray,
        name: '$55-$100',
        type: 'bar'
      };

      let stackTrace3 = {
          x: ratings,
          y: [100, 200, 300, 400],
          name: '$100-$160',
          type: 'bar'
        };

        let stackTrace4 = {
          x: ratings,
          y: [20, 40, 60, 80],
          name: '$160-$200',
          type: 'bar'
        }

        let stackTrace5 = {
          x: ratings,
          y: [100, 80, 60, 40],
          name: '$200-$1500',
          type: 'bar'
        }

      let stackData = [stackTrace1, stackTrace2, stackTrace3, stackTrace4, stackTrace5];
      let stackLayout = {barmode: 'stack'};

     Plotly.newPlot('stack', stackData, stackLayout);

       let barGroupLayout = {
         title: 'Meal Price per Award',
         barmode: 'group',
         bargap: 0.25,
         bargroupgap:0.1,
         barnorm: 'percent'
       };
     Plotly.newPlot('bargroup', stackData, barGroupLayout)

  });
}

buildPlots(ratings, cuisines, prices)
