(function(){
    var classes = [
        {
            "name":"oil-gas",
            "text": ["OIL & GAS"],
            "background": "blue",
            "imports":[
                "corrosion-inhibitor",
                "descalant",
                "super-absorbant",
                "acidulant",
                "metal-ion-control"
            ]
        },
        {
            "name":"industrial-institutional-cleaners",
            "text": ["INDUSTRIAL &", "INSTITUTIONAL", "CLEANERS"],
            "background": "blue",
            "imports":[
                "detergent-builder",
                "anti-redeposition",
                "descalant",
                "metal-ion-control"
            ]
        },
        {
            "name":"concrete-additives",
            "text": ["CONCRETE", "ADDITIVES"],
            "background": "blue",
            "imports":[
                "corrosion-inhibitor",
                "plasticizer",
                "set-retarder",
                "descalant",
                "metal-ion-control"
            ]
        },
        {
            "name":"road-safety",
            "text": ["ROAD", "SAFETY"],
            "background": "blue",
            "imports":[
                "corrosion-inhibitor"
            ]
        },
        {
            "name":"water-treatment",
            "text": ["WATER", "TREATMENT"],
            "background": "blue",
            "imports":[
                "descalant",
                "metal-ion-control"
            ]
        },
        {
            "name":"agriculture",
            "text": ["AGRICULTURE"],
            "background": "blue",
            "imports":[
                "controlled-delivery",
                "metal-ion-control"
            ]
        },
        {
            "name":"pulp-paper",
            "text": ["PULP &", "PAPER"],
            "background": "blue",
            "imports":[
                "descalant"
            ]
        },
        {
            "name":"personal-care",
            "text": ["PERSONAL", "CARE"],
            "background": "blue",
            "imports":[
                "antioxidant",
                "metal-ion-control"
            ]
        },
        {
            "name":"pharmaceutical",
            "text": ["PHARMA-", "CEUTICAL"],
            "background": "blue",
            "imports":[
                "controlled-delivery"
            ]
        },
        {
            "name":"food-nutrition",
            "text": ["FOOD &", "NUTRITION"],
            "background": "blue",
            "imports":[
                "antioxidant",
                "acidulant",
                "metal-ion-control"
            ]
        },
        {
            "name":"fabric-homecare",
            "text": ["FABRIC &", "HOMECARE"],
            "background": "blue",
            "imports":[
                "corrosion-inhibitor",
                "detergent-builder",
                "anti-redeposition",
                "structurant",
                "descalant"
            ]
        },
        {
            "name":"paper-products",
            "text": ["PAPER", "PRODUCTS"],
            "background": "blue",
            "imports":[
                "metal-ion-control",
            ]
        },


        {
            "name":"metal-ion-control",
            "text": ["CONTROL","METAL ION"],
            "background": "grey",
            "imports":[
                "fabric-homecare",
                "food-nutrition",
                "agriculture",
                "concrete-additives",
                "water-treatment",
                "industrial-institutional-cleaners",
                "oil-gas",
                "paper-products",
                "personal-care",
                "pulp-paper"
            ],
            "functionality":[
                "preservation",
                "dispertion",
                "chelation"
            ]
        },
        {
            "name":"acidulant",
            "text": ["ACIDULANT"],
            "background": "grey",
            "imports":[
                "food-nutrition",
                "oil-gas"
            ],
            "functionality":[
                "flavor-modification",
                "ph-modification"
            ]
        },
        {
            "name":"super-absorbant",
            "text": ["ABSORBANT", "SUPER"],
            "background": "grey",
            "imports":[
                "paper-products",
                "personal-care",
                "agriculture"
            ],
            "functionality":[
                "absorption"
            ]
        },
        {
            "name":"descalant",
            "text": ["ANTI-SCALANT","DESCALANT"],
            "background": "grey",
            "imports":[
                "fabric-homecare",
                "pulp-paper",
                "water-treatment",
                "industrial-institutional-cleaners",
                "oil-gas"
            ],
            "functionality":[
                "dispertion",
                "ph-modification",
                "chelation"
            ]
        },
        {
            "name":"structurant",
            "text": ["STRUCTURANT"],
            "background": "grey",
            "imports":[
                "fabric-homecare",
                "personal-care"
            ],
            "functionality":[
                "adhesion",
                "dispertion",
                "adsorption"
            ]
        },
        {
            "name":"anti-redeposition",
            "text": ["AGENT", "REDEPOSITION", "ANTI-"],
            "background": "grey",
            "imports":[
                "fabric-homecare",
                "industrial-institutional-cleaners"
            ],
            "functionality":[
                "dispertion",
                "adsorption"
            ]
        },
        {
            "name":"antioxidant",
            "text": ["ANTIOXIDANT"],
            "background": "grey",
            "imports":[
                "food-nutrition",
                "personal-care"
            ],
            "functionality":[
                "preservation"
            ]
        },
        {
            "name":"controlled-delivery",
            "text": [ "DELIVERY", "CONTROLLED"],
            "background": "grey",
            "imports":[
                "agriculture",
                "pharmaceutical"
            ],
            "functionality":[
                "permeation",
                "barrier"
            ]
        },
        {
            "name":"set-retarder",
            "text": ["RETARDER", "SET"],
            "background": "grey",
            "imports":[
                "concrete-additives"
            ],
            "functionality":[
                "chelation"
            ]
        },
        {
            "name":"plasticizer",
            "text": ["PLASTICIZER"],
            "background": "grey",
            "imports":[
                "concrete-additives"
            ],
            "functionality":[
                "dispertion"
            ]
        },
        {
            "name":"detergent-builder",
            "text": ["BUILDER", "DETERGENT"],
            "background": "grey",
            "imports":[
                "industrial-institutional-cleaners",
                "fabric-homecare"
            ],
            "functionality":[
                "dispertion",
                "ph-modification",
                "chelation"
            ]
        },
        {
            "name":"corrosion-inhibitor",
            "text": ["INHIBITOR", "CORROSION"],
            "background": "grey",
            "imports":[
                "oil-gas",
                "concrete-additives",
                "road-safety",
                "fabric-homecare",
                "industrial-institutional-cleaners",
                "water-treatment",
                "pulp-paper"
            ],
            "functionality":[
                "barrier",
                "preservation",
                "adsorption",
                "chelation"
            ]
        }
    ];

    var markers = [
        {
            name: 'section-bookend',
            markerHeight: '13',
            refY: 0.5
        },
        {
            name: 'section-bookend-flip',
            markerHeight: '13',
            refY: 9.5
        },
        {
            name: 'functionality-bookend',
            markerHeight: '10',
            refY: 0.5
        }
    ];

    var functionalityTiles = [
        {
            name: 'chelation',
            text: 'CHELATION',
            index: 0,
            position: '8.33, 0',
            connectedTiles: [
                'corrosion-inhibitor',
                'detergent-builder',
                'set-retarder',
                'metal-ion-control',
                'descalant'
            ]
        },
        {
            name: 'ph-modification',
            text: 'pH MODIFICATION',
            index: 1,
            position: '8.33, 40',
            connectedTiles: [
                'detergent-builder',
                'descalant',
                'acidulant'
            ]
        },
        {
            name: 'dispertion',
            text: 'DISPERTION',
            index: 2,
            position: '8.33, 80',
            connectedTiles: [
                'anti-redeposition',
                'structurant',
                'descalant',
                'plasticizer',
                'detergent-builder',
                'metal-ion-control'
            ]
        },
        {
            name: 'absorption',
            text: 'ABSORPTION',
            index: 3,
            position: '8.33, 120',
            connectedTiles: [
                'super-absorbant'
            ]
        },
        {
            name: 'barrier',
            text: 'BARRIER',
            index: 4,
            position: '8.33, 160',
            connectedTiles: [
                'corrosion-inhibitor',
                'controlled-delivery'
            ]
        },
        {
            name: 'adhesion',
            text: 'ADHESION',
            index: 5,
            position: '166.66, 0',
            connectedTiles: [
                'structurant'
            ]
        },
        {
            name: 'permeation',
            text: 'PERMEATION',
            index: 6,
            position: '166.66, 40',
            connectedTiles: [
                'controlled-delivery'
            ]
        },
        {
            name: 'adsorption',
            text: 'ADSORPTION',
            index: 7,
            position: '166.66, 80',
            connectedTiles: [
                'anti-redeposition',
                'structurant',
                'corrosion-inhibitor'
            ]
        },
        {
            name: 'flavor-modification',
            text: 'FLAVOR MODIFICATION',
            index: 8,
            position: '166.66, 120',
            connectedTiles: [
                'acidulant'
            ]
        },
        {
            name: 'preservation',
            text: 'PRESERVATION',
            index: 9,
            position: '166.66, 160',
            connectedTiles: [
                'corrosion-inhibitor',
                'antioxidant',
                'metal-ion-control'
            ]
        }
    ];

    var arcSpecs = [
        {
            id: "consumer-markets",
            text: "CONSUMER MARKETS",
            textOffset: 170,
            letterSpacing: 100,
            dy: "1.5em",
            //15.5deg to 89.75deg 
            d: "M104.49020504659848,-376.7795072045716A391,391 0 0,1 390.985111918091,-3.4120753798641696",
            markerName: "section-bookend"
        },
        {
            id: "applications",
            text: "APPLICATIONS",
            textOffset: 560,
            letterSpacing: 50,
            dy: "-0.75em",
            //269.5deg to 90.5deg 
            d: "M-390.985111918091,3.4120753798640444A391,391 0 0,0 390.985111918091,3.4120753798642567",
            markerName: 'section-bookend-flip'
        },
        {
            id: "industrial-markets", 
            text: "INDUSTRIAL MARKETS", 
            textOffset: 290, 
            letterSpacing: 100,
            dy: "1.5em", 
            //-89.5deg to 14.5deg 
            d: "M-390.985111918091,-3.4120753798642953A391,391 0 0,1 97.8985815852866,-378.54572738784015",
            markerName: 'section-bookend'
        }
    ];

    var technologyTexts = [
        {
            text: 'TECHNOLOGY PLATFORM',
            name: 'technology-text-title'
        },
        {
            text: 'Our renewable <em>Novel Chemistry™</em> enables endless application options with the added benefit of embedded sustainability and cost efficiency.',
            name: 'technology-text-renewable'
        },
        {
            text: '<a href="http://www.rivertop.com/contact.php/" target="_blank">Contact us</a> to explore together how we can fulfill unmet market needs.',
            name: 'technology-text-contact'
        }
    ];

    // Lazily construct the package hierarchy from class names.
    var packageHierarchy = function(classes) {
        var map = {};

        function find(name, data) {
            var node = map[name], i;
            if (!node) {
                node = map[name] = data || {name: name, children: []};
                if (name.length) {
                    node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
                    node.parent.children.push(node);
                    node.key = name.substring(i + 1);
                }
            }
            return node;
        }

        classes.forEach(function(d) {
            find(d.name, d);
        });

        return map[""];
    }

    // Return a list of imports for the given array of nodes.
    var packageImports = function (nodes) {
        var map = {},
                imports = [];

        // Compute a map from name to node.
        nodes.forEach(function(d) {
            map[d.name] = d;
        });

        // For each import, construct a link from the source to target node.
        nodes.forEach(function(d) {
            if (d.imports) d.imports.forEach(function(i) {
                imports.push({source: map[d.name], target: map[i]});
            });
        });

        return imports;
    }

    $(document).ready(function(){

        var mouseoverDot = function(d){
            var tile = d3.select('.tile-group.' + $(this).data('name'));
            d3.selectAll('.tile-group:not(.' + $(this).data('name') + ')').classed('fade', true);
            mouseoverTile(tile.data()[0]);
        }

        var mouseoutDot = function(d){
            var tile = d3.select('.tile-group.' + $(this).data('name'));
            d3.selectAll('.tile-group').classed('fade', false);
            mouseoutTile(tile.data()[0]);
        }

        var mouseoverTile = function (d){
            var nodeList = [];
            _.forEach(d.connectedTiles, function(connectedTile){
                var node = d3.select('.' + connectedTile);
                nodeList.push(node.data()[0]);
            });
            activateNode(nodeList)

            d3.selectAll('.node-source path').classed(d.name, true);
            $('.circle-marker:not(.' + d.name + ')').hide();
            if(d.name === "flavor-modification"){
                d3.selectAll('.target-oil-gas').classed('not-connected', true)
            }
        }

        var mouseoutTile = function(d){
            d3.selectAll('.node-source path').classed(d.name, false);

           _.forEach(d.connectedTiles, function(connectedTile){
                var node = d3.select('.' + connectedTile);
                deactivateNode(node.data()[0]);
           }); 

            $('.circle-marker').show();
        }

        var activateNode = function(d) {
            if(!_.isArray(d)){
                d = [d];
            }
            link
                .classed("link-source", function(l) { if ( _.contains(d, l.source) ) return l.target.target = true; })
                .classed("not-connected", function(l) { if (!_.contains(d, l.source)) return l.target.target = true; });

            node
                .classed("node-source", function(n) { return _.contains(d, n); });
        }

        var deactivateNode = function(d) {
            link
                .classed("link-source", false)
                .classed("not-connected", false);

            node.classed("node-source", false);
        }

        var diameter = 852;
        var radius = diameter / 2;
        var innerRadius = radius - 120;

        var cluster = d3.layout.cluster()
                .size([360, innerRadius]);

        var bundle = d3.layout.bundle();

        var line = d3.svg.line.radial()
                .interpolate("bundle")
                .tension(.2)
                .radius(function(d) { return d.y; })
                .angle(function(d) { return d.x / 180 * Math.PI; });

        var svg = d3.select("#technology-infomap").append("svg")
                .attr("width", '100%')
                .attr("height", '100%')
                .attr("viewBox", (-radius - 350) + " " + -radius + " 1200 850")
                .attr("preserveAspectRatio", "xMinYMin slice");

        var link = svg.append("svg:g").attr("transform", "rotate(270)").selectAll(".link"),
            node = svg.append("svg:g").attr("transform", "rotate(270)").selectAll(".node"),
            nodeText = svg.append("svg:g"),
            technologyText = svg.append("svg:foreignObject")
                                .attr('height', 215)
                                .attr('width', 335)
                                .attr('class', 'tech-text-container')
                                .attr("transform", "translate(-770,-340)scale(.95)")
                                .selectAll('.tech-text'),
            tile = svg.append("svg:g").attr('class', 'tile-container').attr("transform", "translate(-760,-50)scale(.9)").selectAll(".tile")
            defs = svg.append("svg:defs");

        _.forEach(markers, function(marker){
            defs.append('svg:marker')
                .attr('id', marker.name)
                .attr("viewBox", "0 0 1 10")
                .attr('markerUnits', 'strokeWidth')
                .attr('markerHeight', marker.markerHeight)
                .attr('refY', marker.refY)
                .attr('orient', 'auto')
                .append('svg:line')
                .attr('x1', 0)
                .attr('y1', 0)
                .attr('x2', 0)
                .attr('y2', 10)
                .attr('style', 'stroke:#A6A8AB;');
        });

        var nodes = cluster.nodes(packageHierarchy(classes)),
            links = packageImports(nodes);

        link = link
                .data(bundle(links))
                .enter().append("svg:path")
                .each(function(d) { d.source = d[0], d.target = d[d.length - 1]; })
                .attr("class", function(d) {return "link target-" + d.target.name; })
                .attr("d", line);

        node = node
                .data(nodes.filter(function(n) {return !n.children; }))
                .enter().append("svg:g")
                .attr("class", function(d) { return "node-group " + d.name; })
                .attr("transform", function(d) { return "rotate(" + (d.x - 97) + ")translate(" + (d.y + 63) + ",0)"; })
                

        node.insert('svg:path')
                .attr("d","M84.276,61.439l8.281-58.25C76.556,1.044,61.212,0,45.75,0C30.64,0,15.641,0.997,0,3.043l8.094,58.253 C33,58.091,58.574,58.031,84.276,61.439z")
                .attr("class", function(d) { return "node-shape " + d.background; })
                .attr("transform", "rotate(97)scale(0.98)")
                .on("mouseover", activateNode)
                .on("mouseout", deactivateNode);

        node.each(function(d, index){
            var node = d3.select(this);
            if(d.functionality){
                var numFunctionalities = _.size(d.functionality);
                _.forEach(d.functionality, function(functionality, index){
                    node.append('svg:circle')
                        .attr("cx", 35 - index * 2.5)
                        .attr("cy", 60 - (numFunctionalities * 10) + index * 20)
                        .attr("r", 5)
                        .attr('class', 'circle-marker ' + functionality)
                        .attr("data-name", functionality)
                        .on("mouseover", mouseoverDot)
                        .on("mouseout", mouseoutDot);
                });
            }

            var startAngle = d.x >= 180 ? 3.5 + (15 * index) : -10.5 + (15 * index);
            var endAngle = d.x >= 180 ? startAngle - 14: startAngle + 14;

            var numStrings = _.size(d.text)
            var radiusMatrix = [
                [337],
                [345, 330],
                [352, 337, 322]
            ]
            _.forEach(d.text, function(text, i){
                var arc = d3.svg.arc()
                    .innerRadius(radiusMatrix[numStrings - 1][i])
                    .outerRadius(radiusMatrix[numStrings - 1][i])
                    .startAngle( startAngle * (Math.PI/180)) //converting from degs to radians
                    .endAngle( endAngle * (Math.PI/180));

                nodeText.append("svg:path")
                   .attr("transform", "rotate(281)")
                   .attr('id', 'textPath-' + index + i)
                   .attr("d", arc);

                nodeText.append("svg:text")
                        .attr("class", 'node-text')
                        .attr('dy', '4px')
                        .append("textPath")
                        .attr("xlink:href",function(){return "#textPath-"+index+i;})
                        .attr("text-anchor",'middle')
                        .attr("startOffset",'25.5%')
                        .text(text);
            });
        });

        _.forEach(arcSpecs, function(arcSpec){
                
            svg.append("svg:path")
                .attr('stroke-width', '1')
                .attr('stroke', '#A6A8AB')
                .attr('fill', 'none')
                .attr('id', arcSpec.id)
                .attr("d", arcSpec.d)
                .attr('marker-start', 'url(#' + arcSpec.markerName + ')')
                .attr('marker-end', 'url(#' + arcSpec.markerName + ')');

            svg.append("svg:text")
                .attr('class', 'section-text')
                .style("letter-spacing", arcSpec.letterSpacing)
                .attr("dy", arcSpec.dy)
                .append("svg:textPath")
                .attr("textLength",50)
                .attr("xlink:href",function(){return "#"+arcSpec.id;})
                .attr("startOffset", arcSpec.textOffset)
                .text(arcSpec.text);
        });

        technologyText = technologyText
                .attr('height', 300)
                .attr('width', 300)
                .attr('x', 0)
                .attr('y', 0)
                .data(technologyTexts)
                .enter().append("xhtml:p")
                .attr('class', function(d){return d.name;})
                .html(function(d){return d.text;});

        tile = tile
                .attr('height', 300)
                .attr('width', 300)
                .attr('x', 0)
                .attr('y', 0)
                .data(functionalityTiles)
                .enter().append("svg:g")
                .attr("class", function(d) { return "tile-group " + d.name; })
                .attr("transform", function(d){ return  "translate(" + d.position + ")";})
                .on("mouseover", mouseoverTile)
                .on("mouseout", mouseoutTile);

            tile.append('svg:rect')
                .attr("width", 140)
                .attr("height", 25)
                .attr("rx", 12.5)
                .attr("ry", 12.5)
                .attr("class", function(d) { return d.name; })

                
            tile.append('svg:text')
                .attr('class', 'tile-text')
                .attr("dy", "1.25em")
                .attr('x', 70)
                .text(function(d){return d.text;});

            svg.select('.tile-container')
                .append('svg:line')
                .attr('class', 'functionality-line')
                .attr("x1", -10)
                .attr("y1", -15)
                .attr("x2", 325)
                .attr("y2", -15)
                .attr('marker-end', 'url(#functionality-bookend)')
                .attr('marker-start', 'url(#functionality-bookend)');

            svg.select('.tile-container')
                .append('svg:text')
                .attr('class', 'functionality-title')
                .attr('dy', '-2em')
                .attr('x', 165)
                .text('FUNCTIONALITY');
    });
})();