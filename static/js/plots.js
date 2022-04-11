
var dataPath = "/michelin";


let ratings = ['Bib Gourmand', '1 MICHELIN Star', '2 MICHELIN Stars', '3 MICHELIN Stars']
let stars = ['1 MICHELIN Star', '2 MICHELIN Stars', '3 MICHELIN Stars']
let cuisines; // = ['Modern Cuisine', 'Creative', 'Japanese', 'Traditional Cuisine','French', 'Street Food', 'Italian','Classic Cuisine','Regional Cuisine','Cantonese']
let prices = ['1','2','3','4','5']


let colors = [darkRed,red,fireRed,fireOrange,darkOrange]


// -------------------------
// Start Building Plots
// -------------------------

    function buildPlots(ratings,cuisines,prices) {
      d3.json(dataPath).then((data) => {
          console.log(data);

          // -------------------------
          // Pie Plots
          // -------------------------

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
            marker: {
              line: {
                color: '#F2F2F2',
                width: [3,3,3,3],
              },
            }
        };
        let pieData = [trace1];

        let layout1 = {
            xaxis: {
              title: 'Awards'
            },
            paper_bgcolor:'rgba(0,0,0,0)',
            colorway: colors,
            margin:{t: 0,}
        };

        // Render the plot to the div tag with id "pie"
        Plotly.newPlot("pie", pieData, layout1, {responsive: true});

        // -------------------------
        // Cuisine Bar Plot
        // -------------------------

        let cuisines;

        function getCuisines() {
          d3.json("/Top10Cuisines").then((data) => {
            cuisines = Array.from(data).map(c => c[0]);
          }).then(()=> buildcuisinePlots(cuisines));
        }

        getCuisines();

        function buildcuisinePlots(cuisines) {
          d3.json("/michelin").then((data) => {
            console.log(data);
            let cuisinecountArray = []
            // Loop through the array of awards
            for (let i = 0; i < cuisines.length; i++) {
              // Store the award at index `i` for evaluation
              cuisine = cuisines[i];
              // Initialize the count
              let count = 0;
              // Loop through the array of restaurant
              for (let j = 0; j < data.length; j++) {
                row = data[j];
                if (row.cuisine == cuisine) {
                  count += 1
                }
              }
              cuisinecountArray.push(count)
            }
            // Set up the pie chart
            let trace1 = {
              x:cuisines,
              y:cuisinecountArray,
              type: 'bar',
              name: 'Top 10 Michelin Cuisines'
            };
            let barData = [trace1];
            let layout1 = {
              paper_bgcolor:'rgba(0,0,0,0)',
              plot_bgcolor:'rgba(0,0,0,0)',
              colorway: [white],
              font: {
                family: 'montserrat, sans-serif',
                size: 14,
                color: white,
              },
              margin:{t: 0,}
            };
            Plotly.newPlot("bar", barData, layout1, {responsive: true});

              });
        }

        // -------------------------
        // Price Bar Charts
        // -------------------------

        // Start of code to create a stacked bar chart for prices & awards
        let priceCountArray =[[0, 0, 0, 0],
                              [0, 0, 0, 0],
                              [0, 0, 0, 0],
                              [0, 0, 0, 0],
                              [0, 0, 0, 0]];

            // Loop through the array of prices
        for (let i = 0; i < prices.length; i++) {
              price = prices[i];
             // Loop through the array for each award to count prices
          for (let k = 0; k < ratings.length; k++){
              rating = ratings[k];
              let priceCount = 0

                for(let j = 0; j <data.length; j++){
                    row = data[j];
                    if(row.price == price && row.award == rating){
                      priceCountArray[i][k] +=1
                    }
                }

              //priceCountArray.push(priceCount)
            }

        }
        console.log(priceCountArray)

          //Stacked Bar chart for meal price range
          let stackTrace1 = {
            x: ratings,
            y: priceCountArray[0],
            name: '$0-$55',
            type: 'bar'
          };

          let stackTrace2 = {
            x: ratings,
            y: priceCountArray[1],
            name: '$55-$100',
            type: 'bar'
          };

          let stackTrace3 = {
              x: ratings,
              y: priceCountArray[2],
              name: '$100-$160',
              type: 'bar'
            };

            let stackTrace4 = {
              x: ratings,
              y: priceCountArray[3],
              name: '$160-$200',
              type: 'bar'
            }

            let stackTrace5 = {
              x: ratings,
              y: priceCountArray[4],
              name: '$200-$1500',
              type: 'bar'
            }


          let stackData = [stackTrace1, stackTrace2, stackTrace3, stackTrace4, stackTrace5];

          let stackLayout = {
            title: 'Price Range per Award',
            barmode: 'stack',
            paper_bgcolor:'rgba(0,0,0,0)',
            colorway: colors,
            font: {
              family: 'montserrat, sans-serif',
              size: 14,
              color: '#7f7f7f'
            }
          };

         Plotly.newPlot('stack', stackData, stackLayout);

           let barGroupLayout = {
             title: 'Percentage of Price Range per Award',
             barmode: 'group',
             bargap: 0.25,
             bargroupgap:0.1,
             barnorm: 'percent',
             paper_bgcolor:'rgba(0,0,0,0)',
             colorway: colors,
             font: {
               family: 'montserrat, sans-serif',
               size: 14,
               color: '#7f7f7f'
             }
           };
         Plotly.newPlot('bargroup', stackData, barGroupLayout, {responsive: true})

      });
    }

    buildPlots(ratings, cuisines, prices)
