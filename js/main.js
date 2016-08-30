var  mn = $(".main-nav");
    mns = "main-nav-scrolled";
    hdr = $('header').height();

$(window).scroll(function() {
  if( $(this).scrollTop() > hdr ) {
    mn.addClass(mns);
  } else {
    mn.removeClass(mns);
  }
});

// function show() {
//     // $('#loader').fadeOut(1000);
//     $('#map').fadeIn();
// 	$('#rects').fadeIn();
// };
//
// setTimeout(show, 5000);

    //
	// var tooltip = d3.select("body")
	// .append("div")
	// .style("position", "absolute")
	// .style("z-index", "10")
	// .style ("top", "500px")
	// .style("left","90px")
	// .style("width", "300px")
	// .style("visibility", "hidden")
	// .style("font-family", "Raleway")
	// .style("font-weight", "bold")
	// .style("font-size","small")
	// .text("Percentage of US residents West Balkan ancestry according to congressional district.The West Balkan Population is composed of ancestry groups-Albanian, Croatian, Macedonian, Serbian, Slovenian, and Yugoslavian. ");
    //
	// var tooltip2 = d3.select("body")
	// .append("div")
	// .style("position", "absolute")
	// .style("z-index", "10")
	// .style ("top", "500px")
	// .style("left","90px")
	// .style("width", "200px")
	// .style("visibility", "hidden")
	// .style("font-family", "Raleway")
	// .style("font-weight", "bold")
	// .text("This visualization maps the number of US residents of Greek ancestry according to congressional district.");
    //
	// var tooltip3 = d3.select("body")
	// .append("div")
	// .style("position", "absolute")
	// .style("z-index", "10")
	// .style ("top", "500px")
	// .style("left","90px")
	// .style("width", "200px")
	// .style("visibility", "hidden")
	// .style("font-family", "Raleway")
	// .style("font-weight", "bold")
	// .text("This map shows voter turnout of California voters in 2012, according to congressional district.");
    //
    //
	// var tooltip4 = d3.select("body")
	// .append("div")
	// .style("position", "absolute")
	// .style("z-index", "10")
	// .style ("top", "500px")
	// .style("left","90px")
	// .style("width", "200px")
	// .style("visibility", "hidden")
	// .style("font-family", "Raleway")
	// .style("font-weight", "bold")
	// .text("This visualization maps the number US residents of Armenian ancestry. This map uses state data from the American Community Survey of 2012.");
    //
    //
    //
	// var tooltip5 = d3.select("body")
	// .append("div")
	// .style("position", "absolute")
	// .style("z-index", "10")
	// .style ("top", "500px")
	// .style("left","90px")
	// .style("width", "200px")
	// .style("visibility", "hidden")
	// .style("font-family", "Raleway")
	// .style("font-weight", "bold")
	// .text("This visualization maps the numberof US residents of Croatian ancestry according to congressional district.");
    //
	// var tooltip6 = d3.select("body")
	// .append("div")
	// .style("position", "absolute")
	// .style("z-index", "10")
	// .style ("top", "500px")
	// .style("left","90px")
	// .style("width", "200px")
	// .style("visibility", "hidden")
	// .style("font-family", "Raleway")
	// .style("font-weight", "bold")
	// .text("This visualization shows flights out of Oakland International Airport.");

var width = 600,
    height = 560;

var projection = d3.geo.albers()
	//.center([0,0])
   // .rotate([4.4, 0])
   //.parallels([50, 60])
   .scale(800)
   .translate([width / 2, height / 2.1]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select(".main").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "map");


var g = svg.append("g");



