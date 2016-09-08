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

$(document).on('click','.searchbychar', function(event) {
    event.preventDefault();
    var target = "#" + this.getAttribute('data-target');
    $(target).show();
    $('html, body').animate({
        scrollTop: $(target).offset().top
    }, 1500);
});


$(document).on('click','.searchbychar_fast', function(event) {
    event.preventDefault();
    var target = "#" + this.getAttribute('data-target');
    $('html, body').animate({
        scrollTop: $(target).offset().top
    }, 1500);
});


var slideIndex = 1;
showDivs(slideIndex, "demoC","nySlides", " w3-black");

function plusDivsC(n) {
  showDivs(slideIndex += n, "demoC","nySlides", " w3-black");
}

function currentDivC(n) {
  showDivs(slideIndex = n, "demoC","nySlides", " w3-black");
}

showDivs(slideIndex, "demoB","waterSlides", " w3-white");

function plusDivsB(n) {
  showDivs(slideIndex += n, "demoB","waterSlides", " w3-white");
}

function currentDivB(n) {
  showDivs(slideIndex = n, "demoB","waterSlides", " w3-white");
}



showDivs(slideIndex, "demo","biSlides", " w3-black");

function plusDivs(n) {
  showDivs(slideIndex += n, "demo","biSlides", " w3-black");
}

function currentDiv(n) {
  showDivs(slideIndex = n, "demo", "biSlides", " w3-black");
}

function showDivs(n,dotclass,slides, color) {
  var i;
  var x = document.getElementsByClassName(slides);
  var dots = document.getElementsByClassName(dotclass);
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(color, "");
  }
  x[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += color;
}


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

var svg = d3.select(".map").append("svg")
    .attr("width", width)
    .attr("height", height)
    // .attr("viewBox", "0 0 600 560")
    // .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("class", "globe")
    .attr("class", "block");


 var g = svg.append("g");



d3.json("us.json", function(error, us) {


    //   svg.selectAll("path")
    //       .data(topojson.feature(us, us.objects.counties).features)
    //     .enter().append("path")
    //       .attr("d", path);


	g.attr("id", "states")
       .selectAll("path")
       .data(topojson.feature(us, us.objects.states).features)
       .enter ().append ("path")
       .attr("d", path);
     //
     g.append ("path")
    //  .datum(topojson.mesh (us, us.objects.states, function (a,b) {return a !== b;}))
     .attr("id", "state-borders")
     .attr("d", path);

    //  g.append("g")
	// 	.attr("id", "counties")
	// .selectAll("path")
    //   .data(topojson.feature(us, us.objects.counties).features)
    // .enter ().append ("path")
    //   .attr("d", path);

     var counties = g.append ("path")
     .datum(topojson.mesh (us, us.objects.counties, function (a,b) {return a !== b;}))
     .attr("id", "counties-borders")
     .attr("d", path);


     d3.csv("cities.csv", function(data) {
        var cities = svg.append("g")
         cities.selectAll("path")
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

           .style("opacity", 0.75)
           .on("mouseover", function (d) {

                d3.select(".city_name")
                .text(d.place)
                .style("left", (d3.event.pageX)+ "px")
                .style("top", (d3.event.pageY-230)+ "px");
                d3.select(this).style("fill","black");
                  console.log(d);

            })
            .on("mouseout", function(d){
                d3.select(this).attr("class","cities");
                d3.select(".city_name").text("");
                d3.select(this).style("fill","yellow");

            })
            .attr("id", function(d) { return "city" + d.rank; });


            select_city("bis",city4, "Boston");
            select_city("water",city2, "Los Angeles");
            select_city("ny",city1, "New York");
            select_city("ipad",city5, "Cupertino");
            select_city("bcrime",city4, "Boston");

            d3.select(".ancestry").on("click", function(d){
                d3.select("#states").style("fill", "gold");
            });
            d3.select(".ancestry").on("mouseover", function(d){
                d3.select("#states").style("fill", "gold");
            });
            d3.select(".ancestry").on("mouseout", function(d){
                d3.select("#states").style("fill", "none");
            });

            });


});
    function select_city(button, city,name){

        d3.select("."+ button).on("click", function(d){
            d3.select(city).style("fill", "black");
            // d3.select(".city_name").text(name);

        });
        d3.select("."+ button).on("mouseover", function(d){
            d3.select(city).style("fill", "black");
            // d3.select(".city_name").text(name);
        });
        d3.select("."+ button).on("mouseout", function(d){
            d3.select(city).style("fill", "yellow");
            d3.select(".city_name").text("");
        });
    }
    //
    // var map = $("#map"),
    // aspect = map.width() / map.height(),
    // container = map.parent();
    // $(window).on("resize", function() {
    //     var targetWidth = container.width();
    //     map.attr("width", targetWidth);
    //     map.attr("height", Math.round(targetWidth / aspect));
    // }).trigger("resize");







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


});


    function refreshIframe3() {
        var ifr = document.getElementsByName('architecturef')[0];
        ifr.src = ifr.src;
    }

    function refreshIframe4() {
        var ifr = document.getElementsByName('gisf')[0];
        ifr.src = ifr.src;
    }



    $(function() {
           $( "#gisbook" ).dialog({
                   dialogClass: 'dialogWithDropShadow',
                   autoOpen: false,
                   modal:true,
                   show: {
                       effect:"",
                       duration: 500
                       },
                   hide: {
                       effect: "",
                       duration: 500
                       },
                   open: function(ev, ui){
                            $("#gisf").attr('src',"http://loosine.com/gis.html");
                             $('.ui-widget-overlay').addClass('custom-overlay');
                         },

                   close: function() {
                           $('.ui-widget-overlay').removeClass('custom-overlay');
                       },
                   width: 1250,
                   height: 600,
                   draggable: true,
                   resizable: true
               });

           $( "#gisopener" ).click(function() {
               $( "#gisbook" ).dialog( "open" );
           });
    });
