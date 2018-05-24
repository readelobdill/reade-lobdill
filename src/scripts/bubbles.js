// TODO - action prompts
//      - more/less info content
//      - small screen?
//      - vclick

(function(){

    var vis,
        force,
        w = 1800,
        $iframe,
        nodesHidden = true,
        nodePositions = [
            [-200, -200],
            [50, -200],
            [200, 0],
            [200, -200],
            [100, 200],
            [-50, 200],
            [-200, 0],
            [-150, 75]
        ],
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
                "r": 60
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
                "name":"Clickup",
                "class": "clickup",
                "pic": "assets/pics/clickup.svg",
                "workURL": 'https://app.clickup.com',
                "external": true,
                "r": 60
            },
            {
                "name":"UJET",
                "class": "ujet",
                "pic": "assets/pics/ujet.svg",
                "workURL": 'https://ujet.co/demo/?demo_token=candidate-demo-token-GLbEAfleuI',
                "external": true,
                "r": 60
            },
            // Must keep main node on as last added to DOM
            // so it always appears on top. svg objects respect
            // the DOM order instead of z-index
            {
                // "name":"Reade Lobdill Design",
                "class": "reade",
                "pic":"assets/pics/logo.svg",
                "fixed": true,
                "r": 60,
                "x": $(window).width()/2,
                "y": $(window).height()/2
            }
        ],
        linkData = [];

    for (var i = 0; i < nodeData.length - 1; i++){
        linkData.push({
            source: nodeData.length - 1,
            target: parseFloat(i, 10)
        });
    }

    console.log(linkData);

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
            .gravity(0.1)
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
            .on('mouseover', function(d){
                $('#work-title').text(d.name);
            })
            .on('mouseout', function(){
                if(!$('#bubbles').hasClass('grouped') && !$('#bubbles').hasClass('transition')) $('#work-title').text('');
            })
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

        force.stop();
        nodes.transition()
            .duration(0)
            .attr("transform","translate(" + $(window).width()/2 + "," + $(window).height()/2 + ")");


        $(window).on('resize', _.debounce(onWindowResize, 100, true));
        // $('#more-tab').on('click', showHideMoreContent);
        hasher.init();
        $('.reade').on('mousedown', showHideNodes);
    });

    function showHideNodes(){
        if(!$('#bubbles').hasClass('grouped')){
            var middleNode = force.nodes()[force.nodes().length - 1];
                midX = middleNode.x,
                midY = middleNode.y;
                nodes = d3.selectAll('.node:not(.reade)');
            if (nodesHidden){
                nodes.transition()
                    .duration(0)
                    .each('end', function(d, i){
                         d.x = (midX + nodePositions[i][0]);
                         d.y = (midY + nodePositions[i][1]);
                         force.resume();
                     });
                nodesHidden = false;
            } else {
                force.stop();
                nodes.transition()
                    .duration(500)
                    .attr("transform",  function() {
                        return "translate(" + midX + "," + midY + ")";
                    });

                d3.selectAll(".link")
                    .transition()
                    .duration(500)
                    .attr("x1", function(d) { return midX; })
                    .attr("y1", function(d) { return midY; })
                    .attr("x2", function(d) { return midX; })
                    .attr("y2", function(d) { return midY; });

                nodesHidden = true;
            }
        }
    };

    function nodeClick(node){
        if (node.external) {
            window.open(node.workURL, '_blank');
        } else {
            // hasher.changed.active = false; //disable changed signal
            hasher.setHash(node.class);
            // hasher.changed.active = true; //re-enable signal
            if(node.class !== "reade" && !$('#bubbles').hasClass('grouped')) showNodeDetails(node)
        }
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
        $iframe.remove();
        $iframe.attr('src', '');
        $iframe.appendTo('body');
        $iframe.css('background-image', '');
        $('#bubbles').removeClass('grouped').addClass('transition');

        // $('#more-content').empty();
        // $('#more-container').hide();
        // resetMoreContent();

        $('.social-link').hide();
        $('#work-title').text('');
        $(window).on('resize', _.debounce(onWindowResize, 500, true));

        d3.select("#canvas").transition()
            .duration(0)
            .attr('height', $(window).height())
            .each('end', function(d){
                _.delay(function(){
                    $('#bubbles').removeClass('transition');
                    force.resume();
                }, 750)
            });

        if(nodesHidden){
            showHideNodes();
        } else {
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
        }
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