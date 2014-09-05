(function(){

    var vis,
        force;

    $(document).ready(function(){
        var w = 1800;
        var nodes = [
            {
                "name":"Running Byrd Tea",
                "class": "rbt",
                "pic":"pics/byrd.png",
                "workURL": 'http://runningbyrdteacompany.com/',
                "r": 80
            },
            {
                "name":"Where is Reade?",
                "class": "where-is-reade",
                "pic":"pics/location-pin.png",
                "workURL": 'http://wherethefuckisreade.com/',
                "r": 80
            },
            {
                "name":"Graph Tool",
                "class": "grapher",
                "pic":"pics/line.svg",
                "r": 80
            },
            {
                "name":"One Bus Away",
                "class": "one-bus",
                "pic":"pics/one-bus.png",
                "workURL": 'http://onebusaway.org/',
                "r": 80
            },
            {
                "name":"Reade",
                "class": "reade",
                "pic":"pics/gap.jpg",
                "fixed": true,
                "r": 80, 
                "x": $(window).width()/2, 
                "y": $(window).height()/2
            }
        ];
        var links = [
            {"source": 4, "target": 0},
            {"source": 4, "target": 1},
            {"source": 4, "target": 2},
            {"source": 4, "target": 3}
        ];
            

        vis = d3.select("#bubbles").append("svg:svg")
            .attr("id", "canvas")
            .attr("width", $(window).width())
            .attr("height", $(window).height());
        
        force = d3.layout.force()
            .nodes(nodes)
            .links(links)
            .linkDistance(200)
            .size([$(window).width(), $(window).height()])
            .friction(0.7)
            .gravity(0.001)
            .charge(-w*3)
            .on("tick", tick)
            .start();

        var link = vis.selectAll(".link")
                   .data(links);

        link.enter().append('svg:line')
            .style('stroke-width', '2px')
            .style("stroke", "black")
            .attr('class', 'link');
                           
        var node = vis.selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .attr("class", function(d) { return "node " + d.class; })
            .on("click", nodeClick)
            .call(force.drag);
              
              
        node.append("svg:circle")
            .style("fill", "white")
            .attr("r", function(d) { return d.r; });
         
         
        node.append("image")
              .attr("xlink:href", function(d) { return d.pic })
              .attr("x", function(d) { return -d.r/1.3; })
              .attr("y", function(d) { return -d.r/1.3; })
              .attr("width", function(d) { return d.r * 1.5; })
              .attr("height", function(d) { return d.r * 1.5; });      
       
       
        // node.append("text")
        //     .attr("dx", function(d){ return -(d.r/2)})
        //     .attr("dy", function(d){ return d.r + 30})
        //     .text(function(d) { return d.name });

        $(window).on('resize', function(){
            console.log('RESIZE');
            d3.select('.reade')
        });
    });
    	
    var nodeClick = function(node){
        //dont do this on main node
        if(node.class === 'reade') return;

        $('#iframe').attr('src', node.workURL);

        force.stop();

        d3.select("#canvas").transition()
            .duration(500).attr('width', 200);

        d3.select(this)
            .transition()
            .duration(500)
            .attr("transform","translate(" + 100 + "," + 400 + ")");

        d3.selectAll('.node:not(.' + node.class + ')')
            .transition()
            .duration(500)
            .attr("transform","translate(" + 100 + "," + 100 + ")");

        d3.selectAll(".link")
            .transition()
            .duration(500)
            .attr("x1", function(d) { return 100; })
            .attr("y1", function(d) { return 100; })
            .attr("x2", function(d) { return 100; })
            .attr("y2", function(d) { return 400; });

        $('.reade').one('click', restartForces);
    };
   
    var restartForces = function(){
        // if moved have to reset to middle instead of remembering where it was left
        
        $('#iframe').attr('src', '');
        d3.select("#canvas").transition()
            .duration(500).attr('width', $(window).width());

        var midHeight =  $(window).height()/2,
            midWidth =  $(window).width()/2;

        d3.selectAll(".node").transition()
            .duration(500)
            .attr("transform", function() { 
                return "translate(" + $(window).width()/2 + "," + $(window).height()/2 + ")"; 
            }).each('end', function(d){
                d.x = midHeight;
                d.y = midWidth;
                force.resume();
            });

        d3.selectAll(".link")
            .transition()
            .duration(500)
            .attr("x1", function(d) { return midWidth; })
            .attr("y1", function(d) { return midHeight; })
            .attr("x2", function(d) { return midWidth; })
            .attr("y2", function(d) { return midHeight; });
    };
   
	var tick = function(){
	  vis.selectAll(".link")
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
      
        vis.selectAll(".node").attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
	};
})();