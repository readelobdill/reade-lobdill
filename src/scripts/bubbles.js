// TODO - github link

(function(){

    var vis,
        force,
        w = 1800,
        nodeData = [
            {
                "name":"Runningbyrd Tea Company",
                "class": "rbt",
                "pic":"assets/pics/byrd.png",
                "workURL": 'http://runningbyrdteacompany.com/',
                "r": 60
            },
            {
                "name":"wherethefuckisreade.com",
                "class": "where-is-reade",
                "pic":"assets/pics/location-pin.png",
                "workURL": 'http://wherethefuckisreade.com/',
                "r": 60
            },
            {
                "name":"Graph Tool",
                "class": "grapher",
                "pic":"assets/pics/line.svg",
                "workURL": 'grapher/grapher.html',
                "r": 60
            },
            {
                "name":"Resume",
                "class": "resume",
                "pic": "assets/pics/resume.svg",
                "workURL": 'assets/resume.pdf',
                "r": 60
            },
            // Must keep main node on as last added to DOM
            // so it always appears on top.
            {
                "name":"Reade Lobdill Design",
                "class": "reade",
                "pic":"assets/pics/logo.png",
                "fixed": true,
                "r": 75,
                "x": $(window).width()/2, 
                "y": $(window).height()/2
            }
        ],
        linkData = [
            {"source": 4, "target": 0},
            {"source": 4, "target": 1},
            {"source": 4, "target": 2},
            {"source": 4, "target": 3}
        ];

    $(document).ready(function(){
        vis = d3.select("#bubbles").append("svg:svg")
            .attr("id", "canvas")
            .attr("width", $(window).width())
            .attr("height", $(window).height());
        
        force = d3.layout.force()
            .nodes(nodeData)
            .links(linkData)
            .linkDistance(200)
            .size([$(window).width(), $(window).height()])
            .friction(0.7)
            .gravity(0.001)
            .charge(-w*3)
            .on("tick", tick)
            .start();

        var links = vis.selectAll(".link")
                   .data(linkData);

        links.enter().append('svg:line')
            .style('stroke-width', '2px')
            .style("stroke", "black")
            .attr('class', 'link');
                           
        var nodes = vis.selectAll(".node")
            .data(nodeData)
            .enter().append("g")
            .attr("class", function(d) { return "node " + d.class; })
            .on("click", nodeClick)
            .call(force.drag);
              
              
        nodes.append("svg:circle")
            .style("fill", "white")
            .attr("r", function(d) { return d.r; });
         
        nodes.append("image")
            .attr("xlink:href", function(d) { return d.pic })
            .attr("x", function(d) { return -d.r/1.35; })
            .attr("y", function(d) { return -d.r/1.35; })
            .attr("width", function(d) { return d.r * 1.5; })
            .attr("height", function(d) { return d.r * 1.5; });      
       
       
        nodes.append("text")
            .text(function(d) { return d.name; })
            .attr("y", function(d){ return d.r + 10; })
            .attr("x", function(d){ 
                return - $(this).width()/2;
            });
            

        $(window).on('resize', onWindowResize);
    });
    	
    var nodeClick = function(node){
        //dont do this on main node
        if(node.class === 'reade') return;

        $('#iframe').css('background-image', "url('assets/pics/loading.gif')");
        $('#work-title').text(node.name);
        $('text').attr('class', 'grouped');
        $(window).off('resize');

        force.stop();

        d3.select("#canvas").transition()
            .duration(750)
            .attr('height', 120)
            .each('end', function(){
                //don't lode iframe until animation finished
                $('#iframe').attr('src', node.workURL);
            });

        d3.select(this)
            .transition()
            .duration(750)
            .attr("transform","translate(" + 400 + "," + 60 + ")");

        d3.selectAll('.node:not(.' + node.class + ')')
            .transition()
            .duration(750)
            .attr("transform","translate(" + 100 + "," + 60 + ")");

        d3.selectAll(".link")
            .transition()
            .duration(750)
            .attr("x1", function(d) { return 60; })
            .attr("y1", function(d) { return 60; })
            .attr("x2", function(d) { return 400; })
            .attr("y2", function(d) { return 60; });

        $('.reade').one('click mousedown.drag', restartForces);
        $('#iframe').one('load', function(){
            $(this).css('background-image', '');
        });
    };
   
    var restartForces = function(){
        $('#iframe').attr('src', '');
        $('#work-title').text(vis.select('.reade').data()[0].name);
        $(window).on('resize', onWindowResize);

        d3.select("#canvas").transition()
            .duration(750)
            .attr('height', $(window).height())
            .each('end', function(d){
                $('text').attr('class', '');
                force.resume();
            });

        var midHeight =  $(window).height()/2,
            midWidth =  $(window).width()/2;

        d3.selectAll(".node").transition()
            .duration(750)
            .attr("transform", function(d) { 
                return "translate(" + d.x + "," + d.y + ")"; 
            });

        d3.selectAll(".link")
            .transition()
            .duration(750)
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
    };

    var onWindowResize = function(){
        var windowHeight = $(this).height();
        var windowWidth = $(this).width();

        vis.attr("width", windowWidth)
            .attr("height", windowHeight);

        //move center node
        force.nodes()[force.nodes().length - 1].px = windowWidth/2;
        force.nodes()[force.nodes().length - 1].py = windowHeight/2;

        console.log('RESIZE');
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