d3.json("us.json", function(error, us) {
	g.append("g")
		.attr("id", "states")
	.selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
     .enter ().append ("path")
      .attr("d", path);

     g.append ("path")
     .datum(topojson.mesh (us, us.objects.states, function (a,b) {return a !== b;}))
     .attr("id", "state-borders")
     .attr("d", path);

     g.append("g")
		.attr("id", "counties")
	.selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
    .enter ().append ("path")
      .attr("d", path);

     g.append ("path")
     .datum(topojson.mesh (us, us.objects.counties, function (a,b) {return a !== b;}))
     .attr("id", "counties-borders")
     .attr("d", path);

     d3.csv("cities.csv", function(data) {
         console.log(data);
        g.selectAll("circle")
           .data(data)
           .enter()
           .append("circle")
           .attr("cx", function(d) {
                   return projection([d.lon, d.lat])[0];
           })
           .attr("cy", function(d) {
                   return projection([d.lon, d.lat])[1];
           })
           .attr("r", function(d) { return Math.sqrt(parseInt(d.projects) * 100);
           })
           .style("fill", "yellow")
           .style("opacity", 0.75);
    });


});
//Make an SVG Container
//  var svgContainer = d3.select("body").append("svg")
//                                     .attr("width", 400)
//                                     .attr("height", 600)
//                                     .attr ("id", "rects");
//
//
//
// var rectangle1 = svgContainer.append("rect")
//                         .attr("x", 20)
//                         .attr("y", 80)
//                         .attr("width", 120)
//                         .attr("height", 60)
//                         .attr("rx", 10)
//                         .attr("ry", 10)
//                         .style("fill", "#FFF")
//                         .style("stroke", "grey")
//                         .on("click",  function(event) { $("#balkan").dialog('open');})
//                         .on("mouseover", function(){return tooltip.style("visibility", "visible");})
// 						.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
//
// var rectangle2 = svgContainer.append("rect")
//                         .attr("x", 150)
//                         .attr("y", 20)
//                         .attr("width", 120)
//                         .attr("height", 60)
//                         .attr("rx", 10)
//                         .attr("ry", 10)
//                         .style("fill", "#FFF")
//                         .style("stroke", "grey")
//                         .on("click",  function(event) { $("#greek").dialog('open');})
//                          .on("mouseover", function(){return tooltip2.style("visibility", "visible");})
// 						.on("mouseout", function(){return tooltip2.style("visibility", "hidden");});
// ;
//
// var rectangle3 = svgContainer.append("rect")
//                         .attr("x", 150)
//                         .attr("y", 140)
//                         .attr("width", 120)
//                         .attr("height", 60)
//                         .attr("rx", 10)
//                         .attr("ry", 10)
//                         .style("fill", "#FFF")
//                         .style("stroke", "grey")
//                         .on("click",  function(event) { $("#calvote").dialog('open');})
//                          .on("mouseover", function(){return tooltip3.style("visibility", "visible");})
// 						.on("mouseout", function(){return tooltip3.style("visibility", "hidden");});
// ;
//
// var rectangle4 = svgContainer.append("rect")
//                         .attr("x", 20)
//                         .attr("y", 200)
//                         .attr("width", 120)
//                         .attr("height", 60)
//                        .attr("rx", 10)
//                         .attr("ry", 10)
//                         .style("fill", "#FFF")
//                         .style("stroke","grey")
//                         .on("click",  function(event) { $("#armenian").dialog('open');})
//                          .on("mouseover", function(){return tooltip4.style("visibility", "visible");})
// 						.on("mouseout", function(){return tooltip4.style("visibility", "hidden");});
//  ;
//
// var rectangle5 = svgContainer.append("rect")
//                         .attr("x", 150)
//                         .attr("y", 260)
//                         .attr("width", 120)
//                         .attr("height", 60)
//                       .attr("rx", 10)
//                         .attr("ry", 10)
//                         .style("fill", "#FFF")
//                         .style("stroke", "grey")
//                         .on("click",  function(event) { $("#croatian").dialog('open');})
//                          .on("mouseover", function(){return tooltip5.style("visibility", "visible");})
// 						.on("mouseout", function(){return tooltip5.style("visibility", "hidden");});
//  ;
//
// var rectangle6 = svgContainer.append("rect")
//                         .attr("x", 20)
//                         .attr("y", 320)
//                         .attr("width", 120)
//                         .attr("height", 60)
//                         .attr("rx", 10)
//                         .attr("ry", 10)
//                         .style("fill", "#FFF")
//                         .style("stroke", "grey")
//                         .on("click",  function(event) { $("#flights").dialog('open');})
//                          .on("mouseover", function(){return tooltip6.style("visibility", "visible");})
// 						.on("mouseout", function(){return tooltip6.style("visibility", "hidden");});
//  ;
//
//
//
//
//    var text1 = svgContainer.append('text').text('Greek Ancestry')
//                 .attr('x', 160)
//                 .attr('y', 60)
//                 .attr('opacity', 0)
//                 .attr('font-family', 'Raleway')
//                 .attr('font-size', 'x-small')
//                     .on("click",  function(event) { $("#greek").dialog('open');})
//                 .transition()
//                 .attr("opacity",1)
//                 .attr("fill","steelblue")
//                  .duration(2000) // this is 5 secs
//   					.delay(5000);
//
//
//
//      var text2 = svgContainer.append('text').text('West Balkan Ancestry')
//                 .attr('x', 30)
//                 .attr('y', 120)
//                 .attr('fill', 'white')
//                 .attr('font-family', 'Raleway')
//                 .attr('font-size', 'x-small')
//                 .on("click",  function(event) { $("#balkan").modal('open');})
//                 .transition()
//                 .attr("opacity",1)
//                 .attr("fill","steelblue")
//                 .duration(2000) // this is 5 secs
//   				.delay(5000);
//
//
//     var text3a = svgContainer.append('text').text("Armenian Ancestry")
//                 .attr('x', 30)
//                 .attr('y', 235)
//                 .attr('fill', 'white')
//                 .attr('font-family', 'Raleway')
//                 .attr('font-size', 'x-small')
//                 .on("click",  function(event) { $("#armenian").dialog('open');})
//                 .transition()
//             	.attr("opacity",1)
//                 .attr("fill","steelblue")
//                 .duration(2000) // this is 5 secs
//   				.delay(5000);
//
//
// 	var text3a = svgContainer.append('text').text("State Map")
//                 .attr('x', 40)
//                 .attr('y', 255)
//                 .attr('fill', 'white')
//                 .attr('font-family', 'Raleway')
//                 .attr('font-size', 'x-small')
//                 .on("click",  function(event) { $("#armenian").dialog('open');})
//                 .transition()
//             	.attr("opacity",1)
//                 .attr("fill","steelblue")
//                 .duration(2000) // this is 5 secs
//   				.delay(5000);
//
//
//     var text4 = svgContainer.append('text').text("California Votes")
//                 .attr('x', 160)
//                 .attr('y', 180)
//                 .attr('fill', 'white')
//                 .attr('font-family', 'Raleway')
//                 .attr('font-size', 'x-small')
//                 .on("click",  function(event) { $("#calvote").dialog('open');})
//                 .transition()
//             	.attr("opacity",1)
//                 .attr("fill","steelblue")
//                 .duration(2000) // this is 5 secs
//   				.delay(5000);
//
//
// 	var text4 = svgContainer.append('text').text("Croatian Ancestry")
//                 .attr('x', 160)
//                 .attr('y', 300)
//                 .attr('fill', 'white')
//                 .attr('font-family', 'Raleway')
//                 .attr('font-size', 'x-small')
//                 .on("click",  function(event) { $("#croatian").dialog('open');})
//                 .transition()
//             	.attr("opacity",1)
//                 .attr("fill","steelblue")
//                 .duration(2000) // this is 5 secs
//   				.delay(5000);
//
//   	var text5 = svgContainer.append('text').text("Flights out of California")
//                 .attr('x', 28)
//                 .attr('y', 360)
//                 .attr('fill', 'white')
//                 .attr('font-family', 'Raleway')
//                 .attr('font-size', 'x-small')
//                 .on("click",  function(event) { $("#flights").dialog('open').css("z-index", "1500");})
//                 .transition()
//             	.attr("opacity",1)
//                 .attr("fill","steelblue")
//                 .duration(2000) // this is 5 secs
//   				.delay(5000);
//

