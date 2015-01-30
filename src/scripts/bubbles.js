// TODO - action prompts
//      - more/less info content
//      - small screen?
//      - vclick

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
                "gitHubURL": 'https://github.com/readelobdill/runningByrdTeaCompany',
                "r": 50
            },
            {
                "name":"wherethefuckisreade.com",
                "class": "where-is-reade",
                "pic":"assets/pics/location-pin.png",
                "workURL": 'http://wherethefuckisreade.com/',
                "gitHubURL": 'https://github.com/readelobdill/wherethefuckisreade',
                "r": 50
            },
            {
                "name":"Graph Tool",
                "class": "grapher",
                "pic":"assets/pics/line.svg",
                "workURL": 'grapher/grapher.html',
                "r": 50
            },
            {
                "name":"Globetrotting",
                "class": "globe",
                "pic":"assets/pics/globe.svg",
                "workURL": '//player.vimeo.com/video/105926330?portrait=0',
                "r": 50
            },
            {
                "name":"Resume",
                "class": "resume",
                "pic": "assets/pics/resume.svg",
                "workURL": 'assets/resume.pdf',
                "gitHubURL": 'https://github.com/readelobdill/',
                "linkedInURL": 'http://au.linkedin.com/pub/reade-lobdill/20/890/798',
                "r": 50
            },
            {
                "name":"Rivertop Infographic",
                "class": "rivertop",
                "pic": "assets/pics/rivertop.svg",
                "workURL": 'rivertop-infographic/index.html',
                "gitHubURL": 'https://github.com/readelobdill/rivertop-infographic',
                "r": 50
            },
            // Must keep main node on as last added to DOM
            // so it always appears on top. svg objects respect
            // the DOM order instead of z-index
            {
                "name":"Reade Lobdill Design",
                "class": "reade",
                "pic":"assets/pics/logo.png",
                "fixed": true,
                "r": 60,
                "x": $(window).width()/2, 
                "y": $(window).height()/2
            }
        ],
        linkData = [
            {"source": 6, "target": 0},
            {"source": 6, "target": 1},
            {"source": 6, "target": 2},
            {"source": 6, "target": 3},
            {"source": 6, "target": 4},
            {"source": 6, "target": 5}
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

        // SHADOWS
        // nodes.append("svg:ellipse")
        //     .style("fill", "black")
        //     .style("fill-opacity", "0.3")
        //     .attr("rx", function(d) { return d.r/1.5; })
        //     .attr("ry", function(d) { return d.r/5; })
        //     .attr("cy", function(d) { return d.r*1.25; });
         
        nodes.append("image")
            .attr("xlink:href", function(d) { return d.pic })
            .attr("x", function(d) { return -d.r/1.35; })
            .attr("y", function(d) { return -d.r/1.35; })
            .attr("width", function(d) { return d.r * 1.5; })
            .attr("height", function(d) { return d.r * 1.5; });      
       
       
        nodes.append("text")
            .text(function(d) { return d.name; })
            .attr("y", function(d){ return d.r + 15; })
            .attr("x", function(d){
                // must do boundingClientRect because firefox (and probably IE)
                // has no idea what the width of an svg element is using $.width() 
                return - this.getBoundingClientRect().width/2;
            })
            // kind of wonky but some clients need the element to be
            // in the dom to get the width
            .style('display', 'none');
            

        $(window).on('resize', _.debounce(onWindowResize, 100, true));
        $('#more-tab').on('click', showHideMoreContent);
    });
    	
    var nodeClick = function(node){
        //dont do this on main node
        if(node.class === 'reade') return;
        $('#bubbles').addClass('transition');

        $('#iframe').css('background-image', "url('assets/pics/loading.gif')");
        $('#work-title').text(node.name);

        $(window).off('resize');
        $('.reade').one('mousedown.drag', restartForces);
        $('#iframe').one('load', function(){
            //load more content
            $(this).css('background-image', '');
            $('#more-container').show();
        });

        if(node.gitHubURL) $('#github-link').attr('href', node.gitHubURL).show();
        if(node.linkedInURL) $('#linkedin-link').attr('href', node.linkedInURL).show();

        force.stop();

        d3.select("#canvas").transition()
            .duration(750)
            .attr('height', 120)
            .each('end', function(){
                //don't load iframe until animation finished
                $('#bubbles').addClass('grouped').removeClass('transition');
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
    };
   
    var restartForces = function(){
        $('#iframe').attr('src', 'about:blank');
        $('#bubbles').removeClass('grouped').addClass('transition');

        $('#more-content').empty();
        $('#more-container').hide();
        resetMoreContent();

        $('.social-link').hide();
        $('#work-title').text(vis.select('.reade').data()[0].name);
        $(window).on('resize', _.debounce(onWindowResize, 500, true));

        d3.select("#canvas").transition()
            .duration(750)
            .attr('height', $(window).height())
            .each('end', function(d){
                $('#bubbles').removeClass('transition');
                force.resume();
            });

        var midHeight =  $(window).height()/2,
            midWidth =  $(window).width()/2;

        d3.selectAll(".node")
            .transition()
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

        //resize canvas
        d3.select("#canvas").attr("width", windowWidth)
            .attr("height", windowHeight);

        //move center node
        force.nodes()[force.nodes().length - 1].px = windowWidth/2;
        force.nodes()[force.nodes().length - 1].py = windowHeight/2;

        force.start();
    };

    var showHideMoreContent = function(){
        if($('#more-container').hasClass('closed')){
            $('#more-container').addClass('open').removeClass('closed');
            $('#more-tab').text('Less');

            //Add Text explanation (from node?)
            $('#more-content').text('').wrapInner('<p></p>');
        } else {
            resetMoreContent();


        }
    };

    var resetMoreContent = function(){
        $('#more-container').removeClass('open').addClass('closed');
        $('#more-tab').text('More');
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