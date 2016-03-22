// TODO - action prompts
//      - more/less info content
//      - small screen?
//      - vclick

(function(){

    var vis,
        force,
        w = 1800,
        $iframe,
        nodeData = [
            {
                "name":"Runningbyrd Tea Company",
                "class": "rbt",
                "pic":"assets/pics/byrd.svg",
                "workURL": 'http://runningbyrdteacompany.com/',
                "gitHubURL": 'https://github.com/readelobdill/runningByrdTeaCompany',
                "r": 60
            },
            {
                "name":"wherethefuckisreade.com",
                "class": "where-is-reade",
                "pic":"assets/pics/location-pin.svg",
                "workURL": 'http://wherethefuckisreade.com/',
                "gitHubURL": 'https://github.com/readelobdill/wherethefuckisreade',
                "r": 60
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
                "r": 60
            },
            {
                "name":"Resume",
                "class": "resume",
                "pic": "assets/pics/resume.svg",
                "workURL": 'assets/resume.pdf',
                "gitHubURL": 'https://github.com/readelobdill/',
                "linkedInURL": 'http://au.linkedin.com/pub/reade-lobdill/20/890/798',
                "r": 60
            },
            {
                "name":"Rivertop Infographic",
                "class": "rivertop",
                "pic": "assets/pics/rivertop.svg",
                "workURL": 'rivertop-infographic/index.html',
                "gitHubURL": 'https://github.com/readelobdill/rivertop-infographic',
                "r": 60
            },
            {
                "name":"Coachseek",
                "class": "coachseek",
                "pic": "assets/pics/coachseek.svg",
                "workURL": 'https://app-testing.coachseek.com/#/?showoff={"email":"russelsimmons@coachseek.com","password":"password"}',
                "r": 60
            },
            // Must keep main node on as last added to DOM
            // so it always appears on top. svg objects respect
            // the DOM order instead of z-index
            {
                "name":"Reade Lobdill Design",
                "class": "reade",
                "pic":"assets/pics/logo.svg",
                "fixed": true,
                "r": 60,
                "x": $(window).width()/2,
                "y": $(window).height()/2
            }
        ],
        linkData = [
            {"source": 7, "target": 0},
            {"source": 7, "target": 1},
            {"source": 7, "target": 2},
            {"source": 7, "target": 3},
            {"source": 7, "target": 4},
            {"source": 7, "target": 5},
            {"source": 7, "target": 6}
        ];

    // setup routes
    function onHashChange(newHash, oldHash){
        if(newHash === "reade" && oldHash){
            restartForces();
        } else if (newHash && newHash !== "reade") {
            showNodeDetails(d3.select('g.node.' + newHash).data()[0])
        }
    }

    hasher.changed.add(onHashChange);
    hasher.initialized.add(onHashChange);

    $(document).ready(function(){
        $iframe = $("#iframe");
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
            .each(function(d){
                var self = this;
                d3.xml(d.pic, "image/svg+xml", function(xml) {
                    $(xml.documentElement).appendTo($(self)).addClass(d.class);
                });
            })
            .call(force.drag);


        nodes.append("svg:circle")
            .style("fill", "white")
            .attr("r", function(d) { return d.r; });

        nodes.append("text")
            .text(function(d) { return d.name; })
            .attr("y", function(d){ return d.r + 15; })
            .attr("x", function(d){
                // must do boundingClientRect because firefox (and probably IE)
                // has no idea what the width of an svg element is using $.width()
                //TODO these are wrong sometimes?
                return - this.getBoundingClientRect().width/2;
            })
            // kind of wonky but some clients need the element to be
            // in the dom to get the width
            .style('display', 'none');


        $(window).on('resize', _.debounce(onWindowResize, 100, true));
        // $('#more-tab').on('click', showHideMoreContent);
        hasher.init();
        // showHideNodes();
    });

    function showHideNodes(){
        // d3.selectAll('.node')
        //     .transition()
        //     .duration(0)
        //     .attr("transform","translate(" + $(window).width()/2 + "," + $(window).height()/2 + ")")
        //     .each('end', function(d){
        //         force.start();
        //     });
    };

    function nodeClick(node){
        // hasher.changed.active = false; //disable changed signal
        hasher.setHash(node.class);
        // hasher.changed.active = true; //re-enable signal
        if(node.class !== "reade" && !$('#bubbles').hasClass('grouped')) showNodeDetails(node)
    };

    function showNodeDetails(node){
        $('#bubbles').addClass('transition');

        $iframe.css('background-image', "url('assets/pics/loading.gif')");
        $('#work-title').text(node.name);

        $(window).off('resize');
        $('.reade').one('mousedown.drag', restartForces);

        if(node.gitHubURL) $('#github-link').attr('href', node.gitHubURL).show();
        if(node.linkedInURL) $('#linkedin-link').attr('href', node.linkedInURL).show();

        force.stop();

        d3.select("#canvas").transition()
            .duration(750)
            .attr('height', 120)
            .each('end', function(){
                //don't load iframe until animation finished
                $('#bubbles').addClass('grouped').removeClass('transition');
                $iframe.remove();
                $iframe.one('load', function(){
                    $(this).css('background-image', '');
                    //load more content
                    // $('#more-container').show();
                });
                $iframe.attr('src', node.workURL);
                $iframe.appendTo('body');
            });

        d3.select('g.' + node.class)
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
    }

    function restartForces(){
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

    function onWindowResize(){
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

    function showHideMoreContent(){
        if($('#more-container').hasClass('closed')){
            $('#more-container').addClass('open').removeClass('closed');
            $('#more-tab').text('Less');

            //Add Text explanation (from node?)
            $('#more-content').text('').wrapInner('<p></p>');
        } else {
            resetMoreContent();


        }
    };

    function resetMoreContent(){
        $('#more-container').removeClass('open').addClass('closed');
        $('#more-tab').text('More');
    };

    function tick(){
      vis.selectAll(".link")
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

        vis.selectAll(".node").attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    };
})();