function refreshIframe() {
    var ifr = document.getElementsByName('flights')[0];
    ifr.src = ifr.src;
}

$(document).on('click','.searchbychar', function(event) {
    event.preventDefault();
    var target = "#" + this.getAttribute('data-target');
    $(target).show();
    $('html, body').animate({
        scrollTop: $(target).offset().top
    }, 1500);
});


$(document).ready(function () {


// $( "#showr" ).click(function() {
//   $( "#div1" ).first().show( "fast", function showNext() {
//     $( this ).next( "#div1" ).show( "fast", showNext );
//   });
// });
//
//
// $( "#hidr" ).click(function() {
//   $( "#div1" ).first().hide("slow",function hideNext() {
//     $( this ).next( "#div1" ).show( "slow", hideNext );
// 	});
// 	});
});

 $(function() {
    $( "#aboutme" ).dialog({
    	dialogClass: 'dialogWithDropShadow',
      autoOpen: false,

      show: {
        effect: "",

        duration: 500
      },
      hide: {
        effect: "",
        duration: 500
      },
      width: 800,
      height: 500,
      draggable: true,


      resizable: true
    	});

    $( "#opener" ).click(function() {
      $( "#aboutme" ).dialog( "open" );
    });
     });

$(function() {
    $( ".dialog" ).dialog({
      autoOpen: false,

      show: {
        effect: "slide",

        duration: 500
      },
      hide: {
        effect: "slide",
        duration: 1000
      },
      width: 900,
      height: 500,
      draggable: true,


      resizable: true
    	});

    $( "#opener" ).click(function() {
      $( "#aboutme" ).dialog( "open" );
    });
     });


   $(function() {
    $( "#mymodal9" ).draggable();
  });


  $(document).ready(function () {
  $( ".icon3").click(function() {
  $( ".drop" ).toggle( "slow" );

});

    // $( ".icon2").click(function() {
    //     $( ".drop2" ).toggle( "slow" );
    //
    // });
    //
    // $( ".built").click(function() {
    //       $( ".drop" ).toggle( "slow" );
    // });
    //
    //
    // $( ".photos").click(function() {
    //     $( ".container" ).toggle( "slow" );
    // });
    //
    // $( ".datasource").click(function() {
    //     $( ".data" ).toggle( "slow" );
    // });
    //
    // $( ".more" ).click(function() {
    //     $( ".drop2" ).toggle( "slow" );
    // });
    //
    //
    // $( "#more1").click(function() {
    //   $( "#moreinfo" ).toggle( "slow" );
    // });
});


function refreshIframe3() {
    var ifr = document.getElementsByName('architecturef')[0];
    ifr.src = ifr.src;
}

function refreshIframe4() {
    var ifr = document.getElementsByName('gisf')[0];
    ifr.src = ifr.src;
}
