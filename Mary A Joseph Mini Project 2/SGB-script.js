d3.csv("./data/homelessupdate_dataset.csv").then(function (data) {

    console.log(data);

    /*
    DEFINE DIMENSIONS AND GENERATE SVG
    */

    var width = document.querySelector("#chart").clientWidth;
    var height = document.querySelector("#chart").clientHeight;
    var margin = {
        top: 50,
        left: 150,
        right: 50,
        bottom: 150
    };

    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    /*
    FILTER DATA
    */
    var filtered_dataFemale = data.filter(function (d) {
        return d.GENDER === "Female";
    });

    var filtered_dataMale = data.filter(function (d) {
        return d.GENDER === "Male";
    });

    var filtered_dataGender = data.filter(function (d) {
        return d.GENDER;
    });

    /*
    CALCULATE MINIMUM AND MAXIMUM VALUES
    */
    var AGE = {
        minFemale: d3.min(filtered_dataFemale, function (d) {
            return +d.AGE;
        }),
        maxFemale: d3.max(filtered_dataFemale, function (d) {
            return +d.AGE;
        }),
        minMale: d3.min(filtered_dataMale, function (d) {
            return +d.AGE;
        }),
        maxMale: d3.max(filtered_dataMale, function (d) {
            return +d.AGE;
        }),

        minGender: d3.min(filtered_dataGender, function (d) {
            return +d.AGE;
        }),
        maxGender: d3.max(filtered_dataGender, function (d) {
            return +d.AGE;
        })

    };

    var INCOME = {
        minFemale: d3.min(filtered_dataFemale, function (d) {
            return +d.INCOME;
        }),
        maxFemale: d3.max(filtered_dataFemale, function (d) {
            return +d.INCOME;
        }),
        minMale: d3.min(filtered_dataMale, function (d) {
            return +d.INCOME;
        }),
        maxMale: d3.max(filtered_dataMale, function (d) {
            return +d.INCOME;
        }),
        minGender: d3.min(filtered_dataGender, function (d) {
            return +d.INCOME;
        }),
        maxGender: d3.max(filtered_dataGender, function (d) {
            return +d.INCOME;
        })

    };

    var NIGHTS = {
        minFemale: d3.min(filtered_dataFemale, function (d) {
            return +d.NIGHTS;
        }),
        maxFemale: d3.max(filtered_dataFemale, function (d) {
            return +d.NIGHTS;
        }),
        minMale: d3.min(filtered_dataMale, function (d) {
            return +d.NIGHTS;
        }),
        maxMale: d3.max(filtered_dataMale, function (d) {
            return +d.NIGHTS;
        }),
        minGender: d3.min(filtered_dataGender, function (d) {
            return +d.NIGHTS;
        }),
        maxGender: d3.max(filtered_dataGender, function (d) {
            return +d.NIGHTS;
        })

    };

    /*
    DEFINE SCALES
    */
    var xScale = d3.scaleLinear()
        .domain([-100, 3000])
       
        .range([margin.left, width - margin.right]);

    var yScale = d3.scaleLinear()
       .domain([15, AGE.maxFemale])
       
        .range([height - margin.bottom, margin.top]);

    var rScale = d3.scaleSqrt()
        .domain([NIGHTS.minFemale, NIGHTS.maxFemale])
        .range([3, 25]);

   var colorScale = d3.scaleOrdinal()
        .domain(["Yes", "No"])
        .range(["seagreen", "steelblue"]);
      // var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    /*
    DRAW AXES
    */
    var xAxis = svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0,${height-margin.bottom})`)
      //  .call(d3.axisBottom().scale(xScale));
        .call(d3.axisBottom().scale(xScale).tickFormat(d3.format("$")));

    var yAxis = svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));
  

/*
   AXIS LABELS
    */
    var xAxisLabel = svg.append("text")
        .attr("class", "axisLabel")
        .attr("x", width / 2)
        .attr("y", height - margin.bottom / 2)
        .attr("text-anchor", "middle")
        .text("Income Per Year");

    var yAxisLabel = svg.append("text")
        .attr("class", "axisLabel")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", margin.left / 2)
        .attr("text-anchor", "middle")
        .text("Age");
      
/*
   PLOTTING DATA
    */
        var circle = svg.selectAll("circle")
        .data(filtered_dataGender)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return xScale(d.INCOME);
        })
        .attr("cy", function (d) {
            return yScale(d.AGE);
        })
       .attr("opacity", ".85")
       .attr("r", 0)
       .transition(3500)
       .duration(3000)
        .attr("r", function (d) {
            return rScale(d.NIGHTS);
        })
        .attr("fill", function (d) {
            return colorScale(d.VETERAN);
        });
 


/*
   ON CLICK All DATA
    */
   d3.select("#All").on("click", function () {
    var allPoints = svg.selectAll("circle")
    .data(filtered_dataGender);

   allPoints.enter()
    .append("circle")
    .attr("cx", function (d) {
        return xScale(d.INCOME);
    })
    .attr("cy", function (d) {
        return yScale(d.AGE);
    })
   
 .attr("opacity", ".85")
// .attr("r", 0)
//.transition(3500)
// .duration(3000)
.attr("r", function (d) {
        return rScale(d.NIGHTS);
    })
    .attr("fill", function (d) {
        return colorScale(d.VETERAN);
    })

    .merge(allPoints)
    .transition(2500)
    .duration(2000)

    .attr("cx", function (d) {
        return xScale(d.INCOME);
    })
    .attr("cy", function (d) {
        return yScale(d.AGE);
    })
    .attr("opacity", ".85")
    .attr("r", 0)
    .transition(3000)
    .duration(3000)
    .attr("r", function (d) {
        return rScale(d.NIGHTS);
    })
    .attr("fill", function (d) {
        return colorScale(d.VETERAN);
    });

allPoints.exit()
    .transition(2500)
    .duration(2000)
    .attr("r", 0)
    .remove();
    
    svg.selectAll("circle").on("mouseover", function (d) {

        tooltip.style("visibility", "visible")

            .style("left", (d3.event.pageX + 25) + "px")
            .style("top", (d3.event.pageY - 28) + "px")
            .html("Nights Spent: " + (d.NIGHTS) + "<br>" + "Substance Abuse: " + (d.substanceabuse) + "<br>" + "Completed: " + (d.completed) + "<br>" + "On Probation: " + (d.probation))

            d3.select(this)
            .attr("stroke", "darkslategrey")
            .attr("stroke-width", 3)
           // .attr("opacity", 1)


    })
    .on("mouseout", function () {
    
        tooltip.style("visibility", "hidden")
        d3.select(this)
            .attr("stroke", "none")
            .attr("stroke-width", "none")
            //.attr("opacity", "0.05")
});

});


/*
   ON CLICK FEMALE DATA
    */
    d3.select("#Female").on("click", function () {

        var enterPoints = svg.selectAll("circle")
            .data(filtered_dataFemale);



        enterPoints.enter()
            .append("circle")
            .attr("cx", function (d) {
                return xScale(d.INCOME);
            })
            .attr("cy", function (d) {
                return yScale(d.AGE);
            })
           
         .attr("opacity", ".85")
        // .attr("r", 0)
       //.transition(3500)
      // .duration(3000)
   .attr("r", function (d) {
                return rScale(d.NIGHTS);
            })
            .attr("fill", function (d) {
                return colorScale(d.VETERAN);
            })

            .merge(enterPoints)
            .transition(2500)
            .duration(2000)

            .attr("cx", function (d) {
                return xScale(d.INCOME);
            })
            .attr("cy", function (d) {
                return yScale(d.AGE);
            })
            .attr("opacity", ".85")
            .attr("r", 0)
            .transition(3000)
            .duration(3000)
            .attr("r", function (d) {
                return rScale(d.NIGHTS);
            })
            .attr("fill", function (d) {
                return colorScale(d.VETERAN);
            });

       enterPoints.exit()
            .transition(2500)
            .duration(2000)
            .attr("r", 0)
            .remove();
            
            svg.selectAll("circle").on("mouseover", function (d) {
    
                tooltip.style("visibility", "visible")
    
                    .style("left", (d3.event.pageX + 25) + "px")
                    .style("top", (d3.event.pageY - 28) + "px")
                    .html("Nights Spent: " + (d.NIGHTS) + "<br>" + "Substance Abuse: " + (d.substanceabuse) + "<br>" + "Completed: " + (d.completed) + "<br>" + "On Probation: " + (d.probation))
    
                    d3.select(this)
                    .attr("stroke", "darkslategrey")
                    .attr("stroke-width", 3)
                   // .attr("opacity", 1)
    
    
            })
    
           .on("mouseout", function () {
    
                tooltip.style("visibility", "hidden")
                d3.select(this)
                    .attr("stroke", "none")
                    .attr("stroke-width", "none")
                    //.attr("opacity", "0.05")
    });

});


/*
  ON CLICK MALE DATA
    */
    d3.select("#Male").on("click", function () {

        var newPoints = svg.selectAll("circle")
            .data(filtered_dataMale);

        newPoints.enter()
            .append("circle")
            .attr("cx", function (d) {
                return xScale(d.INCOME);
            })
            .attr("cy", function (d) {
                return yScale(d.AGE);
            })
            .attr("opacity", ".85")
            .attr("r", function (d) {
                return rScale(d.NIGHTS);
            })
            .attr("fill", function (d) {
                return colorScale(d.VETERAN);
            })


            .merge(newPoints)

            .transition(2500)
            .duration(2000)

            .attr("cx", function (d) {
                return xScale(d.INCOME);
            })
            .attr("cy", function (d) {
                return yScale(d.AGE);
            })
           .attr("opacity", ".85")
           .attr("r", 0)
            .transition(3000)
            .duration(3000)
            
            .attr("r", function (d) {
                return rScale(d.NIGHTS);
            })
            .attr("fill", function (d) {
                return colorScale(d.VETERAN);
            });


        newPoints.exit()
            .transition(2500)
            .duration(2000)
            .attr("r", 0)
            .remove();

            svg.selectAll("circle").on("mouseover", function (d) {
    
                tooltip.style("visibility", "visible")
    
                    .style("left", (d3.event.pageX + 25) + "px")
                    .style("top", (d3.event.pageY - 28) + "px")
                    .html("Nights Spent: " + (d.NIGHTS) + "<br>" + "Substance Abuse: " + (d.substanceabuse) + "<br>" + "Completed: " + (d.completed) + "<br>" + "On Probation: " + (d.probation))
    
                    d3.select(this)
                    .attr("stroke", "darkslategrey")
                    .attr("stroke-width", 3)
                   // .attr("opacity", 1)
    
    
            })
    
    
           .on("mouseout", function () {
    
                tooltip.style("visibility", "hidden")
                d3.select(this)
                    .attr("stroke", "none")
                    .attr("stroke-width", "none")
                    //.attr("opacity", "0.05")   
    });

});

/*
 TOOL TIP
    */
    var tooltip = d3.select("#chart")
        .append("div")
        .attr("class", "tooltip");

    svg.selectAll("circle").on("mouseover", function (d) {

            tooltip.style("visibility", "visible")

                .style("left", (d3.event.pageX + 25) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
                .html("Nights Spent: " + (d.NIGHTS) + "<br>" + "Substance Abuse: " + (d.substanceabuse) + "<br>" + "Completed: " + (d.completed) + "<br>" + "On Probation: " + (d.probation))

            d3.select(this)
                .attr("stroke", "darkslategrey")
                .attr("stroke-width", 3)
               // .attr("opacity", 1)

        })

       .on("mouseout", function () {

            tooltip.style("visibility", "hidden")
            d3.select(this)
                .attr("stroke", "none")
                .attr("stroke-width", "none")
                //.attr("opacity", "0.05")

        })


        // svg 2 - Donut Chart

    var width = document.querySelector("#chart2").clientWidth;
    var height = document.querySelector("#chart2").clientHeight;
    var svg3 = d3.select("#chart2")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
       

    var nested = d3.nest()
        .key(function(d) { return d.AGE; })
        // show the number of each property-> show in value as count number
        .rollup(function(d) {return d.length; })
        .entries(data)
        //sort by number: from the largest to smallest
        .sort(function(a,b) {return b.value- a.value; });

        // filtered out the data we want: "Rating" property. Used to analyze clustered dataset.
        console.log(nested);
      

    var g = svg3.append("g")
        .attr("transform",`translate(${width/2},${height/2})`);

        var pie = d3.pie()
        // decide what value to use. the wedges will be propotional to the corresponding values
        .value(function(d) {return d.value;});

    // create a customized color palette to assign each wedge a unique color with d3.scaleOrdinal()
   var color = d3.scaleOrdinal(d3.schemeSet3)


    // create the arc using d3.arc()
    var arc = d3.arc()
    // innerRadius: to create donut chart
        .innerRadius(30)
        .outerRadius(100);

   // console.log(arc);

    var arcs = g.selectAll(".arc")
        .data(pie(nested))
        .enter()
        // start drawing the arc and append it as a g
        .append("g")
            .attr("class","arc");


  console.log(pie(nested));

    // start drawing the arc and append it as a g
    arcs.append("path")
        .attr("d", function(d) {return arc(d); })
        // i is the reference of the objects that bind into the elements
        .attr("fill",function(d,i){
            return color(i)

        });

    // create tooltip for donut chart
    var tooltip2 = d3.select("#chart2")
        .append("div")
        .attr("class","tooltip");

    
    var total = 0;
        nested.forEach(function(d){total += d.value});
        console.log(total);
        
   
        arcs.on("mousemove", function(d){
        
        // console.log(d)
        // new function: d3.mouse. set the center-x & center-y for positioning tooltips
    var mouse = d3.mouse(this);
    var cx = mouse[0] +width/2;
    var cy = mouse[1] +height/2;

        tooltip.style("visibility", "visible")
          .style("left",(d3.event.pageX + 25) + "px")
          .style("top", (d3.event.pageY - 28) +"px")
          .html("Age: " + (d.data.key)+ "<br>" + "Percenrage: " +((d.value/total)*100)+ "%")
         // d3.format(".2s")

        d3.select(this)
          .attr("stroke","royalblue")
          .attr("stroke-width",5)
      // put the stroke on the top of the chart
          .raise()
           })

      // remove the tooltip when mouseout
        .on("mouseout", function(d){
          
            tooltip.style("visibility","hidden")
            d3.select(this)
            .attr("stroke","none")
            .attr("stroke-width",0);
            
            
            });


      });


